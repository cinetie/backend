import chai, { expect } from 'chai';
import { config } from 'dotenv';
import chaiHttp from 'chai-http';
import services from '../services/serieServices';
import sinon from 'sinon';
import { describe, it } from 'mocha';
import app from '../index';

config();
chai.use(chaiHttp);

describe('GET ALL SERIE SEASONS TEST', () => {
    it('should return the seasons', async () => {
        const loginRes = await chai
            .request(app)
            .post('/staff/login')
            .send({
                email: 'staff4000@example.com',
                password: '123456789'
            });
        const res = await chai
            .request(app)
            .get('/series/all/seasons')
            .query({
                videoId: 'fr474rtt7w3-4f378i-vv4w-7865-c0f364dfr567hji'
            })
            .set('authorization', `bearer ${loginRes.body.data.token}`)
        expect(res.statusCode).to.equal(200)
        expect(res.body.data).to.an('object');
    });
    it('should return 400 if there is not season found', async () => {
        const loginRes = await chai
            .request(app)
            .post('/staff/login')
            .send({
                email: 'staff4000@example.com',
                password: '123456789'
            });
        const res = await chai
            .request(app)
            .get('/series/all/seasons')
            .query({
                videoId: 'fr474rtt7w3-4f378i-vv4w-7865'
            })
            .set('authorization', `bearer ${loginRes.body.data.token}`)
        expect(res.statusCode).to.equal(400)
        expect(res.body).to.have.property('message', 'Can\'t find what you requested');
    });
    it('should return 500 if there is a server error', async () => {
        const stub = sinon.stub(services, 'getAllSeasons').throws(new Error('Something went wrong'))
        const loginRes = await chai
            .request(app)
            .post('/staff/login')
            .send({
                email: 'staff4000@example.com',
                password: '123456789'
            });
        const res = await chai
            .request(app)
            .get('/series/all/seasons')
            .query({
                videoId: 'fr474rtt7w3-4f378i-vv4w-7865'
            })
            .set('authorization', `bearer ${loginRes.body.data.token}`);
        stub.restore();
        expect(res.statusCode).to.equal(500)
    });
});
