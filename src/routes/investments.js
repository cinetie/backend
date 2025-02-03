import { Router } from "express";
// import * as validation from "../middlewares/validation/investors";
// import InvestorsController from "../controllers/investors";
import Access from "../middlewares/access";
import InvestmentController from "../controllers/investments";


const router = Router();


router.post("/", Access.isInvestor, InvestmentController.create);
router.get("/", Access.isInvestor, InvestmentController.getAll);
router.post("/pay/:investmentId", Access.isInvestor, InvestmentController.payInvestment);
router.put("/cancel/:investmentId", Access.isInvestor, InvestmentController.cancelInvestment);

export default router;
