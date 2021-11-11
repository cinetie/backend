import chai, { expect } from "chai";
import mocks from "node-mocks-http";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";
import changeSubscription from '../middlewares/updateSubscription';
import jwt from "../helpers/jwt";
import app from "../index";
import sinon from "sinon";
chai.use(chaiHttp);
const response = mocks.createResponse();
const createRequest = (plan, token) => {
    return {
        body: {
            plan,
        },
        headers: {
            authorization: `Bearer ${token}`,
        },
    }
}

describe("change plan Middleware", () => {

    it("should return 404 if the plan doesn't exist", async () => {
        const email = 'nonexistantuser@example.com';
        const token = jwt.jwtSign({ email, clientId: '0' }, process.env.SECRET, "1d");
        const data = await changeSubscription(
            createRequest('fullyearfreeplan', token),
            response
        );
        expect(data.statusCode).to.be.equal(404);
    });
    it('should return 404 if the user doesn\'t have a subscription', async () => {
        const email = 'userwithoutsubscription@example.com';
        const token = jwt.jwtSign({ email, clientId: '0' }, process.env.SECRET, "1d");
        const data = await changeSubscription(
            createRequest('Premium', token),
            response
        );
        expect(data.statusCode).to.be.equal(404);
    });
    it('should return 201 when their subscription is changed', async () => {
        const nextSpy = sinon.spy();
        const email = 'subscribedusern@example.com';
        const token = jwt.jwtSign({ email, clientId: '0' }, process.env.SECRET, "1d");
        const data = await changeSubscription(
            createRequest('Premium', token),
            response,
            nextSpy
        );
        expect(nextSpy.calledOnce).to.be.true;
    });
});
