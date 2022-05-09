import chai, { expect } from "chai";
import { config } from "dotenv";
import chaiHttp from "chai-http";
import sinon from "sinon";
import { describe, it } from "mocha";
import planServices from "../services/planServices";
import app from "../index";

config();
chai.use(chaiHttp);

describe("CREATE SUBSCRIPTION", () => {
    it("should not create a new subscription if the user has provided invalid information", async () => {
        const loginRes = await chai.request(app).post("/auth/login").send({
            email: "dpo@example.com",
            password: "nAdia123",
        });
        console.log(loginRes.body);
        const res = await chai
            .request(app)
            .post("/subscription/subscribe")
            .set("authorization", `bearer ${loginRes.body.data}`)
            .send({
                paymentMethod: '149',
                plan: "updated episode",
            });
        expect(res.statusCode).to.equal(422);
    });
    it("should create a new subscription if the user has provided valid information", async () => {
        const loginRes = await chai.request(app).post("/auth/login").send({
            email: "dpo@example.com",
            password: "nAdia123",
        });
        const res = await chai
            .request(app)
            .post("/subscription/subscribe")
            .set("authorization", `bearer ${loginRes.body.data}`)
            .send({
                paymentMethod: 3,
                plan: "Promo",
                isBilledAnnually: true
            });
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.have.property("message", "Subscription created successfully");

    });
    it("should return an error if the user already have an active subscription", async () => {
        const loginRes = await chai.request(app).post("/auth/login").send({
            email: "dpo1@example.com",
            password: "nAdia123",
        });
        const res = await chai
            .request(app)
            .post("/subscription/subscribe")
            .set("authorization", `bearer ${loginRes.body.data}`)
            .send({
                paymentMethod: 3,
                plan: "Promo",
                isBilledAnnually: true
            });
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property("message", "user already subscribed and payed for the subscription");

    });
    it("should return an error if the plan provided doesn't exist", async () => {
        const stub = sinon.stub(planServices, "getParticalPlan").callsFake(() => {
            return null;
          });
        const loginRes = await chai.request(app).post("/auth/login").send({
            email: "dpo1@example.com",
            password: "nAdia123",
        });
        const res = await chai
            .request(app)
            .post("/subscription/subscribe")
            .set("authorization", `bearer ${loginRes.body.data}`)
            .send({
                paymentMethod: 3,
                plan: "Promo",
                isBilledAnnually: true
            });
        stub.restore();
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property("message", "an invalid subscription plan was submitted. review the plan given and modified to accepted plans");

    });
});
