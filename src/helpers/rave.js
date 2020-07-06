import Flutterwave from 'flutterwave-node-v3';
import uuid from './uuid';

const rave = new Flutterwave(
  process.env.RAVE_PUBLIC,
  process.env.RAVE_SECRET,
  Boolean(process.env.RAVE_PRODUCTION)
);
export default class Rave {
  static async chargeCard(cardDetails) {
    try {
      const payload = {
        ...cardDetails,
        enckey: process.env.RAVE_ENC_KEY_TEST,
        redirect_url: 'https://cinetie.com/signin'
      };
      const response = await rave.Charge.card(payload);
      const status = (response.status === 'success') ? { redirect: response.meta.authorization.redirect } : 0;
      return status;
    } catch (error) {
      throw error;
    }
  }

  static async chargeMomo(momoDetails) {
    try {
      const payload = {
        ...momoDetails,
        tx_ref: uuid.generator(),
        order_id: `USS-URG-${uuid.generator()}`,
        redirect_url: 'https://cinetie.com/signin'
      };
      const response = await rave.MobileMoney.rwanda(payload);
      const status = (response.status === 'success') ? { redirect: response.meta.authorization.redirect } : 0;
      return status;
    } catch (error) {
      throw error;
    }
  }
}
