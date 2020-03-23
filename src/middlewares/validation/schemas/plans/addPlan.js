import joi from '@hapi/joi';

export default joi.object().keys({
  type: joi.string().min(3).required(),
  numberOfScreens: joi.number().min(1).required(),
  monthlyPrice: joi.number().required(),
  yearlyPrice: joi.number().required()
});
