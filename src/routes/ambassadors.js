import { Router } from "express";
import AmbassadorsController from "../controllers/ambassadors";
import * as userValidation from "../middlewares/validation/user";
import * as validation from "../middlewares/validation/ambassadors";

const router = Router();
router.post("/signup", validation.signup, AmbassadorsController.signup);
router.post("/login", userValidation.login, AmbassadorsController.login);

export default router;
