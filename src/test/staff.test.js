import chai, { expect } from "chai";
import dotenv from "dotenv";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";
import app from "../index";
import jwt from "../helpers/jwt";


chai.use(chaiHttp);

describe("STAFF SIGN IN", () => {
  it("should return error if staff gives invalid data", (done) => {
    chai
      .request(app)
      .post("/staff/login")
      .send({
        password: "thisisapassword",
      })
      .end((err, res) => {
        expect(res).to.have.status(422);
        done();
      });
  });
  it("should return error if staff doesn't exists", (done) => {
    chai
      .request(app)
      .post("/staff/login")
      .send({
        email: "nostaff@example.com",
        password: "thisisapassword",
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
  it("should return error if staff gives wrong password", (done) => {
    chai
      .request(app)
      .post("/staff/login")
      .send({
        email: "staff@example.com",
        password: "wrongpassword",
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
  it("should return the token if the staff member has given valid credentials", (done) => {
    chai
      .request(app)
      .post("/staff/login")
      .send({
        email: "staff@example.com",
        password: "izzeddin",
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message", "Logged in successfully!");
        done();
      });
  });
});

describe("ADD NEW STAFF", () => {
  let adminToken;
  before(async () => {
    const loginRes = await chai.request(app).post("/staff/login").send({
      email: "staff@example.com",
      password: "izzeddin",
    });
    adminToken = loginRes.body.data.token;
  });

  it("should return an error if invalid data", (done) => {
    chai
      .request(app)
      .post("/staff/add")
      .set("authorization", `bearer ${adminToken}`)
      .send({
        email: "staff123@example.com",
        role: "president",
      })
      .end((err, res) => {
        expect(res).to.have.status(422);
        done();
      });
  });
  it("should return an error if the staff already exist", (done) => {
    chai
      .request(app)
      .post("/staff/add")
      .set("authorization", `bearer ${adminToken}`)
      .send({
        email: "staff3@example.com",
        role: "marketing agent",
      })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property(
          "message",
          "the staff already exists"
        );
        done();
      });
  });
  it("should return add a new user if all information are give", (done) => {
    chai
      .request(app)
      .post("/staff/add")
      .set("authorization", `bearer ${adminToken}`)
      .send({
        email: "staff3786@example.com",
        role: "admin",
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property(
          "message",
          "Staff added successfully!"
        );
        done();
      });
  });
});

describe("CHANGE STAFF MEMBER PASSWORD", () => {
  const token = jwt.jwtSign(
    { email: "staff4@example.com", role: "staff" },
    process.env.SECRET
  );
  const expiredToken = jwt.jwtSign(
    { email: "staff46898@example.com", role: "staff" },
    process.env.SECRET
  );
  it("should return an error if the staff doesn't exist exist", (done) => {
    chai
      .request(app)
      .put("/staff/password")
      .set("authorization", `bearer ${expiredToken}`)
      .send({
        newPassword: "wrongpassword",
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property("message", "Staff not found");
        done();
      });
  });
  it("should return an error if the password is invalid", (done) => {
    chai
      .request(app)
      .put("/staff/password")
      .set("authorization", `bearer ${token}`)
      .send({
        newPassword: "newp",
      })
      .end((err, res) => {
        expect(res).to.have.status(422);
        done();
      });
  });
  it("should change staff member password", (done) => {
    chai
      .request(app)
      .put("/staff/password")
      .set("authorization", `bearer ${token}`)
      .send({
        newPassword: "newpassword12",
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property(
          "message",
          "password changed successfully!"
        );
        done();
      });
  });
});
