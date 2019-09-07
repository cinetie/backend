import Joi from '@hapi/joi';

class validation {
  static userValidation(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string().email({
          minDomainSegments: 2
        }).required()
        .error(() => 'You have to enter a valid email. Example: yourname@domain.com'),
      firstName: Joi.string().alphanum().min(3).max(30).required()
        .error(() => 'You have to enter a valid name. Example: Jane'),
      lastName: Joi.string().alphanum().min(3).max(30).required()
        .error(() => 'You have to enter a valid name. Example: Doe'),
      password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required()
        .error(() => 'You have to enter a valid password with more than 6 characters. Example: andela'),
      phoneNumber: Joi.string().regex(/^[0-9+-]{10,18}$/)
        .error(() => 'You have to enter a valid phone number. Example: +250788888888'),
      plan: Joi.string()
        .error(() => 'You have to enter a valid plan'),
    });
    schema.validate(req.body, (err) => {
      if (err) {
        res.status(422).json({
          status: 422,
          error: err.details[0].message,
        });
      } 
    });
  }
}

export default validation;