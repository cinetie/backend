import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { describe, it } from 'mocha';
import jwt from '../helpers/jwt';
import date from '../helpers/date';
import * as mailer from '../helpers/mailer';
import app from '../index';

chai.use(chaiHttp);

describe('RESET CP PASSWORD TEST', () => {
    it('should return an error message if the link has expired', async () => {
        const token = jwt.jwtSign({ exp: new Date().getTime(), }, process.env.SECRET, '1d');
        const res = await chai
            .request(app)
            .post('/cp/reset-password/')
            .query({ id: 1005334, token })
            .send({
                password: 'newpassword'
            })
        expect(res.statusCode).to.equal(400)
        expect(res.body).to.have.property('message', 'Link has expired');
    })
    it('should return an error message if the link has expired or the user doesn\'t exist', async () => {
        const token = jwt.jwtSign({ exp: date.addMoreDays(1).getTime(), }, process.env.SECRET, '1d');
        const res = await chai
            .request(app)
            .post('/cp/reset-password/')
            .query({ id: 1005, token })
            .send({
                password: 'newpassword'
            })
            .redirects(0)
        expect(res.statusCode).to.equal(200)
    });
    it('should return an error message if the link has expired or the user doesn\'t exist', async () => {
        const stub = sinon.stub(mailer, 'default').throws(new Error('something went wrong'));
        const token = jwt.jwtSign({ exp: date.addMoreDays(1).getTime(), }, process.env.SECRET, '1d');
        const res = await chai
            .request(app)
            .post('/cp/reset-password/')
            .query({ id: 1005, token })
            .send({
                password: 'newpassword'
            })
        stub.restore();
        expect(res.statusCode).to.equal(500)
        expect(res.body).to.have.property('message', 'Something went wrong');
    });
})