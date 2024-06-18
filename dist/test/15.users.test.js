"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _chai = _interopRequireWildcard(require("chai"));
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _sinon = _interopRequireDefault(require("sinon"));
var _sinonStubPromise = _interopRequireDefault(require("sinon-stub-promise"));
var _nodeMocksHttp = _interopRequireDefault(require("node-mocks-http"));
var _users = _interopRequireDefault(require("../controllers/users"));
var _jwt = _interopRequireDefault(require("../helpers/jwt"));
var _userServices = _interopRequireDefault(require("../services/userServices"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
_chai["default"].use(_chaiHttp["default"]);
_chai["default"].should();
(0, _sinonStubPromise["default"])(_sinon["default"]);
describe("ACTIVATE ACCOUNT AND SUBSCRIPTION", function (req, res, status) {
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
  // it("Test UpdateAccountAndSubscription mobile mpesa should be Okay", async () => {
  //   const stub = sinon.stub(jwt, "jwtVerify").callsFake(() => {
  //     return { email: "blaise12xxxxxx12333new@gmail.com" };
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
  // it("Test UpdateAccountAndSubscription mobile mpesa should be 400", async () => {
  //   const stub = sinon.stub(jwt, "jwtVerify").callsFake(() => {
  //     return { email: "blaise12xxxxxx12333new@gmail.com" };
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