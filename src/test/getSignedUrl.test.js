import chai, { expect } from "chai";
import { config } from "dotenv";
import chaiHttp from "chai-http";
import sinon from "sinon";
import { describe, it } from "mocha";
import app from "../index";
import jwt from "../helpers/jwt";
import services from "../services/tempVideoServices";
import * as aws from "../helpers/aws";

config();
chai.use(chaiHttp);

describe("GET SIGNED URL TEST", () => {
  let adminToken;
  before(async () => {
    const loginRes = await chai.request(app).post("/staff/login").send({
      email: "staff@example.com",
      password: "izzeddin",
    });
    adminToken = loginRes.body.data.token;
  });
  //     it('should return the signed object', async () => {
  //         const token = jwt.jwtSign({ user: process.env.ADMIN_USER, }, process.env.SECRET, '1d');
  //         const res = await chai
  //             .request(app)
  //             .get('/temp/signed-urls')
  //             .set('authorization', `bearer ${token}`)
  //         expect(res.statusCode).to.equal(200)
  //         expect(res.body).to.have.property('message', 'Temporary urls');
  //         expect(res.body.data).to.be.an('object');
  //     });
  it("should return 500 if there is a server error", async () => {
    const stub = sinon
      .stub(aws, "getSignedUrl")
      .throws(new Error("Something went wrong"));
    const res = await chai
      .request(app)
      .get("/temp/signed-urls")
      .set("authorization", `bearer ${adminToken}`);
    stub.restore();
    expect(res.statusCode).to.equal(500);
  });
});
