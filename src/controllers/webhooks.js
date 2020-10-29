import Flutterwave from 'flutterwave-node-v3';
import path from 'path';
import UserService from '../services/userServices';
import Util from '../helpers/utilities';
import Sales from '../helpers/sales';
import Earnings from '../helpers/earnings';
import mailer from '../helpers/mailer';
import viewingSessions from '../services/viewingSessionsServices';
import billingService from '../services/billingServices';
import date from '../helpers/date';

const util = new Util();
const rave = new Flutterwave(
  process.env.RAVE_PUBLIC,
  process.env.RAVE_SECRET,
  Boolean(process.env.RAVE_PRODUCTION)
);
export default class WebHooks {
  // eslint-disable-next-line consistent-return
  static async flutterWave(req, res) {
    try {
      // console.log(req.body);
      const response = (req.body.data) ? req.body.data : req.body;
      // console.log(response.customer.email);
      const user = await UserService.getUserByMail(response.customer.email
        || response.data.customer.email);
      console.log(user)
      const transVerification = await rave.Transaction.verify({ id: response.id });
      // console.log(transVerification, '------------------', req.body);
      if (transVerification.status === 'success') {
        let updates = {};
        await billingService.updateSubscription(user.email, {
          endDate: date.addMoreDays(30).toDateString(),
        });
        if (response['event.type'] === 'CARD_TRANSACTION') {
          updates = await UserService.updateUser(
            user.email, { permissionLevel: 1, card_nonce: transVerification.data.card.token }
          );
        } else {
          updates = await UserService.updateUser(
            user.email, { permissionLevel: 1 }
          );
        }
        // eslint-disable-next-line no-console
        // console.log(updates);
        // creating sales
        const status = await WebHooks.registerSalesAndEarnings(response, user, req, res);
        if (status === true) {
          util.setSuccessResponse(res, 'Success', 200, { status: 'sucesss' });
        }
      } else {
        const updates = await UserService.updateUser(
          user.email,
          { permissionLevel: -1 }
        );
        if (updates) {
          await mailer([{
            body: 'We would like you to know that your account has been put onhold. \n since your  payment didn\'t work out',
            name: `${user.firstName}`
          }, {
            from: 'Cinetie support',
            to: user.email,
            subject: 'Update payment details',
          },
          {
            path: `${path.join(__dirname, '../public/templates/notification.ejs')}`
          }
          ]);
          return util.setSuccessResponse(res, 'Payment failed', 200, updates);
        }
        return util.setErrorResponse(res, 'Server Error: can\'t update subscription', 400);
      }
    } catch (error) {
      console.log(error);
      return util.setErrorResponse(res, `Server Error ${error || error.message}`, 500);
    }
  }

  static async registerSalesAndEarnings(response, user, req, res) {
    const sales = await Sales.addRecord({
      method: response.payment_type,
      plan: user.plan,
      amount: response.amount * 0.3,
      user: user.email
    });
    if (sales) {
      const sessions = await viewingSessions.getActiveAndSuspendedSessionsPerUser(user.email);
      // console.log(sessions);
      if (sessions.length > 0) {
        // we are recording earnings since they exist meaning they watched some movies
        // this month or year
        const earnings = await Earnings(user.email);
        if (earnings === 0) {
          // check earnings for failure
          // console.log(earnings);
          throw new Error('Earnings recording error');
        } else {
          // earnings and sales are both created successfully
          // console.log(earnings);
          return true;
        }
      } else {
        // we are not renewing the subscription as isNew is true i.e first time payment
        // console.log("new user");
        return true;
      }
    } else {
      // something went wrong registering the sale
      throw new Error('Sales recording error');
    }
  }
}
