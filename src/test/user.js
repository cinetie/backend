/* eslint-disable no-shadow */
import chai, { expect } from 'chai';

import chaiHttp from 'chai-http';
import app from '../index';

const signup = '/auth/signup';
const signin = '/auth/login';
const update = '/auth/update';
const createPlan = '/plan/new';
const userToken = process.env.USER_TEST_TOKEN;
const adminToken = process.env.ADMIN_TEST_TOKEN;
chai.use(chaiHttp);
const normalRegData = {
  firstName: 'Mugisha',
  lastName: 'Alain',
  email: 'mugishaalainc@gmail.com',
  password: 'nAdia123',
  nationality: 'Rwandan',
  cityOfResidence: 'Muhima'
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

const updateWithToken = {
  isVerified: true
};
const plan = {
  numberOfScreens: 1,
  monthlyPrice: 0,
  yearlyPrice: 0,
  type: 'Setup'
};

describe('Hooks', () => {
  it('It should create a new plan', (done) => {
    chai
      .request(app)
      .post(createPlan)
      .set('Authorization', `Bearer ${adminToken}`)
      .send(plan)
      .end((_err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });
});

describe('User', () => {
  describe('Signup', () => {
    it('With great credentials', (done) => {
      chai
        .request(app)
        .post(signup)
        .send(normalRegData)
        .end((__err, res) => {
          expect(res.status).to.eq(201);
          done();
        });
    });
    it('With missing fields', (done) => {
      chai
        .request(app)
        .post(signup)
        .send(missingEmailRegData)
        .end((__err, res) => {
          expect(res.status).to.eq(422);
          done();
        });
    });
    it('With wrong password', (done) => {
      chai
        .request(app)
        .post(signup)
        .send(wrongPasswordRegData)
        .end((__err, res) => {
          expect(res.status).to.eq(422);
          done();
        });
    });
  });
  describe('Update user details', () => {
    it('With valid token', (done) => {
      chai
        .request(app)
        .put(update).send(updateWithToken)
        .set('Authorization', `Bearer ${userToken}`)
        .end((__err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('With invalid token', (done) => {
      chai
        .request(app)
        .put(update)
        .send(updateWithToken)
        .end((__err, res) => {
          expect(res.status).to.equal(500);
          done();
        });
    });
  });
  describe('Login', () => {
    it('With accurate data', (done) => {
      chai
        .request(app)
        .post(signin)
        .send(normalSignin)
        .end((__err, res) => {
          console.log(res.body);
          expect(res.status).to.eq(200);
          done();
        });
    });
    it('With no Email', (done) => {
      chai
        .request(app)
        .post(signin)
        .send(noEmail)
        .end((__err, res) => {
          expect(res.status).to.eq(400);
          done();
        });
    });
    it('With Wrong email', (done) => {
      chai
        .request(app)
        .post(signin)
        .send(WrongEmail)
        .end((__err, res) => {
          expect(res.status).to.eq(400);
          done();
        });
    });
    it('With Wrong password', (done) => {
      chai
        .request(app)
        .post(signin)
        .send(wrongPassword)
        .end((__err, res) => {
          expect(res.status).to.eq(400);
          done();
        });
    });
    it('With no Password', (done) => {
      chai
        .request(app)
        .post(signin)
        .send(noPassword)
        .end((__err, res) => {
          expect(res.status).to.eq(400);
          done();
        });
    });
  });
});
