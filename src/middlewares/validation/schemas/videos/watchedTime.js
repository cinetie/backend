import joi from '@hapi/joi';

export default joi.object().keys({
    watchedTime: joi.number().min(1).max(100).required()
        .error(() => 'watchedTimed is required and should be a number between 1 and 100'),
    type: joi.string().trim().required().regex(/\b(movie|episode)\b/)
        .error(() => 'video type is required and should be movie or episode in lowercases'),
}).options({ allowUnknown: false });
