import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';
import {planInfo ,planInfo01} from './mock/plan.mock'
import nock from 'nock'
import request from 'request'


chai.use(chaiHttp);
chai.should();

const prefix = '/plan';
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiIiwidXNlciI6InNkZmxzZGpmbGpAY2luZXRpZS5jb20iLCJpYXQiOjE1ODM0MTY3NTl9.DMlqsXW6xtnjegYe4Nj-1cvfM4uBxqEJnV3x16CRTSE`

describe('INTEAGRATION TEST FOR PLANS', (req, res, status) => { 
    it('Create Plan it should be okay', (done) => {
        chai
          .request(app)
          .post(`${prefix}/new`)
          .send(planInfo)
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res.body).to.have.property('message', 'Plan successfully added!');
            done();
          });
      });
      it('Create Plan when it exist it should be 422', (done) => {
        chai
          .request(app)
          .post(`${prefix}/new`)
          .send(planInfo)
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
            expect(res).to.have.status(422);
            expect(res.body).to.have.property('message', 'Plan exists already should you consider updating it instead');
            done();
          });
      });

      it('Get Plan it should be okay', (done) => {
        chai
          .request(app)
          .get(`${prefix}`)
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message',  'Plans successfully retrieved!');
            done();
          });
      });

      it('Delete Plan it should be okay', (done) => {
          const id = 246
        chai
          .request(app)
          .delete(`${prefix}/${id}`)
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message',  "Plan successfully deleted!");
            done();
          });
      });
      it('Update Plan it should be okay', (done) => {
        const id = 245
      chai
        .request(app)
        .put(`${prefix}/${id}`)
        .set({ Authorization: `Bearer ${token}` })
        .send(planInfo01)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message',  'Plan successfully updated!');
          done();
        });
    });
})