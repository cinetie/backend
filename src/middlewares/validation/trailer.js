/* eslint-disable import/prefer-default-export */
import AddTrailerSchema from "./schemas/trailers/addTrailer";
import validator from "../../helpers/validator";

export const addTrailer = (req, res, next) => {
  validator(AddTrailerSchema, req.body, res, next);
};
