import joi from '@hapi/joi';
import Util from '../../helpers/utilities';

const util = new Util();

class videoValidation {
  static video(req, res, next) {
    const schema = joi.object().keys({
      videoName: joi.string().required()
        .error(() => 'You have to enter a valid name like \'Faster\''),
      videoCast: joi.string().required()
        .error(() => 'You have to enter a cast'),
      videoSynopsis: joi.string().max(250).required()
        .error(() => 'You have to provide a synopsis less than 250 characters'),
      category: joi.string().required()
        .error(() => 'You have to provide a valid category'),
      size: joi.number().required()
        .error(() => 'You have to provide a file size in megabytes'),
      videoUrl: joi.string().required()
        .error(() => 'Provide a valid url')
    });
    schema.validate(req.body, (err) => {
      if (err) {
        res.status(409).json({
          status: 409,
          error: err.details[0].message,
        });
      } else {
        next();
      }
    });
  }

  static updateVideo(req, res, next) {
    const schema = joi.object().keys({
      videoName: joi.string()
        .error(() => 'You have to enter a valida name like \'Faster\''),
      videoCast: joi.string()
        .error(() => 'You have to enter a cast'),
      videoSynopsis: joi.string().max(250)
        .error(() => 'You have a text no greater than 250 characters'),
      category: joi.string()
        .error(() => 'You have to provide a valid category'),
      size: joi.number()
        .error(() => 'You have to provide a file size in megabytes')
    });
    schema.validate(req.body, (err) => {
      if (err) {
        util.setErrorResponse(res, err.details[0].message, 409);
      }
    });
    next();
  }
}
export default videoValidation;
