/* eslint-disable import/prefer-default-export */
import AddVideoSchema from './schemas/videos/addVideo';
import validator from '../../helpers/validator';

export const addVideo = (req, res, next) => {
  validator(AddVideoSchema, req.body, res, next);
};
