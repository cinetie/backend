import { Router } from "express";
import AmbassadorsController from "../controllers/ambassadors";
import * as userValidation from "../middlewares/validation/user";
import * as validation from "../middlewares/validation/ambassadors";
import promoCodeController from '../controllers/promoCode';
import access from "../middlewares/access";

const router = Router();
router.post("/signup", validation.signup, AmbassadorsController.signup);
router.post("/login", userValidation.login, AmbassadorsController.login);
router.post("/verify/:id", access.isAdmin, AmbassadorsController.verify);
router.get("/", access.isAdmin, AmbassadorsController.getAmbassadors);
router.get("/promocode/utilization", access.isAmbassador, promoCodeController.getAmbassadorPromoCodeUtilizations);
router.get("/info", access.isAmbassador, AmbassadorsController.getAmbassadorDetails);
router.get("/stats/:id", access.isAdmin, AmbassadorsController.getAmbassadorStats);

export default router;
