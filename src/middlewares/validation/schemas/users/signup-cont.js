import joi from '@hapi/joi';

export default joi.object().keys({
  phoneNumber: joi.string().regex(/^[0-9+-]{10,18}$/)
    .error(() => 'You have to enter a valid phone number. Example: +250788888888'),
  plan: joi.string()
    .error(() => 'You have to enter a valid plan'),
  isBilledAnnually: joi.boolean()
    .error(() => 'Please provide a valid billing cycle'),
  permissionLevel: joi.number().min(0).max(2)
    .error(() => 'Permission level incorrect or unsupplied'),
  cityOfResidence: joi.string().min(3).max(30)
    .error(() => 'You have to enter a valid city of residence. Example: Kigali,New york'),
  nationality: joi.string().min(3).max(30)
    .error(() => 'You have to a valid nationality. Example: Rwandan,American'),
  paymentMethod: joi.number().min(1).max(2)
    .error(() => 'You have to select a payment method')
}).options({ allowUnknown: false });
