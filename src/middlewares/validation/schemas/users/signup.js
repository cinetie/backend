import Joi from "@hapi/joi";

export default Joi.object()
  .keys({
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required()
      .error(
        () => "You have to enter a valid email. Example: yourname@domain.com"
      ),
    password: Joi.string()
      .min(6)
      .required()
      .error(
        () =>
          "You have to enter a valid password with more than 6 characters. Example: qqw12@#!23#frf_e3_@"
      ),
    promoCode: Joi.string().min(3).error(() => "you have to enter a promo code  bigger than 3 character")
  })
  .options({ allowUnknown: false });
