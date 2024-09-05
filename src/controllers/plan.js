import response from "../helpers/response";
import planServices from "../services/planServices";
import Util from "../helpers/utilities";
import userService from "../services/userServices";
import subscriptions from "../services/billingServices";

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
  /**
  * Handles the plan downgrade request for a user.
  * 
  * @param {Object} req - The request object containing the user's information.
  * @param {Object} req.body - The body of the request containing userId and newPlanType.
  * @param {string} req.body.userId - The ID of the user requesting the downgrade.
  * @param {string} req.body.newPlanType - The type of plan the user wants to downgrade to.
  * @param {Object} res - The response object used to send back the HTTP response.
  * 
  * @returns {Promise<void>} - Sends an HTTP response indicating the success or failure of the downgrade process.
  */
  static async downgradePlan(req, res) {
    try {
      // Destructuring userId and newPlanType from the request body.
      const { userId, newPlanType } = req.body;

      /**
       * Retrieves the user by their ID.
       * 
       * @type {Object}
       */
      const user = await userService.getUserById(userId);

      /**
       * Retrieves the user's current subscription by their email.
       * 
       * @type {Object}
       */
      const subscription = await subscriptions.getSubscription(user.email);

      // Checks if the user exists. If not, returns a 404 error response.
      if (!user) {
        util.setErrorResponse(res, "User not found", 404);
        return;
      }

      /**
       * Retrieves the partial plan details for the new plan type.
       * 
       * @type {Object}
       */
      const currentPlan = await planServices.getParticalPlan(newPlanType);

      // Checks if the new plan exists. If not, returns a 404 error response.
      if (!currentPlan) {
        util.setErrorResponse(res, "Plan not found", 404);
        return;
      }

      // Defines the hierarchy of plans.
      const plansHierarchy = ['Promo', 'Standard', 'Premium'];

      // Determines the index of the current and new plans within the hierarchy.
      const currentPlanIndex = plansHierarchy.indexOf(user.plan);
      const newPlanIndex = plansHierarchy.indexOf(newPlanType);

      // Validates if the downgrade is permissible based on the hierarchy.
      if (currentPlanIndex < newPlanIndex) {
        util.setErrorResponse(res, "You cannot downgrade to a higher plan", 400);
        return;
      }

      /**
       * Holds the result of the downgrade operation.
       * 
       * @type {Object}
       */
      let downgradeResult;

      // Determines the payment method and processes the downgrade accordingly.
      if (subscription.paymentMethod === 2) {
        downgradeResult = await planServices.downgradeStripePlan(user, currentPlan);
      } else {
        downgradeResult = await planServices.downgradeFlutterwavePlan(user, currentPlan);
      }

      // Checks if the downgrade was successful and sends the appropriate response.
      if (downgradeResult.success) {
        util.setSuccessResponse(res, "Plan downgrade scheduled successfully", 200, downgradeResult.job);
      } else {
        util.setErrorResponse(res, "Failed to schedule plan downgrade", 500);
      }
    } catch (error) {
      // Handles any errors that occur during the process and sends a 503 error response.
      util.setErrorResponse(res, `Something went wrong: ${error.message}`, 503);
    }
  }

}

export default planController;
