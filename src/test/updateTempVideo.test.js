import chai, { expect } from 'chai';
import { config } from 'dotenv';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { describe, it } from 'mocha';
import app from '../index';
import jwt from '../helpers/jwt';
import services from '../services/tempVideoServices';

config();
chai.use(chaiHttp);

describe('UPDATE TEMP VIDEO TEST', () => {
    it('should update temp video', async () => {
        const token = jwt.jwtSign({ user: process.env.ADMIN_USER, }, process.env.SECRET, '1d');
        const res = await chai
            .request(app)
            .put('/temp/update')
            .set('authorization', `bearer ${token}`)
            .query({
                id: 165
            })
            .send({
                videoName: 'updated temp video'
            })
        expect(res.statusCode).to.equal(200)
        expect(res.body).to.have.property('message', 'Video updated');
    });
    it('should return 401 if there temp video is not found', async () => {
        const token = jwt.jwtSign({ user: process.env.ADMIN_USER, }, process.env.SECRET, '1d');
        const res = await chai
            .request(app)
            .put('/temp/update')
            .set('authorization', `bearer ${token}`)
            .query({
                id: 1650000
            })
            .send({
                videoName: 'updated temp video'
            })
        expect(res.statusCode).to.equal(401)
        expect(res.body).to.have.property('message', 'No video found');
    });
    it('should return 503 if there is a server error', async () => {
        const stub = sinon.stub(services, 'updateVideos').throws(new Error('Something went wrong'));
        const token = jwt.jwtSign({ user: process.env.ADMIN_USER, }, process.env.SECRET, '1d');
        const res = await chai
            .request(app)
            .put('/temp/update')
            .set('authorization', `bearer ${token}`)
            .query({
                id: 1650000
            })
            .send({
                videoName: 'updated temp video'
            })
        stub.restore();
        expect(res.statusCode).to.equal(503)
    });
});
