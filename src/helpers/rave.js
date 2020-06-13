import MD5 from 'md5';
import Forge from 'node-forge';
import Fetch from './fetch';

export default class Rave {
  static getKey() {
    const secret = process.env.RAVE_SECRET;
    const md5Secret = MD5(secret);
    const md5SecretLast12 = md5Secret.substr(-12);
    const secretAdjusted = secret.replace('FLWSECK-', '');
    const secretAdjustedFirst12 = secretAdjusted.substr(0, 12);
    return secretAdjustedFirst12 + md5SecretLast12;
  }

  static encrypt(card, key) {
    const cardDetails = JSON.stringify(card);

    const cipher = Forge.cipher.createCipher('3DES-ECB', Forge.util.createBuffer(key));
    cipher.start({ iv: '' });
    cipher.update(Forge.util.createBuffer(cardDetails, 'utf-8'));
    cipher.finish();

    const encrypted = cipher.output;
    return (Forge.util.encode64(encrypted.getBytes()));
  }

  static async chargeCard(cardDetails) {
    const hash = Rave.encrypt(cardDetails, Rave.getKey());
    const transaction = await Fetch(
      { client: hash, PBFPubKey: process.env.RAVE_PUBLIC, alg: '3DES-24' },
      { 'Content-Type': 'application/json' },
      process.env.RAVE_CHARGE_URL, 'POST'
    );
    return transaction;
  }

  static async chargeMomo(payload) {
    const hash = Rave.encrypt(payload, Rave.getKey());
    const transaction = await Fetch(
      { client: hash, PBFPubKey: process.env.RAVE_PUBLIC, alg: '3DES-24' },
      { 'Content-Type': 'application/json' },
      process.env.RAVE_CHARGE_URL, 'POST'
    );
    return transaction;
  }
}
