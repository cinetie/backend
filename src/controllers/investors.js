
import ConflictError from "../errors/ConflictError";
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
            if (error instanceof ConflictError) {
                return res.status(409).json({
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
            console.log(error);
            if (error instanceof UnauthorizedError) {
                return res.status(401).json({
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
        console.log(investor);
        return res.json({
            status: "success",
            data: investor
        });
    }

}