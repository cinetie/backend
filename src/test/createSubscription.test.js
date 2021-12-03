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

describe("ADD PROMOCODE UTILIZATION", () => {
  let token;
  before(async () => {
    const loginRes = await chai.request(app).post("/auth/login").send({
      email: "promocode@example.com",
      password: "nAdia123",
    });
    token = loginRes.body.data;
  });

  it("should return 404 if the serie is not found", async () => {
    const res = await chai
      .request(app)
      .put("/auth/signup/cont")
      .set("authorization", `bearer ${token}`)
    expect(res.statusCode).to.equal(201);
    expect(res.body).to.have.property("message", "Completed signup process");
  });
});
