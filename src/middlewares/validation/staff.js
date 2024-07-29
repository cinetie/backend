import LoginSchema from "./schemas/staff/login";
import addStaffSchema from "./schemas/staff/newStaff";
import passwordSchema from "./schemas/staff/changePassword";
import validator from "../../helpers/validator";

export const login = (req, res, next) => {
  validator(LoginSchema, req.body, res, next);
};
export const addStaff = (req, res, next) => {
  validator(addStaffSchema, req.body, res, next);
};
export const changePassword = (req, res, next) => {
  validator(passwordSchema, req.body, res, next);
};
