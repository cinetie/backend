import chai, { expect } from 'chai';
import { config } from 'dotenv';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { describe, it } from 'mocha';
import jwt from '../helpers/jwt';
import app from '../index';

config();
chai.use(chaiHttp);

describe('GET EPISODES BY ID TEST', () => {
    it('should return episode', async () => {
        const loginRes = await chai
            .request(app)
            .post('/cp/login')
            .send({
                email: 'cp0009@example.com',
                password: 'izzeddin'
            });
        const token = jwt.jwtSign({ user: process.env.ADMIN_USER, }, process.env.SECRET, '1d');
        const res = await chai
            .request(app)
            .get('/series/cp')
            .set('authorization', `bearer ${loginRes.body.data}`)
        expect(res.statusCode).to.equal(200)
        expect(res.body.data).to.an('array');
    });
    it('should return 400 if no episode is found', async () => {
        const loginRes = await chai
            .request(app)
            .post('/cp/login')
            .send({
                email: 'cp0012@example.com',
                password: 'izzeddin'
            });
        const token = jwt.jwtSign({ user: process.env.ADMIN_USER, }, process.env.SECRET, '1d');
        const res = await chai
            .request(app)
            .get('/series/cp')
            .set('authorization', `bearer ${loginRes.body.data}`)
        expect(res.statusCode).to.equal(400)
        expect(res.body).to.have.property('message', 'can\'t find matching episodes');
    });
    it('should return 500 if there is a server error', async () => {
        const stub = sinon.stub(jwt, 'jwtVerify').throws(new Error('something went wrong'));
        const loginRes = await chai
            .request(app)
            .post('/cp/login')
            .send({
                email: 'cp0012@example.com',
                password: 'izzeddin'
            });
        const token = jwt.jwtSign({ user: process.env.ADMIN_USER, }, process.env.SECRET, '1d');
        const res = await chai
            .request(app)
            .get('/series/cp')
            .set('authorization', `bearer ${loginRes.body.data}`)
        stub.restore();
        expect(res.statusCode).to.equal(500)
    });
});
