import { Router } from "express";
import controller from "../controllers/tempSerie";
import access from "../middlewares/access";
import { addEpisode } from "../middlewares/validation/episode";

const router = new Router();

router.post("/new", access.isAdmin, addEpisode, controller.createSerie);
router.get("/all", access.isAdmin, controller.getAllSeries);
router.get("/signed-url", access.isAdmin, controller.getSignedUrlTempSeries);
router.get("/", access.isAdmin, controller.generateSignedUrl);

export default router;
