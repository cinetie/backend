import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import * as mailer from '../helpers/mailer';
import { describe, it } from 'mocha';
import fs from 'fs'
import app from '../index';

chai.use(chaiHttp);


describe('SIGNUP', () => {
    it('should return a 404 status code if the user doesn\'t provide all thhe necessary information', (done) => {
        chai
            .request(app)
            .post('/cp/signup')
            .send({
                name: 'james'
            })
            .end((err, res) => {
                expect(res).to.have.status(422);
                expect(res.body).to.have.property(
                    'message',
                    'Enter a valid email address Ex: nowhere@pictures.com'
                );
                done();
            });
    });
    it('should return a 200 if the user is successfully signup', (done) => {
        chai
            .request(app)
            .post('/cp/signup')
            .field('name', 'serenas')
            .field('email', 'cp345@example.com')
            .field('password', 'password123')
            .field('nationality', 'Rwandan')
            .field('cityOfResidence', 'Rwanda')
            .field('phoneLine', '0123456789')
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('message', 'Signed up successfully');
                expect(res.body.data).to.be.an('object')
                done();
            });
    });
    it('should return a 422 if the user is already sign up', (done) => {
        chai
            .request(app)
            .post('/cp/signup')
            .attach('image', 'src/test/mock/profile.jpg', 'profile.jpg')
            .field('name', 'serenas')
            .field('email', 'cp12@example.com')
            .field('password', 'password123')
            .field('nationality', 'Rwandan')
            .field('cityOfResidence', 'Rwanda')
            .field('phoneLine', '0123456789')
            .end((err, res) => {
                expect(res).to.have.status(422);
                expect(res.body).to.have.property('message', 'cp already exists');
                done();
            });
    });
    it('should return a 500 if the email wasn\'t sent', (done) => {
        const stub = sinon.stub(mailer, 'default').resolves({ status: 500, message: 'email was\'t sent'})
        chai
            .request(app)
            .post('/cp/signup')
            .attach('image', 'src/test/mock/profile.jpg', 'profile.jpg')
            .field('name', 'serenas')
            .field('email', 'cp1256@example.com')
            .field('password', 'password123')
            .field('nationality', 'Rwandan')
            .field('cityOfResidence', 'Rwanda')
            .field('phoneLine', '0123456789')
            .end((err, res) => {
                stub.restore()
                expect(res).to.have.status(500);
                expect(res.body).to.have.property('message', 'can\'t send email');
                done();
            });
    });
    it('should return a 500 if there is a server error', (done) => {
        const stub = sinon.stub(mailer, 'default').throws('something went wrong')
        chai
            .request(app)
            .post('/cp/signup')
            .attach('image', 'src/test/mock/profile.jpg', 'profile.jpg')
            .field('name', 'serenas')
            .field('email', 'cp125645@example.com')
            .field('password', 'password123')
            .field('nationality', 'Rwandan')
            .field('cityOfResidence', 'Rwanda')
            .field('phoneLine', '0123456789')
            .end((err, res) => {
                stub.restore()
                expect(res).to.have.status(500);
                done();
            });
    });

});
