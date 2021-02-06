/* eslint-disable import/prefer-default-export */
import AddMovie from './schemas/videos/addMovie';
import addSerie from './schemas/videos/addSerie';
import ApproveVideoSchema from './schemas/videos/approveVideo';
import UpdateVideoSchema from './schemas/videos/updateVideo';
import validator from '../../helpers/validator';

export const addVideo = (req, res, next) => {
  if (req.body.type === 'serie') {
    delete req.body.video;
    delete req.body.EnSubt;
    delete req.body.FrSubt;
    validator(addSerie, req.body, res, next);
  } else {
    validator(AddMovie, req.body, res, next);
  }
};

export const approveVideo = (req, res, next) => {
  validator(ApproveVideoSchema, req.body, res, next);
};

export const updateVideo = (req, res, next) => {
  validator(UpdateVideoSchema, req.body, res, next);
}