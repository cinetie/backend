import chai, { expect } from "chai";
import { config } from "dotenv";
import chaiHttp from "chai-http";
import sinon from "sinon";
import { describe, it } from "mocha";
import jwt from "../helpers/jwt";
import app from "../index";
import services from "../services/serieServices";

config();
chai.use(chaiHttp);
describe("GET SINGLE EPISODE TEST", () => {
  it("should return an error if the user doesn't exist", async () => {
    const token = jwt.jwtSign(
      { email: "user34500@example.com" },
      process.env.SECRET
    );
    const res = await chai
      .request(app)
      .get("/series/ep")
      .query({ ep: 150 })
      .set("authorization", `bearer ${token}`);
    expect(res.statusCode).to.equal(400);
    expect(res.body).to.have.property("message", "Invalid Token");
  });
  it("should return an error message if the user doesn't have permission to get the episode", async () => {
    const loginRes = await chai.request(app).post("/auth/login").send({
      email: "user1234@example.com",
      password: "izzeddin",
    });
    const res = await chai
      .request(app)
      .get("/series/ep")
      .query({ ep: 150 })
      .set("authorization", `bearer ${loginRes.body.data}`);
    expect(res.statusCode).to.equal(402);
    expect(res.body).to.have.property("message", "Please set up your billing");
  });
  it("should return a single episode", async () => {
    const loginRes = await chai.request(app).post("/auth/login").send({
      email: "user123@example.com",
      password: "izzeddin",
    });
    const res = await chai
      .request(app)
      .get("/series/ep")
      .query({ ep: 150 })
      .set("authorization", `bearer ${loginRes.body.data}`);
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property("message", "Retrieved successfully");
  });
  it("should return 400 if the episode can't be found", async () => {
    const loginRes = await chai.request(app).post("/auth/login").send({
      email: "user123@example.com",
      password: "izzeddin",
    });
    const res = await chai
      .request(app)
      .get("/series/ep")
      .query({ ep: 1500 })
      .set("authorization", `bearer ${loginRes.body.data}`);
    expect(res.statusCode).to.equal(400);
    expect(res.body).to.have.property(
      "message",
      "Can't find what you requested"
    );
  });
  it("should return 500 if there is a server error", async () => {
    const stub = sinon
      .stub(services, "getSingleEpisode")
      .throws("something went wrong");
    const loginRes = await chai.request(app).post("/auth/login").send({
      email: "user123@example.com",
      password: "izzeddin",
    });
    const res = await chai
      .request(app)
      .get("/series/ep")
      .query({ ep: undefined })
      .set("authorization", `bearer ${loginRes.body.data}`);
    stub.restore();
    expect(res.statusCode).to.equal(500);
  });
});
