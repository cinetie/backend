import joi from '@hapi/joi';

export default joi.object().keys({
  videoName: joi.string()
    .error(() => 'You have to enter a valid name like \'Faster\''),
  videoCast: joi.string()
    .error(() => 'You have to enter a cast'),
  videoSynopsis: joi.string().max(250)
    .error(() => 'You have to provide a synopsis less than 250 characters'),
  category: joi.string()
    .error(() => 'You have to provide a valid category'),
  type: joi.string().valid('serie', 'movie')
    .error(() => 'You have to provide a type Ex: serie or movie'),
  tallThumbNailLink: joi.string()
    .error(() => 'You did not upload a portrait cover'),
  nameTagThumbNailLink: joi.string()
    .error(() => 'You did not upload a name tag cover'),
  videoThumbnailLink: joi.string()
    .error(() => 'You did not provide landscape cover'),
  video: joi.string()
    .error(() => 'You did not provide  video'),
  rate: joi.string()
    .error(() => 'You have to enter age rating'),
  resCountries: joi.string(),
  EnSubt: joi.string(),
  FrSubt: joi.string()
}).options({ allowUnknown: false });
 