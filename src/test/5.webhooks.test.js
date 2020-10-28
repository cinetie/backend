import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";
import WebHooks from "../controllers/webhooks";
import emptyMock from "./mock/empty.mock";
import { FlutterMocksEmpty, FlutterMocks } from "./mock/flutterwave.mock";

chai.use(chaiHttp);

const response = {
  payment_type: "",
  amount: 3,
};

const user = {
  plan: "Promo",
  email: "blaise1@gmail.com",
};
const userFake = {
  plan: "none",
};
describe("WEEBHOOKS", () => {
  it("should return 500 if no body is provided", async () => {
    const data = await WebHooks.flutterWave(
      FlutterMocksEmpty.request,
      FlutterMocksEmpty.response
      );
      expect(data.statusCode).to.be.equal(500);
  });
    
  it("should return 200 if body is provided", async () => {
    const data = await WebHooks.flutterWave(
        FlutterMocks.request,
        FlutterMocks.response
      );
      console.log(data)
      expect(data.statusCode).to.be.equal(200);
  });
    
  it("should return true", async () => {
    const data = await WebHooks.registerSalesAndEarnings(
      response,
      user,
      emptyMock.request,
      emptyMock.response
    );
    expect(data).to.be.equal(true);
  });

});
