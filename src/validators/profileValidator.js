import Joi from '@hapi/joi';
import response from '../helpers/response';

class validator {
  static profile(req,res,next){
    const schema = Joi.object().keys({
     email: Joi.string().email({minDomainSegments: 2}).required(),
     name: Joi.string().min(3).required()
    });
    schema.validate(req.body,(err)=>{
      if(err){
        return response.errorResponse(res, 422, 'Validation failed!', err.details[0].message)
      }
      next();
    });
  }
}

export default validator;