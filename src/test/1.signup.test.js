import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';
import {
  UserUpFine,
  UserUpNoEmail,
  UserUpNoFirstName,
  UserUpExist,
  UserUpNoLastName,
  UserUpNoPassword,
} from './mock/users.up.mock';

chai.use(chaiHttp);

const prefix = '/auth/signup';

describe('SIGNUP', () => {
  it('users should provide error signup with no email', (done) => {
    chai
      .request(app)
      .post(`${prefix}`)
      .send(UserUpNoEmail)
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body).to.have.property(
          'message',
          'You have to enter a valid email. Example: yourname@domain.com'
        );
        done();
      });
  });
  it('users should provide error signup with no password', (done) => {
    chai
      .request(app)
      .post(`${prefix}`)
      .send(UserUpNoPassword)
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body).to.have.property(
          'message',
          'You have to enter a valid password with more than 6 characters. Example: qqw12@#!23#frf_e3_@'
        );
        done();
      });
  });

  it('users should not be able to create a user with the same email', (done) => {
    chai
      .request(app)
      .post(`${prefix}`)
      .send(UserUpExist)
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('message', 'user already exists');
        done();
      });
  });

  it('users should be able to create account', (done) => {
    chai
      .request(app)
      .post(`${prefix}`)
      .send(UserUpFine)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message', 'Signed up successfully');
        done();
      });
  });
});
