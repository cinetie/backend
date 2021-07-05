import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";
import jwt from "../helpers/jwt";
import app from "../index";

chai.use(chaiHttp);

const prefix = `/auth/verify?token=${jwt.jwtSign(
  "blaise1@gmail.com",
  process.env.SECRET
)}`;

describe("VERIFY EMAIL", () => {
  it("should be able to verify email", (done) => {
    chai
      .request(app)
      .get(`${prefix}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it("should be able to provide an error with malformed token", (done) => {
    chai
      .request(app)
      .get("/auth/verify/?token=eyJhbGciOiJIUzI1NiJ9.")
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.have.property(
          "message",
          "Something went wrong jwt malformed"
        );
        done();
      });
  });

//   it("should be able to provide an error with fake token", (done) => {
//     chai
//       .request(app)
//       .get(
//         "/auth/verify/?token=eyJhbGciOiJIUzI1NiJ9.ZmFrZUBnbWFpbC5jb20.Fm0mt8gdnR2hLBB_c16JhDBhyJuJR7iBYF1TIlqeOKo"
//       )
//       .end((err, res) => {
//         expect(res).to.have.status(404);
//         expect(res.body).to.have.property("message", "User not found");
//         done();
//       });
//   });
});
