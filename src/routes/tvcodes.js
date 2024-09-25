/**
 * @description Router for the tvcodes endpoint
 * @author: @avici1
 * @exports: Router
 */
import { Router } from "express";
import Controller from "../controllers/tvcodes";
import access from "../middlewares/access";


const router = new Router();
const controller = new Controller();

router.post("/create", access.isLoggedIn,  controller.createTvCode);
router.get("/get", access.isLoggedIn, controller.getTvCode);
router.delete("/delete/:id", access.isLoggedIn, controller.deleteTvCode);
router.get("/validate/:code", access.isLoggedIn, controller.validateTvCode);

export default router;
