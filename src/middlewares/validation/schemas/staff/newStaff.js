import joi from "@hapi/joi";

export default joi.object().keys({
  email: joi
    .string()
    .required()
    .error(() => "You have to enter email Ex: XXXXX@XXX.com"),
  role: joi
    .string()
    .regex(/\b(admin|marketing agent)\b/)
    .required()
    .error(() => "Invalid role entered"),
});
