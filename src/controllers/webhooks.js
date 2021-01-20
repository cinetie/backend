/* eslint-disable no-unused-vars */
import Flutterwave from 'flutterwave-node-v3';
import path from 'path';
import UserService from '../services/userServices';
import Util from '../helpers/utilities';
import Sales from '../helpers/sales';
import Earnings from '../helpers/earnings';
import mailer from '../helpers/mailer';
import transactions from '../services/transactionService';
import viewingSessions from '../services/viewingSessionsServices';
import billingService from '../services/billingServices';
import date from '../helpers/date';
import Fetch from '../helpers/fetch'

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
      const response = (req.body.data) ? req.body.data : req.body;
      const user = await UserService.getUserByMail(response.customer.email
        || response.data.customer.email);
        // const recentTrans = await transactions.getTransactionsByEmail(user.email, 'pending');
        const test = await transactions.updateTransaction(response.tx_ref, { statusDesc: response.status.toLowerCase() });
      const transVerification = await rave.Transaction.verify({ id: response.id });

      if (transVerification.status === 'success') {
        let updates = {};
        await billingService.updateSubscription(user.email, {
          endDate: !user.isBilledAnnually ? date.addMoreDays(30).toDateString() : date.addMoreDays(365).toDateString(), state: 'current'
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
        // creating sales

        if(response.currency === 'USD') {
          const rates = await Fetch(undefined, { Accept: 'application/json' }, `https://apilayer.net/api/live?access_key=${process.env.ACCESS_KEY_CURRENCY_LAYER}&currencies=RWF&source=USD&format=1`, 'GET');
          const converted = Math.floor(rates.quotes.USDRWF * response.amount);
          response.amount = converted
        }
        const status = await WebHooks.registerSales(response, user, req, res);
        if (status === true) {
          await billingService.updateSubscription(user.email,
            { state: 'current' });
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
      console.log(error)
      return util.setErrorResponse(res, `Server Error ${error || error.message}`, 500);
    }
  }

  static async registerSales(response, user, req, res) {
    const sales = await Sales.addRecord({
      method: response.payment_type,
      plan: user.plan,
      amount: response.amount * 0.3,
      user: user.email
    });
    if(sales) {
      return true
    } else {
      throw new Error('Sales recording error');
    }
  }
}
