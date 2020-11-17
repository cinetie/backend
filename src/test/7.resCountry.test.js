import resCountry from '../helpers/resCountry';
import chai, { expect } from 'chai';
import { data1 } from './mock/resData.mock';

describe('RESTRICTED COUNTRIES', () => {
  it('should return null array', async () => {
      const results = await resCountry(data1, 'Uganda');
      expect(results).to.be.empty;
  });
  it('should return Data', async () => {
    const results = await resCountry(data1, 'Rwanda');
  expect(results[0].id).to.be.equal(13);
  });
  it('should return Data even when no res country is provided', async () => {
    const results = await resCountry(data1);
  expect(results[0].id).to.be.equal(13);
});
});
