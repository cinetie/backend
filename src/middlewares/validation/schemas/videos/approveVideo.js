import joi from '@hapi/joi';

export default joi.object().keys({
  video: joi.any().required()
    .error(() => 'You have to provide a valid video'),
}).options({ allowUnknown: false });
