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
        name: Joi.string().min(3).required().error(() => "You have to enter a name bigger than 3 characters"),
        referrerCode: Joi.string()
            .min(7)
            .optional()
            .error(() => "You have to enter a referrer code exactly 7 characters long. EX: INV4GXT"),
        country: Joi.string().required().error(() => "You have to enter a country")
    })
    .options({ allowUnknown: false });
