import chai, { expect } from "chai";
import { config } from "dotenv";
import chaiHttp from "chai-http";
import sinon from "sinon";
import { describe, it } from "mocha";
import services from "../services/serieServices";
import app from "../index";

config();
chai.use(chaiHttp);

describe("UPDATE A SERIE EPISODE TEST", () => {
  it("should update an episode", async () => {
    const loginRes = await chai.request(app).post("/cp/login").send({
      email: "user1@example.com",
      password: "izzeddin",
    });
    const res = await chai
      .request(app)
      .put("/series/update")
      .set("authorization", `bearer ${loginRes.body.data}`)
      .send({
        id: 149,
        episodeName: "updated episode",
      });

    expect(res.statusCode).to.equal(201);
    expect(res.body).to.have.property("message", "Updated easily");
  });
  it("should return 400 status code if the user can't update the episode", async () => {
    const loginRes = await chai.request(app).post("/cp/login").send({
      email: "user1@example.com",
      password: "izzeddin",
    });
    const res = await chai
      .request(app)
      .put("/series/update")
      .set("authorization", `bearer ${loginRes.body.data}`)
      .send({
        id: 149000,
        episodeName: "updated episode",
      });

    expect(res.statusCode).to.equal(400);
    expect(res.body).to.have.property(
      "message",
      "Can't updated what you requested"
    );
  });
  it("should return 500 status code if there is a  server error", async () => {
    const stub = sinon.stub(services, "update").throws("Something went wrong");
    const loginRes = await chai.request(app).post("/cp/login").send({
      email: "user1@example.com",
      password: "izzeddin",
    });
    const res = await chai
      .request(app)
      .put("/series/update")
      .set("authorization", `bearer ${loginRes.body.data}`)
      .send({
        id: 149000,
        episodeName: "updated episode",
      });
    stub.restore();
    expect(res.statusCode).to.equal(500);
  });
});
