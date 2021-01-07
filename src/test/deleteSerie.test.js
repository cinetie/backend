import chai, { expect } from 'chai';
import { config } from 'dotenv';
import chaiHttp from 'chai-http';
import services from '../services/serieServices';
import sinon from 'sinon';
import jwt from '../helpers/jwt';
import { describe, it } from 'mocha';
import * as aws from '../helpers/aws';
import app from '../index';

config();
chai.use(chaiHttp);

describe('DELETE AN EPISODE TEST', () => {
    it('should delete an episode', async () => {
        const stub = sinon.stub(aws, 'deleteObject').callsFake(() => {
            return []
        })
        const token = jwt.jwtSign({ user: process.env.ADMIN_USER, }, process.env.SECRET, '1d');
        const res = await chai
            .request(app)
            .delete('/series/delete/151')
            .set('authorization', `bearer ${token}`)
        stub.restore();
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('message', 'deleted easily')
    });
    it('should return 400 if the aws file wasn\'t deleted', async () => {
        const stub = sinon.stub(aws, 'deleteObject').callsFake(() => {
            return [1]
        })
        const token = jwt.jwtSign({ user: process.env.ADMIN_USER, }, process.env.SECRET, '1d');
        const res = await chai
            .request(app)
            .delete('/series/delete/151')
            .set('authorization', `bearer ${token}`)
        stub.restore();
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property('message', 'Can\'t find what you requested')
    });
    it('should return 400 status code if the user can\'t delete an episode', async () => {
        const token = jwt.jwtSign({ user: process.env.ADMIN_USER, }, process.env.SECRET, '1d');
        const res = await chai
            .request(app)
            .delete('/series/delete/15154')
            .set('authorization', `bearer ${token}`)
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property('message', 'Can\'t find what you requested')
    });
    it('should return 500 status code if there is a  server error', async () => {
        const stub = sinon.stub(services, 'getSingleEpisode').throws('Something went wrong')
        const token = jwt.jwtSign({ user: process.env.ADMIN_USER, }, process.env.SECRET, '1d');
        const res = await chai
            .request(app)
            .delete('/series/delete/15156')
            .set('authorization', `bearer ${token}`)
        stub.restore();
        expect(res.statusCode).to.equal(500);
    });
});
