/* eslint-disable no-useless-catch */
/* eslint-disable quotes */
import path from 'path';
import billingService from '../services/billingServices';
import Util from '../helpers/utilities';
import paypalHelper from '../helpers/paypal';
import service from '../services/salesService';
import mailer from '../helpers/mailer';
import uuid from '../helpers/uuid';
import userService from '../services/userServices';
import dax from '../helpers/dax-payment-handler';
import date from '../helpers/date';


// opay@123
const util = new Util();
// middlware to perfom actual payment and registering transactions
class billing {
  static async fetchCurrentSubscription(req, res) {
    try {
      const details = await billingService.getCurrentSubscription(req.body.email);
      return details;
    } catch (error) {
      util.setErrorResponse(res, error, 500);
    }
  }

  static async verifyStatus(req, res, status, next) {
    if (status === 1) {
      // change user state from onhold to active
      let today = '';
      const details = billing.fetchCurrentSubscription(req, res);
      if (details.isBilledAnnually === true) {
        today = date.addMoreDays(365).toDateString();
      } else {
        today = date.addMoreDays(31).toDateString();
      }
      const updates = await billingService.updateSubscription(req.body.email,
        { dueState: true, endDate: today });
      // release account to active
      await userService.updateUser(req.body.email, { permissionLevel: 1 });
      if (!updates) {
        util.setErrorResponse(res, 'can\'t grant access to user', 503);
      }
      next();
    } else {
      // put user account onhold
      const updates = await userService.updateUser(req.body.email, { permissionLevel: -1 });
      if (!updates) {
        await mailer([{
          body: `putting onhold an account failed : line 45, /src/middlewares/billing`
        }, {
          from: 'monitor@cinetie.com',
          to: `mugishaalainc@gmail.com`,
          subject: 'Bug',
        },
        {
          path: `${path.join(__dirname, '../public/templates/notification.ejs')}`
        }
        ]);
      } else {
        await mailer([{
          body: `We would like you to know that your account has been put onhold. \n since your  payment didn't work out`
        }, {
          from: 'billing@cinetie.com',
          to: req.body.email,
          subject: 'Update payment details',
        },
        {
          path: `${path.join(__dirname, '../public/templates/notification.ejs')}`
        }
        ]);
      }
    }
  }

  static async registerSales(details) {
    try {
      const dates = new Date();
      const data = {
        method: details.method,
        transactionId: uuid.generator(),
        plan: details.plan,
        user: details.email,
        amount: details.amount,
        creationTime: dates.getTime()
      };
      const status = await service.createNewSales(data);
      if (status) return 1;
      return 0;
    } catch (error) {
      return -1;
    }
  }

  static async renewPayment(req, res, next) {
    // try {
      console.log('Renew payment');
      const user = await userService.getUserByMail(req.body.email);
      if (!user) {
        util.setErrorResponse(res, "user doesn't exist", 400);
      } else if (user.plan === 'Setup') {
        next();
      } else {
        const today = new Date();
        const details = await billing.fetchCurrentSubscription(req, res);
        if (details.endDate === today.toDateString()) {
          const salesStipend = details.price * 0.3;
          const user = await userService.getUserByMail(details.email);
          if (Number(details.paymentMethod) === 1) {
            const salesData = {
              method: 'Mobile Money',
              plan: details.plan,
              amount: salesStipend,
              user: details.email
            };
            console.log(JSON.stringify(salesData));
            const sales = billing.registerSales(salesData);
            if (!sales) util.setErrorResponse(res, 'sales can\'t run ', 500);
            const momoStatus = await dax.momo({
              amount: Math.round(details.price),
              email: user.email,
              phonenumber: details.phoneNumber,
              firstName: user.firstName,
              lastName: user.lastName

            });
            billing.verifyStatus(req, res, momoStatus, next);
            // service.get
          } else if (Number(details.paymentMethod) === 2) {
            const salesData = {
              method: 'Paypal',
              plan: details.plan,
              amount: salesStipend,
              user: details.email
            };
            const sales = billing.registerSales(salesData);
            if (!sales) util.setErrorResponse(res, 'sales can\'t run ', 500);
            const status = await paypalHelper.getSubscriptionDetails(req.body.email);
            billing.verifyStatus(req, res, status, next);
          } else if (Number(details.paymentMethod) === 3) {
            const salesData = {
              method: 'Credit card',
              plan: details.plan,
              amount: salesStipend,
              user: details.email
            };
            const sales = billing.registerSales(salesData);
            if (!sales) util.setErrorResponse(res, 'sales can\'t run ', 500);
            const status = await dax.creditCards({
              card: {
                crNumber: user.crNumber,
                crCVC: user.crCVC,
                expMonth: user.expMonth,
                expYear: user.expYear
              },
              transaction: {
                amount: Math.round(details.price)
              },
              user: {
                email: user.email,
                phoneNumber: details.phoneNumber,
                cardFirstName: user.cardFirstName,
                cardLastName: user.cardLastName
              }
            });
            billing.verifyStatus(req, res, status, next);
          }
        } else {
          next();
        }
      }
    // } catch (error) {
    //   util.setErrorResponse(res, error.message, 500);
    // }
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

export default billing;
