import database from "../database/models";
import jwt from "jsonwebtoken";
import UnauthorizedError from '../errors/UnauthorizedError';
import ConflictError from '../errors/ConflictError';
import bcrypt from 'bcrypt';

export default class InvestorServices {
    static async create({ name, email, password, referrerCode, country }) {
        const oldInvestor = await database.investors.findOne({
            where: { email }
        });
        if (oldInvestor) {
            throw new ConflictError("Email already in use");
        }
        const code = await InvestorServices.generateCode();
        const safePassword = await bcrypt.hash(password, 10);

        const result = await database.investors.create({ name, email, password: safePassword, code, referrerCode, country });
        const investor = {
            id: result?.dataValues?.id,
            name: result?.dataValues?.name,
            email: result?.dataValues?.email,
            code: result?.dataValues?.code,
            referrerCode: result?.dataValues?.referrerCode
        }
        const token = jwt.sign({ id: investor.id }, process.env.SECRET, { expiresIn: "1d" });
        return { investor, token };
    }

    static async login({ email, password }) {
        const oldInvestor = await database.investors.findOne({
            where: { email }
        });
        if (!oldInvestor) {
            throw new UnauthorizedError("Invalid email or password");
        }
        const validPassword = await bcrypt.compare(password, oldInvestor.password);
        if (!validPassword) {
            throw new UnauthorizedError("Invalid email or password");
        }
        const investor = {
            id: oldInvestor.id,
            name: oldInvestor.name,
            email: oldInvestor.email,
            code: oldInvestor.code,
            referrerCode: oldInvestor.referrerCode
        }
        const token = jwt.sign({ id: investor.id }, process.env.SECRET, { expiresIn: "1d" });
        return { investor, token };
    }



    static async generateCode() {
        const latestInvestor = await database.investors.findOne({
            order: [['id', 'DESC']]
        });
        console.log(latestInvestor, '====');
        const latestId = latestInvestor?.id ?? 0;

        const random3Letters = Math.random().toString(36).substring(2, 5).toUpperCase();
        const code = `INV${latestId + 1}${random3Letters}`;
        return code;
    }


    static async getInvestorById(id) {
        const investor = await database.investors.findOne({
            where: { id },
            attributes: { exclude: ['password'] }
        });
        return investor;
    }
}