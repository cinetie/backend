/* eslint-disable import/prefer-default-export */
import AddProfileSchema from './schemas/profiles/addProfile';
import validator from '../../helpers/validator';

export const addProfile = (req, res, next) => {
  validator(AddProfileSchema, req.body, res, next);
};
