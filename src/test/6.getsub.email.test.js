import chai, { expect } from 'chai';
import billingServices from '../services/billingServices';

describe('getSubscriptionByEmail', () => {
  it('should return null if email matches no sub', async () => {
    const data = await billingServices.getSubscriptionByEmail('null@gmail.com');
    expect(data).to.be.null;
  });
  it('should return data if email matches sub', async () => {
    const data = await billingServices.getSubscriptionByEmail(
      'blaise1@gmail.com'
    );
    expect(data.email).to.be.equal('blaise1@gmail.com');
  });
  it('should return 500 if email param is not provided', async () => {
    const data = await billingServices.getSubscriptionByEmail();
    expect(data.status).to.be.equal(400);
    expect(data.message).to.be.equal('Parameter email is not provided');
  });
});
