/* eslint-disable no-console */
import { v4 as uuid } from "uuid";
import service from "../services/transactionService";
import Util from "../helpers/utilities";
import payment from "../helpers/payment";
import Fetch from "../helpers/fetch";
import jwt from "../helpers/jwt";
import Users from "../services/userServices";
import Subscriptions from "../services/billingServices";
import moment from "moment";
import axios from "axios";
import { parseString } from "xml2js";

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

      console.log(currentSubscription, "++++++++++++++++++++++++++++ CURRENT");

      var currentDate = new Date();

      const xmlBodyStr = `
        <API3G>
          <CompanyToken>${process.env.PAYMENT_COMPANY_TOKEN}</CompanyToken>
          <Request>createToken</Request>
          <Transaction>
              <PaymentAmount>${
                currentSubscription.dataValues.price
              }</PaymentAmount>
              <PaymentCurrency>USD</PaymentCurrency>
              <CompanyRef>49FKEOA</CompanyRef>
              <RedirectURL>https://www.cinetie.com/h/home</RedirectURL>
              <BackURL>https://www.cinetie.com</BackURL>
              <CompanyRefUnique>0</CompanyRefUnique>
              <PTL>15</PTL>
              <PTLtype>hours</PTLtype>
              <customerEmail>${user.dataValues.email}</customerEmail>
              <AllowRecurrent>1</AllowRecurrent>
          </Transaction>
          <Services>
              <Service>
                  <ServiceType>${currentSubscription.serviceCode}</ServiceType>
                  <ServiceDescription>${
                    currentSubscription.dataValues.plan
                  }</ServiceDescription>
                  <ServiceDate>${`${currentDate.getFullYear()}/${
                    currentDate.getMonth() + 1
                  }/${currentDate.getDate()} ${currentDate.getHours()}:${moment(
                    currentDate
                  ).format("mm")}`}</ServiceDate>
              </Service>
          </Services>
        </API3G>`;

      var config = {
        headers: {
          "Content-Type": "text/xml",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      };
      const { self, status } = await axios
        .post(process.env.DPO_GET_TOKEN, xmlBodyStr, config)
        .then((response) => {
          let self;
          const status = response.status;
          parseString(response.data, (err, result) => {
            self = result;
          });
          return { self, status };
        });

      if (status === 200) {
        console.log(self, "++++++++++++++++++++++++ SELF");
        await payment.recordTransaction(
          user.email,
          currentSubscription.dataValues.price,
          user.phoneNumber,
          "pending",
          self.API3G.TransToken[0]
        );

        util.setSuccessResponse(res, "Link generated", 201, {
          link: `${process.env.DPO_GENERATED_LINK}?ID=${self.API3G.TransToken[0]}`,
        });
      } else {
        util.setErrorResponse(res, "Something went wrong", 400);
      }
    } catch (error) {
      console.log(error, "+++++++++++++++++++++++ ERROR");
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
