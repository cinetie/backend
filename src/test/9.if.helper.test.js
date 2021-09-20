import chai, { expect } from "chai";
import payment from "../helpers/payment";
import checker from "../helpers/If";

const success = {
  status: 200,
  message: "success",
};

const error = {
  status: 404,
  message: "error",
};

describe("IF CHECK", () => {
  it("CHECK SUCCESS", async () => {
    const results = await checker.checker(success, null);
    expect(results.status).to.be.equal(200);
    expect(results.message).to.be.equal("success");
  });

  it("CHECK ERROR", async () => {
    const results = await checker.checker(null, error);
    expect(results.status).to.be.equal(404);
    expect(results.message).to.be.equal("error");
  });
});
