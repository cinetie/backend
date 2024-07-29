import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { config } from 'dotenv';
import sinon  from 'sinon'
import sinonStubPromise from 'sinon-stub-promise';
import httpMocks from 'node-mocks-http';
import sales from '../controllers/sales'
import service from '../services/salesService';
import app from '../index';

config();
chai.use(chaiHttp);
chai.should();
sinonStubPromise(sinon);

describe("SALES CONTROLLER", (req, res, status) => {
  it("Test getSalesInTimeRange by Get Sales by Time range", async () => {
    const req = httpMocks.createRequest({
      body: {
        start: "2020-11-31",
        end: "2021-12-14",
      },
    });
    const res = httpMocks.createResponse();
    const data = await sales.getSalesInTimeRange(req, res);
    expect(data.statusCode).to.equal(200);
  });
  it("Test getSalesInTimeRange should return 400 when there is null", async () => {
    const stub = sinon.stub(service, "getSalesInTimeRange").callsFake(() => {
      return null;
    });
    const req = httpMocks.createRequest({
      body: {
        start: "2020-11-31",
        end: "2021-12-14",
      },
    });
    const res = httpMocks.createResponse();
    await sales.getSalesInTimeRange(req, res);
    stub.restore();
    expect(res.statusCode).to.equal(400);
  });

  it("Test getSalesInTimeRange should return 500 when there is a server error", async () => {
    const stub = sinon.stub(service, "getSalesInTimeRange").throws(new Error());
    const req = httpMocks.createRequest({
      body: {
        start: "2020-11-31",
        end: "2021-12-14",
      },
    });
    const res = httpMocks.createResponse();
    await sales.getSalesInTimeRange(req, res);
    stub.restore();
    expect(res.statusCode).to.equal(503);
  });

  it("Test getSalesByModeOfPayment by Get Sales by Mode of Payment", async () => {
    const req = httpMocks.createRequest({
      query: {
        mode: "spenn",
      },
    });
    const res = httpMocks.createResponse();
    const data = await sales.getSalesByModeOfPayment(req, res);
    expect(data.statusCode).to.equal(200);
  });

  it("Test getSalesByModeOfPayment should return 400 when there is null", async () => {
    const stub = sinon
      .stub(service, "getSalesByModeOfPayment")
      .callsFake(() => {
        return null;
      });

    const req = httpMocks.createRequest({
      query: {
        mode: "spenn",
      },
    });
    const res = httpMocks.createResponse();
    await sales.getSalesByModeOfPayment(req, res);
    stub.restore();
    expect(res.statusCode).to.equal(400);
  });

  it("Test getSalesInTimeRange should return 500 when there is a server error", async () => {
    const stub = sinon
      .stub(service, "getSalesByModeOfPayment")
      .throws(new Error());
    const req = httpMocks.createRequest({
      query: {
        mode: "spenn",
      },
    });
    const res = httpMocks.createResponse();
    await sales.getSalesByModeOfPayment(req, res);
    stub.restore();
    expect(res.statusCode).to.equal(503);
  });

  it("Test getAllSales should Get all Sales Should be OK", async () => {
    const req = httpMocks.createRequest({
      query: {
        mode: "spenn",
      },
    });
    const res = httpMocks.createResponse();
    const data = await sales.getAllSales(req, res);
    expect(data.statusCode).to.equal(200);
  });

  it("Test getAllSales should return 400 when there is empty", async () => {
    const stub = sinon.stub(service, "getAllSaless").callsFake(() => {
      return [];
    });
    const req = httpMocks.createRequest({
      query: {
        mode: "spenn",
      },
    });
    const res = httpMocks.createResponse();
    const data = await sales.getAllSales(req, res);
    stub.restore();
    expect(data.statusCode).to.equal(400);
  });

  it("Test getAllSales should return 500 when there is a server error", async () => {
    const stub = sinon.stub(service, "getAllSaless").throws(new Error());
    const req = httpMocks.createRequest({
      query: {
        mode: "spenn",
      },
    });
    const res = httpMocks.createResponse();
    await sales.getAllSales(req, res);
    stub.restore();
    expect(res.statusCode).to.equal(503);
  });
})

describe('ADMIN FETCH ALL SALES', (req, res, status) => {
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
    it('get all sales if the user is an admin', async () => {
      const res = await chai
        .request(app)
        .get('/sales/all')
        .set('authorization', `bearer ${adminToken}`);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property('message', 'sales retrieved successfully');
    });
    it('should return an empty array if they are not sales', async () => {
        const stub = sinon.stub(service, 'getAllSaless').callsFake(() => {
            return []});
        const res = await chai
          .request(app)
          .get('/sales/all')
          .set('authorization', `bearer ${adminToken}`);
        stub.restore();
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property('message', 'sales Not found');
      });
    it('return error message if something goes wrong', async () => {
        const stub = sinon.stub(service, 'getAllSaless').throws('Something went wrong');
        const res = await chai
          .request(app)
          .get('/sales/all')
          .set('authorization', `bearer ${adminToken}`);
        stub.restore();
        expect(res.statusCode).to.equal(503);
        expect(res.body).to.have.property('message', 'something went wrong Something went wrong');
      });
})
