/* eslint-disable import/prefer-default-export */
import getSignedUrl from "./schemas/signedUrl/getSignedUrl";
import validator from "../../helpers/validator";

export const signedUrls = (req, res, next) => {
  validator(getSignedUrl, req.body, res, next);
};
