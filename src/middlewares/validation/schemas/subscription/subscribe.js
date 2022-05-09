import Joi from "@hapi/joi";
import joi from "@hapi/joi";

export default joi.object().keys({
  paymentMethod: joi
    .number()
    .required()
    .error(() => "you have to provide a payment method to suscribe"),
  plan: joi
    .string()
    .required()
    .valid('Promo','Standard', 'Premium', 'Premium-discount')
    .error(() => "you have to provide a valid plan. available plans: Standard, Premium, Premium-discount"),
  isBilledAnnually: Joi
    .boolean()
    .optional()
    .error(() => "isBilledAnnually property should be a boolean")
});