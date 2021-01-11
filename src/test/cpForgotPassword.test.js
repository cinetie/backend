import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { describe, it } from 'mocha';
import jwt from '../helpers/jwt';
import date from '../helpers/date';
import * as mailer from '../helpers/mailer';
import app from '../index';

chai.use(chaiHttp);

describe('CP FORGOT PASSWORD TEST', () => {
    it('should return 404 status code if the cp is not found', async () => {
        const res = await chai
            .request(app)
            .post('/cp/forgot-password/')
            .send({
                email: 'user@example.com'
            })
        expect(res.statusCode).to.equal(404)
        expect(res.body).to.have.property('message', 'can\'t find user');
    });
    it('should return 200 status code if the user is found and reset password email is sent ', async () => {
        const res = await chai
            .request(app)
            .post('/cp/forgot-password/')
            .send({
                email: 'cp0007@example.com'
            })
        expect(res.statusCode).to.equal(200)
        expect(res.body).to.have.property('message', 'Password reset link sent successfully');
    })
    it('should return 500 status code if there is a server error', async () => {
        const stub = sinon.stub(mailer, 'default').throws(new Error('something went wrong'));
        const res = await chai
            .request(app)
            .post('/cp/forgot-password/')
            .send({
                email: 'cp0007@example.com'
            })
            stub.restore()
        expect(res.statusCode).to.equal(500)
        expect(res.body).to.have.property('message', 'Something went wrong');
    })
})