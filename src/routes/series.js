import { Router } from "express";
import controller from "../controllers/series";
import access from "../middlewares/access";
import billing from "../middlewares/billing";

const router = new Router();

router.post("/create", access.isAdmin, controller.create);
router.get("/cp", access.isProducer, controller.getVideosByClientId);
router.get(
  "/ep",
  access.isNormalUser,
  billing.verifyPermissionLevel,
  controller.getSingleEpisode
);
router.get("/single/season", access.isLoggedIn, controller.getSingleSeason);
router.get("/all/seasons", access.isLoggedIn, controller.getAllSeasons);
router.put("/update", access.isProducer, controller.updateSerie);
router.delete("/delete/:id", access.isAdmin, controller.delete);
router.delete("/delete/temp/:id", access.isAdmin, controller.deleteTemp);

export default router;
