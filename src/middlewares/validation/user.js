import SignupSchema from "./schemas/users/signup";
import LoginSchema from "./schemas/users/login";
import SignupContSchema from "./schemas/users/signup-cont";
import validator from "../../helpers/validator";

export const signup = (req, res, next) => {
  validator(SignupSchema, req.body, res, next);
};

export const signupCont = (req, res, next) => {
  validator(SignupContSchema, req.body, res, next);
};

export const login = (req, res, next) => {
  validator(LoginSchema, req.body, res, next);
};
