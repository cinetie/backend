import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

describe('SERVER CONFIG CHECK', () => {
  it('Should be ok', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.be.equal('Welcome to Cinetie');
        done();
      });
  });
});
