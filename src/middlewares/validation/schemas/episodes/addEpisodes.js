import Joi from '@hapi/joi';
import joi from '@hapi/joi';

export default joi.object().keys({
  episodeName: joi.string().min(3).required()
    .error(() => 'You have to enter a valid episode name Ex: pilot'),
  videoId: joi.string().required()
    .error(() => 'You have to provide a video Id'),
  season: joi.number().required()
    .error(() => 'You have to provide season number Ex: 1'),
  synopsis: joi.string().required()
    .error(() => 'You have to provide a synopsis Ex: "It all starts at night" '),
  episodeNumber: joi.number().required()
    .error(() => 'You have to provide a number'),
  thumb: joi.string().required()
    .error(() => 'You have to provide a thumbnail'),
  video: joi.string().required()
    .error(() => 'You have to provide a video'),
  EnSubt: joi.string(),
  FrSubt: joi.string(),
}).options({ allowUnknown: false });
