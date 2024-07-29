import Joi from "@hapi/joi";

export default Joi.object().keys({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  name: Joi.string().min(3).required(),
});
