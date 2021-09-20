import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import sinonStubPromise from "sinon-stub-promise";
import httpMocks from "node-mocks-http";
import sales from "../controllers/sales";
import service from "../services/salesService";

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
});
