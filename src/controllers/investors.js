
import BadRequestError from "../errors/BadRequestError";
import ConflictError from "../errors/ConflictError";
import NotFoundError from "../errors/NotFoundError";
import UnauthorizedError from "../errors/UnauthorizedError";
import InvestorServices from "../services/investorServices";

export default class InvestorsController {
    static async signup(req, res) {

        try {
            const data = {
                email: req.body.email,
                password: req.body.password,
                name: req.body.name,
                referrerCode: req.body.referrerCode,
                country: req.body.country
            }

            const result = await InvestorServices.create(data);
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

    static async login(req, res) {

        try {
            const data = {
                email: req.body.email,
                password: req.body.password
            }

            const result = await InvestorServices.login(data);
            return res.status(200).json({
                status: "success",
                data: result,
            });
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                return res.status(401).json({
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


    static async getInvestor(req, res) {
        const { investor } = req;
        return res.json({
            status: "success",
            data: investor
        });
    }

}