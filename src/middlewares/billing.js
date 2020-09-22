/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import path from 'path';
import billingService from '../services/billingServices';
import Util from '../helpers/utilities';
import mailer from '../helpers/mailer';
import userService from '../services/userServices';
import date from '../helpers/date';
import jwt from '../helpers/jwt';
import Fetch from '../helpers/fetch';
import ViewingSessions from '../services/viewingSessionsServices';

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

  static async handleFailPaymentStatus(req, next) {
    const user = await userService.getUserByMail(req.body.email);
    if (user.isOnExtension === true) {
      await userService.updateUser(req.body.email, { permissionLevel: -1 });
      await billing.sendBillingNotification(user, req, 'We would like you to know that your account has been put onhold . \n since your  payment didn\'t work out');
      next();
    } else {
      const viewingSessions = await ViewingSessions.getActiveSessionsPerUser(req.body.email);
      viewingSessions.forEach(async (data) => {
        const updates = {
          sessionState: 'suspended'
        };
        await ViewingSessions.updateViewingSessions(data.id, updates);
      });
      await billingService.updateSubscription(req.body.email, {
        endDate: date.addMoreDays(5).toDateString(),
      });
      await userService.updateUser(req.body.email, { isOnExtension: true });
      await billing.sendBillingNotification(user, req, 'Hello, Your cinetie subscription has ended and automatic billing has failed, we extended your subscription for five days ');
      next();
    }
  }

  static async sendBillingNotification(user, req, body) {
    await mailer([{
      body,
      name: `${user.firstName}`
    }, {
      from: 'Cinetie support',
      to: req.body.email,
      subject: 'Cinetie subscription',
    },
    {
      path: `${path.join(__dirname, '../public/templates/notification.ejs')}`
    }
    ]);
  }

  static async updateSubscription(req, res, today) {
    const details = await billing.fetchCurrentSubscription(req, res);
    if (details.isBilledAnnually === true) {
      today = date.addMoreDays(365).toDateString();
    } else {
      today = date.addMoreDays(31).toDateString();
    }
    const updates = await billingService.updateSubscription(req.body.email,
      { dueState: true, endDate: today });
    return { updates, today };
  }

  static async renewPayment(req, res, next) {
    try {
      const user = await userService.getUserByMail(req.body.email);
      if (!user) {
        util.setErrorResponse(res, "user doesn't exist", 400);
      } else if (user.plan === 'Setup') {
        next();
      } else {
        const today = new Date();
        const details = await billing.fetchCurrentSubscription(req, res);
        const endDate = new Date(details.endDate);
        const token = jwt.jwtSign({ role: 'main-api', user: user.email }, process.env.SECRET, 1000);
        if (endDate.getTime() <= today.getTime()) { // remember to change >= to <=
          // if(earningsStatus)
          // await earnings(req.body.email);
          if (Number(details.paymentMethod) === 1) {
            const momoStatus = await Fetch({
              currency: 'RWF',
              amount: details.price,
              email: user.email,
              phone_number: user.phoneNumber,
              fullname: `${user.firstName} ${user.lastName}`,

            }, { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            `${process.env.PAY_HOST}/charge/momo`, 'POST');
            if (momoStatus.status === 200) {
              util.setSuccessResponse(res,
                'Please follow this link to renew your subscription with Mobile money',
                200,
                momoStatus);
            } else {
              billing.handleFailPaymentStatus(req, next);
            }
          // service.get
          } else if (Number(details.paymentMethod) === 2) {
            // charge tokenised
            const status = await Fetch({ email: user.email }, {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }, `${process.env.PAY_HOST}/charge/card-token`, 'POST');
            billing.handleFailPaymentStatus(req, next);
          }
        } else {
          next();
        }
      }
    } catch (error) {
      util.setErrorResponse(res, error.message, 500);
    }
  }

  static async verifyPermissionLevel(req, res, next) {
    try {
      const { email } = jwt.jwtVerify(req.headers.authorization.slice(7), process.env.SECRET);
      const data = await userService.getUserByMail(email);
      if (data.permissionLevel !== 1) {
        util.setErrorResponse(res, 'Please sent up your billing', 402);
      } else {
        next();
      }
    } catch (error) {
      util.setErrorResponse(res, `an error occured  ${error}`, 500);
    }
  }

  static async trial(req, res, next) {
    try {
      const { email } = jwt.jwtVerify(
        req.headers.authorization.slice(7), process.env.SECRET
      );
      console.log('checking trial status');
      const data = await userService.getUserByMail(email);
      if (data.isOnTrial === false && data.isOnExtension === false) {
        next();
      } else {
        console.log('check failed');
        const today = new Date();
        const subscription = await billingService.getCurrentSubscription(email);
        const viewingSessions = await ViewingSessions.getActiveSessionsPerUser(email);
        if ((subscription.trialEnds > today.getTime()) && viewingSessions.length < 3) {
          next();
        } else {
          const updates = await userService.updateUser(email, { permissionLevel: -1 });
          console.log(updates);
          if (updates[1] > 0) {
            await mailer([{
              body: 'We would like you to know that your account has been put onhold. \n since your  trial just ended'
            }, {
              from: 'Cinetie support',
              to: email,
              subject: 'Update payment details',
            },
            {
              path: `${path.join(__dirname, '../public/templates/notification.ejs')}`
            }
            ]);
            util.setErrorResponse(res, 'Please activate your account as your trial just ended', 402);
          } else {
            util.setErrorResponse(res, 'Something went wrong ', 402);
          }
        }
      }
    } catch (error) {
      util.setErrorResponse(res, `Something went wrong${error.message}`, 500);
    }
  }
}

export default billing;
