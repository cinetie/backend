import { Router } from "express";
import Access from "../middlewares/access";
import WithdrawalsController from "../controllers/withdrawals";


const router = Router();

router.get("/banks", Access.isInvestor, WithdrawalsController.getBanks);
router.get("/banks/:bankCode/branches", Access.isInvestor, WithdrawalsController.getBankBranches);
router.post("/banks", Access.isInvestor, WithdrawalsController.createWithdrawal);
router.post("/verify", WithdrawalsController.verifyWithDrawal);
router.get("/", Access.isInvestor, WithdrawalsController.getWithdrawals);

export default router;