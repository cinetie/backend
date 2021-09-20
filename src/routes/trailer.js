import { Router } from "express";
import controller from "../controllers/trailer";
import access from "../middlewares/access";
import * as validation from "../middlewares/validation/trailer";

const router = new Router();

router.post(
  "/new",
  access.isAdmin,
  validation.addTrailer,
  controller.createNewTrailer
);
router.get("/sort/video", access.isLoggedIn, controller.getAllTrailersPerVideo);
router.get("/particular", controller.getParticularTrailerController);
router.get("/all", access.isAdmin, controller.getAllTrailerController);
router.get("/upload-link", access.isAdmin, controller.getTrailerUploadLink);
router.put(
  "/update",
  access.isAdmin,
  controller.updateParticularTrailerController
);
router.delete(
  "/delete",
  access.isAdmin,
  controller.deleteParticularTrailerController
);

export default router;
