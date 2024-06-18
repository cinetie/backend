"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _chai = _interopRequireWildcard(require("chai"));
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _sinon = _interopRequireDefault(require("sinon"));
var _nodeMocksHttp = _interopRequireDefault(require("node-mocks-http"));
var _sinonStubPromise = _interopRequireDefault(require("sinon-stub-promise"));
var _index = _interopRequireDefault(require("../index"));
var _billing = _interopRequireDefault(require("../middlewares/billing"));
var _userServices = _interopRequireDefault(require("../services/userServices"));
var _chackSpennTransaction = _interopRequireDefault(require("./mock/chackSpennTransaction.mock"));
var _billingServices = _interopRequireDefault(require("../services/billingServices"));
var _jwt = _interopRequireDefault(require("../helpers/jwt"));
var _webhooks = _interopRequireDefault(require("../controllers/webhooks"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// chai.use(chaiAsPromised);
_chai["default"].use(_chaiHttp["default"]);
_chai["default"].should();
(0, _sinonStubPromise["default"])(_sinon["default"]);
describe("BILLING MIDDLEWARE", function (req, res, status) {
  it("Test fetchCurrentSubscription Method with registered email should be okay", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var state, req, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          res = _nodeMocksHttp["default"].createResponse();
          state = undefined;
          req = {
            body: {
              email: "blaise145@gmail.com",
              password: "nAdia123"
            }
          };
          _context.next = 5;
          return _billing["default"].fetchCurrentSubscription(req, res, state);
        case 5:
          data = _context.sent;
          (0, _chai.expect)(data.dataValues.state).to.be.equal("current");
          (0, _chai.expect)(data.dataValues.phoneNumber).to.be.equal("+250788726152");
          (0, _chai.expect)(data.dataValues.email).to.be.equal("blaise145@gmail.com");
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  it("Test renewPayment Method with un-registered email should be error with status 404", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var nextSpy, req, res, data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          nextSpy = _sinon["default"].spy();
          req = _nodeMocksHttp["default"].createRequest({
            body: {
              email: "blaise1200@gmail.com",
              password: "nAdia123"
            }
          });
          res = _nodeMocksHttp["default"].createResponse();
          _context2.next = 5;
          return _billing["default"].renewPayment(req, res, nextSpy);
        case 5:
          data = _context2.sent;
          (0, _chai.expect)(data.statusCode).to.equal(400);
          (0, _chai.expect)(data.finished).to.be["true"];
        case 8:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  it("Test renewPayment Method with registered email have subscription with pending status or user.plan = Setup or  details === null should next()", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var nextSpy, req, res;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          nextSpy = _sinon["default"].spy();
          req = _nodeMocksHttp["default"].createRequest({
            body: {
              email: "blaise1290@gmail.com",
              password: "nAdia123"
            }
          });
          res = _nodeMocksHttp["default"].createResponse();
          _context3.next = 5;
          return _billing["default"].renewPayment(req, res, nextSpy);
        case 5:
          (0, _chai.expect)(nextSpy.calledOnce).to.be["true"];
        case 6:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
  it("Test renewPayment Method with registered email and subscription with current status should be okay", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    var nextSpy, req, res;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          nextSpy = _sinon["default"].spy();
          req = _nodeMocksHttp["default"].createRequest({
            body: {
              email: "blaise12@gmail.com",
              password: "nAdia123"
            }
          });
          res = _nodeMocksHttp["default"].createResponse();
          _context4.next = 5;
          return _billing["default"].renewPayment(req, res, nextSpy);
        case 5:
          (0, _chai.expect)(nextSpy.calledOnce).to.be["true"];
        case 6:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  })));

  // it('should pass to send email', async () => {
  //     const body = {
  //         email: "habimanaolivier6gmail.com"
  //     }
  //     res = {}
  //     let user = {
  //         firstName: 'Blaize'
  //     }
  //     let req = {
  //         body: {
  //             "email": "habimanaolivier6gmail.com"
  //         }
  //     }
  //     billing.sendBillingNotification(user, req, body)
  // });

  // it("Test renewPayment Method with registered email and no active subscription and momo payment should be okay", async () => {
  //   var nextSpy = sinon.spy();
  //   var req = httpMocks.createRequest({
  //     body: {
  //       email: "blaise125@gmail.com",
  //       password: "nAdia123",
  //     },
  //   });
  //   var res = httpMocks.createResponse();
  //   await billing.renewPayment(req, res, nextSpy);
  //   expect(res.statusCode).to.equal(200);
  //   expect(nextSpy.calledOnce).to.be.false;
  // });
  // it("Test renewPayment Method with registered email and no active subscription and UGANDA Mobile Money payment should be okay", async () => {
  //   var nextSpy = sinon.spy();
  //   var req = httpMocks.createRequest({
  //     body: {
  //       email: "blaise12x@gmail.com",
  //       password: "nAdia123",
  //     },
  //   });
  //   var res = httpMocks.createResponse();
  //   await billing.renewPayment(req, res, nextSpy);
  //   expect(res.statusCode).to.equal(200);
  //   expect(nextSpy.calledOnce).to.be.false;
  // });
  // it("Test renewPayment Method with registered email and no active subscription and ZAMBIA(MTN) Mobile Money payment should be okay", async () => {
  //   var nextSpy = sinon.spy();
  //   var req = httpMocks.createRequest({
  //     body: {
  //       email: "blaise12xx@gmail.com",
  //       password: "nAdia123",
  //     },
  //   });
  //   var res = httpMocks.createResponse();
  //   await billing.renewPayment(req, res, nextSpy);
  //   expect(res.statusCode).to.equal(200);
  //   expect(nextSpy.calledOnce).to.be.false;
  // });
  // it("Test renewPayment Method with registered email and no active subscription and ZAMBIA(MTN) Mobile Money payment should be okay", async () => {
  //   var nextSpy = sinon.spy();
  //   var req = httpMocks.createRequest({
  //     body: {
  //       email: "blaise12xxx@gmail.com",
  //       password: "nAdia123",
  //     },
  //   });
  //   var res = httpMocks.createResponse();
  //   await billing.renewPayment(req, res, nextSpy);
  //   expect(res.statusCode).to.equal(200);
  //   expect(nextSpy.calledOnce).to.be.false;
  // });
  // it("Test renewPayment Method with registered email and no active subscription and GHANA(MTN) Mobile Money payment should be okay", async () => {
  //   var nextSpy = sinon.spy();
  //   var req = httpMocks.createRequest({
  //     body: {
  //       email: "blaise12xxxx@gmail.com",
  //       password: "nAdia123",
  //     },
  //   });
  //   var res = httpMocks.createResponse();
  //   await billing.renewPayment(req, res, nextSpy);
  //   expect(res.statusCode).to.equal(200);
  //   expect(nextSpy.calledOnce).to.be.false;
  // });
  // it("Test renewPayment Method with registered email and no active subscription and GHANA(VODAFONE) Mobile Money payment should be okay", async () => {
  //   var nextSpy = sinon.spy();
  //   var req = httpMocks.createRequest({
  //     body: {
  //       email: "blaise12xxxxx@gmail.com",
  //       password: "nAdia123",
  //     },
  //   });
  //   var res = httpMocks.createResponse();
  //   await billing.renewPayment(req, res, nextSpy);
  //   expect(res.statusCode).to.equal(200);
  //   expect(nextSpy.calledOnce).to.be.false;
  // });
  // it("Test renewPayment Method with registered email and no active subscription and GHANA() Mobile Money payment should be okay", async () => {
  //   var nextSpy = sinon.spy();
  //   var req = httpMocks.createRequest({
  //     body: {
  //       email: "blaise12xxxxxx@gmail.com",
  //       password: "nAdia123",
  //     },
  //   });
  //   var res = httpMocks.createResponse();
  //   await billing.renewPayment(req, res, nextSpy);
  //   expect(res.statusCode).to.equal(200);
  //   expect(nextSpy.calledOnce).to.be.false;
  // });

  // it("Test renewPayment Method with registered email and no active subscription and spenn payment for the first time should be okay", async () => {
  //   var nextSpy = sinon.spy();
  //   var req = httpMocks.createRequest({
  //     body: {
  //       email: "blaise126@gmail.com",
  //       password: "nAdia123",
  //     },
  //   });
  //   var res = httpMocks.createResponse();
  //   await billing.renewPayment(req, res, nextSpy);
  //   expect(res.statusCode).to.equal(201);
  //   expect(nextSpy.calledOnce).to.be.false;
  // });

  // it("Test renewPayment Method with registered email and no active subscription user use spenn payment it check spenn pending transaction before login should be okay but this is failed transaction", async () => {
  //   var nextSpy = sinon.spy();
  //   var req = httpMocks.createRequest({
  //     body: {
  //       email: "blaise126@gmail.com",
  //       password: "nAdia123",
  //     },
  //   });
  //   var res = httpMocks.createResponse();
  //   await billing.renewPayment(req, res, nextSpy);
  //   expect(res.statusCode).to.equal(200);
  //   expect(nextSpy.calledOnce).to.be.false;
  // });

  it("Test renewPayment Method with registered email and no active subscription user use spenn payment it check spenn pending transaction before login should be okay but this is Approved transaction", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
    var stub, nextSpy, req, res;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          stub = _sinon["default"].stub(_billing["default"], "checkSpenn").callsFake(function () {
            return _chackSpennTransaction["default"];
          });
          nextSpy = _sinon["default"].spy();
          req = _nodeMocksHttp["default"].createRequest({
            body: {
              email: "blaise127@gmail.com",
              password: "nAdia123"
            }
          });
          res = _nodeMocksHttp["default"].createResponse();
          _context5.next = 6;
          return _billing["default"].renewPayment(req, res, nextSpy);
        case 6:
          stub.restore();
          (0, _chai.expect)(res.statusCode).to.equal(200);
          (0, _chai.expect)(nextSpy.calledOnce).to.be["true"];
        case 9:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  })));

  // it.only('Test renewPayment Method with registered email and no active subscription and momo payment should be okay', async () => {
  //     var nextSpy = sinon.spy();
  //     var req = httpMocks.createRequest({
  //         body: {
  //             "email": "blaise125@gmail.com",
  //             "password": "nAdia123"
  //         }
  //     });
  //     var res = httpMocks.createResponse();
  //     await billing.renewPayment(req, res, nextSpy)

  // });

  // it("Test renewPayment Method with registered email and no active subscription with payment method 2", async () => {
  //   var nextSpy = sinon.spy();
  //   var req = httpMocks.createRequest({
  //     body: {
  //       email: "blaise129340@gmail.com",
  //       password: "nAdia123",
  //     },
  //   });
  //   var res = httpMocks.createResponse();
  //   await billing.renewPayment(req, res, nextSpy);
  //   expect(res.statusCode).to.equal(200);
  //   expect(nextSpy.calledOnce).to.be.false;
  // });

  // it("Test renewPayment Method with registered email and no active subscription,  user use spenn payment method this test should pass but charge spenn request failed due to unsupported number", async () => {
  //   var nextSpy = sinon.spy();
  //   var req = httpMocks.createRequest({
  //     body: {
  //       email: "blaise126x@gmail.com",
  //       password: "nAdia123",
  //     },
  //   });
  //   var res = httpMocks.createResponse();
  //   const data = await billing.renewPayment(req, res, nextSpy);
  //   expect(res.statusCode).to.equal(200);
  //   expect(nextSpy.calledOnce).to.be.true;
  // });

  // it("Test updateSubscription Method with registered email with isBilledAnnually if true", async () => {
  //   var nextSpy = sinon.spy();
  //   var req = httpMocks.createRequest({
  //     body: {
  //       email: "blaise126xx@gmail.com",
  //       password: "nAdia123",
  //     },
  //   });
  //   const today = new Date();
  //   var res = httpMocks.createResponse();
  //   const data = await billing.updateSubscription(req, res, today);
  //   expect(data.today).to.be.a("string");
  // });

  // it("Test updateSubscription Method with registered email with isBilledAnnually if false", async () => {
  //   var nextSpy = sinon.spy();
  //   var req = httpMocks.createRequest({
  //     body: {
  //       email: "blaise126xx1@gmail.com",
  //       password: "nAdia123",
  //     },
  //   });
  //   const today = new Date();
  //   var res = httpMocks.createResponse();
  //   const data = await billing.updateSubscription(req, res, today);
  //   expect(data.today).to.be.a("string");
  // });

  // it("Test verifySpennTransactions Method with unregistered email", async () => {
  //   var nextSpy = sinon.spy();
  //   var req = httpMocks.createRequest({
  //     body: {
  //       email: "blaise126xx6957895671@gmail.com",
  //       password: "nAdia123",
  //     },
  //   });
  //   const today = new Date();
  //   var res = httpMocks.createResponse();
  //   const data = await billing.verifySpennTransactions(req, res, nextSpy);
  //   expect(data.statusCode).to.equal(400);
  //   expect(nextSpy.calledOnce).to.be.false;
  // });

  // it("Test verifySpennTransactions Method with registered email and current subscription status", async () => {
  //   var nextSpy = sinon.spy();
  //   var req = httpMocks.createRequest({
  //     body: {
  //       email: "blaise126xx10@gmail.com",
  //       password: "nAdia123",
  //     },
  //   });
  //   const today = new Date();
  //   var res = httpMocks.createResponse();
  //   const data = await billing.verifySpennTransactions(req, res, nextSpy);
  //   expect(res.statusCode).to.equal(200);
  //   expect(nextSpy.calledOnce).to.be.true;
  // });

  // it("Test verifySpennTransactions Method with registered email and pending subscription status with spenn payment", async () => {
  //   var nextSpy = sinon.spy();
  //   var req = httpMocks.createRequest({
  //     body: {
  //       email: "blaise1269910@gmail.com",
  //       password: "nAdia123",
  //     },
  //   });
  //   var res = httpMocks.createResponse();
  //   await billing.verifySpennTransactions(req, res, nextSpy);
  //   expect(res.statusCode).to.equal(200);
  //   expect(nextSpy.calledOnce).to.be.false;
  // });

  // it("Test verifySpennTransactions Method with registered email and without pending subscription status with spenn payment", async () => {
  //   var nextSpy = sinon.spy();
  //   var req = httpMocks.createRequest({
  //     body: {
  //       email: "blaise12699109@gmail.com",
  //       password: "nAdia123",
  //     },
  //   });
  //   var res = httpMocks.createResponse();
  //   await billing.verifySpennTransactions(req, res, nextSpy);
  //   expect(res.statusCode).to.equal(200);
  //   expect(nextSpy.calledOnce).to.be.true;
  // });

  // it("Test verifySpennTransactions Method with registered email and with pending subscription status with payment method other than spenn payment", async () => {
  //   var nextSpy = sinon.spy();
  //   var req = httpMocks.createRequest({
  //     body: {
  //       email: "blaise126991078@gmail.com",
  //       password: "nAdia123",
  //     },
  //   });
  //   var res = httpMocks.createResponse();
  //   await billing.verifySpennTransactions(req, res, nextSpy);
  //   expect(res.statusCode).to.equal(200);
  //   expect(nextSpy.calledOnce).to.be.true;
  // });

  it("Test verifySpennTransactions should return 500 when there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    var stub, req, res;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          stub = _sinon["default"].stub(_userServices["default"], "getUserByMail")["throws"](new Error());
          req = _nodeMocksHttp["default"].createRequest({
            body: {
              email: "blaise126991078@gmail.com",
              password: "nAdia123"
            }
          });
          res = _nodeMocksHttp["default"].createResponse();
          _context6.next = 5;
          return _billing["default"].verifySpennTransactions(req, res);
        case 5:
          stub.restore();
          (0, _chai.expect)(res.statusCode).to.equal(500);
        case 7:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  })));
  it("Test renewPayment should return 500 when there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
    var stub, req, res;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          stub = _sinon["default"].stub(_userServices["default"], "getUserByMail")["throws"](new Error());
          req = _nodeMocksHttp["default"].createRequest({
            body: {
              email: "blaise126991078@gmail.com",
              password: "nAdia123"
            }
          });
          res = _nodeMocksHttp["default"].createResponse();
          _context7.next = 5;
          return _billing["default"].renewPayment(req, res);
        case 5:
          stub.restore();
          (0, _chai.expect)(res.statusCode).to.equal(500);
        case 7:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  })));
  it("Test renewPayment should return 500 when there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
    var stub, req, res;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          stub = _sinon["default"].stub(_billingServices["default"], "getCurrentSubscription")["throws"](new Error());
          req = _nodeMocksHttp["default"].createRequest({
            body: {
              email: "blaise126991078@gmail.com",
              password: "nAdia123"
            }
          });
          res = _nodeMocksHttp["default"].createResponse();
          _context8.next = 5;
          return _billing["default"].fetchCurrentSubscription(req, res);
        case 5:
          stub.restore();
          (0, _chai.expect)(res.statusCode).to.equal(500);
        case 7:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  })));
  it("Test trial should return 500 when there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
    var stub, req, res;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          stub = _sinon["default"].stub(_jwt["default"], "jwtVerify")["throws"](new Error());
          req = _nodeMocksHttp["default"].createRequest({
            body: {
              email: "blaise126991078@gmail.com",
              password: "nAdia123"
            }
          });
          res = _nodeMocksHttp["default"].createResponse();
          _context9.next = 5;
          return _billing["default"].trial(req, res);
        case 5:
          stub.restore();
          (0, _chai.expect)(res.statusCode).to.equal(500);
        case 7:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  })));
  it("Test verifyPermissionLevel should return 500 when there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
    var stub, req, res;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          stub = _sinon["default"].stub(_jwt["default"], "jwtVerify")["throws"](new Error());
          req = _nodeMocksHttp["default"].createRequest({
            body: {
              email: "blaise126991078@gmail.com",
              password: "nAdia123"
            }
          });
          res = _nodeMocksHttp["default"].createResponse();
          _context10.next = 5;
          return _billing["default"].verifyPermissionLevel(req, res);
        case 5:
          stub.restore();
          (0, _chai.expect)(res.statusCode).to.equal(500);
        case 7:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  })));

  //   it("Test verifySpennTransactions Method with registered email and permissonLevel -1 Should throw 402", async () => {
  //     var nextSpy = sinon.spy();
  //     var req = httpMocks.createRequest({
  //       headers: {
  //         authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlzZTEyOTM0MEBnbWFpbC5jb20iLCJpYXQiOjE2MDc1MDY2OTR9.b-MbGrwGV0pty3xqefKUhinqz0RWchsSiwpbqflLkVE`,
  //       },
  //     });
  //     var res = httpMocks.createResponse();
  //     const data = await billing.verifyPermissionLevel(req, res, nextSpy);
  //     expect(data.statusCode).to.equal(402);
  //     expect(nextSpy.calledOnce).to.be.false;
  //   });

  //   it("Test verifySpennTransactions Method with registered email and permissonLevel 1 Should throw 402", async () => {
  //     var nextSpy = sinon.spy();
  //     var req = httpMocks.createRequest({
  //       headers: {
  //         authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlzZTEyNjk5MTA3Nzg3ODc4QGdtYWlsLmNvbSIsImlhdCI6MTYwNzUwODA3NH0.OHqK11xqdhIm2Y6GpJ0mdIVsQ0sXNyAjwIqux1c3DnI`,
  //       },
  //     });
  //     var res = httpMocks.createResponse();
  //     await billing.verifyPermissionLevel(req, res, nextSpy);
  //     expect(nextSpy.calledOnce).to.be.true;
  //   });

  //   it("Test trial Method with registered email that isOnTrial and isOnExtension is false Should next", async () => {
  //     var nextSpy = sinon.spy();
  //     var req = httpMocks.createRequest({
  //       headers: {
  //         authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlzZTEyNjk5MTA3Nzg3ODc4QGdtYWlsLmNvbSIsImlhdCI6MTYwNzUwODA3NH0.OHqK11xqdhIm2Y6GpJ0mdIVsQ0sXNyAjwIqux1c3DnI`,
  //       },
  //     });
  //     var res = httpMocks.createResponse();
  //     await billing.trial(req, res, nextSpy);
  //     expect(nextSpy.calledOnce).to.be.true;
  //   });

  //   it("Test trial Method with registered email that isOnTrial and isOnExtension is false Should next", async () => {
  //     var nextSpy = sinon.spy();
  //     var req = httpMocks.createRequest({
  //       headers: {
  //         authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlzMTk5OTk5OTk5NzhAZ21haWwuY29tIiwiaWF0IjoxNjA3NTA5ODk3fQ.xZwna-9ZwmzoeMnR9sF9fUluxct237eRcqrmmHxLB8w`,
  //       },
  //     });
  //     var res = httpMocks.createResponse();
  //     await billing.trial(req, res, nextSpy);
  //     expect(res.statusCode).to.equal(402);
  //     expect(nextSpy.calledOnce).to.be.false;
  //   });

  //   it("Test trial Method with registered email that trialEnds > today and viewing session is < 3 Should next", async () => {
  //     var nextSpy = sinon.spy();
  //     var req = httpMocks.createRequest({
  //       headers: {
  //         authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlhczE5NzU2NzVAZ21haWwuY29tIiwiaWF0IjoxNjA3NTExMDEzfQ.7eb0joHwieYlccPAZ7msw7hA1b94OXg9Ic99-WqkHr8`,
  //       },
  //     });
  //     var res = httpMocks.createResponse();
  //     await billing.trial(req, res, nextSpy);
  //     expect(nextSpy.calledOnce).to.be.true;
  //   });

  //   it("Test trial Method with registered email update user with -1 status failed", async () => {
  //     const stub = sinon.stub(userService, "updateUser").callsFake(() => {
  //       return [undefined, 0];
  //     });
  //     var nextSpy = sinon.spy();
  //     var req = httpMocks.createRequest({
  //       headers: {
  //         authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlzMTk5OTk5OTk5NzhAZ21haWwuY29tIiwiaWF0IjoxNjA3NTA5ODk3fQ.xZwna-9ZwmzoeMnR9sF9fUluxct237eRcqrmmHxLB8w`,
  //       },
  //     });
  //     var res = httpMocks.createResponse();
  //     const data = await billing.trial(req, res, nextSpy);
  //     stub.restore();
  //     expect(data.statusCode).to.equal(502);
  //     expect(nextSpy.calledOnce).to.be.false;
  //   });

  it("Test updateTransactionsAndRegisterSales Method with registered email with updates[1] and updatedSubscription[1] which is different 1", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
    var stub, nextSpy, req, recentTrans, user, details, res, data;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          stub = _sinon["default"].stub(_userServices["default"], "updateUser").callsFake(function () {
            return [undefined, 0];
          });
          nextSpy = _sinon["default"].spy();
          req = _nodeMocksHttp["default"].createRequest({
            body: {
              email: "blaise126991078@gmail.com",
              password: "nAdia123"
            }
          });
          user = {
            email: "blaise126991078@gmail.com"
          };
          details = {
            price: 3
          };
          res = _nodeMocksHttp["default"].createResponse();
          _context11.next = 8;
          return _billing["default"].updateTransactionsAndRegisterSales(recentTrans, user, details, req, res, nextSpy);
        case 8:
          data = _context11.sent;
          stub.restore();
          (0, _chai.expect)(data.statusCode).to.equal(500);
          (0, _chai.expect)(nextSpy.calledOnce).to.be["false"];
        case 12:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  })));
  it("Test updateTransactionsAndRegisterSales Method with registered email with updates[1] and updatedSubscription[1] which is different 1", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
    var stub, nextSpy, req, recentTrans, user, details, res, data;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          stub = _sinon["default"].stub(_webhooks["default"], "registerSales").callsFake(function () {
            return false;
          });
          nextSpy = _sinon["default"].spy();
          req = _nodeMocksHttp["default"].createRequest({
            body: {
              email: "blaise126991078@gmail.com",
              password: "nAdia123"
            }
          });
          user = {
            email: "blaise126991078@gmail.com"
          };
          details = {
            price: 3
          };
          res = _nodeMocksHttp["default"].createResponse();
          _context12.next = 8;
          return _billing["default"].updateTransactionsAndRegisterSales(recentTrans, user, details, req, res, nextSpy);
        case 8:
          data = _context12.sent;
          stub.restore();
          (0, _chai.expect)(data.statusCode).to.equal(500);
          (0, _chai.expect)(nextSpy.calledOnce).to.be["false"];
        case 12:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  })));
});