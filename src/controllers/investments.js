
import ConflictError from "../errors/ConflictError";

import InvestmentServices from "../services/investmentServices";

export default class InvestmentController {
    static async create(req, res) {

        try {
            const investor = req.investor;
            const data = {
                shares: req.body.shares,
                investor,
                redirect_url: req.body.redirect_url
            }

            const result = await InvestmentServices.create(data);
            return res.status(201).json({
                status: "success",
                data: result
            });
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Internal server error"
            });
        }

    }


    static async getAll(req, res) {
        
        try {
            const investor = req.investor;

            const result = await InvestmentServices.getAllInvestments(investor.id);
            return res.status(200).json({
                status: "success",
                data: result,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: "error",
                message: "Internal server error"
            });
        }

    }


}