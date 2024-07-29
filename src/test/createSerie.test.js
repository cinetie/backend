import chai, { expect } from "chai";
import { config } from "dotenv";
import chaiHttp from "chai-http";
import sinon from "sinon";
import { describe, it } from "mocha";
import jwt from "../helpers/jwt";
import app from "../index";
import temp from "../services/tempSerieService";
import * as aws from "../helpers/aws";

config();
chai.use(chaiHttp);

describe("CREATE EPISODE TEST", () => {
  let adminToken;
  before(async () => {
    const loginRes = await chai.request(app).post("/staff/login").send({
      email: "staff@example.com",
      password: "izzeddin",
    });
    adminToken = loginRes.body.data.token;
  });
  //     it('should add a new episode', async () => {
  //         const stub = sinon.stub(aws, 'copyObjects').callsFake(() => {
  //             return { status: 'success' }
  //         })
  //         const token = jwt.jwtSign({ user: process.env.ADMIN_USER, }, process.env.SECRET, '1d');
  //         const res = await chai
  //             .request(app)
  //             .post('/series/create')
  //             .set('authorization', `bearer ${token}`)
  //             .query({ id: 160 });
  //         stub.restore();
  //         expect(res.statusCode).to.equal(201)
  //         expect(res.body).to.have.property('message', 'Created successfully');
  //     });

  it("should return 404 if the serie is not found", async () => {
    const stub = sinon
      .stub(aws, "copyObjects")
      .throws(new Error("something went wrong"));
    const res = await chai
      .request(app)
      .post("/series/create")
      .set("authorization", `bearer ${adminToken}`)
      .query({ id: 1610 });
    stub.restore();
    expect(res.statusCode).to.equal(404);
    expect(res.body).to.have.property("message", "Serie not found");
  });
  it("should return 500 if there is a server error", async () => {
    const stub = sinon
      .stub(jwt, "jwtVerify")
      .throws(new Error("something went wrong"));
    const res = await chai
      .request(app)
      .post("/series/create")
      .set("authorization", `bearer ${adminToken}`)
      .query({ id: 162 });
    stub.restore();
    expect(res.statusCode).to.equal(500);
  });
});
