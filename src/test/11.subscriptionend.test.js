import chai, { expect } from 'chai';
import http from 'chai-http';
import { login } from './mock/subscription.mock';
import { describe, it } from 'mocha'; 
import app from '../index';
chai.use(http);
const preFix = '/auth/login'
describe('Statuscode should change with MOMO', () => {
    it('statuscode should be 202', (done) => {
        chai.request(app)
        .post(`${preFix}`)
        .send(login)
        .then((res, err) => {
            console.log(res, err);
            expect(1).to.be.equal(203);
        }).catch(done)
        done();
    })
})