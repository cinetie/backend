import { Router } from "express";
import * as validation from "../middlewares/validation/investors";
import InvestorsController from "../controllers/investors";
import Access from "../middlewares/access";


const router = Router();


router.post("/signup", validation.signup, InvestorsController.signup);
router.post("/login", validation.login, InvestorsController.login);
router.get("/profile", Access.isInvestor, InvestorsController.getInvestor);


export default router;