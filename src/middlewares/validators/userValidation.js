import Joi from '@hapi/joi';

class userValidation {
  static user(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string().email({
        minDomainSegments: 2
      }).required()
        .error(() => 'You have to enter a valid email. Example: yourname@domain.com'),
      firstName: Joi.string().alphanum().min(3).max(30)
        .required()
        .error(() => 'You have to enter a valid name. Example: Jane'),
      lastName: Joi.string().alphanum().min(3).max(30)
        .required()
        .error(() => 'You have to enter a valid name. Example: Doe'),
      password: Joi.string().min(6).required()
        .error(() => 'You have to enter a valid password with more than 6 characters. Example: andela'),
      phoneNumber: Joi.string().regex(/^[0-9+-]{10,18}$/)
        .error(() => 'You have to enter a valid phone number. Example: +250788888888'),
      plan: Joi.string()
        .error(() => 'You have to enter a valid plan'),
      isBilledAnnually: Joi.boolean()
        .error(() => 'Please provide a valid billing cycle'),
      permissionLevel: Joi.number().min(0).max(2)
        .error(() => 'Permission level incorrect or unsupplied'),
      cityOfResidence: Joi.string().min(3).max(30)
        .error(() => 'You have to enter a valid city of residence. Example: Kigali,New york'),
      nationality: Joi.string().min(3).max(30)
        .error(() => 'You have to a valid nationality. Example: Rwandan,American'),
      paymentMethod: Joi.number().min(1).max(2)
        .error(() => 'You have to select a payment method')
    });
    schema.validate(req.body, (err) => {
      if (err) {
        res.status(409).json({
          status: 409,
          error: err.details[0].message,
        });
      }
    });
    next();
  }

  static updateUser(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string().email({
        minDomainSegments: 2
      })
        .error(() => 'You have to enter a valid email. Example: yourname@domain.com'),
      firstName: Joi.string().alphanum().min(3).max(30)
        .error(() => 'You have to enter a valid name. Example: Jane'),
      lastName: Joi.string().alphanum().min(3).max(30)
        .error(() => 'You have to enter a valid name. Example: Doe'),
      password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/)
        .error(() => 'You have to enter a valid password with more than 6 characters. Example: andela'),
      phoneNumber: Joi.string().regex(/^[0-9+-]{10,18}$/)
        .error(() => 'You have to enter a valid phone number. Example: +250788888888'),
      plan: Joi.string()
        .error(() => 'You have to enter a valid plan'),
    });
    schema.validate(req.body, (err) => {
      if (err) {
        res.status(409).json({
          status: 409,
          error: err.details[0].message,
        });
      }
    });
  }
}
export default userValidation;
