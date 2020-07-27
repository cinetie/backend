import joi from '@hapi/joi';

export default joi.object().keys({
  videoId: joi.string().required()
    .error(() => 'You have to attach a video'),
  trailer: joi.string().required()
    .error(() => 'You have to provide a trailer')
});
