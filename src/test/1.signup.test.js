import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';
import {
  UserUp,
  UserUpNo,
  UserUpNoEmail,
  UserUpNoFirstName,
  UserUpExist,
  UserUpNoLastName,
  UserUpNoPassword,
  UserUpNoNationality,
} from './mock/users.up.mock';

chai.use(chaiHttp);

const prefix = '/auth/signup';

describe('SERVER CONFIG CHECK', () => {
  it('users should provide error signup with no cityOfResidence', (done) => {
    chai
      .request(app)
      .post(`${prefix}`)
      .send(UserUpNo)
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body).to.have.property(
          'message',
          'You have to provide a valid city like Ex:kigali'
        );
        done();
      });
  });
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

  it('users should provide error signup with no firstName', (done) => {
    chai
      .request(app)
      .post(`${prefix}`)
      .send(UserUpNoFirstName)
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body).to.have.property(
          'message',
          'You have to enter a valid first name. Example: Jane'
        );
        done();
      });
  });

  it('users should provide error signup with no lastName', (done) => {
    chai
      .request(app)
      .post(`${prefix}`)
      .send(UserUpNoLastName)
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body).to.have.property(
          'message',
          'You have to enter a valid last name. Example: Doe'
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

  it('users should provide error signup with no nationality', (done) => {
    chai
      .request(app)
      .post(`${prefix}`)
      .send(UserUpNoNationality)
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body).to.have.property(
          'message',
          'You have to provide a valid Country. Ex: Rwanda'
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
      .send(UserUp)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message', 'Signed up successfully');
        done();
      });
  });
});
