import Flutterwave from 'flutterwave-node-v3';
import path from 'path';
import UserService from '../services/userServices';
import Util from '../helpers/utilities';
import Sales from '../helpers/sales';
import Earnings from '../helpers/earnings';
import mailer from '../helpers/mailer';


const util = new Util();
const rave = new Flutterwave(
  process.env.RAVE_PUBLIC,
  process.env.RAVE_SECRET,
  process.env.RAVE_PRODUCTION
);
export default class WebHooks {
  static async flutterWave(req, res) {
    try {
      const response = req.body;
      const hash = req.headers['verify-hash'];
      if (!hash || hash !== process.env.RAVE_SECRET) {
        util.setErrorResponse(res, 'Access denied', 403);
      }
      const user = await UserService.getUserByMail(response.data.customer.email);
      const transVerification = await rave.Transaction.verify({ id: response.data.id });
      if (
        response.event === 'charge.completed'
        && response.processor_response === 'Approved. Successful'
        && response.status === 'successful'
        && transVerification.status === 'success'
        && transVerification.processor_response === 'Approved') {
        const updates = await UserService.updateUser(user.email, { permissionLevel: 1 });
        // eslint-disable-next-line no-console
        console.log(updates);
        // creating sales
        const sales = await Sales.addRecord({
          method: response.data.payment_type,
          plan: user.plan,
          amount: response.data.amount * 0.3,
          user: user.email
        });
        if (sales) {
          if (response.data.customer.isNew === false) {
            // We are renewing subscription
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
          response.data.customer.email,
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
        }
      }
    } catch (error) {
      util.setErrorResponse(res, `Server Error ${error || error.message}`, 500);
    }
  }
}
