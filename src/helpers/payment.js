/* eslint-disable no-unused-expressions */
import billingService from '../services/billingServices';
import userService from '../services/userServices';
import planService from '../services/planServices';
import transactions from '../services/transactionService';
import Fetch from './fetch';
import date from './date';

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

  static async updatePendingSubscription(details) {
    try {
      const data = {};
      const plan = await planService.getParticalPlan(details.plan);
      (details.isBilledAnnually) ? data.price = plan.yearlyPrice : data.price = plan.monthlyPrice;
      data.email = details.email;
      data.plan = details.plan;
      data.state = 'pending';
      data.phoneNumber = details.phoneNumber;
      if (details.isBilledAnnually === true) {
        data.endDate = date.addMoreDays(365).toDateString();
      } else {
        data.endDate = date.addMoreDays(30).toDateString();
      }
      data.paymentMethod = details.paymentMethod;
      const user = await userService.getUserByMail(details.email);
      if (user.isOnTrial === true) {
        data.trialEnds = date.addMoreDays(5).getTime();
      }
      const bill = await billingService.updateSubscription(data.email, data);
      if (bill) {
        return bill;
      }
      return null;
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
      data.state = 'pending';
      data.phoneNumber = details.phoneNumber;
      if (details.isBilledAnnually === true) {
        data.endDate = date.addMoreDays(365).toDateString();
      } else {
        data.endDate = date.addMoreDays(30).toDateString();
      }
      data.paymentMethod = details.paymentMethod;
      const user = await userService.getUserByMail(details.email);
      // if (user.isOnTrial === true) {
      //   data.trialEnds = date.addMoreDays(5).getTime();
      // }
      const bill = await billingService.registerSubscription(data);
      if (bill) {
        return bill;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async chargeSpenn(user, details, token) {
    try {
      const pay = await Fetch({
        phone: user.phoneNumber,
        amount: details.price,
      }, {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }, `${process.env.PAY_HOST}/charge/spenn`, 'POST');
      return pay;
    } catch (error) {
      throw error;
    }
  }

static async recordTransaction(user, details, requestId, status) {
  const result = await transactions.createTransaction(
    {
      email: user.email,
      statusDesc: status,
      paidAmount: details.price,
      transactionId: requestId,
      currency: 'USD',
    }
  );
  return result;
}
}
export default payment;
