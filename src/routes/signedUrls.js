import { Router } from "express";
import signedUrls from "../controllers/getSignedUrl";
import * as validation from "../middlewares/validation/signedUrl";

const router = Router();
router.post("/", validation.signedUrls, signedUrls.getSignedUrl);

export default router;
