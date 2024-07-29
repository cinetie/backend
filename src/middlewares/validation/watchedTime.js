import watchedTimeSchema from "./schemas/videos/watchedTime";
import validator from "../../helpers/validator";

const timeValidator = (req, res, next) => {
  validator(watchedTimeSchema, req.body, res, next);
};

export default timeValidator;
