import chai, { expect } from "chai";
import { config } from "dotenv";
import chaiHttp from "chai-http";
import sinon from "sinon";
import { describe, it } from "mocha";
import services from "../services/serieServices";
import jwt from "../helpers/jwt";
import * as aws from "../helpers/aws";
import app from "../index";

config();
chai.use(chaiHttp);

describe("DELETE AN EPISODE TEST", () => {
  let adminToken;
  before(async () => {
    const loginRes = await chai.request(app).post("/staff/login").send({
      email: "staff@example.com",
      password: "izzeddin",
    });
    adminToken = loginRes.body.data.token;
  });
  it("should delete an episode", async () => {
    const stub = sinon.stub(aws, "deleteObject").callsFake(() => []);
    const res = await chai
      .request(app)
      .delete("/series/delete/151")
      .set("authorization", `bearer ${adminToken}`);
    stub.restore();
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property("message", "deleted easily");
  });
  it("should return 400 if the aws file wasn't deleted", async () => {
    const stub = sinon.stub(aws, "deleteObject").callsFake(() => [1]);
    const res = await chai
      .request(app)
      .delete("/series/delete/151")
      .set("authorization", `bearer ${adminToken}`);
    stub.restore();
    expect(res.statusCode).to.equal(400);
    expect(res.body).to.have.property(
      "message",
      "Can't find what you requested"
    );
  });
  it("should return 400 status code if the user can't delete an episode", async () => {
    const res = await chai
      .request(app)
      .delete("/series/delete/15154")
      .set("authorization", `bearer ${adminToken}`);
    expect(res.statusCode).to.equal(400);
    expect(res.body).to.have.property(
      "message",
      "Can't find what you requested"
    );
  });
  it("should return 500 status code if there is a  server error", async () => {
    const stub = sinon
      .stub(services, "getSingleEpisode")
      .throws("Something went wrong");
    const res = await chai
      .request(app)
      .delete("/series/delete/15156")
      .set("authorization", `bearer ${adminToken}`);
    stub.restore();
    expect(res.statusCode).to.equal(500);
  });
});

describe("DELETE TEMP EPISODE TEST", () => {
  let adminToken;
  before(async () => {
    const loginRes = await chai.request(app).post("/staff/login").send({
      email: "staff@example.com",
      password: "izzeddin",
    });
    adminToken = loginRes.body.data.token;
  });
  it("should delete a temporary episode", async () => {
    const stub = sinon.stub(aws, "deleteObject").callsFake(() => []);
    const res = await chai
      .request(app)
      .delete("/series/delete/temp/163")
      .set("authorization", `bearer ${adminToken}`);
    stub.restore();
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property("message", "deleted easily");
  });
  it("should return 400 if the aws file wasn't deleted on aws", async () => {
    const stub = sinon.stub(aws, "deleteObject").callsFake(() => [1]);
    const res = await chai
      .request(app)
      .delete("/series/delete/temp/164")
      .set("authorization", `bearer ${adminToken}`);
    stub.restore();
    expect(res.statusCode).to.equal(400);
    expect(res.body).to.have.property(
      "message",
      "Can't find what you requested"
    );
  });
  it("should return 400 status code if the user can't delete a temporary episode", async () => {
    const res = await chai
      .request(app)
      .delete("/series/delete/temp/15154")
      .set("authorization", `bearer ${adminToken}`);
    expect(res.statusCode).to.equal(400);
    expect(res.body).to.have.property(
      "message",
      "Can't find what you requested"
    );
  });
  it("should return 500 status code if there is a  server error", async () => {
    const stub = sinon
      .stub(services, "getSingleEpisode")
      .throws("Something went wrong");
    const res = await chai
      .request(app)
      .delete("/series/delete/15156")
      .set("authorization", `bearer ${adminToken}`);
    stub.restore();
    expect(res.statusCode).to.equal(500);
  });
});
