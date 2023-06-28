import { Router } from "express";
import staff from "../controllers/staff";
import {
  login,
  addStaff,
  changePassword,
} from "../middlewares/validation/staff";
import access from "../middlewares/access";

const router = new Router();

router.post("/login", login, staff.login);
router.post("/add", access.isAdmin, addStaff, staff.addNewStaff);
router.put(
  "/password",
  access.isLoggedIn,
  changePassword,
  staff.changePassword
);

export default router;
