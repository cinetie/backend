import Joi from "@hapi/joi";

export default Joi.object().keys({
  key: Joi.string().min(2).required(),
  bucket: Joi.string().required()
});
