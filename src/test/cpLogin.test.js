import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import { describe, it } from "mocha";
import * as mailer from "../helpers/mailer";
import app from "../index";
import sessionService from "../services/loginSessionServices";

chai.use(chaiHttp);

describe("CP LOGIN TEST", () => {
  it("should return 400 status if the password or email is null", (done) => {
    chai
      .request(app)
      .post("/cp/login")
      .send({
        password: "fewfwefwefewfw",
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("message", "some fields are empty");
        done();
      });
  });
  it("should return 400 status if the password or email is null", (done) => {
    chai
      .request(app)
      .post("/cp/login")
      .send({
        password: "fewfwefwefewfw",
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("message", "some fields are empty");
        done();
      });
  });
  it("should return an error message if a short or long password is given", (done) => {
    chai
      .request(app)
      .post("/cp/login")
      .send({
        email: "cp001@example.com",
        password: "f",
      })
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body).to.have.property(
          "message",
          "You have to enter a valid password"
        );
        done();
      });
  });
  it("should return an error message if the user is not found", (done) => {
    chai
      .request(app)
      .post("/cp/login")
      .send({
        email: "cp001@example.com",
        password: "fewfwefwefewfw",
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property(
          "message",
          "Invalid email or password!"
        );
        done();
      });
  });
  it("should return an error message if the password is incorrect", (done) => {
    chai
      .request(app)
      .post("/cp/login")
      .send({
        email: "cp12@example.com",
        password: "fewfwefwefewfw",
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("message", "Passwords don't match");
        done();
      });
  });
  it("should return 200 when the cp successfully login", (done) => {
    chai
      .request(app)
      .post("/cp/login")
      .send({
        email: "cp002@example.com",
        password: "izzeddin",
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message", "Logged in successfully!");
        done();
      });
  });
  it("should return an error message if a login session can't be added", (done) => {
    const stub = sinon.stub(sessionService, "addSession").callsFake(() => {
      return null;
    });
    chai
      .request(app)
      .post("/cp/login")
      .send({
        email: "cp002@example.com",
        password: "izzeddin",
      })
      .end((err, res) => {
        stub.restore();
        expect(res).to.have.status(500);
        expect(res.body).to.have.property("message", "Can't register session");
        done();
      });
  });
  it("should return an error message if there is a server error", (done) => {
    const stub = sinon
      .stub(sessionService, "addSession")
      .throws(new Error("something went wrong"));
    chai
      .request(app)
      .post("/cp/login")
      .send({
        email: "cp002@example.com",
        password: "izzeddin",
      })
      .end((err, res) => {
        stub.restore();
        expect(res).to.have.status(500);
        expect(res.body.message.includes("Something Went wrong logging in ")).to
          .be.true;
        done();
      });
  });
});
