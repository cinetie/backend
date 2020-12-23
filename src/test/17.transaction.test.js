import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon  from 'sinon'
import sinonStubPromise from 'sinon-stub-promise';
import httpMocks from 'node-mocks-http';
import transaction from '../controllers/transations';
import service from '../services/transactionService';
import nock from 'nock'
import jwt from '../helpers/jwt';
import billingService from '../services/billingServices';

chai.use(chaiHttp);
chai.should();
sinonStubPromise(sinon);


describe('TRANSACTION CONTROLLER', (req, res, status) => {
    it('Create transaction should be okay', async () => {
        var req = httpMocks.createRequest({ 
            body: {
                "email": 'blaise127@gmail.com',
                "statusDesc": 'pending',
                'currency': "USD",
                "paidAmount": 3,
                "transactionId": '1115a95e-973d-4abe-9b80-bde4acf74610',
                "createdAt": '2020-12-22 08:57:30',
                "updatedAt": '2020-12-22 08:57:30',
                "statusCode": "200",
                "status": "200"
            }
        });
        var res = httpMocks.createResponse();
        const data = await transaction.createNewTrans(req, res)
        expect(data.statusCode).to.equal(200)
        expect(data.finished).to.be.true
    });

    it('Create transaction should throw 503 error', async () => {
        const stub = sinon.stub(service, 'createTransaction').callsFake(() => {
            return null
          })
        var req = httpMocks.createRequest({ 
            body: {
                "email": 'blaise127@gmail.com',
                "statusDesc": 'pending',
                'currency': "USD",
                "paidAmount": 3,
                "transactionId": '1115a95e-973d-4abe-9b80-bde4acf74610',
                "createdAt": '2020-12-22 08:57:30',
                "updatedAt": '2020-12-22 08:57:30',
                "statusCode": "200",
                "status": "200"
            },
            headers: {
                authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlzMTk5OTk5OTk5NzhAZ21haWwuY29tIiwiaWF0IjoxNjA3NTA5ODk3fQ.xZwna-9ZwmzoeMnR9sF9fUluxct237eRcqrmmHxLB8w`,
                ip: null
            },
        });
        var res = httpMocks.createResponse();
        const data = await transaction.createNewTrans(req, res)
        expect(data.statusCode).to.equal(503)
        expect(data.finished).to.be.true

        stub.restore();
    });
    it('Create transaction should throw 500 error', async () => {
        const stub = sinon.stub(service, 'createTransaction').throws(new Error())
        var req = httpMocks.createRequest({ 
            body: {
                "email": 'blaise127@gmail.com',
                "statusDesc": 'pending',
                'currency': "USD",
                "paidAmount": 3,
                "transactionId": '1115a95e-973d-4abe-9b80-bde4acf74610',
                "createdAt": '2020-12-22 08:57:30',
                "updatedAt": '2020-12-22 08:57:30',
                "statusCode": "200",
                "status": "200"
            }
        });
        var res = httpMocks.createResponse();
        const data = await transaction.createNewTrans(req, res)
        expect(res.statusCode).to.equal(500)
        expect(res.finished).to.be.true

        stub.restore();
    });

    it('getRaveStandardLink should throw be okay', async () => {
        const token = jwt.jwtSign({ role: 'main-api' }, process.env.SECRET, 1000);
        var req = httpMocks.createRequest({
            user: 'blaias129129@gmail.com'
        });
        var res = httpMocks.createResponse();
        await transaction.getRaveStandardLink(req, res)
        expect(res.statusCode).to.equal(201)
        expect(res.finished).to.be.true
    });

    it('getRaveStandardLink should throw 500 error', async () => {
        const stub = sinon.stub(billingService, 'getCurrentSubscription').throws(new Error())
        var req = httpMocks.createRequest({
            user: 'blaias129129@gmail.com'
        });
        var res = httpMocks.createResponse();
        await transaction.getRaveStandardLink(req, res)
        expect(res.statusCode).to.equal(500)
        expect(res.finished).to.be.true
        stub.restore()
    });
})

