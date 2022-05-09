import subscribeSchema from "./schemas/subscription/subscribe";
import validator from "../../helpers/validator";

export const subscribe = (req, res, next) => {
  validator(subscribeSchema, req.body, res, next);
};
