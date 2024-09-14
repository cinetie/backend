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

router.post("/create", access.isLoggedIn, (req, res) => controller.createTvCode(req, res));
router.get("/get", access.isLoggedIn, (req, res) => controller.getTvCode(req, res));
router.delete("/delete/:id", access.isLoggedIn, (req, res) => controller.deleteTvCode(req, res));
router.get("/validate/:code", access.isLoggedIn, (req, res) => controller.validateTvCode(req, res));

export default router;
