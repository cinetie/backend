import chai, { expect } from "chai";
import { config } from "dotenv";
import chaiHttp from "chai-http";
import sinon from "sinon";
import { describe, it } from "mocha";
import app from "../index";
import earningsService from "../services/earningServices";

config();
chai.use(chaiHttp);

describe("GET CP VIDEO BY TYPE TEST", () => {
  it("should return all cp videos", async () => {
    const loginRes = await chai.request(app).post("/cp/login").send({
      email: "cp0009@example.com",
      password: "izzeddin",
    });
    const res = await chai
      .request(app)
      .get("/cp/videos")
      .set("authorization", `bearer ${loginRes.body.data}`)
      .query({ type: "movie" });
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property("message", "Data found");
    expect(res.body.data).to.be.an("array");
  });
  it("should return 404 if the cp has not videos", async () => {
    const loginRes = await chai.request(app).post("/cp/login").send({
      email: "cp0011@example.com",
      password: "izzeddin",
    });
    const res = await chai
      .request(app)
      .get("/cp/videos")
      .set("authorization", `bearer ${loginRes.body.data}`)
      .query({ type: "movie" });
    expect(res.statusCode).to.equal(400);
    expect(res.body).to.have.property("message", "Data not found");
  });
});
