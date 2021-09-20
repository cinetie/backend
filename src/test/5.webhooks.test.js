import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";
import sinon from "sinon";
import WebHooks, { Transaction } from "../controllers/webhooks";
import transactions from "../services/transactionService";
import emptyMock from "./mock/empty.mock";
import {
  FlutterMocksEmpty,
  FlutterMocks,
  FlutterMocksError,
  verifyTransResponse,
  verifyTransResponseFailed,
} from "./mock/flutterwave.mock";

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
const transPassFake = {
  // Faking a successful transaction
  status: "success",
  statusCode: 200,
  data: {
    card: {
      token: "nuornuonoenfoenoenonn",
    },
    amount: 250,
  },
};

const transFailFake = {
  // Faking a successful transaction
  status: "fail",
  statusCode: 200,
  data: {
    card: {
      token: "nuornuonoenfoenoenonn",
    },
    amount: 250,
  },
};

describe("WEBHOOKS", () => {
  it("should return 500 if no body is provided", async () => {
    const stub = sinon
      .stub(transactions, "updateTransaction")
      .throws(new Error());
    const data = await WebHooks.flutterWave(
      FlutterMocksError.request,
      FlutterMocksError.response
    );
    stub.restore();
    expect(data.statusCode).to.be.equal(500);
    return 0;
  });

  it("should return 200 if body is provided", async () => {
    const stub = sinon.stub(WebHooks, "transVerification").callsFake(() => {
      return verifyTransResponse;
    });
    const data = await WebHooks.flutterWave(
      FlutterMocks.request,
      FlutterMocks.response
    );
    stub.restore();

    expect(data.statusCode).to.be.equal(200);
    return 0;
  });

  it("should return 400 if transaction verification returned a failed status", async () => {
    const stub = sinon.stub(WebHooks, "transVerification").callsFake(() => {
      return verifyTransResponseFailed;
    });
    const data = await WebHooks.flutterWave(
      FlutterMocks.request,
      FlutterMocks.response
    );
    stub.restore();
    expect(data.statusCode).to.be.equal(400);
  });

  it("should return true", async () => {
    const data = await WebHooks.registerSales(
      response,
      user,
      emptyMock.request,
      emptyMock.response
    );
    expect(data).to.be.equal(true);
    return 0;
  });
});
