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

describe('ADMIN UPDATE TEMP VIDEO TEST', () => {
  it('should update temp video', async () => {
    const token = jwt.jwtSign({ user: process.env.ADMIN_USER, }, process.env.SECRET, '1d');
    const res = await chai
      .request(app)
      .put('/temp/update/temp')
      .set('authorization', `bearer ${token}`)
      .query({
        id: 166
      })
      .send({
        videoName: 'updated temp video',
        videoKey: 'nfn-gff56-dfdv-wer45f.mp4',
        category: 'action',
        contentProvider: 'rtrtf-tr67-gdgd.mp4'
      });
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property('message', 'Video successfully updated!');
  });
  it('should return 401 if there temp video is not found', async () => {
    const token = jwt.jwtSign({ user: process.env.ADMIN_USER, }, process.env.SECRET, '1d');
    const res = await chai
      .request(app)
      .put('/temp/update/temp')
      .set('authorization', `bearer ${token}`)
      .query({
        id: 1650000
      })
      .send({
        videoName: 'updated temp video'
      });
    expect(res.statusCode).to.equal(404);
    expect(res.body).to.have.property('message', 'No video available');
  });
  it('should return 503 if there is a server error', async () => {
    const stub = sinon.stub(services, 'getParticularVideo').throws(new Error('Something went wrong'));
    const token = jwt.jwtSign({ user: process.env.ADMIN_USER, }, process.env.SECRET, '1d');
    const res = await chai
      .request(app)
      .put('/temp/update/temp')
      .set('authorization', `bearer ${token}`)
      .query({
        id: 1650000
      })
      .send({
        videoName: 'updated temp video'
      });
    stub.restore();
    expect(res.statusCode).to.equal(503);
  });
});
