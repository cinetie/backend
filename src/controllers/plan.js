import response from "../helpers/response";
import planServices from "../services/planServices";
import Util from "../helpers/utilities";

const util = new Util();
class planController {
  static async addPlan(req, res) {
    try {
      const getPlan = await planServices.getParticalPlan(req.body.type);
      if (getPlan) {
        util.setErrorResponse(
          res,
          "Plan exists already should you consider updating it instead",
          422
        );
      } else {
        const addedPlan = await planServices.addPlan(req.body);
        util.setSuccessResponse(
          res,
          "Plan successfully added!",
          201,
          addedPlan
        );
      }
    } catch (error) {
      util.setErrorResponse(res, `Something went wrong : ${error}`, 503);
    }
  }

  static async deleteAplan(req, res) {
    try {
      const deletedPlan = await planServices.deletePlan(req.params.id);
      util.setSuccessResponse(
        res,
        "Plan successfully deleted!",
        200,
        deletedPlan
      );
    } catch (error) {
      util.setErrorResponse(res, `Something went wrong : ${error}`, 503);
    }
  }

  static async getParticularPlan(req, res) {
    try {
      const returned = await planServices.getParticalPlan(req.params.id);
      if (!returned) response.errorResponse(res, 404, "Plan not found");
      util.setSuccessResponse(
        res,
        "Plan successfully retrieved!",
        200,
        returned
      );
    } catch (error) {
      util.setErrorResponse(res, `Something went wrong : ${error}`, 503);
    }
  }

  static async getAllPlans(req, res) {
    try {
      const returned = await planServices.getAllPlan();
      util.setSuccessResponse(
        res,
        "Plans successfully retrieved!",
        200,
        returned
      );
    } catch (error) {
      util.setErrorResponse(res, `Something went wrong : ${error}`, 503);
    }
  }

  static async updatePlan(req, res) {
    try {
      const toUpdate = req.body;
      const updated = await planServices.updatePlans(req.params.id, toUpdate);
      util.setSuccessResponse(
        res,
        "Plan successfully updated!",
        200,
        updated[1][0]
      );
    } catch (error) {
      util.setErrorResponse(res, `Something went wrong : ${error}`, 503);
    }
  }
}

export default planController;
