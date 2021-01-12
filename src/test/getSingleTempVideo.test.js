import chai, { expect } from 'chai';
import { config } from 'dotenv';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { describe, it } from 'mocha';
import app from '../index';
import jwt from '../helpers/jwt';
import services from '../services/tempVideoServices';
import * as aws from '../helpers/aws';

config();
chai.use(chaiHttp);

describe('GET SINGLE TEMP VIDEO TEST', () => {
    it('should return the tempVideo', async () => {
        const stub = sinon.stub(aws, 'getObject').callsFake(() => 'ferferfregrg.com/greger.mp4');
        const token = jwt.jwtSign({ user: process.env.ADMIN_USER, }, process.env.SECRET, '1d');
        const res = await chai
            .request(app)
            .get('/temp/')
            .set('authorization', `bearer ${token}`)
            .query({ id: 163 })
        stub.restore();
        expect(res.statusCode).to.equal(200)
        expect(res.body).to.have.property('message', 'Video found');
    });
    it('should 401 status if the video uri was not generated', async () => {
        const stub = sinon.stub(aws, 'getObject').callsFake(() => null);
        const token = jwt.jwtSign({ user: process.env.ADMIN_USER, }, process.env.SECRET, '1d');
        const res = await chai
            .request(app)
            .get('/temp/')
            .set('authorization', `bearer ${token}`)
            .query({ id: 163 })
        stub.restore();
        expect(res.statusCode).to.equal(401)
        expect(res.body).to.have.property('message', 'No video available');
    });
    it('should return 404 if not video is found', async () => {
        const stub = sinon.stub(aws, 'getObject').callsFake(() => 'ferferfregrg.com/greger.mp4');
        const token = jwt.jwtSign({ user: process.env.ADMIN_USER, }, process.env.SECRET, '1d');
        const res = await chai
            .request(app)
            .get('/temp/')
            .set('authorization', `bearer ${token}`)
            .query({ id: 163000 })
        stub.restore()
        expect(res.statusCode).to.equal(404)
        expect(res.body).to.have.property('message', 'No video available');
    });
    it('should return 500 if there is a server error', async () => {
        const stub = sinon.stub(services, 'getParticularVideo').throws(new Error('Something went wrong'))
        const token = jwt.jwtSign({ user: process.env.ADMIN_USER, }, process.env.SECRET, '1d');
        const res = await chai
            .request(app)
            .get('/temp/')
            .set('authorization', `bearer ${token}`)
            .query({ id: 163 })
        stub.restore();
        expect(res.statusCode).to.equal(503)
    });
});
