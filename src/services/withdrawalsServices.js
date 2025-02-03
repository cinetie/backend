import database from "../database/models";
import { v4 as uuid } from 'uuid';
import Flutterwave from 'flutterwave-node-v3';
import { getCountryCode, countries } from "countries-list";
import BadRequestError from "../errors/BadRequestError";
import { supportedCurrencies } from "../helpers/flutterwave";
import convert from "../helpers/currency";


const countriesWithBranches = ["BJ", "CM", "TD", "CI", "CD", "GA", "GH", "MW", "RW", "SN", "SL", "TZ", "UG"]

const fw = new Flutterwave(process.env.RAVE_PUBLIC, process.env.RAVE_SECRET);

// database.Withdrawals: name of the db model

export default class WithdrawalsServices {
  static async createBankWithDrawal({
    amount,
    callback_url,
    bankCode,
    accountNumber,
    beneficiaryName,
    destinationBranchCode,
    investor,
  }) {
    // const t = await database.sequelize.transaction();

    database.sequelize.transaction(async (t) => {
      const { availableBalance } = await WithdrawalsServices.getAvailableBalance(investor, t);
      if (amount > availableBalance) {
        throw new BadRequestError("Insufficient balance. Please reduce the amount you want to withdraw");
      }

      // test uuids
      // const tx_ref = uuid() + "_PMCK_DU_2";
      // const tx_ref = uuid() + "_PMCK_ST_FDU_2"
      const tx_ref = uuid()
      const countryCode = getCountryCode(investor.country);
      const country = countries[countryCode]
      const countryCurrency = country?.currency[0];
      const currency = supportedCurrencies.includes(countryCurrency) ? countryCurrency : "USD";
      const convertedAmount = currency === "USD" ? investment.amount : await convert(amount, currency);

      const withdrawal = await database.Withdrawals.create({
        investorId: investor.id,
        amount,
        status: "pending",
        withdrawReference: tx_ref,
      }, { transaction: t });


      const payload = {
        account_bank: `${bankCode}`,
        account_number: `${accountNumber}`,
        amount: convertedAmount,
        currency: currency,
        reference: tx_ref,
        callback_url,
        beneficiary_name: beneficiaryName,
        destination_branch_code: destinationBranchCode ? `${destinationBranchCode}` : undefined

      }

      const fwTransfer = await fw.Transfer.initiate(payload);
      console.log(fwTransfer)
      return { withdrawal, fwTransfer };

    })



  }



  static async getCountryBanks(country) {
    const countryCode = getCountryCode(country);
    const { data } = await fw.Bank.country({ country: countryCode });
    return data;
  }

  static async getBankBranches(bankCode, country) {
    const countryCode = getCountryCode(country);
    if (!countriesWithBranches.includes(countryCode)) {
      return null;
    }
    const { data } = await fw.Bank.branches({
      id: bankCode
    });
    return data;
  }


  static async getNumberOfReferees(investor, t) {
    const count = await database.investors.count({
      where: {
        referrerCode: investor.code
      },
      include: [{
        model: database.Investment,
        as: 'investments',
        where: {
          status: 'completed'
        },
        required: true
      }]
    }, {
      transaction: t
    });

    return count;
  }


  static async getFundsWithdrawned(investor, t) {
    const total = await database.Withdrawals.sum('amount', {
      where: {
        investorId: investor.id,
        status: ['pending', 'completed']
      }
    }, {
      transaction: t
    }) ?? 0;

    return total;
  }

  static async verifyWithdrawal(transfer, t) {
    const { id, reference } = transfer;
    const withdrawal = await database.Withdrawals.findOne({
      where: {
        withdrawReference: reference
      }
    }, { transaction: t });
    const { data } = await fw.Transfer.get_a_transfer({ id });
    if (data.status === "SUCCESSFUL") {
      await withdrawal.update({
        status: "completed"
      }, { transaction: t });
    } else {
      await withdrawal.update({
        status: "failed"
      }, { transaction: t });
    }




  }
  static async getAllWithdrawals(investor, t) {
    const withdrawals = await database.Withdrawals.findAll({
      where: {
        investorId: investor.id
      }
    }, { transaction: t });
    return withdrawals;
  }

  static async getAvailableBalance(investor, t) {
    const numberOfReferees = await WithdrawalsServices.getNumberOfReferees(investor, t);
    const balance = numberOfReferees * 50;
    const withdrawnBalance = await WithdrawalsServices.getFundsWithdrawned(investor, t);
    const availableBalance = balance - withdrawnBalance;
    return { balance, withdrawnBalance, availableBalance, numberOfReferees };
  }

  static async getWithdrawalsInfo(investor, t) {
    const [data, withdrawals] = await Promise.all([
      WithdrawalsServices.getAvailableBalance(investor, t),
      WithdrawalsServices.getAllWithdrawals(investor, t)
    ]);
    return { ...data, withdrawals };
  }

}