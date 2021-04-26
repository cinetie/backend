import { Router } from "express";
import controller from "../controllers/earning";
import adminController from "../controllers/admin";
import sales from "../controllers/sales";
import access from "../middlewares/access";
import users from "../controllers/users";
import earningCalculator from "../helpers/calculateEarning";
import * as validation from "../middlewares/validation/email";

const router = Router();

router.get("/earnings", access.isAdmin, controller.getAllEarnings);
router.get("/earnings/active", access.isAdmin, controller.getAllActiveEarnings);
router.get(
  "/earnings/cp",
  access.isAdmin,
  adminController.getEarningsPerClient
);
router.get(
  "/earnings/video",
  access.isAdmin,
  adminController.getAllEarningsPerVideo
);
router.get("/videos/cp", access.isAdmin, adminController.getVideosPerCp);
router.get("/videos", access.isAdmin, adminController.getAllVideos);
router.get("/sales/all", access.isAdmin, sales.getAllSales);
router.get("/sales/range", access.isAdmin, sales.getSalesInTimeRange);
router.post("/gain-access", access.isAdmin, adminController.gainAccess);
router.get("/users/all", access.isAdmin, users.getEmailByQuery);
router.post("/mail", access.isAdmin, adminController.addMessage);
router.post("/template", validation.emailTemplate, adminController.addTemplate);
router.get("/template/:id", adminController.getTemplateByid);
router.get("/all/template", adminController.getAllTemplate);
export default router;
