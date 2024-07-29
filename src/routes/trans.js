import { Router } from "express";
import controller from "../controllers/transations";
import access from "../middlewares/access";

const route = new Router();
route.post("/new", access.isNormalUser, controller.createNewTrans);
route.get("/get-session-id", access.isNormalUser, controller.getNewSessionId);
route.get(
  "/rave-standard",
  access.isNormalUser,
  controller.getRaveStandardLink
);
route.get(
  "/rave-flutterwave",
  access.isNormalUser,
  controller.getFlutterwaveLink
);
route.put(
  "/cancel-subscription",
  access.isNormalUser,
  controller.cancelSubscription
);
route.put(
  "/reactivate-subscription",
  access.isNormalUser,
  controller.reactivateSubscription
);

export default route;
