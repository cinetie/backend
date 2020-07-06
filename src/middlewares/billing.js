/* eslint-disable consistent-return */
import path from 'path';
import billingService from '../services/billingServices';
import Util from '../helpers/utilities';
import mailer from '../helpers/mailer';
import userService from '../services/userServices';
import date from '../helpers/date';
import jwt from '../helpers/jwt';
import Rave from '../helpers/rave';

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
    if (status.redirect !== null || undefined) {
      // change user state from onhold to active
      let today = '';
      const details = await billing.fetchCurrentSubscription(req, res);
      if (details.isBilledAnnually === true) {
        today = date.addMoreDays(365).toDateString();
      } else {
        today = date.addMoreDays(31).toDateString();
      }
      const updates = await billingService.updateSubscription(req.body.email,
        { dueState: true, endDate: today });
      if (updates[0]) {
        next();
      } else {
        util.setErrorResponse(res, 'can\'t grant access to user', 503);
      }
      next(); // this probably fails somewhere as in headers are already sent
    } else {
      // put user account onhold
      const user = await userService.getUserByMail(req.body.email);
      await userService.updateUser(req.body.email, { permissionLevel: -1 });
      await mailer([{
        body: 'We would like you to know that your account has been put onhold . \n since your  payment didn\'t work out',
        name: `${user.firstName}`
      }, {
        from: 'Cinetie support',
        to: req.body.email,
        subject: 'Update payment details',
      },
      {
        path: `${path.join(__dirname, '../public/templates/notification.ejs')}`
      }
      ]);
    }
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
        if (endDate.getTime() <= today.getTime()) {
          if (Number(details.paymentMethod) === 1) {
            const momoStatus = await Rave.chargeMomo({
              amount: Math.round(details.price),
              email: user.email,
              phone_number: user.phoneNumber,
              isNew: false,
              fullname: `${user.firstName} ${user.lastName}`,

            });
            if (momoStatus.redirect) {
              util.setSuccessResponse(res, 'Please follow this link to renew your subscription with Mobile money', 200, momoStatus);
            } else {
              billing.verifyStatus(req, res, momoStatus, next);
            }
          // service.get
          } else if (Number(details.paymentMethod) === 3) {
            // charge tokenised
            const status = 1;
            billing.verifyStatus(req, res, status, next);
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
      const data = await userService.getUserByMail(email);
      if (data.isOnTrial === false) {
        next();
      } else {
        const today = new Date();
        const subscription = await billingService.getCurrentSubscription(email);
        if (subscription.trialEnds > today.getTime()) {
          next();
        } else {
          const updates = await userService.updateUser(email, { permissionLevel: -1 });
          if (updates[0] > 0) {
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
