import Flutterwave from 'flutterwave-node-v3';
import path from 'path';
import UserService from '../services/userServices';
import Util from '../helpers/utilities';
import Sales from '../helpers/sales';
import Earnings from '../helpers/earnings';
import mailer from '../helpers/mailer';
import date from '../helpers/date';

const util = new Util();
const rave = new Flutterwave(
  process.env.RAVE_PUBLIC,
  process.env.RAVE_SECRET,
  Boolean(process.env.RAVE_PRODUCTION)
);
export default class WebHooks {
  static async flutterWave(req, res) {
    try {
      console.log(req.body);
      const response = (req.body.data) ? req.body.data : req.body;
      const user = await UserService.getUserByMail(response.customer.email);
      const transVerification = await rave.Transaction.verify({ id: response.id });
      if (transVerification.status === 'success') {
        const updates = await UserService.updateUser(
          user.email, { permissionLevel: 1, card_nonce: transVerification.data.card.token }
        );
        // eslint-disable-next-line no-console
        console.log(updates);
        // creating sales
        const sales = await Sales.addRecord({
          method: response.payment_type,
          plan: user.plan,
          amount: response.amount * 0.3,
          user: user.email
        });
        if (sales) {
          const sysDate = new Date();
          const thisDate = new Date(response.customer.createdAt.replace(/\s/g, ''));
          const status = date.compareDates(sysDate, thisDate);
          if (status === false) {
            // We are renewing subscription as this createdAt
            // is different from today meaning this is not first time we bill them
            const earnings = await Earnings(req.body.email);
            if (!earnings) {
              // check earnings for failure
              throw new Error('Earnings recording error');
            } else {
              // earnings and sales are both created successfully
              util.setSuccessResponse(res, 'Webhook processed', 200, { state: 'success' });
            }
          } else {
            // we are not renewing the subscription as isNew is true i.e first time payment
            util.setSuccessResponse(res, 'Webhook processed', 200, { state: 'success' });
          }
        } else {
          // something went wrong registering the sale
          throw new Error('Sales recording error');
        }
      } else {
        const updates = await UserService.updateUser(
          response.customer.email,
          { permissionLevel: -1 }
        );
        if (updates) {
          await mailer([{
            body: 'We would like you to know that your account has been put onhold. \n since your  payment didn\'t work out',
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
          util.setSuccessResponse(res, 'Payment failed', 200, updates);
        }
        util.setErrorResponse(res, 'Server Error: can\'t update subscription', 400);
      }
    } catch (error) {
      util.setErrorResponse(res, `Server Error ${error || error.message}`, 500);
    }
  }
}
