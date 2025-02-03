import joi from "@hapi/joi";

export default joi.object().keys({
  shares: joi
    .number()
    .required()
    .error(() => "You have to enter shares"),
});
