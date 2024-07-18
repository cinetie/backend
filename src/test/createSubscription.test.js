import chai, { expect } from "chai";
import { config } from "dotenv";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";
import app from "../index";

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

  it("should add the record promo code utilization to the database and create a subcription when the user is on promo", async () => {
    const res = await chai
      .request(app)
      .put("/auth/signup/cont")
      .set("authorization", `bearer ${token}`)
    expect(res.statusCode).to.equal(201);
    expect(res.body).to.have.property("message", "Completed signup process");
  });
});
