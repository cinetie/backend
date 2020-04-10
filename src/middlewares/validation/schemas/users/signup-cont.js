import joi from '@hapi/joi';

export default joi.object().keys({
  nonce: joi.string().min(3).max(50)
    .error(() => 'You have to provide a valid credit card'),
  paymentMethod: joi.number().min(1).max(3).required()
    .error(() => 'You have to select a payment method')
}).options({ allowUnknown: false });
