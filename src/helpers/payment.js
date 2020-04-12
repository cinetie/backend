/* eslint-disable no-unused-expressions */
import billingService from '../services/billingServices';
import planService from '../services/planServices';
import date from './date';
import Util from './utilities';
import paypalHelper from './paypal';
import daxPay from './dax-payment-handler';

const util = new Util();
class payment {
  static async getPlanPricing(details) {
    try {
      let price = 0;
      const plan = await planService.getParticalPlan(details.plan);
      (details.isBilledAnnually)
        ? price = plan.yearlyPrice
        : price = plan.monthlyPrice;
      return price;
    } catch (error) {
      throw error;
    }
  }

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
      data.trialEnds = date.addMoreDays(5).getTime();
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
        case 1: {
          const status = await daxPay.momo(details.momo)(status === 1) ? 1 : 0;
          break;
        }
        case 2: {
          await paypalHelper.subscription(req, res, details.paypal);
          break;
        }
        case 3: {
          const statusCard = await daxPay.creditCards(details.creditCard);
          return statusCard;
        }

        default: {
          util.setErrorResponse(res, 'Please select a method of payment', '400');
        }
      }
    } catch (error) {
      util.setErrorResponse(res, error.message, 500);
    }
  }
}
export default payment;
