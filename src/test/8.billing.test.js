import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import billing from '../middlewares/billing';
// import chaiAsPromised from 'chai-as-promised'
import sinon  from 'sinon'
import httpMocks from 'node-mocks-http';
import approvedTransaction from "./mock/chackSpennTransaction.mock"
import sinonStubPromise from 'sinon-stub-promise';

 
// chai.use(chaiAsPromised);
chai.use(chaiHttp);
chai.should();
sinonStubPromise(sinon);


describe('BILLING MIDDLEWARE', (req, res, status) => {
    it('Test fetchCurrentSubscription Method with registered email should be okay', async () => {
        res = {}
        let state = undefined
        let req = { 
            body: {
                "email": "blaise145@gmail.com",
                "password": "nAdia123"
            }
        }
        const data = await billing.fetchCurrentSubscription(req, res, state);
        expect(data.dataValues.state).to.be.equal('current');
        expect(data.dataValues.phoneNumber).to.be.equal('+250788726152');
        expect(data.dataValues.email).to.be.equal('blaise145@gmail.com');
    });

    it('Test renewPayment Method with un-registered email should be error with status 404', async () => {
        var nextSpy = sinon.spy();
        var req = httpMocks.createRequest({ 
            body: {
                "email": "blaise1200@gmail.com",
                "password": "nAdia123"
            }
        });
        var res = httpMocks.createResponse();
        const data = await billing.renewPayment(req, res, nextSpy)
        expect(data.statusCode).to.equal(400)
        expect(data.finished).to.be.true
    });

    it('Test renewPayment Method with registered email have subscription with pending status or user.plan = Setup or  details === null should next()', async () => {
        var nextSpy = sinon.spy();
        var req = httpMocks.createRequest({ 
            body: {
                "email": "blaise19@gmail.com",
                "password": "nAdia123"
            }
        });
        var res = httpMocks.createResponse();
        await billing.renewPayment(req, res, nextSpy)
        expect(nextSpy.calledOnce).to.be.true;
    });
    

    it('Test renewPayment Method with registered email and subscription with current status should be okay', async () => {
        var nextSpy = sinon.spy();
        var req = httpMocks.createRequest({ 
            body: {
                "email": "blaise12@gmail.com",
                "password": "nAdia123"
            }
        });
        var res = httpMocks.createResponse();
        await billing.renewPayment(req, res, nextSpy)
        expect(nextSpy.calledOnce).to.be.true;
    });



    // it('should pass to send email', async () => {
    //     const body = {
    //         email: "habimanaolivier6gmail.com"
    //     }
    //     res = {}
    //     let user = {
    //         firstName: 'Blaize'
    //     }
    //     let req = { 
    //         body: {
    //             "email": "habimanaolivier6gmail.com"
    //         }
    //     }
    //     billing.sendBillingNotification(user, req, body)
    // });
    
    it('Test renewPayment Method with registered email and no active subscription and momo payment should be okay', async () => {
        var nextSpy = sinon.spy();
        var req = httpMocks.createRequest({ 
            body: {
                "email": "blaise125@gmail.com",
                "password": "nAdia123"
            }
        });
        var res = httpMocks.createResponse();
        await billing.renewPayment(req, res, nextSpy)
        expect(res.statusCode).to.equal(200)
        expect(nextSpy.calledOnce).to.be.false;
    });

    it('Test renewPayment Method with registered email and no active subscription and spenn payment for the first time should be okay', async () => {
        var nextSpy = sinon.spy();
        var req = httpMocks.createRequest({ 
            body: {
                "email": "blaise126@gmail.com",
                "password": "nAdia123"
            }
        });
        var res = httpMocks.createResponse();
        await billing.renewPayment(req, res, nextSpy)
        expect(res.statusCode).to.equal(201)
        expect(nextSpy.calledOnce).to.be.false;
    }); 

    it('Test renewPayment Method with registered email and no active subscription user use spenn payment it check spenn pending transaction before login should be okay but this is failed transaction', async () => {
        var nextSpy = sinon.spy();
        var req = httpMocks.createRequest({ 
            body: {
                "email": "blaise126@gmail.com",
                "password": "nAdia123"
            }
        });
        var res = httpMocks.createResponse();
        await billing.renewPayment(req, res, nextSpy)
        expect(res.statusCode).to.equal(200)
        expect(nextSpy.calledOnce).to.be.false;
    });

    it('Test renewPayment Method with registered email and no active subscription user use spenn payment it check spenn pending transaction before login should be okay but this is Approved transaction', async () => {
        const stub = sinon.stub(billing, 'checkSpenn').callsFake(() => {
            return approvedTransaction
          })

        
        var nextSpy = sinon.spy();
        var req = httpMocks.createRequest({ 
            body: {
                "email": "blaise127@gmail.com",
                "password": "nAdia123"
            }
        });
        var res = httpMocks.createResponse();
        await billing.renewPayment(req, res, nextSpy)
        expect(res.statusCode).to.equal(200)
        expect(nextSpy.calledOnce).to.be.true;

        stub.restore();
    });
    
});