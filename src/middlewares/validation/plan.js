/* eslint-disable import/prefer-default-export */
import AddPlanSchema from "./schemas/plans/addPlan";
import validator from "../../helpers/validator";

export const addPlan = (req, res, next) => {
  validator(AddPlanSchema, req.body, res, next);
};
