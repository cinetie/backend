import { Router } from "express";
import signedUrls from "../controllers/getSignedUrl";
import * as validation from "../middlewares/validation/signedUrl";
import access from "../middlewares/access";

const router = Router();
router.post("/", access.isLoggedIn, validation.signedUrls, signedUrls.getSignedUrl);

export default router;
