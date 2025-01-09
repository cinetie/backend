import BadRequestError from "../errors/BadRequestError";
import WithdrawalsServices from "../services/withdrawalsServices";

export default class WithdrawalsController {
    static async getBanks(req, res) {
        const investor = req.investor;
        const banks = await WithdrawalsServices.getCountryBanks(investor.country, investor);
        return res.json({ banks });
    }

    static async getBankBranches(req, res) {
        const { bankCode } = req.params;
        const investor = req.investor;
        const branches = await WithdrawalsServices.getBankBranches(bankCode, investor.country);
        return res.json({ branches });
    }


    static async createWithdrawal(req, res) {

        try {
            const { investor } = req;
            const { callback_url, bankCode, accountNumber, beneficiaryName, destinationBranchCode } = req.body;
            const { amount } = req.body;
            const data = await WithdrawalsServices.createBankWithDrawal({ investor, amount, callback_url, bankCode, accountNumber, beneficiaryName, destinationBranchCode });
            return res.json(data);
        } catch (error) {
            console.log(error, '====errror')
            if (error instanceof BadRequestError) {
                return res.status(400).json({ error: error.message });
            }
            res.status(500).json({ error: "Internal server error" });
        }

    }



    static async verifyWithDrawal(req, res) {
        const { transfer } = req.body;
        await WithdrawalsServices.verifyWithdrawal(transfer);
        res.json({ message: 'success' });
    }

    static async getWithdrawals(req, res) {
        const { investor } = req;
        const data = await WithdrawalsServices.getWithdrawalsInfo(investor);
        res.json(data);
    }
}