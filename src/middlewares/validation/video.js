/* eslint-disable import/prefer-default-export */
import AddVideoSchema from './schemas/videos/addVideo';
import ApproveVideoSchema from './schemas/videos/approveVideo';
import validator from '../../helpers/validator';

export const addVideo = (req, res, next) => {
  validator(AddVideoSchema, req.body, res, next);
};

export const approveVideo = (req, res, next) => {
  validator(ApproveVideoSchema, req.body, res, next);
};
