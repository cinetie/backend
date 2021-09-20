import chai, { expect } from "chai";
import sinon from "sinon";
import { Sequelize } from "sequelize";
import stopLogin from "../helpers/stopLoginSessions";
import db from "../database/models";

const { Op } = Sequelize;

describe("TEST CRON JOB", () => {
  it("should update the database", async () => {
    const stub = sinon.stub(db.loginSessions, "update");
    const start = new Date();
    const date = new Date(start.getTime());
    await stopLogin();

    expect(stub.calledOnce).to.be.true;
    sinon.assert.calledWith(
      stub,
      { state: "out", timeOut: sinon.match.string },
      {
        where: {
          createdAt: {
            [Op.lte]: sinon.match.date,
          },
        },
      }
    );
    stub.restore();
  });
});
