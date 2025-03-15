/* eslint-disable no-unused-vars */

import path from "path";
import axios from "axios";
import UserService from "../services/userServices";
import Util from "../helpers/utilities";
import Sales from "../helpers/sales";
import Earnings from "../helpers/earnings";
import mailer from "../helpers/mailer";
import transactions from "../services/transactionService";
import viewingSessions from "../services/viewingSessionsServices";
import billingService from "../services/billingServices";
import date from "../helpers/date";
import Fetch from "../helpers/fetch";
import xml from "xml";
import InvestmentServices from "../services/investmentServices";
import WithdrawalsServices from "../services/withdrawalsServices";

const util = new Util();

export default class WebHooks {

  static async flutterWave(req, res) {
    try {
      const response = req.body.data ? req.body.data : req.body;
      const user = await UserService.getUserByMail(
        response.customer.email || response.data.customer.email
      );
      // const recentTrans = await transactions.getTransactionsByEmail(user.email, 'pending');
      const test = await transactions.updateTransaction(response.tx_ref, {
        statusDesc: response.status.toLowerCase(),
      });

      const transVerification = await WebHooks.transVerification(response.id);

      if (transVerification.status === "success") {
        let updates = {};
        await billingService.updateSubscription(user.email, {
          endDate: !user.isBilledAnnually
            ? date.addMoreDays(30).toDateString()
            : date.addMoreDays(365).toDateString(),
          state: "current",
        });
        const userUpdates =
          response["event.type"] === "CARD_TRANSACTION"
            ? {
              permissionLevel: 1,
              card_nonce: transVerification.data.card.token,
            }
            : { permissionLevel: 1 };
        updates = await UserService.updateUser(user.email, userUpdates);
        // creating sales

        if (response.currency === "USD") {
          const rates = await Fetch(
            undefined,
            { Accept: "application/json" },
            `https://apilayer.net/api/live?access_key=${process.env.ACCESS_KEY_CURRENCY_LAYER}&currencies=RWF&source=USD&format=1`,
            "GET"
          );
          const converted = Math.floor(rates.quotes.USDRWF * response.amount);
          response.amount = converted;
        }
        const status = await WebHooks.registerSales(response, user, req, res);
        if (status === true) {
          await billingService.updateSubscription(user.email, {
            state: "current",
          });
          return util.setSuccessResponse(res, "Success", 200, {
            status: "sucesss",
          });
        }
      } else {
        const updates = await UserService.updateUser(user.email, {
          permissionLevel: -1,
        });
        if (updates) {
          // await mailer([
          //   {
          //     body: "We would like you to know that your account has been put onhold. \n since your  payment didn't work out",
          //     name: `${user.firstName}`,
          //   },
          //   {
          //     from: "Cinetie support",
          //     to: user.email,
          //     subject: "Update payment details",
          //   },
          //   {
          //     path: `${path.join(
          //       __dirname,
          //       "../public/templates/notification.ejs"
          //     )}`,
          //   },
          // ]);
          return util.setSuccessResponse(res, "Payment failed", 400, updates);
        }
        return util.setErrorResponse(
          res,
          "Server Error: can't update subscription",
          400
        );
      }
    } catch (error) {
      console.log(error);
      if (req) {
        const response = req.body.data ? req.body.data : req.body;
        const user = await UserService.getUserByMail(
          response.customer.email || response.data.customer.email
        );
        const updates = await UserService.updateUser(user.email, {
          permissionLevel: -1,
        });

        await billingService.updateSubscription(user.email, { state: "ended" });
      }
      return util.setErrorResponse(
        res,
        `Server Error ${error || error.message}`,
        500
      );
    }
  }

  static async transVerification(id) {
    const transVerification = await axios.get(
      `https://api.flutterwave.com/v3/transactions/${id}/verify`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RAVE_SECRET}`,
        },
      }
    );

    return transVerification.data;
  }

  static async registerSales(response, user, req, res) {
    const sales = await Sales.addRecord({
      method: response.payment_type,
      plan: user.plan,
      amount: response.amount * 0.3,
      user: user.email,
    });
    if (sales) {
      return true;
    }
    throw new Error("Sales recording error");
  }

  static async registerDPOSales(transaction, user, req, res) {
    const sales = await Sales.addRecord({
      plan: user.plan,
      amount: transaction.paidAmount * 0.3,
      user: user.email,
    });
    if (sales) {
      return true;
    }
  }

  static async DPOwebhook(req, res) {
    console.log("================ body start ===============");
    console.log(req.body)
    console.log("================ body end =================");
    try {
      const findTransaction = await transactions.getByNumberId(
        req.body.api3g.customerphone[0]
      );
      if (!findTransaction) {
        return res
          .set("Content-Type", "text/xml")
          .send(xml({ API3G: [{ Response: "OK" }] }));
      }

      await findTransaction.update({
        statusDesc: "approved",
      });

      const user = await UserService.getUserByMail(findTransaction.email);

      let updates = {};

      await billingService.updateSubscription(user.email, {
        endDate: !user.isBilledAnnually
          ? date.addMoreDays(30).toDateString()
          : date.addMoreDays(365).toDateString(),
        state: "current",
      });

      updates = await UserService.updateUser(user.email, {
        permissionLevel: 1,
      });

      const rates = await Fetch(
        undefined,
        { Accept: "application/json" },
        `https://apilayer.net/api/live?access_key=${process.env.ACCESS_KEY_CURRENCY_LAYER}&currencies=RWF&source=USD&format=1`,
        "GET"
      );

      const converted = Math.floor(
        rates.quotes.USDRWF * findTransaction.paidAmount
      );
      const afterRatesAmount = converted;

      const status = await WebHooks.registerDPOSales(
        findTransaction,
        user,
        req,
        res
      );

      if (status === true) {
        await billingService.updateSubscription(user.email, {
          state: "current",
        });
        return res
          .set("Content-Type", "text/xml")
          .send(xml({ API3G: [{ Response: "OK" }] }));
      }
    } catch (error) {
      return util.setErrorResponse(
        res,
        `Server Error ${error || error.message}`,
        500
      );
    }
  }


  static async investmentFlutterwave(req, res) {
    const { status, tx_ref } = req.body.data ?? req.body;
    if (req.body["event.type"] === "Transfer") {
      await WithdrawalsServices.verifyWithdrawal(req.body?.transfer);
      return res.status(200).json({
        message: "withdrawal verified successfully"
      })
    }
    if (status !== 'successful') {
      return res.status(400).json({
        message: "Payment not successful"
      })
    }

    await InvestmentServices.verifyInvestment(tx_ref);
    return res.status(200).json({
      message: "Payment verified successfully"
    })
  }
}
