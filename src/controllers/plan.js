import response from "../helpers/response";
import planServices from "../services/planServices";
import Util from "../helpers/utilities";
import userService from "../services/userServices";

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
  static async downgradePlan(req, res) {
    try {
      const { userId, newPlanType } = req.body;
      const user = await userService.getUserById(userId);
      
      if (!user) {
        util.setErrorResponse(res, "User not found", 404);
        return;
      }
      const currentPlan = await planServices.getParticalPlan(newPlanType);
     
      if (!currentPlan) {
        util.setErrorResponse(res, "Plan not found", 404);
        return;
      }
      const plansHierarchy = ['Promo', 'Standard', 'Premium'];
      const currentPlanIndex = plansHierarchy.indexOf(user.plan);
      
      const newPlanIndex = plansHierarchy.indexOf(newPlanType);
     
      if (currentPlanIndex < newPlanIndex) {
        util.setErrorResponse(res, "You cannot downgrade to a higher plan", 400);
        return;
      }
      const downgradeResult = await planServices.downgradePlan(user, currentPlan);
      
      if (downgradeResult.success) {
        util.setSuccessResponse(res, "Plan downgrade scheduled successfully", 200, downgradeResult.job);
      } else {
        util.setErrorResponse(res, "Failed to schedule plan downgrade", 500);
      }
    } catch (error) {
        
      util.setErrorResponse(res, `Something went wrong: ${error.message}`, 503);
    }
  }
}

export default planController;
