/* eslint-disable no-console */
import { v4 as uuid } from "uuid";
import service from "../services/transactionService";
import Util from "../helpers/utilities";
import payment from "../helpers/payment";
import Fetch from "../helpers/fetch";
import jwt from "../helpers/jwt";
import Users from "../services/userServices";
import Subscriptions from "../services/billingServices";
import {
  createSubscription,
  getCustomer,
  createCustomer,
  getProduct,
} from "../helpers/stripe";
import planServices from "../services/planServices";

const util = new Util();
class transactionsController {
  static async createNewTrans(req, res) {
    try {
      const data = req.body;
      delete data.statusCode;
      delete data.status;
      const createdTrans = await service.createTransaction(data);
      if (createdTrans) {
        util.setSuccessResponse(res, "Payment Done", 200, createdTrans);
      } else {
        util.setErrorResponse(res, "Oops something went wrong", 500);
      }
    } catch (error) {
      util.setErrorResponse(res, error, 500);
    }
  }

  static async getNewSessionId(req, res) {
    try {
      const token = jwt.jwtSign({ role: "main-api" }, process.env.SECRET, 1000);
      const raw = await Fetch(
        undefined,
        {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        `${process.env.PAY_HOST}/charge/get-session-id`,
        "GET"
      );
      if (raw.status === 201) {
        util.setSuccessResponse(res, "Session id found", 200, raw);
      } else {
        util.setErrorResponse(res, "Something went wrong", 400);
      }
    } catch (error) {
      util.setErrorResponse(res, error, 500);
    }
  }

  static async getRaveStandardLink(req, res) {
    try {
      const user = await Users.getUserByMail(req.user);
      const currentSubscription = await Subscriptions.getCurrentSubscription(
        user.email,
        "pending"
      );
      const plan = await planServices.getParticalPlan(user.plan);
      const stripePlan = await getProduct(plan.stripeId);
      let stripeUser;
      if (!user.stripeId) {
        stripeUser = await createCustomer(user.email);
        await Users.updateUser(user.email, {
          stripeId: stripeUser.id,
        });
      } else {
        stripeUser = await getCustomer(user.stripeId);
      }
      if (!stripePlan) {
        return util.setErrorResponse(res, "Something went wrong", 400);
      }
      const stripeSubscription = await createSubscription(
        stripeUser.id,
        stripePlan.default_price
      );
      if (!stripeSubscription) {
        return util.setErrorResponse(res, "Something went wrong", 400);
      }
      if (stripeSubscription) {
        await payment.recordTransaction(
          user.email,
          currentSubscription.dataValues.price,
          user.phoneNumber,
          "pending",
          stripeSubscription.id
        );

        return util.setSuccessResponse(res, "Link generated", 201, {
          link: stripeSubscription.latest_invoice.hosted_invoice_url,
        });
      }
      return util.setErrorResponse(res, "Something went wrong", 400);
    } catch (error) {
      console.log(`Error: ${error}`);
      return util.setErrorResponse(res, error, 500);
    }
  }

  static async getFlutterwaveLink(req, res) {
    try {
      const token = jwt.jwtSign(
        { role: "main-api", user: req.user },
        process.env.SECRET,
        1000
      );
      const user = await Users.getUserByMail(req.user);
      const currentSubscription = await Subscriptions.getCurrentSubscription(
        user.email,
        "pending"
      );
      const txRef = uuid();
      const raw = await Fetch(
        {
          plan: user.plan,
          isBilledAnnually: user.isBilledAnnually,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          paymentOptions: "card",
          txRef,
        },
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        `${process.env.PAY_HOST}/charge/rave-standard`,
        "POST"
      );
      if (raw.status === 200) {
        await payment.recordFlutterwaveTransaction(
          user,
          currentSubscription,
          txRef,
          "pending"
        );
        util.setSuccessResponse(res, "Link generated", 201, {
          link: raw.data.link,
        });
      } else {
        util.setErrorResponse(res, "Something went wrong", 400);
      }
    } catch (error) {
      util.setErrorResponse(res, error, 500);
    }
  }

  static async cancelSubscription(req, res) {
    try {
      const email = req.user;
      const { permissionLevel } = req.fullUser;
      const subscription = await Subscriptions.getSubscriptionByEmail(email);
      if (permissionLevel === -2) {
        return util.setErrorResponse(
          res,
          "your subscription is already canceled",
          400
        );
      }

      const token = jwt.jwtSign(
        { role: "main-api", user: email },
        process.env.SECRET,
        1000
      );
      if (subscription.paymentMethod === 3) {
        const userUpdate = await Users.updateUser(email, {
          permissionLevel: -2,
        });
        const subscriptionUpdate = await Subscriptions.updateSubscription(
          email,
          { state: "canceled" }
        );
        return util.setSuccessResponse(res, "Cancelled", 200, {
          userUpdate,
          subscriptionUpdate,
        });
      }
      const raw = await Fetch(
        { email },
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        `${process.env.PAY_HOST}/charge/cancel-subscription`,
        "PUT"
      );
      if (raw.status === 201) {
        await Users.updateUser(email, { permissionLevel: -2 });
        return util.setSuccessResponse(res, raw.message, raw.status);
      }
      return util.setErrorResponse(res, "Something went wrong", 400, raw);
    } catch (error) {
      console.log("+++++++++++++++++++++++++++++++ ERRROR DDDD");
      return util.setErrorResponse(res, error, 500);
    }
  }

  static async reactivateSubscription(req, res) {
    try {
      const email = req.user;
      const { permissionLevel } = req.fullUser;
      if (permissionLevel === 1) {
        return util.setErrorResponse(
          res,
          "your permissionLevel is already 1",
          400
        );
      }

      const token = jwt.jwtSign(
        { role: "main-api", user: email },
        process.env.SECRET,
        1000
      );
      const raw = await Fetch(
        {
          email,
        },
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        `${process.env.PAY_HOST}/charge/activate-subscription`,
        "PUT"
      );
      if (raw.status === 201) {
        await Users.updateUser(email, { permissionLevel: 1 });
        return util.setSuccessResponse(res, raw.message, raw.status);
      }
      return util.setErrorResponse(res, raw.message, 400, raw);
    } catch (error) {
      return util.setErrorResponse(res, error, 500);
    }
  }
}
export default transactionsController;
