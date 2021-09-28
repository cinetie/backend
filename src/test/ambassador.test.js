import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";
import app from "../index";
import sinon  from 'sinon'
import AmbassadorServices from '../services/ambassadorServices';

chai.use(chaiHttp);



describe("AMBASSADORS SIGNUP", () => {
    const prefix = "/ambassadors/signup";
  it("AMBASSADORS should get an error if they try to sign up with incomplete inputs", (done) => {
    chai
      .request(app)
      .post(`${prefix}`)
      .send({
        email: 'user@example.com'
      })
      .end((err, res) => {
        expect(res).to.have.status(422);
        done();
      });
  });
  it("should signup AMBASSADORS with complete inputs", (done) => {
    chai
      .request(app)
      .post(`${prefix}`)
      .send({
        firstName: "user",
        lastName: "user",
        email: "user1@example.com",
        password: "user@123",
        phoneNumber: "250784556789",
        region: "Rwanda"
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message', 'Signed up successfully');
        done();
      });
  });

  it("AMBASSADORS can't signup if the email is already taken", (done) => {
    chai
      .request(app)
      .post(`${prefix}`)
      .send({
        firstName: "user",
        lastName: "user",
        email: "user1@example.com",
        password: "user@123",
        phoneNumber: "250784556789",
        region: "Rwanda"
      })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property("message", "Email already exists");
        done();
      });
  });
  it('return error message if something goes wrong', (done) => {
    const stub = sinon.stub(AmbassadorServices, 'getAmbassadorByMail').throws('Something went wrong');
    chai
      .request(app)
      .post(`${prefix}`)
      .send({
        firstName: "user",
        lastName: "user",
        email: "user1@example.com",
        password: "user@123",
        phoneNumber: "250784556789",
        region: "Rwanda"
      })
      .end((err, res) => {
            stub.restore()
            expect(res).to.have.status(500);
            done();
      });
  });
});

describe("AMBASSADORS login", () => {
    const prefix = "/ambassadors/login";
    it("should login AMBASSADORS with complete inputs", (done) => {
      chai
        .request(app)
        .post(`${prefix}`)
        .send({
          email: "user2@example.com",
          password: "user@123",
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message', 'Logged in successfully!');
          done();
        });
    });
  
    it("AMBASSADORS can't login if they are not verified yet", (done) => {
      chai
        .request(app)
        .post(`${prefix}`)
        .send({
          email: "user3@example.com",
          password: "user@123",
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("message", "Ambassador not verified yet");
          done();
        });
    });
    it('return error message if something goes wrong', (done) => {
      const stub = sinon.stub(AmbassadorServices, 'getAmbassadorByMail').throws('Something went wrong');
      chai
        .request(app)
        .post(`${prefix}`)
        .send({

          email: "user3@example.com",
          password: "user@123",
        })
        .end((err, res) => {
              stub.restore()
              expect(res).to.have.status(500);
              done();
        });
    });
  });