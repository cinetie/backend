import chai, { expect } from "chai";
import { config } from "dotenv";
import chaiHttp from "chai-http";
import sinon from "sinon";
import { describe, it } from "mocha";
import app from "../index";
import jwt from "../helpers/jwt";
import services from "../services/tempVideoServices";

config();
chai.use(chaiHttp);

describe("GET ALL TEMP VIDEOS TEST", () => {
  let adminToken;
  before(async () => {
    const loginRes = await chai.request(app).post("/staff/login").send({
      email: "staff@example.com",
      password: "izzeddin",
    });
    adminToken = loginRes.body.data.token;
  });
  // it('should return all the tempVideos', async () => {
  //     const token = jwt.jwtSign({ user: process.env.ADMIN_USER, }, process.env.SECRET, '1d');
  //     const res = await chai
  //         .request(app)
  //         .get('/temp/all')
  //         .set('authorization', `bearer ${token}`)
  //     expect(res.statusCode).to.equal(200)
  //     expect(res.body).to.have.property('message', 'Videos found');
  // });
  it("should return 404 if not video is found", async () => {
    const stub = sinon.stub(services, "getAllVideos").callsFake(() => {
      return [];
    });
    const res = await chai
      .request(app)
      .get("/temp/all")
      .set("authorization", `bearer ${adminToken}`);
    stub.restore();
    expect(res.statusCode).to.equal(404);
    expect(res.body).to.have.property("message", "No videos available");
  });
  it("should return 503 if there is a server error", async () => {
    const stub = sinon
      .stub(services, "getAllVideos")
      .throws(new Error("Something went wrong"));
    const res = await chai
      .request(app)
      .get("/temp/all")
      .set("authorization", `bearer ${adminToken}`);
    stub.restore();
    expect(res.statusCode).to.equal(503);
  });
});
