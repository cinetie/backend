import joi from '@hapi/joi';

export default joi.object().keys({
  videoId: joi.string().required()
    .error(() => 'You have to provide a video id Ex: xxxxxx-xxx-xxxx-xxxx-xxxxxxxxxx')
});
