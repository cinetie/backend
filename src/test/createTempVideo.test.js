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

describe('POST TEMP VIDEO TEST', () => {
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
    it('should create a temp video(movie)', async () => {
        const res = await chai
            .request(app)
            .post('/temp/new')
            .set('cpid', '31978540-8bdf-41cc-81d7-26200b847c0a')
            .set('authorization', `bearer ${adminToken}`)
            .send({
                videoName: 'integration',
                videoCast: 'ggrtgrtg',
                videoSynopsis: 'this is it',
                category: 'action',
                rate: 'everyone',
                resCountries: 'england',
                portrait: 'e3xcf5187-4dd8-49a9-86b1-087eb8476172.jpg',
                nameTag: 'e3fg5187-4dd8-49a9-86b1-087ebgh8476173.jpg',
                landscape: 'e3hhj5187-4dd8-49a9-86b1-087eb8476174.jpg',
                video: 'e34b5187-4dd8-49a9-86b1-097gh8476171.mp4',
                type: 'movie',
            })
        expect(res.statusCode).to.equal(201)
        expect(res.body).to.have.property('message', 'video uploaded successfully');
    });
    it('should create a temp video(serie)', async () => {
        const res = await chai
            .request(app)
            .post('/temp/new')
            .set('cpid', '31978540-8bdf-41cc-81d7-26200b847c0a')
            .set('authorization', `bearer ${adminToken}`)
            .send({
                videoName: 'integration serie',
                videoCast: 'ggrtgrtg',
                videoSynopsis: 'this is it',
                category: 'action',
                rate: 'everyone',
                resCountries: 'england',
                portrait: 'e3xcf5187-4dd8-49a9-86b1-087eb8476172.jpg',
                nameTag: 'e3fg5187-4dd8-49a9-86b1-087ebgh8476173.jpg',
                landscape: 'e3hhj5187-4dd8-49a9-86b1-087eb8476174.jpg',
                video: 'e34b5187-4dd8-49a9-86b1-097gh8476171.mp4',
                type: 'serie',
            })
        expect(res.statusCode).to.equal(201)
        expect(res.body).to.have.property('message', 'video uploaded successfully');
    });
    it('should return 401 if the video can\'t be saved(movie)', async () => {
        const stub = sinon.stub(services, 'createNewVideos').returns(null);
        const res = await chai
            .request(app)
            .post('/temp/new')
            .set('cpid', '31978540-8bdf-41cc-81d7-26200b847c0a')
            .set('authorization', `bearer ${adminToken}`)
            .send({
                videoName: 'integration',
                videoCast: 'ggrtgrtg',
                videoSynopsis: 'this is it',
                category: 'action',
                rate: 'everyone',
                resCountries: 'england',
                portrait: 'e3xcf5187-4dd8-49a9-86b1-087eb8476172.jpg',
                nameTag: 'e3fg5187-4dd8-49a9-86b1-087ebgh8476173.jpg',
                landscape: 'e3hhj5187-4dd8-49a9-86b1-087eb8476174.jpg',
                video: 'e34b5187-4dd8-49a9-86b1-097gh8476171.mp4',
                type: 'movie',
            })
        stub.restore()
        expect(res.statusCode).to.equal(401)
        expect(res.body).to.have.property('message', 'Video can\'t be saved');
    });
    it('should return 401 if the video can\'t be saved(serie)', async () => {
        const stub = sinon.stub(services, 'createNewVideos').returns(null);
        const res = await chai
            .request(app)
            .post('/temp/new')
            .set('cpid', '31978540-8bdf-41cc-81d7-26200b847c0a')
            .set('authorization', `bearer ${adminToken}`)
            .send({
                videoName: 'integration',
                videoCast: 'ggrtgrtg',
                videoSynopsis: 'this is it',
                category: 'action',
                rate: 'everyone',
                resCountries: 'england',
                portrait: 'e3xcf5187-4dd8-49a9-86b1-087eb8476172.jpg',
                nameTag: 'e3fg5187-4dd8-49a9-86b1-087ebgh8476173.jpg',
                landscape: 'e3hhj5187-4dd8-49a9-86b1-087eb8476174.jpg',
                video: 'e34b5187-4dd8-49a9-86b1-097gh8476171.mp4',
                type: 'serie',
            })
        stub.restore()
        expect(res.statusCode).to.equal(401)
        expect(res.body).to.have.property('message', 'Video can\'t be saved');
    });
    it('should return 401 if the video can\'t be asaved', async () => {
        const stub = sinon.stub(services, 'createNewVideos').throws(new Error('Something went wrong'));
        const res = await chai
            .request(app)
            .post('/temp/new')
            .set('cpid', '31978540-8bdf-41cc-81d7-26200b847c0a')
            .set('authorization', `bearer ${adminToken}`)
            .send({
                videoName: 'integration',
                videoCast: 'ggrtgrtg',
                videoSynopsis: 'this is it',
                category: 'action',
                rate: 'everyone',
                resCountries: 'england',
                portrait: 'e3xcf5187-4dd8-49a9-86b1-087eb8476172.jpg',
                nameTag: 'e3fg5187-4dd8-49a9-86b1-087ebgh8476173.jpg',
                landscape: 'e3hhj5187-4dd8-49a9-86b1-087eb8476174.jpg',
                video: 'e34b5187-4dd8-49a9-86b1-097gh8476171.mp4',
                type: 'movie',
            })
        stub.restore()
        expect(res.statusCode).to.equal(503)
    });
});
