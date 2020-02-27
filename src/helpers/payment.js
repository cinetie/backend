/* eslint-disable no-case-declarations */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
/* eslint-disable quotes */
/* eslint-disable no-useless-catch */
import billingService from '../services/billingServices';
import planService from '../services/planServices';
import date from "./date";
import Util from "./utilities";
import paypalHelper from "./paypal";
import opay from "./opay";
import daxPay from "./dax-payment-handler";

const util = new Util();
class payment {
  static async registerNewSubscription(details) {
    try {
      const data = {};
      const plan = await planService.getParticalPlan(details.plan);
      (details.isBilledAnnually) ? data.price = plan.yearlyPrice : data.price = plan.monthlyPrice;
      data.email = details.email;
      data.plan = details.plan;
      data.state = 'current';
      data.phoneNumber = details.phoneNumber;
      if (details.isBilledAnnually === true) {
        data.endDate = date.addMoreDays(365).toDateString();
      } else {
        data.endDate = date.addMoreDays(31).toDateString();
      }
      data.paymentMethod = details.paymentMethod;
      const bill = await billingService.registerSubscription(data);
      if (bill) {
        return bill;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async commitPayment(req, res, details) {
    // check for what happens when payment fails to continue
    try {
      switch (Number(details.user.paymentMethod)) {
        case 1:
          console.log('momo called ----');
          const status = await daxPay.momo(details.momo)(status === 1) ? 1 : 0;
          break;
        case 2:
          console.log('----------hanging-------- payment');
          const statusPayPal = await paypalHelper.subscription(req, res, details.paypal);
          console.log(statusPayPal);
          break;
        case 3:
          console.log('credit cards called ----');
          const statusCard = await daxPay.creditCards(details.creditCard);
          return statusCard;
        default:
          util.setErrorResponse(res, 'Please select a method of payment', '400');
      }
    } catch (error) {
      util.setErrorResponse(res, error.message, 500);
    }
  }
}
export default payment;
