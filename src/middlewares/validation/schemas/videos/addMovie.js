import joi from '@hapi/joi';

export default joi.object().keys({
  videoName: joi.string().required()
    .error(() => 'You have to enter a valid name like \'Faster\''),
  videoCast: joi.string().required()
    .error(() => 'You have to enter a cast'),
  videoSynopsis: joi.string().max(250).required()
    .error(() => 'You have to provide a synopsis less than 250 characters'),
  licenseEndDate: joi.string().max(10).regex(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/)
    .error(() => 'You have to provide invalid date, make sure the date is in the yyy-mm-dd format'),
  category: joi.string().required()
    .error(() => 'You have to provide a valid category'),
  type: joi.string().valid('serie', 'movie').required()
    .error(() => 'You have to provide a type Ex: serie or movie'),
  portrait: joi.string().required()
    .error(() => 'You did not upload a portrait cover'),
  nameTag: joi.string().required()
    .error(() => 'You did not upload a name tag cover'),
  landscape: joi.string().required()
    .error(() => 'You did not provide landscape cover'),
  video: joi.string().required()
    .error(() => 'You did not provide  video'),
  rate: joi.string().required()
    .error(() => 'You have to enter age rating'),
  resCountries: joi.string().required()
}).options({ allowUnknown: false });
