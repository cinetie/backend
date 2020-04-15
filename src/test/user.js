/* eslint-disable no-shadow */
import chai, { expect } from 'chai';

import chaiHttp from 'chai-http';
import app from '../index';

const signupUrl = `${process.env.HOST}/auth/signup`;
const signinUrl = `${process.env.HOST}/auth/login`;

chai.use(chaiHttp);
const normalRegData = {
  firstName: 'Mugisha',
  lastName: 'Alain',
  email: 'mugishaalainc@gmail.com',
  password: 'nAdia123'
};
const missingEmailRegData = {
  firstName: 'Mugisha',
  lastName: 'Alain',
  password: 'nAdia123'
};
const wrongPasswordRegData = {
  firstName: 'Mugisha',
  lastName: 'Alain',
  email: 'mugishaalainc@gmail.com',
  password: 'nAd'
};
const normalSignin = {
  email: 'mugishaalainc@gmail.com',
  password: 'nAdia123'
};
const noEmail = {
  password: 'nAdia123'
};
const WrongEmail = {
  password: 'nAdia123'
};
const noPassword = {
  email: 'mugishaalainc@gmail.com',

};
const wrongPassword = {
  email: 'mugishaalainc3@gmail.com',
  password: 'nAdia123'
};

describe('User', () => {
  describe('Signup', (done) => {
    it('With great credentials', (done) => {
      chai.request(app).post(signupUrl).send(normalRegData).end((__err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
    });
    it('with missing email', (done) => {
      chai.request(app).post(signupUrl).send(missingEmailRegData).end((__err, res) => {
        expect(res.status).to.eq(400);
        done();
      });
    });
    it('With wrong password', (done) => {
      chai.request(app).post(signupUrl).send(wrongPasswordRegData).end((__err, res) => {
        expect(res.status).to.eq(400);
      });
    });
  });
  describe('Login', (done) => {
    it('With accurate data', (done) => {
      chai.request(app).post(signinUrl).send(normalSignin).end((__err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
    });
    it('With no Email', (done) => {
      chai.request(app).post(signinUrl).send(noEmail).end((__err, res) => {
        expect(res.status).to.eq(400);
        done();
      });
    });
    it('With Wrong email', (done) => {
      chai.request(app).post(signinUrl).send(WrongEmail).end((__err, res) => {
        expect(res.status).to.eq(400);
        done();
      });
    });
    it('With Wrong password', (done) => {
      chai.request(app).post(signinUrl).send(wrongPassword).end((__err, res) => {
        expect(res.status).to.eq(400);
        done();
      });
    });
    it('With no Password', (done) => {
      chai.request(app).post(signinUrl).send(noPassword).end((__err, res) => {
        expect(res.status).to.eq(400);
        done();
      });
    });
  });
});
