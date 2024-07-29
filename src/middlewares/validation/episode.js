/* eslint-disable import/prefer-default-export */
import AddEpisodeSchema from "./schemas/episodes/addEpisodes";
import validator from "../../helpers/validator";

export const addEpisode = (req, res, next) => {
  validator(AddEpisodeSchema, req.body, res, next);
};
