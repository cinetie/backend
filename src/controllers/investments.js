
import BadRequestError from "../errors/BadRequestError";
import NotFoundError from "../errors/NotFoundError";
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
            if (error instanceof BadRequestError) {
                return res.status(400).json({
                    status: "error",
                    message: error.message
                });
            }
            if (error instanceof ConflictError) {
                return res.status(409).json({
                    status: "error",
                    message: error.message
                });
            }
            if (error instanceof NotFoundError) {
                return res.status(404).json({
                    status: "error",
                    message: error.message
                });
            }
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
            if (error instanceof BadRequestError) {
                return res.status(400).json({
                    status: "error",
                    message: error.message
                });
            }
            if (error instanceof ConflictError) {
                return res.status(409).json({
                    status: "error",
                    message: error.message
                });
            }
            if (error instanceof NotFoundError) {
                return res.status(404).json({
                    status: "error",
                    message: error.message
                });
            }
            return res.status(500).json({
                status: "error",
                message: "Internal server error"
            });
        }

    }


    static async payInvestment(req, res) {
        try {
            const investor = req.investor;
            const { investmentId } = req.params;
            const redirect_url = req.body.redirect_url;
            const result = await InvestmentServices.payInvestment({
                investmentId,
                investor,
                redirect_url
            });
            return res.status(200).json({
                status: "success",
                data: result
            });

        } catch (error) {
            if (error instanceof BadRequestError) {
                return res.status(400).json({
                    status: "error",
                    message: error.message
                });
            }
            if (error instanceof ConflictError) {
                return res.status(409).json({
                    status: "error",
                    message: error.message
                });
            }
            if (error instanceof NotFoundError) {
                return res.status(404).json({
                    status: "error",
                    message: error.message
                });
            }
            return res.status(500).json({
                status: "error",
                message: "Internal server error"
            });
        }
    }


    static async cancelInvestment(req, res) {
        try {
            const investor = req.investor;
            const { investmentId } = req.params;
            const result = await InvestmentServices.cancelPayment(investmentId, investor);
            return res.status(200).json({
                status: "success",
                data: result
            });

        } catch (error) {
            if (error instanceof BadRequestError) {
                return res.status(400).json({
                    status: "error",
                    message: error.message
                });
            }
            if (error instanceof ConflictError) {
                return res.status(409).json({
                    status: "error",
                    message: error.message
                });
            }
            if (error instanceof NotFoundError) {
                return res.status(404).json({
                    status: "error",
                    message: error.message
                });
            }
            if (error instanceof BadRequestError) {
                return res.status(400).json({
                    status: "error",
                    message: error.message
                });
            }

            return res.status(500).json({
                status: "error",
                message: "Internal server error"
            });
        }
    }


}