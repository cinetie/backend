import Joi from "@hapi/joi";

export default Joi.object()
  .keys({
    firstName: Joi
        .string()
        .min(2)
        .required()
        .error(() => "Enter first name ex: Mike"),
    lastName: Joi
        .string()
        .min(2)
        .required()
        .error(() => "Enter Last name ex: Mike"),
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
      phoneNumber: Joi
        .string()
        .trim()
        .min(10)
        .max(15)
        .required()
        .error(() => "Enter a valid phone number"),
      region: Joi
        .string()
        .min(3)
        .required()
        .error(() => "Enter a valid region Ex: Kigali"),
  })
  .options({ allowUnknown: false });
