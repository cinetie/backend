import joi from '@hapi/joi';


export default joi.object().keys({
  videoName: joi.string().required()
    .error(() => 'You have to enter a valid name like \'Faster\''),
  videoCast: joi.string().required()
    .error(() => 'You have to enter a cast'),
  videoSynopsis: joi.string().max(250).required()
    .error(() => 'You have to provide a synopsis less than 250 characters'),
  category: joi.string().required()
    .error(() => 'You have to provide a valid category'),
  type: joi.string().valid('serie', 'movie').required()
    .error(() => 'You have to provide a type Ex: serie or movie')
}).options({ allowUnknown: false });
