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

describe('DELETE TEMP VIDEOS TEST', () => {
//     it('should delete the temp video', async () => {
//         const stub = sinon.stub(aws, 'deleteObject').callsFake(() => ({ status: 'success' }))
//         const token = jwt.jwtSign({ user: process.env.ADMIN_USER, }, process.env.SECRET, '1d');
//         const res = await chai
//             .request(app)
//             .delete('/temp/')
//             .set('authorization', `bearer ${token}`)
//             .query({ id: 164 })
//         stub.restore()
//         expect(res.statusCode).to.equal(200)
//         expect(res.body).to.have.property('message', 'Video deleted');
//     });
    it('should return 401 if the video wasn\t deleted', async () => {
        const stub = sinon.stub(aws, 'deleteObject').callsFake(() => null)
        const token = jwt.jwtSign({ user: process.env.ADMIN_USER, }, process.env.SECRET, '1d');
        const res = await chai
            .request(app)
            .delete('/temp/')
            .set('authorization', `bearer ${token}`)
            .query({ id: 164 })
        stub.restore();
        expect(res.statusCode).to.equal(401)
        expect(res.body).to.have.property('message', 'No video found');
    });
    it('should return 404 if not video is found', async () => {
        const token = jwt.jwtSign({ user: process.env.ADMIN_USER, }, process.env.SECRET, '1d');
        const res = await chai
            .request(app)
            .delete('/temp/')
            .set('authorization', `bearer ${token}`)
            .query({ id: 16400 })
        expect(res.statusCode).to.equal(401)
        expect(res.body).to.have.property('message', 'No video found');
    });
    it('should return 503 if there is a server error', async () => {
        const stub = sinon.stub(services, 'getParticularVideo').throws(new Error('Something went wrong'))
        const token = jwt.jwtSign({ user: process.env.ADMIN_USER, }, process.env.SECRET, '1d');
        const res = await chai
            .request(app)
            .delete('/temp/')
            .set('authorization', `bearer ${token}`)
            .query({ id: 164000 })
        stub.restore();
        expect(res.statusCode).to.equal(503)
    });
});
