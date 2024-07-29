import joi from "@hapi/joi";

export default joi.object().keys({
  email: joi
    .string()
    .required()
    .error(() => "You have to enter email Ex: XXXXX@XXX.com"),
  password: joi
    .string()
    .min(6)
    .max(16)
    .required()
    .error(() => "You have to enter a valid password"),
});
