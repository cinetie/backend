import database from "../database/models";
import { v4 as uuid } from 'uuid';
import BadRequestError from "../errors/BadRequestError";
import axios, { AxiosError } from "axios";
import { countries, getCountryCode } from "countries-list";
import convert from "../helpers/currency";
import { supportedCurrencies } from "../helpers/flutterwave";




export default class InvestmentServices {
    static async create({ shares, investor, redirect_url }) {
        const t = await database.sequelize.transaction();
        let amount = shares * 100;
        const ref = uuid()
        const firstInvestment = await database.Investment.findOne({
            where: { investorId: investor.id, marketingFeeIncluded: true }
        }, { transaction: t })

        if (!firstInvestment) {
            amount = amount + 50;
            const investment = await database.Investment.create({
                investorId: investor.id,
                shares,
                amount,
                marketingFeeIncluded: true,
                paymentReference: ref,
                status: "pending"
            });
            return InvestmentServices.createInvestmentLink(investment?.dataValues ?? investment, investor, redirect_url, t)

        }

        if (firstInvestment?.status === "pending") {
            throw new BadRequestError("You have pending first investment. Please complete the payment or cancel the investment to create a new one");
        }

        const investment = await database.Investment.create({
            investorId: investor.id,
            shares,
            amount,
            marketingFeeIncluded: false,
            paymentReference: ref,
            status: "pending"
        });
        return InvestmentServices.createInvestmentLink(investment, investor, redirect_url, t);
    }

    static async payInvestment({
        investmentId,
        investor,
        redirect_url
    }) {
        const t = await database.sequelize.transaction();
        const investment = await database.Investment.findOne({
            where: { id: investmentId, investorId: investor.id }
        }, { transaction: t });

        if (!investment) {
            throw new BadRequestError("Investment not found");
        }

        if (investment.status === "completed") {
            throw new BadRequestError("Investment already completed");
        }

        if (investment.status === "canceled") {
            throw new BadRequestError("Investment already canceled");
        }

        if (investment.status === "pending") {
            return InvestmentServices.createInvestmentLink(investment, investor, redirect_url, t);
        }

        throw new BadRequestError("Investment status not supported");

    }

    static async getAllInvestments(investorId) {
        const investments = await database.Investment.findAll({
            where: { investorId },
            order: [['id', 'DESC']]
        });

        const shares = investments.reduce((acc, investment) => {
            if (investment.status === "completed") {
            return acc + investment.shares;
            }
            return acc;
        }
        , 0);
        const totalAmount = shares * 100;

        return { investments, shares, totalAmount }
    }

    static async cancelInvestment(investmentId) {
        return database.Investment.update({
            status: "canceled"
        }, {
            where: { id: investmentId, status: "pending" }
        });
    }


    static async createInvestmentLink(investment, investor, redirect_url, transaction) {
        const countryCode = getCountryCode(investor.country);
        const country = countries[countryCode]
        const countryCurrency = country?.currency[0];
        const currency = supportedCurrencies.includes(countryCurrency) ? countryCurrency : "USD";
        const amount = currency === "USD" ? investment.amount : await convert(investment.amount, currency);
        const data = {
            // amount: investment.amount,
            // dummy amount for test
            amount: 500,
            currency: currency,
            tx_ref: investment.paymentReference,
            redirect_url,
            customer: {
                email: investor.email
            },
        }

        const { status } = await InvestmentServices.verifyInvestment(investment.paymentReference, transaction);
        if (status === "success") {
            return { link: null }
        }




        const response = await axios.post('https://api.flutterwave.com/v3/payments', data, {
            headers: {
                Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
                'Content-Type': 'application/json',
            }
        })

        return { link: response.data?.data?.link }
    }

    static async verifyInvestment(reference, transaction) {
        try {
            console.log(reference, '========================= i got here');
            const res = await axios.get(`https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${reference}`, {
                headers: {
                    Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
                    'Content-Type': 'application/json',
                }
            })

            console.log(res, '============= the result ====')

            const data = res.data;

            console.log(data, '=========================', reference);

            if (data.status === "success") {
                await database.Investment.update({
                    status: "completed"
                }, {
                    where: { paymentReference: reference }
                }, {
                    transaction
                });
                return { status: "success" }
            }
            return {
                status: data.status
            }
        } catch (error) {
            console.log(error, '===================== error');
            if (error instanceof AxiosError) {
                return { status: "not found" }
            }
            throw error;
        }

    }


    static async cancelPayment(investment) {
        if (investment.status === "completed") {
            throw new BadRequestError("You can not cancel a completed payment");
        }
        const { status } = await InvestmentServices.verifyInvestment(investment.paymentReference);
        if (status === "success") {
            throw new BadRequestError("You can not cancel a completed payment");
        }
        return axios.post(`https://api.flutterwave.com/v3/payments/${investment.paymentReference}/cancel`, {
            headers: {
                Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
                'Content-Type': 'application/json',
            }
        })
    }

    static async getFirstInvestment(investorId) {


        return database.Investment.findOne({
            where: { investorId, marketingFeeIncluded: true }
        });
    }
}