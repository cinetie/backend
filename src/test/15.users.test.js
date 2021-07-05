import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import sinonStubPromise from "sinon-stub-promise";
import httpMocks from "node-mocks-http";
import userController from "../controllers/users";
import jwt from "../helpers/jwt";
import userService from "../services/userServices";

chai.use(chaiHttp);
chai.should();
sinonStubPromise(sinon);

describe("ACTIVATE ACCOUNT AND SUBSCRIPTION", (req, res, status) => {
  // it("Test UpdateAccountAndSubscription should be Okay", async () => {
  //   const stub = sinon.stub(jwt, "jwtVerify").callsFake(() => {
  //     return { email: "blaise12xxxxxx1@gmail.com" };
  //   });
  //   var req = httpMocks.createRequest({
  //     headers: {
  //       authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlzZTEyOTM0MEBnbWFpbC5jb20iLCJpYXQiOjE2MDc1MDY2OTR9.b-MbGrwGV0pty3xqefKUhinqz0RWchsSiwpbqflLkVE`,
  //     },
  //   });
  //   var res = httpMocks.createResponse();
  //   const data = await userController.updateAccountAndSubscription(req, res);
  //   stub.restore();
  //   expect(res.statusCode).to.equal(201);
  // });

  // it("Test UpdateAccountAndSubscription with mobile money RWANDA should be 400", async () => {
  //   const stub = sinon.stub(jwt, "jwtVerify").callsFake(() => {
  //     return { email: "blaise12xxxxxx1@gmail.com" };
  //   });
  //   const stub1 = sinon.stub(userService, "updateUser").callsFake(() => {
  //     return 5;
  //   });
  //   var req = httpMocks.createRequest({
  //     headers: {
  //       authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlzZTEyOTM0MEBnbWFpbC5jb20iLCJpYXQiOjE2MDc1MDY2OTR9.b-MbGrwGV0pty3xqefKUhinqz0RWchsSiwpbqflLkVE`,
  //     },
  //   });
  //   var res = httpMocks.createResponse();
  //   const data = await userController.updateAccountAndSubscription(req, res);
  //   stub.restore();
  //   stub1.restore();
  //   expect(res.statusCode).to.equal(400);
  // });

  // it("Test UpdateAccountAndSubscription mobile money UGANDA should be Okay", async () => {
  //   const stub = sinon.stub(jwt, "jwtVerify").callsFake(() => {
  //     return { email: "blaise12xxxxxx12@gmail.com" };
  //   });
  //   var req = httpMocks.createRequest({
  //     headers: {
  //       authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlzZTEyOTM0MEBnbWFpbC5jb20iLCJpYXQiOjE2MDc1MDY2OTR9.b-MbGrwGV0pty3xqefKUhinqz0RWchsSiwpbqflLkVE`,
  //     },
  //   });
  //   var res = httpMocks.createResponse();
  //   const data = await userController.updateAccountAndSubscription(req, res);
  //   stub.restore();
  //   expect(res.statusCode).to.equal(201);
  // });

  // it("Test UpdateAccountAndSubscription with mobile money UGANDA should be 400", async () => {
  //   const stub = sinon.stub(jwt, "jwtVerify").callsFake(() => {
  //     return { email: "blaise12xxxxxx12@gmail.com" };
  //   });
  //   const stub1 = sinon.stub(userService, "updateUser").callsFake(() => {
  //     return 5;
  //   });
  //   var req = httpMocks.createRequest({
  //     headers: {
  //       authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlzZTEyOTM0MEBnbWFpbC5jb20iLCJpYXQiOjE2MDc1MDY2OTR9.b-MbGrwGV0pty3xqefKUhinqz0RWchsSiwpbqflLkVE`,
  //     },
  //   });
  //   var res = httpMocks.createResponse();
  //   const data = await userController.updateAccountAndSubscription(req, res);
  //   stub.restore();
  //   stub1.restore();
  //   expect(res.statusCode).to.equal(400);
  // });

  // it("Test UpdateAccountAndSubscription mobile money ZAMBIA(MTN) should be Okay", async () => {
  //   const stub = sinon.stub(jwt, "jwtVerify").callsFake(() => {
  //     return { email: "blaise12xxxxxx123@gmail.com" };
  //   });
  //   var req = httpMocks.createRequest({
  //     headers: {
  //       authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlzZTEyOTM0MEBnbWFpbC5jb20iLCJpYXQiOjE2MDc1MDY2OTR9.b-MbGrwGV0pty3xqefKUhinqz0RWchsSiwpbqflLkVE`,
  //     },
  //   });
  //   var res = httpMocks.createResponse();
  //   const data = await userController.updateAccountAndSubscription(req, res);
  //   stub.restore();
  //   expect(res.statusCode).to.equal(201);
  // });

  // it("Test UpdateAccountAndSubscription with mobile money ZAMBIA(MTN) should be 400", async () => {
  //   const stub = sinon.stub(jwt, "jwtVerify").callsFake(() => {
  //     return { email: "blaise12xxxxxx123@gmail.com" };
  //   });
  //   const stub1 = sinon.stub(userService, "updateUser").callsFake(() => {
  //     return 5;
  //   });
  //   var req = httpMocks.createRequest({
  //     headers: {
  //       authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlzZTEyOTM0MEBnbWFpbC5jb20iLCJpYXQiOjE2MDc1MDY2OTR9.b-MbGrwGV0pty3xqefKUhinqz0RWchsSiwpbqflLkVE`,
  //     },
  //   });
  //   var res = httpMocks.createResponse();
  //   const data = await userController.updateAccountAndSubscription(req, res);
  //   stub.restore();
  //   stub1.restore();
  //   expect(res.statusCode).to.equal(400);
  // });

  // it("Test UpdateAccountAndSubscription mobile money ZAMBIA(ZAMTEL) should be Okay", async () => {
  //   const stub = sinon.stub(jwt, "jwtVerify").callsFake(() => {
  //     return { email: "blaise12xxxxxx1234@gmail.com" };
  //   });
  //   var req = httpMocks.createRequest({
  //     headers: {
  //       authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlzZTEyOTM0MEBnbWFpbC5jb20iLCJpYXQiOjE2MDc1MDY2OTR9.b-MbGrwGV0pty3xqefKUhinqz0RWchsSiwpbqflLkVE`,
  //     },
  //   });
  //   var res = httpMocks.createResponse();
  //   const data = await userController.updateAccountAndSubscription(req, res);
  //   stub.restore();
  //   expect(res.statusCode).to.equal(201);
  // });

  // it("Test UpdateAccountAndSubscription with mobile money ZAMBIA(ZAMTEL) should be 400", async () => {
  //   const stub = sinon.stub(jwt, "jwtVerify").callsFake(() => {
  //     return { email: "blaise12xxxxxx1234@gmail.com" };
  //   });
  //   const stub1 = sinon.stub(userService, "updateUser").callsFake(() => {
  //     return 5;
  //   });
  //   var req = httpMocks.createRequest({
  //     headers: {
  //       authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlzZTEyOTM0MEBnbWFpbC5jb20iLCJpYXQiOjE2MDc1MDY2OTR9.b-MbGrwGV0pty3xqefKUhinqz0RWchsSiwpbqflLkVE`,
  //     },
  //   });
  //   var res = httpMocks.createResponse();
  //   const data = await userController.updateAccountAndSubscription(req, res);
  //   stub.restore();
  //   stub1.restore();
  //   expect(res.statusCode).to.equal(400);
  // });

  // it("Test UpdateAccountAndSubscription with mobile money ZAMBIA(ZAMTEL) should be 400", async () => {
  //   const stub = sinon.stub(jwt, "jwtVerify").callsFake(() => {
  //     return { email: "blaise12xxxxxx1234@gmail.com" };
  //   });
  //   const stub1 = sinon.stub(userService, "updateUser").throws(new Error());
  //   var req = httpMocks.createRequest({
  //     headers: {
  //       authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlzZTEyOTM0MEBnbWFpbC5jb20iLCJpYXQiOjE2MDc1MDY2OTR9.b-MbGrwGV0pty3xqefKUhinqz0RWchsSiwpbqflLkVE`,
  //     },
  //   });
  //   var res = httpMocks.createResponse();
  //   const data = await userController.updateAccountAndSubscription(req, res);
  //   stub.restore();
  //   stub1.restore();
  //   expect(res.statusCode).to.equal(500);
  // });

  // it("Test UpdateAccountAndSubscription mobile money ZAMBIA(ZAMTEL) should be Okay", async () => {
  //   const stub = sinon.stub(jwt, "jwtVerify").callsFake(() => {
  //     return { email: "blaise12xxxxxx12345@gmail.com" };
  //   });
  //   var req = httpMocks.createRequest({
  //     headers: {
  //       authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlzZTEyOTM0MEBnbWFpbC5jb20iLCJpYXQiOjE2MDc1MDY2OTR9.b-MbGrwGV0pty3xqefKUhinqz0RWchsSiwpbqflLkVE`,
  //     },
  //   });
  //   var res = httpMocks.createResponse();
  //   const data = await userController.updateAccountAndSubscription(req, res);
  //   stub.restore();
  //   expect(res.statusCode).to.equal(201);
  // });

  // it("Test UpdateAccountAndSubscription with mobile money ZAMBIA(ZAMTEL) should be 400", async () => {
  //   const stub = sinon.stub(jwt, "jwtVerify").callsFake(() => {
  //     return { email: "blaise12xxxxxx12345@gmail.com" };
  //   });
  //   const stub1 = sinon.stub(userService, "updateUser").callsFake(() => {
  //     return 5;
  //   });
  //   var req = httpMocks.createRequest({
  //     headers: {
  //       authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlzZTEyOTM0MEBnbWFpbC5jb20iLCJpYXQiOjE2MDc1MDY2OTR9.b-MbGrwGV0pty3xqefKUhinqz0RWchsSiwpbqflLkVE`,
  //     },
  //   });
  //   var res = httpMocks.createResponse();
  //   const data = await userController.updateAccountAndSubscription(req, res);
  //   stub.restore();
  //   stub1.restore();
  //   expect(res.statusCode).to.equal(400);
  // });

  // it("Test UpdateAccountAndSubscription mobile money ZAMBIA(ZAMTEL) should be Okay", async () => {
  //   const stub = sinon.stub(jwt, "jwtVerify").callsFake(() => {
  //     return { email: "blaise12xxxxxx123456@gmail.com" };
  //   });
  //   var req = httpMocks.createRequest({
  //     headers: {
  //       authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlzZTEyOTM0MEBnbWFpbC5jb20iLCJpYXQiOjE2MDc1MDY2OTR9.b-MbGrwGV0pty3xqefKUhinqz0RWchsSiwpbqflLkVE`,
  //     },
  //   });
  //   var res = httpMocks.createResponse();
  //   const data = await userController.updateAccountAndSubscription(req, res);
  //   stub.restore();
  //   expect(res.statusCode).to.equal(201);
  // });

  // it("Test UpdateAccountAndSubscription with mobile money ZAMBIA(ZAMTEL) should be 400", async () => {
  //   const stub = sinon.stub(jwt, "jwtVerify").callsFake(() => {
  //     return { email: "blaise12xxxxxx123456@gmail.com" };
  //   });
  //   const stub1 = sinon.stub(userService, "updateUser").callsFake(() => {
  //     return 5;
  //   });
  //   var req = httpMocks.createRequest({
  //     headers: {
  //       authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlzZTEyOTM0MEBnbWFpbC5jb20iLCJpYXQiOjE2MDc1MDY2OTR9.b-MbGrwGV0pty3xqefKUhinqz0RWchsSiwpbqflLkVE`,
  //     },
  //   });
  //   var res = httpMocks.createResponse();
  //   const data = await userController.updateAccountAndSubscription(req, res);
  //   stub.restore();
  //   stub1.restore();
  //   expect(res.statusCode).to.equal(400);
  // });

  // it("Test UpdateAccountAndSubscription mobile money ZAMBIA(ZAMTEL) should be Okay", async () => {
  //   const stub = sinon.stub(jwt, "jwtVerify").callsFake(() => {
  //     return { email: "blaise12xxxxxx1234567@gmail.com" };
  //   });
  //   var req = httpMocks.createRequest({
  //     headers: {
  //       authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlzZTEyOTM0MEBnbWFpbC5jb20iLCJpYXQiOjE2MDc1MDY2OTR9.b-MbGrwGV0pty3xqefKUhinqz0RWchsSiwpbqflLkVE`,
  //     },
  //   });
  //   var res = httpMocks.createResponse();
  //   const data = await userController.updateAccountAndSubscription(req, res);
  //   stub.restore();
  //   expect(res.statusCode).to.equal(201);
  // });

  // it("Test UpdateAccountAndSubscription with mobile money ZAMBIA(ZAMTEL) should be 400", async () => {
  //   const stub = sinon.stub(jwt, "jwtVerify").callsFake(() => {
  //     return { email: "blaise12xxxxxx1234567@gmail.com" };
  //   });
  //   const stub1 = sinon.stub(userService, "updateUser").callsFake(() => {
  //     return 5;
  //   });
  //   var req = httpMocks.createRequest({
  //     headers: {
  //       authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlzZTEyOTM0MEBnbWFpbC5jb20iLCJpYXQiOjE2MDc1MDY2OTR9.b-MbGrwGV0pty3xqefKUhinqz0RWchsSiwpbqflLkVE`,
  //     },
  //   });
  //   var res = httpMocks.createResponse();
  //   const data = await userController.updateAccountAndSubscription(req, res);
  //   stub.restore();
  //   stub1.restore();
  //   expect(res.statusCode).to.equal(400);
  // });
});
