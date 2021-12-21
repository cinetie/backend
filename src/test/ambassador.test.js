import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";
import app from "../index";
import sinon from 'sinon'
import AmbassadorServices from '../services/ambassadorServices';
import PromoCodeServices from '../services/promoCodeServices';

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
    const stub = sinon.stub(AmbassadorServices, 'getAmbassadorByEmail').throws('Something went wrong');
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
    const stub = sinon.stub(AmbassadorServices, 'getAmbassadorByEmail').throws('Something went wrong');
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


describe("ADMIN GET ALL PROMO CODE UTILIZATION", () => {
  let adminToken;
  before(async () => {
    const loginRes = await chai.request(app).post("/staff/login").send({
      email: "staff@example.com",
      password: "izzeddin",
    });
    adminToken = loginRes.body.data.token;
  });
  it('should return 404 if there is not promo code utilization', async () => {
    const stub = sinon.stub(PromoCodeServices, "getAllPromoCodeUtizations").callsFake(() => {
      return [];
    });
    const res = await chai
      .request(app)
      .get('/admin/promo/all')
      .set("Authorization", `Bearer ${adminToken}`)
    stub.restore()
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('message', 'No promo code utilization found yet')
  });

  it('should return 500 if there is a server error', async () => {
    const stub = sinon.stub(PromoCodeServices, "getAllPromoCodeUtizations").throws(new Error('something went wrong'))
    const res = await chai
      .request(app)
      .get('/admin/promo/all')
      .set("Authorization", `Bearer ${adminToken}`)
    stub.restore()
    expect(res).to.have.status(500);
  });

  it('should return promo code utilization', async () => {
    const res = await chai
      .request(app)
      .get('/admin/promo/all')
      .set("Authorization", `Bearer ${adminToken}`)
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message', 'all promo code utilization  fetched successfully!')
  });
});

describe("AMBASSADOR'S PROMO CODE USAGE", () => {
  let token;
  before(async () => {
    const loginRes = await chai.request(app).post("/ambassadors/login").send({
      email: "ambassador4@example.com",
      password: "user@123",
    });
    token = loginRes.body.data;
  });
  it('should return promo code utilization', async () => {
    const res = await chai
      .request(app)
      .get('/ambassadors/promocode/utilization')
      .set("Authorization", `Bearer ${token}`)
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message', 'all promo code utilization  fetched successfully!')
  });
  it('should return 404 if there is not promo code utilization', async () => {
    const stub = sinon.stub(PromoCodeServices, "getAllPromoCodeUtizationsByAmbassador").callsFake(() => {
      return [];
    });
    const res = await chai
      .request(app)
      .get('/ambassadors/promocode/utilization')
      .set("Authorization", `Bearer ${token}`)
    stub.restore()
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('message', 'No promo code utilization found yet')
  });
  it('should return 500 if there is a server error', async () => {
    const stub = sinon.stub(PromoCodeServices, "getAllPromoCodeUtizationsByAmbassador").throws(new Error('something went wrong'));
    const res = await chai
      .request(app)
      .get('/ambassadors/promocode/utilization')
      .set("Authorization", `Bearer ${token}`)
    stub.restore()
    expect(res).to.have.status(500);
  });
});

//////////////////

describe("AMBASSADOR'S INFO", () => {
  let token;
  before(async () => {
    const loginRes = await chai.request(app).post("/ambassadors/login").send({
      email: "ambassador4@example.com",
      password: "user@123",
    });
    token = loginRes.body.data;
  });
  it('should return ambassador\'s info', async () => {
    const res = await chai
      .request(app)
      .get('/ambassadors/info')
      .set("Authorization", `Bearer ${token}`)
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message', 'Ambassadors information fetched successfully!');
  });
  it('should return 500 if there is a server error', async () => {
    const stub = sinon.stub(PromoCodeServices, "getAllPromoCodeUtizationsByAmbassador").throws(new Error('something went wrong'));
    const res = await chai
      .request(app)
      .get('/ambassadors/info')
      .set("Authorization", `Bearer ${token}`)
    stub.restore()
    expect(res).to.have.status(500);
  });
});
