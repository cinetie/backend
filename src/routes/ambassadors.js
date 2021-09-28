import { Router } from "express";
import AmbassadorsController from "../controllers/ambassadors";
import * as userValidation from "../middlewares/validation/user";
import * as validation from "../middlewares/validation/ambassadors";
import access from "../middlewares/access";

const router = Router();
router.post("/signup", validation.signup, AmbassadorsController.signup);
router.post("/login", userValidation.login, AmbassadorsController.login);
router.post("/verify/:id", access.isAdmin, AmbassadorsController.verify);

export default router;
