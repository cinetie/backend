import chai, { expect } from "chai";
import { config } from "dotenv";
import chaiHttp from "chai-http";
import sinon from "sinon";
import { describe, it } from "mocha";
import app from "../index";
import cp from "../services/cpServices";

config();
chai.use(chaiHttp);

describe("UPDATE CP ACCOUNT TEST", () => {
  it("should update cp account", async () => {
    const loginRes = await chai.request(app).post("/cp/login").send({
      email: "cp0011@example.com",
      password: "izzeddin",
    });
    const res = await chai
      .request(app)
      .put("/cp/update")
      .set("authorization", `bearer ${loginRes.body.data}`)
      .send({
        name: "updated name",
      });
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property("message", "updated successfully");
  });
  it("should return 522 status code if there is a server error", async () => {
    const stub = sinon
      .stub(cp, "updateCp")
      .throws(new Error("something went wrong"));
    const loginRes = await chai.request(app).post("/cp/login").send({
      email: "cp0011@example.com",
      password: "izzeddin",
    });
    const res = await chai
      .request(app)
      .put("/cp/update")
      .set("authorization", `bearer ${loginRes.body.data}`)
      .send({
        name: "updated name",
      });
    stub.restore();
    expect(res.statusCode).to.equal(522);
  });
});
