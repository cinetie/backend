import joi from '@hapi/joi';
import Util from '../../helpers/utilities';

const util = new Util();
class validator {
  static plan(req, res, next) {
    const schema = joi.object().keys({
      type: joi.string().min(3).required(),
      hasHd: joi.boolean().required(),
      hasUltraHd: joi.boolean().required(),
      numberOfScreens: joi.number().min(1).required(),
      monthlyPrice: joi.number().required(),
      yearlyPrice: joi.number().required()
    });
    schema.validate(req.body, (err) => {
      if (err) {
        return util.setErrorResponse(res, `Validation failed : ${err.details[0].message}`, 422);
      }
      next();
    });
  }

  static updatePlan(req, res, next) {
    const schema = joi.object().keys({
      type: joi.string().min(3),
      hasHd: joi.boolean(),
      hasUltraHd: joi.boolean(),
      numberOfScreens: joi.number().min(1),
      monthlyPrice: joi.number(),
      yearlyPrice: joi.number()
    });
    schema.validate(req.body, (err) => {
      if (err) {
        return util.setErrorResponse(res, `Validation failed : ${err.details[0].message}`, 422);
      }
      next();
    });
  }
}

export default validator;
