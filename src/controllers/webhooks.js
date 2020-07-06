import Flutterwave from 'flutterwave-node-v3';
import UserService from '../services/userServices';
import Util from '../helpers/utilities';

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
      const transVerification = await rave.Transaction.verify({ id: response.data.id });
      if (
        response.event === 'charge.completed'
        && response.processor_response === 'Approved. Successful'
        && response.status === 'successful'
        && transVerification.status === 'success'
        && transVerification.processor_response === 'Approved') {
        const user = await UserService.getUserByMail(response.data.customer.email);
        const updates = await UserService.updateUser(user.email, { permissionLevel: 1 });
        // eslint-disable-next-line no-console
        console.log(updates);
        // creating sales
      }
    } catch (error) {
      util.setErrorResponse(res, `Server Error ${error || error.message}`, 500);
    }
  }
}
