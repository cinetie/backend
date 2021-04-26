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

describe('WATCHED MOVIE TIME TEST', () => {
    it('should return an error if one the data is invalid', async () => {
        const loginRes = await chai
            .request(app)
            .post('/auth/login')
            .send({
                email: 'user345679xd@example.com',
                password: 'izzeddin'
            });
        const res = await chai
            .request(app)
            .post('/video/time')
            .set('authorization', `bearer ${loginRes.body.data}`)
            .send({
                watched: 0,
                type: 'movie'
            })
        expect(res.statusCode).to.equal(422);
    });
    it('should save the watchedTime if one gives valid info and the video is a movie', async () => {
        const loginRes = await chai
            .request(app)
            .post('/auth/login')
            .send({
                email: 'user345679xd@example.com',
                password: 'izzeddin'
            });
        const res = await chai
            .request(app)
            .post('/video/time?videoId=fr474rtddfrd4w3-4f378i-kk21-0878-c0f364dfgts5tyh')
            .set('authorization', `bearer ${loginRes.body.data}`)
            .send({
                watchedTime: 20,
                type: 'movie'
            })
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.have.property('message', 'time saved successfully');
    });
    it('should save the watchedTime if one gives valid info and the video is an episode', async () => {
        const loginRes = await chai
            .request(app)
            .post('/auth/login')
            .send({
                email: 'user345679xd@example.com',
                password: 'izzeddin'
            });
        const res = await chai
            .request(app)
            .post('/video/time?videoId=101')
            .set('authorization', `bearer ${loginRes.body.data}`)
            .send({
                watchedTime: 20,
                type: 'episode'
            })
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.have.property('message', 'time saved successfully');
    });
    it('should update the watchedTime if one gives valid info and the user has watched the video before', async () => {
        const loginRes = await chai
            .request(app)
            .post('/auth/login')
            .send({
                email: 'user345679xde@example.com',
                password: 'izzeddin'
            });
        const res = await chai
            .request(app)
            .post('/video/time?videoId=101')
            .set('authorization', `bearer ${loginRes.body.data}`)
            .send({
                watchedTime: 20,
                type: 'episode'
            })
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.have.property('message', 'time saved successfully');
    });
    it('should return an error message if the video doesn\'t exist', async () => {
        const loginRes = await chai
            .request(app)
            .post('/auth/login')
            .send({
                email: 'user345679xde@example.com',
                password: 'izzeddin'
            });
        const res = await chai
            .request(app)
            .post('/video/time?videoId=10100056')
            .set('authorization', `bearer ${loginRes.body.data}`)
            .send({
                watchedTime: 20,
                type: 'episode'
            })
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.have.property('message', 'video not found');
    });
});
