import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import { describe, it } from "mocha";
import jwt from "../helpers/jwt";
import date from "../helpers/date";
import * as mailer from "../helpers/mailer";
import app from "../index";

chai.use(chaiHttp);
describe("RESET CP PASSWORD TEST", () => {
  it("should return 404 status code if the user is not found", async () => {
    const token = jwt.jwtSign(
      { exp: new Date().getTime() },
      process.env.SECRET,
      "1d"
    );
    const res = await chai
      .request(app)
      .get("/cp/verify/")
      .query({ id: 10045667, token })
      .send({
        password: "newpassword",
      });
    expect(res.statusCode).to.equal(404);
    expect(res.body).to.have.property("message", "can't find user");
  });
  it("should redirect the user after verifying", async () => {
    const token = jwt.jwtSign(
      { exp: new Date().getTime() },
      process.env.SECRET,
      "1d"
    );
    const res = await chai
      .request(app)
      .get("/cp/verify/")
      .query({ id: 1007, token })
      .redirects(0);
    expect(res.statusCode).to.equal(200);
  });
  it("should redirect the user after verifying", async () => {
    const stub = sinon
      .stub(mailer, "default")
      .throws(new Error("something went wrong"));
    const token = jwt.jwtSign(
      { exp: new Date().getTime() },
      process.env.SECRET,
      "1d"
    );
    const res = await chai
      .request(app)
      .get("/cp/verify/")
      .query({ id: 1007, token })
      .redirects(0);
    stub.restore();
    expect(res.statusCode).to.equal(500);
    expect(res.body.message.includes("Something went wrong")).to.be.true;
  });
});
