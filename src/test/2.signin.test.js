import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';

import {
  UserIn,
  UserInNo,
} from './mock/users.in.mock';

chai.use(chaiHttp);

const prefix = '/auth/login';

describe('SIGN IN', () => {
  it('should return error if user doesn\'t exists', (done) => {
    chai
      .request(app)
      .post(`${prefix}`)
      .send(UserInNo)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message', 'user doesn\'t exist');
        done();
      });
  });
});
