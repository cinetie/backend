import chai, { expect } from "chai";
import { config } from "dotenv";
import chaiHttp from "chai-http";
import sinon from "sinon";
import { describe, it } from "mocha";
import app from "../index";
import earningsService from "../services/earningServices";

config();
chai.use(chaiHttp);

describe("GET CP ALL EARNINGS", () => {
  it("should return the cp total earning per episode", async () => {
    const loginRes = await chai.request(app).post("/cp/login").send({
      email: "cp0009@example.com",
      password: "izzeddin",
    });
    const res = await chai
      .request(app)
      .get("/cp/earnings")
      .set("authorization", `bearer ${loginRes.body.data}`);
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property("message", "Earnings found ");
    expect(res.body.data.sum).to.be.a("number");
  });
  it("should return 404 status code if no earning is found", async () => {
    const loginRes = await chai.request(app).post("/cp/login").send({
      email: "cp0010@example.com",
      password: "izzeddin",
    });
    const res = await chai
      .request(app)
      .get("/cp/earnings")
      .set("authorization", `bearer ${loginRes.body.data}`);
    expect(res.statusCode).to.equal(404);
    expect(res.body).to.have.property("message", "Data Not found");
    expect(res.body.data).to.equal(0);
  });
  it("should return 500 status code if there is a server error", async () => {
    const stub = sinon
      .stub(earningsService, "getEarningsByClientId")
      .throws("something went wrong");
    const loginRes = await chai.request(app).post("/cp/login").send({
      email: "cp0009@example.com",
      password: "izzeddin",
    });
    const res = await chai
      .request(app)
      .get("/cp/earnings")
      .set("authorization", `bearer ${loginRes.body.data}`);
    stub.restore();
    expect(res.statusCode).to.equal(500);
    expect(res.body).to.have.property("message", "Something happened");
  });
});
