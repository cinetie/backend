import { Router } from "express";
import SubscriptionController from "../controllers/subscription";
import { subscribe } from '../middlewares/validation/subscription'
import Access from "../middlewares/access";

const router = new Router();

router.post("/subscribe", Access.isNormalUser, subscribe, SubscriptionController.subscribe);

export default router;