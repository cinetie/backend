import joi from "@hapi/joi";

export default joi
  .object()
  .keys({
    templateName: joi
      .string()
      .min(3)
      .required()
      .error(() => "Enter a valid a templateName Ex: Holiday Promotion"),
    templateData: joi
      .object()
      .required()
      .error(() => "Enter a valid templateData"),
  })
  .options({ allowUnknown: false });
