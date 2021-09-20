import joi from "@hapi/joi";

export default joi.object().keys({
  newPassword: joi
    .string()
    .min(6)
    .max(16)
    .required()
    .error(() => "You have to enter a valid password"),
});
