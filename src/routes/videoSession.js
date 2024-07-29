import { Router } from "express";
import controller from "../controllers/viewingSessions";

const router = new Router();

router.get("/", controller.getSpecificSessions);
router.get("/user", controller.getAllSessionsPerUser);
export default router;
