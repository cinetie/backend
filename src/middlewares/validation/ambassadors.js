import SignupSchema from "./schemas/ambassadors/signup";
import validator from "../../helpers/validator";

export const signup = (req, res, next) => {
  validator(SignupSchema, req.body, res, next);
};
