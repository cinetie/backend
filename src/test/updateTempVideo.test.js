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
  let adminToken;
  before(async () => {
    const loginRes = await chai
      .request(app)
      .post('/staff/login')
      .send({
        email: 'staff@example.com',
        password: 'izzeddin'
      });
    adminToken = loginRes.body.data.token;
  });
    it('should update temp video', async () => {
        const res = await chai
            .request(app)
            .put('/temp/update')
            .set('authorization', `bearer ${adminToken}`)
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
        const res = await chai
            .request(app)
            .put('/temp/update')
            .set('authorization', `bearer ${adminToken}`)
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
        const res = await chai
            .request(app)
            .put('/temp/update')
            .set('authorization', `bearer ${adminToken}`)
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
