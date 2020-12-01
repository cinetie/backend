import chai, { expect } from 'chai';
import payment from '../helpers/payment';
import { data, data1 } from './mock/resData.mock';
import jwt from '../helpers/jwt';

const details = {
  isBilledAnnually: true,
  plan: 'Promo',
  email: 'blaise1@gmail.com',
  phoneNumber: '+240799887212',
  paymentMethod: 2,
  clientId: '10201',
  price: 3,
};

const details2 = {
  isBilledAnnually: false,
  plan: 'Promo',
  email: 'blaise12@gmail.com',
  phoneNumber: '+240799887212',
  paymentMethod: 2,
};

const user = {
  phoneNumber: '+240799887212',
  email: 'blaise1@gmail.com',
};

const pay = {
  data: {
    RequestId: 'b77c3095-1ff2-441b-a19e-5d6f54cf35b9'
  }
};

const token = jwt.jwtSign(details, process.env.SECRET, '1d');

describe('PAYMENT HELPER', () => {
  it('should return price getPlanPricing()', async () => {
    const results = await payment.getPlanPricing(details);
    expect(parseInt(results)).to.satisfy(Number.isInteger);
  });

  it('should return bill registerNewSubscription()', async () => {
    const results = await payment.registerNewSubscription(details);
    expect(results.email).to.be.equal('blaise1@gmail.com');
    expect(results.price).to.be.equal(12);
  });

  it('should return bill registerNewSubscription() isBilledAnnually false,', async () => {
    const results = await payment.registerNewSubscription(details2);
    expect(results.email).to.be.equal('blaise12@gmail.com');
    expect(results.price).to.be.equal(3);
  });

  it('should return pay chargeSpenn', async () => {
    const results = await payment.chargeSpenn(user, details, token);
    expect(results.status).to.be.equal(403);
  });

  it('should return pay recordTransaction', async () => {
    const results = await payment.recordTransaction(user, details, pay);
    expect(results.email).to.be.equal('blaise1@gmail.com');
    expect(results.statusDesc).to.be.equal('Pending');
  });
});
