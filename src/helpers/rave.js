import Flutterwave from 'flutterwave-node-v3';
import uuid from './uuid';

const rave = new Flutterwave(
  process.env.RAVE_PUBLIC,
  process.env.RAVE_SECRET,
  process.env.RAVE_PRODUCTION
);
export default class Rave {
  static async chargeCard(cardDetails) {
    try {
      const payload = { ...cardDetails, enckey: process.env.RAVE_ENC_KEY_TEST };
      const initCharge = await rave.Charge.card(payload);
      return initCharge;
    } catch (error) {
      throw error;
    }
  }

  static async chargeMomo(momoDetails) {
    try {
      const payload = {
        ...momoDetails,
        tx_ref: uuid.generator(),
        order_id: `USS-URG-${uuid.generator()}`
      };
      const response = await rave.MobileMoney.rwanda(payload);
      // eslint-disable-next-line no-console
      console.log(response);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
