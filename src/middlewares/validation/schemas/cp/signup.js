import joi from '@hapi/joi';

export default joi.object().keys({
  name: joi.string().min(3).required()
    .error(() => 'Enter a valid a name Ex: Nowhere Pictures'),
  email: joi.string().email({ minDomainSegments: 2 }).required()
    .error(() => 'Enter a valid email address Ex: nowhere@pictures.com'),
  password: joi.string().min(6).max(16).required()
    .error(() => 'Enter a valid password less than greater than 6 characters and less than 16 characters'),
  nationality: joi.string().min(3).required()
    .error(() => 'Enter a valid nationality Ex: Rwandan '),
  cityOfResidence: joi.string().min(3).required()
    .error(() => 'Enter a valid city of residence Ex: Kigali'),
  phoneLine: joi.string().trim().min(10).max(15).required()
    .error(() => 'Enter a valid phone number')
}).options({ allowUnknown: false });
