import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import billing from '../middlewares/billing';
import userService from '../services/userServices';
import sinon  from 'sinon'
import httpMocks from 'node-mocks-http';
import approvedTransaction from "./mock/chackSpennTransaction.mock"
import sinonStubPromise from 'sinon-stub-promise';
import billingService from '../services/billingServices';
import jwt from '../helpers/jwt';
import webhooks from '../controllers/webhooks';
 
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
                "email": "blaise1290@gmail.com",
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

    // it.only('Test renewPayment Method with registered email and no active subscription and momo payment should be okay', async () => {
    //     var nextSpy = sinon.spy();
    //     var req = httpMocks.createRequest({ 
    //         body: {
    //             "email": "blaise125@gmail.com",
    //             "password": "nAdia123"
    //         }
    //     });
    //     var res = httpMocks.createResponse();
    //     await billing.renewPayment(req, res, nextSpy)

    // });

    it('Test renewPayment Method with registered email and no active subscription with payment method 2', async () => {
        var nextSpy = sinon.spy();
        var req = httpMocks.createRequest({ 
            body: {
                "email": "blaise129340@gmail.com",
                "password": "nAdia123"
            }
        });
        var res = httpMocks.createResponse();
        await billing.renewPayment(req, res, nextSpy)
        expect(res.statusCode).to.equal(200)
        expect(nextSpy.calledOnce).to.be.false;
    });

    it('Test renewPayment Method with registered email and no active subscription,  user use spenn payment method this test should pass but charge spenn request failed due to unsupported number', async () => {
        var nextSpy = sinon.spy();
        var req = httpMocks.createRequest({ 
            body: {
                "email": "blaise126x@gmail.com",
                "password": "nAdia123"
            }
        });
        var res = httpMocks.createResponse();
        const data = await billing.renewPayment(req, res, nextSpy)
        expect(res.statusCode).to.equal(200)
        expect(nextSpy.calledOnce).to.be.true;
    });
    
    it('Test updateSubscription Method with registered email with isBilledAnnually if true', async () => {
        var nextSpy = sinon.spy();
        var req = httpMocks.createRequest({ 
            body: {
                "email": "blaise126xx@gmail.com",
                "password": "nAdia123"
            }
        });
        const today = new Date();
        var res = httpMocks.createResponse();
        const data = await billing.updateSubscription(req, res, today)
        expect(data.today).to.be.a("string")
    });

    it('Test updateSubscription Method with registered email with isBilledAnnually if false', async () => {
        var nextSpy = sinon.spy();
        var req = httpMocks.createRequest({ 
            body: {
                "email": "blaise126xx1@gmail.com",
                "password": "nAdia123"
            }
        });
        const today = new Date();
        var res = httpMocks.createResponse();
        const data = await billing.updateSubscription(req, res, today)
        expect(data.today).to.be.a("string")
    });

    it('Test verifySpennTransactions Method with unregistered email', async () => {
        var nextSpy = sinon.spy();
        var req = httpMocks.createRequest({ 
            body: {
                "email": "blaise126xx6957895671@gmail.com",
                "password": "nAdia123"
            }
        });
        const today = new Date();
        var res = httpMocks.createResponse();
        const data = await billing.verifySpennTransactions(req, res, nextSpy)
        expect(data.statusCode).to.equal(400)
        expect(nextSpy.calledOnce).to.be.false;
    });

    it('Test verifySpennTransactions Method with registered email and current subscription status', async () => {
        var nextSpy = sinon.spy();
        var req = httpMocks.createRequest({ 
            body: {
                "email": "blaise126xx10@gmail.com",
                "password": "nAdia123"
            }
        });
        const today = new Date();
        var res = httpMocks.createResponse();
        const data = await billing.verifySpennTransactions(req, res, nextSpy)
        expect(res.statusCode).to.equal(200)
        expect(nextSpy.calledOnce).to.be.true;
    });

    it('Test verifySpennTransactions Method with registered email and pending subscription status with spenn payment', async () => {
        var nextSpy = sinon.spy();
        var req = httpMocks.createRequest({ 
            body: {
                "email": "blaise1269910@gmail.com",
                "password": "nAdia123"
            }
        });
        var res = httpMocks.createResponse();
        await billing.verifySpennTransactions(req, res, nextSpy)
        expect(res.statusCode).to.equal(200)
        expect(nextSpy.calledOnce).to.be.false;
    });

    it('Test verifySpennTransactions Method with registered email and without pending subscription status with spenn payment', async () => {
        var nextSpy = sinon.spy();
        var req = httpMocks.createRequest({ 
            body: {
                "email": "blaise12699109@gmail.com",
                "password": "nAdia123"
            }
        });
        var res = httpMocks.createResponse();
        await billing.verifySpennTransactions(req, res, nextSpy)
        expect(res.statusCode).to.equal(200)
        expect(nextSpy.calledOnce).to.be.true;
    });

    it('Test verifySpennTransactions Method with registered email and with pending subscription status with payment method other than spenn payment', async () => {
        var nextSpy = sinon.spy();
        var req = httpMocks.createRequest({ 
            body: {
                "email": "blaise126991078@gmail.com",
                "password": "nAdia123"
            }
        });
        var res = httpMocks.createResponse();
        await billing.verifySpennTransactions(req, res, nextSpy)
        expect(res.statusCode).to.equal(200)
        expect(nextSpy.calledOnce).to.be.true;
    });


    it('Test verifySpennTransactions should return 500 when there is a server error', async () => {
        const stub = sinon.stub(userService, 'getUserByMail').throws(new Error())
        var req = httpMocks.createRequest({ 
            body: {
                "email": "blaise126991078@gmail.com",
                "password": "nAdia123"
            }
        });
        var res = httpMocks.createResponse();
        await billing.verifySpennTransactions(req, res)
        expect(res.statusCode).to.equal(500);
        stub.restore()
    });

    it('Test renewPayment should return 500 when there is a server error', async () => {
        const stub = sinon.stub(userService, 'getUserByMail').throws(new Error())
        var req = httpMocks.createRequest({ 
            body: {
                "email": "blaise126991078@gmail.com",
                "password": "nAdia123"
            }
        });
        var res = httpMocks.createResponse();
        await billing.renewPayment(req, res)
        expect(res.statusCode).to.equal(500);
        stub.restore()
    });

    it('Test renewPayment should return 500 when there is a server error', async () => {
        const stub = sinon.stub(billingService, 'getCurrentSubscription').throws(new Error())
        var req = httpMocks.createRequest({ 
            body: {
                "email": "blaise126991078@gmail.com",
                "password": "nAdia123"
            }
        });
        var res = httpMocks.createResponse();
        await billing.fetchCurrentSubscription(req, res)
        expect(res.statusCode).to.equal(500);
        stub.restore()
    });

    it('Test trial should return 500 when there is a server error', async () => {
        const stub = sinon.stub(jwt, 'jwtVerify').throws(new Error())
        var req = httpMocks.createRequest({ 
            body: {
                "email": "blaise126991078@gmail.com",
                "password": "nAdia123"
            }
        });
        var res = httpMocks.createResponse();
        await billing.trial(req, res)
        expect(res.statusCode).to.equal(500);
        stub.restore()
    });

    it('Test verifyPermissionLevel should return 500 when there is a server error', async () => {
        const stub = sinon.stub(jwt, 'jwtVerify').throws(new Error())
        var req = httpMocks.createRequest({ 
            body: {
                "email": "blaise126991078@gmail.com",
                "password": "nAdia123"
            }
        });
        var res = httpMocks.createResponse();
        await billing.verifyPermissionLevel(req, res)
        expect(res.statusCode).to.equal(500);
        stub.restore()
    });

    it('Test verifySpennTransactions Method with registered email and permissonLevel -1 Should throw 402', async () => {
        var nextSpy = sinon.spy();
        var req = httpMocks.createRequest({
            headers: {
                authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlzZTEyOTM0MEBnbWFpbC5jb20iLCJpYXQiOjE2MDc1MDY2OTR9.b-MbGrwGV0pty3xqefKUhinqz0RWchsSiwpbqflLkVE`
            },
        });
        var res = httpMocks.createResponse();
        const data = await billing.verifyPermissionLevel(req, res, nextSpy)
        expect(data.statusCode).to.equal(402)
        expect(nextSpy.calledOnce).to.be.false;
    });

    it('Test verifySpennTransactions Method with registered email and permissonLevel 1 Should throw 402', async () => {
        var nextSpy = sinon.spy();
        var req = httpMocks.createRequest({
            headers: {
                authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlzZTEyNjk5MTA3Nzg3ODc4QGdtYWlsLmNvbSIsImlhdCI6MTYwNzUwODA3NH0.OHqK11xqdhIm2Y6GpJ0mdIVsQ0sXNyAjwIqux1c3DnI`
            },
        });
        var res = httpMocks.createResponse();
        await billing.verifyPermissionLevel(req, res, nextSpy)
        expect(nextSpy.calledOnce).to.be.true;
    });

    it('Test trial Method with registered email that isOnTrial and isOnExtension is false Should next', async () => {
        var nextSpy = sinon.spy();
        var req = httpMocks.createRequest({
            headers: {
                authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlzZTEyNjk5MTA3Nzg3ODc4QGdtYWlsLmNvbSIsImlhdCI6MTYwNzUwODA3NH0.OHqK11xqdhIm2Y6GpJ0mdIVsQ0sXNyAjwIqux1c3DnI`
            },
        });
        var res = httpMocks.createResponse();
        await billing.trial(req, res, nextSpy)
        expect(nextSpy.calledOnce).to.be.true;
    });

    it('Test trial Method with registered email that isOnTrial and isOnExtension is false Should next', async () => {
        var nextSpy = sinon.spy();
        var req = httpMocks.createRequest({
            headers: {
                authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlzMTk5OTk5OTk5NzhAZ21haWwuY29tIiwiaWF0IjoxNjA3NTA5ODk3fQ.xZwna-9ZwmzoeMnR9sF9fUluxct237eRcqrmmHxLB8w`
            },
        });
        var res = httpMocks.createResponse();
        await billing.trial(req, res, nextSpy)
        expect(res.statusCode).to.equal(402)
        expect(nextSpy.calledOnce).to.be.false;
    });

    it('Test trial Method with registered email that trialEnds > today and viewing session is < 3 Should next', async () => {
        var nextSpy = sinon.spy();
        var req = httpMocks.createRequest({
            headers: {
                authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlhczE5NzU2NzVAZ21haWwuY29tIiwiaWF0IjoxNjA3NTExMDEzfQ.7eb0joHwieYlccPAZ7msw7hA1b94OXg9Ic99-WqkHr8`
            },
        });
        var res = httpMocks.createResponse();
        await billing.trial(req, res, nextSpy)
        expect(nextSpy.calledOnce).to.be.true;
    });

    it('Test trial Method with registered email update user with -1 status failed', async () => {
        const stub = sinon.stub(userService, 'updateUser').callsFake(() => {
            return [ undefined, 0 ]})
        var nextSpy = sinon.spy();
        var req = httpMocks.createRequest({
            headers: {
                authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlzMTk5OTk5OTk5NzhAZ21haWwuY29tIiwiaWF0IjoxNjA3NTA5ODk3fQ.xZwna-9ZwmzoeMnR9sF9fUluxct237eRcqrmmHxLB8w`
            },
        });
        var res = httpMocks.createResponse();
        const data = await billing.trial(req, res, nextSpy)
        expect(data.statusCode).to.equal(502)
        expect(nextSpy.calledOnce).to.be.false;
        stub.restore()
    });

    it('Test updateTransactionsAndRegisterSales Method with registered email with updates[1] and updatedSubscription[1] which is different 1', async () => {
        const stub = sinon.stub(userService, 'updateUser').callsFake(() =>  [ undefined, 0 ])
        var nextSpy = sinon.spy();
        var req = httpMocks.createRequest({ 
            body: {
                "email": "blaise126991078@gmail.com",
                "password": "nAdia123"
            }
        });
        let recentTrans;
        let user = {
            "email": "blaise126991078@gmail.com"
        }
        let details;
        var res = httpMocks.createResponse();
        const data = await billing.updateTransactionsAndRegisterSales(recentTrans, user, details, req, res, nextSpy)
        expect(data.statusCode).to.equal(500)
        expect(nextSpy.calledOnce).to.be.false;
        stub.restore()
    });

    it('Test updateTransactionsAndRegisterSales Method with registered email with updates[1] and updatedSubscription[1] which is different 1', async () => {
        const stub = sinon.stub(webhooks, 'registerSalesAndEarnings').callsFake(() =>  false)
        var nextSpy = sinon.spy();
        var req = httpMocks.createRequest({ 
            body: {
                "email": "blaise126991078@gmail.com",
                "password": "nAdia123"
            }
        });
        let recentTrans;
        let user = {
            "email": "blaise126991078@gmail.com"
        }
        let details = {
            "price": 3
        }
        var res = httpMocks.createResponse();
        const data = await billing.updateTransactionsAndRegisterSales(recentTrans, user, details, req, res, nextSpy)
        expect(data.statusCode).to.equal(500)
        expect(nextSpy.calledOnce).to.be.false;
        stub.restore()
    });



});

