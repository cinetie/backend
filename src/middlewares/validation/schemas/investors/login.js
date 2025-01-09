import joi from "@hapi/joi";

export default joi.object().keys({
  email: joi
    .string()
    .required()
    .error(() => "You have to enter email Ex: XXXXX@XXX.com"),
  password: joi
    .string()
    .required()
    .error(() => "You have to enter password"),
});
