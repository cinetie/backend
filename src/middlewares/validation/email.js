import EmailTemplateSchema from "./schemas/email/emailTemplate";
import validator from "../../helpers/validator";

export const emailTemplate = (req, res, next) => {
  validator(EmailTemplateSchema, req.body, res, next);
};
