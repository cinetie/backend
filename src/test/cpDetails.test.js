import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import { describe, it } from "mocha";
import app from "../index";
import jwt from "../helpers/jwt";
import cry from "../helpers/crypto";
import * as aws from "../helpers/aws";

chai.use(chaiHttp);

describe("GET CP DETAILS TEST", () => {
  it("should return 403 if the cp is not found", (done) => {
    const token = jwt.jwtSign(
      {
        key: cry.crypto(),
        email: "cp005",
        clientId: "deferferg-123-rgrtgtr-fr4",
      },
      process.env.SECRET,
      "1d"
    );
    chai
      .request(app)
      .get("/cp/details")
      .set("authorization", `bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property("message", "Access denied");
        done();
      });
  });
  //     it('should return the cp info when the user exist', async () => {

  //         const loginRes = await chai
  //             .request(app)
  //             .post('/cp/login')
  //             .send({
  //                 email: 'cp002@example.com',
  //                 password: 'izzeddin'
  //             });
  //         const res = await chai
  //             .request(app)
  //             .get('/cp/details')
  //             .set('authorization', `bearer ${loginRes.body.data}`)
  //         expect(res.statusCode).to.equal(200)
  //         expect(res.body).to.have.property('message', 'Data found');

  //     });
  it("should return 500 status code if there is a server error", async () => {
    const stub = sinon
      .stub(aws, "getObject")
      .throws(new Error("something went wrong"));
    const loginRes = await chai.request(app).post("/cp/login").send({
      email: "cp002@example.com",
      password: "izzeddin",
    });
    const res = await chai
      .request(app)
      .get("/cp/details")
      .set("authorization", `bearer ${loginRes.body.data}`);
    stub.restore();
    expect(res.statusCode).to.equal(500);
    expect(res.body).to.have.property("message", "Something went wrong");
  });
});
