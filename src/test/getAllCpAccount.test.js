import chai, { expect } from 'chai';
import { config } from 'dotenv';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { describe, it } from 'mocha';
import app from '../index';
import jwt from '../helpers/jwt';
import * as aws from '../helpers/aws';

config();
chai.use(chaiHttp);

describe('GET ALL CP ACCOUNTS', () => {
    it('should return an error message if the user is not an admin', async () => {
        const token = jwt.jwtSign({ user: 'cp0005@example.com', }, process.env.SECRET, '1d');
        const res = await chai
            .request(app)
            .get('/cp/all')
            .set('authorization', `bearer ${token}`)
        expect(res.statusCode).to.equal(403)
        expect(res.body).to.have.property('message', 'Access denied  ');
    });
    it('should return an error message if the token is not provided', async () => {
        const res = await chai
            .request(app)
            .get('/cp/all')
        expect(res.statusCode).to.equal(400)
        expect(res.body).to.have.property('message', 'Invalid access token');
    });
    it('should return an error message if the user is not found', async () => {
        const token = jwt.jwtSign({ email: 'cp005' }, process.env.SECRET, '1d');
        const res = await chai
            .request(app)
            .get('/cp/all')
            .set('authorization', `bearer ${token}`)
        expect(res.statusCode).to.equal(400)
        expect(res.body).to.have.property('message', 'Invalid access token');
    });
    it('should return all the cp', async () => {
        const stub = sinon.stub(aws, 'getObject').callsFake(() => {
            return 'fergegergeerg.jpg'
        })
        const token = jwt.jwtSign({ user: process.env.ADMIN_USER, }, process.env.SECRET, '1d');
        const res = await chai
            .request(app)
            .get('/cp/all')
            .set('authorization', `bearer ${token}`)
        stub.restore();
        expect(res.statusCode).to.equal(200)
        expect(res.body).to.have.property('message', 'success');
        expect(res.body.data).to.be.an('array')
    });
    it('should return 500 status code if there is a server error', async () => {
        const stub = sinon.stub(aws, 'getObject').throws(new Error('something went wrong'))
        const token = jwt.jwtSign({ user: process.env.ADMIN_USER, }, process.env.SECRET, '1d');
        const res = await chai
            .request(app)
            .get('/cp/all')
            .set('authorization', `bearer ${token}`)
        stub.restore()
        expect(res.statusCode).to.equal(503)
    });
});