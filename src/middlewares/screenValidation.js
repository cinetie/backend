/* eslint-disable consistent-return */
// this middleware checks whether the user hasn't exceeded the amount of simultaneus screens
// this middleware implements the number of screens feature of cinetie
import Util from '../helpers/utilities';
import userService from '../services/userServices';
import planService from '../services/planServices';
import loginSessionService from '../services/loginSessionServices';
import billingService from "../services/billingServices"

const util = new Util();

class screenValidation {
  // this method uses a decoded email from the token to fetch
  // and return the type of plan a user subscribed on
  static async getEmail(req, res) {
    try {
      const { email } = req.body;
      const user = await userService.getUserByMail(email);
      if (!user) util.setErrorResponse(res, 'Login Credentials incorrect', 402);
      const details = {
        email,
        plan: user.plan
      };
      return details;
    } catch (error) {
      util.setErrorResponse(res, `An error occured ${error}`, 500);
    }
  }

  // this method uses the returned plan to fetch it's property number of screens
  static async getPlan(req, res) {
    try {
      const details = await screenValidation.getEmail(req, res);
      const plan = await planService.getParticalPlan(details.plan);
      const screensAndEmail = {
        screens: Number(plan.numberOfScreens),
        email: details.email
      };
      return screensAndEmail;
    } catch (error) {
      util.setErrorResponse(res, `an error occured ${error}`, 500);
    }
  }

  // this method uses the returned numberOfScreens property to validate the login session
  static async validateNumberOfScreens(req, res, next) {
    try {
      if (req.body.email !== process.env.ADMIN_USER) {
        const user = await userService.getUserByMail(req.body.email);
        const details = await screenValidation.getPlan(req, res);
        const activeSessions = await loginSessionService.getParticularSession(details.email);
        const subscriptionStatus = await billingService.getSubscription(req.body.email)

        if (activeSessions.length !== details.screens || user.plan === 'Setup' || subscriptionStatus.state === "pending") {
          next();
        } else {
          util.setErrorResponse(res, 'Maximum screens in your plan has reached ', 403);
        }
      } else {
        next();
      }
    } catch (error) {
      util.setErrorResponse(res, `an error occured  ${error}`, 500);
    }
  }

  static async verifyPermissionLevel(req, res, next) {
    try {
      const data = await userService.getUserByMail(req.body.email);
      if (data.permissionLevel !== 1) {
        util.setErrorResponse(res, 'Please sent up your billing', 402);
      } else {
        next();
      }
    } catch (error) {
      util.setErrorResponse(res, `an error occured  ${error}`, 500);
    }
  }
}
export default screenValidation;
