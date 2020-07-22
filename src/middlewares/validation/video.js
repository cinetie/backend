/* eslint-disable import/prefer-default-export */
import AddMovie from './schemas/videos/addMovie';
import addSerie from './schemas/videos/addSerie';
import ApproveVideoSchema from './schemas/videos/approveVideo';
import validator from '../../helpers/validator';

export const addVideo = (req, res, next) => {
  if (req.body.type === 'serie') {
    validator(addSerie, req.body, res, next);
  } else {
    validator(AddMovie, req.body, res, next);
  }
};

export const approveVideo = (req, res, next) => {
  validator(ApproveVideoSchema, req.body, res, next);
};
