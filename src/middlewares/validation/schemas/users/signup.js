import Joi from '@hapi/joi';

export default Joi.object().keys({
  email: Joi.string().email({ minDomainSegments: 2 }).required()
    .error(() => 'You have to enter a valid email. Example: yourname@domain.com'),
  firstName: Joi.string().alphanum().min(3).max(30)
    .required()
    .error(() => 'You have to enter a valid first name. Example: Jane'),
  lastName: Joi.string().alphanum().min(3).max(30)
    .required()
    .error(() => 'You have to enter a valid last name. Example: Doe'),
  password: Joi.string().min(6).required()
    .error(() => 'You have to enter a valid password with more than 6 characters. Example: qqw12@#!23#frf_e3_@'),
  nationality: Joi.string().min(3).required()
    .error(() => 'You have to provide a valid Country. Ex: Rwanda'),
  phoneNumber: Joi.string().regex(/^[0-9+-]{10,18}$/)
    .error(() => 'You have to enter a valid phone number Ex: 07XXXXXXXX'),
  cityOfResidence: Joi.string().min(3).required()
    .error(() => 'You have to provide a valid city like Ex:kigali')
}).options({ allowUnknown: false });
