"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _chai = _interopRequireWildcard(require("chai"));
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _dotenv = require("dotenv");
var _sinon = _interopRequireDefault(require("sinon"));
var _sinonStubPromise = _interopRequireDefault(require("sinon-stub-promise"));
var _nodeMocksHttp = _interopRequireDefault(require("node-mocks-http"));
var _sales = _interopRequireDefault(require("../controllers/sales"));
var _salesService = _interopRequireDefault(require("../services/salesService"));
var _index = _interopRequireDefault(require("../index"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
(0, _dotenv.config)();
_chai["default"].use(_chaiHttp["default"]);
_chai["default"].should();
(0, _sinonStubPromise["default"])(_sinon["default"]);
describe("SALES CONTROLLER", function (req, res, status) {
  it("Test getSalesInTimeRange by Get Sales by Time range", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var req, res, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          req = _nodeMocksHttp["default"].createRequest({
            body: {
              start: "2020-11-31",
              end: "2021-12-14"
            }
          });
          res = _nodeMocksHttp["default"].createResponse();
          _context.next = 4;
          return _sales["default"].getSalesInTimeRange(req, res);
        case 4:
          data = _context.sent;
          (0, _chai.expect)(data.statusCode).to.equal(200);
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  it("Test getSalesInTimeRange should return 400 when there is null", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var stub, req, res;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          stub = _sinon["default"].stub(_salesService["default"], "getSalesInTimeRange").callsFake(function () {
            return null;
          });
          req = _nodeMocksHttp["default"].createRequest({
            body: {
              start: "2020-11-31",
              end: "2021-12-14"
            }
          });
          res = _nodeMocksHttp["default"].createResponse();
          _context2.next = 5;
          return _sales["default"].getSalesInTimeRange(req, res);
        case 5:
          stub.restore();
          (0, _chai.expect)(res.statusCode).to.equal(400);
        case 7:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  it("Test getSalesInTimeRange should return 500 when there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var stub, req, res;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          stub = _sinon["default"].stub(_salesService["default"], "getSalesInTimeRange")["throws"](new Error());
          req = _nodeMocksHttp["default"].createRequest({
            body: {
              start: "2020-11-31",
              end: "2021-12-14"
            }
          });
          res = _nodeMocksHttp["default"].createResponse();
          _context3.next = 5;
          return _sales["default"].getSalesInTimeRange(req, res);
        case 5:
          stub.restore();
          (0, _chai.expect)(res.statusCode).to.equal(503);
        case 7:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
  it("Test getSalesByModeOfPayment by Get Sales by Mode of Payment", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    var req, res, data;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          req = _nodeMocksHttp["default"].createRequest({
            query: {
              mode: "spenn"
            }
          });
          res = _nodeMocksHttp["default"].createResponse();
          _context4.next = 4;
          return _sales["default"].getSalesByModeOfPayment(req, res);
        case 4:
          data = _context4.sent;
          (0, _chai.expect)(data.statusCode).to.equal(200);
        case 6:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  })));
  it("Test getSalesByModeOfPayment should return 400 when there is null", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
    var stub, req, res;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          stub = _sinon["default"].stub(_salesService["default"], "getSalesByModeOfPayment").callsFake(function () {
            return null;
          });
          req = _nodeMocksHttp["default"].createRequest({
            query: {
              mode: "spenn"
            }
          });
          res = _nodeMocksHttp["default"].createResponse();
          _context5.next = 5;
          return _sales["default"].getSalesByModeOfPayment(req, res);
        case 5:
          stub.restore();
          (0, _chai.expect)(res.statusCode).to.equal(400);
        case 7:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  })));
  it("Test getSalesInTimeRange should return 500 when there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    var stub, req, res;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          stub = _sinon["default"].stub(_salesService["default"], "getSalesByModeOfPayment")["throws"](new Error());
          req = _nodeMocksHttp["default"].createRequest({
            query: {
              mode: "spenn"
            }
          });
          res = _nodeMocksHttp["default"].createResponse();
          _context6.next = 5;
          return _sales["default"].getSalesByModeOfPayment(req, res);
        case 5:
          stub.restore();
          (0, _chai.expect)(res.statusCode).to.equal(503);
        case 7:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  })));
  it("Test getAllSales should Get all Sales Should be OK", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
    var req, res, data;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          req = _nodeMocksHttp["default"].createRequest({
            query: {
              mode: "spenn"
            }
          });
          res = _nodeMocksHttp["default"].createResponse();
          _context7.next = 4;
          return _sales["default"].getAllSales(req, res);
        case 4:
          data = _context7.sent;
          (0, _chai.expect)(data.statusCode).to.equal(200);
        case 6:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  })));
  it("Test getAllSales should return 400 when there is empty", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
    var stub, req, res, data;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          stub = _sinon["default"].stub(_salesService["default"], "getAllSaless").callsFake(function () {
            return [];
          });
          req = _nodeMocksHttp["default"].createRequest({
            query: {
              mode: "spenn"
            }
          });
          res = _nodeMocksHttp["default"].createResponse();
          _context8.next = 5;
          return _sales["default"].getAllSales(req, res);
        case 5:
          data = _context8.sent;
          stub.restore();
          (0, _chai.expect)(data.statusCode).to.equal(400);
        case 8:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  })));
  it("Test getAllSales should return 500 when there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
    var stub, req, res;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          stub = _sinon["default"].stub(_salesService["default"], "getAllSaless")["throws"](new Error());
          req = _nodeMocksHttp["default"].createRequest({
            query: {
              mode: "spenn"
            }
          });
          res = _nodeMocksHttp["default"].createResponse();
          _context9.next = 5;
          return _sales["default"].getAllSales(req, res);
        case 5:
          stub.restore();
          (0, _chai.expect)(res.statusCode).to.equal(503);
        case 7:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  })));
});
describe('ADMIN FETCH ALL SALES', function (req, res, status) {
  var adminToken;
  before( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
    var loginRes;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return _chai["default"].request(_index["default"]).post('/staff/login').send({
            email: 'staff@example.com',
            password: 'izzeddin'
          });
        case 2:
          loginRes = _context10.sent;
          adminToken = loginRes.body.data.token;
        case 4:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  })));
  it('get all sales if the user is an admin', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
    var res;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return _chai["default"].request(_index["default"]).get('/sales/all').set('authorization', "bearer ".concat(adminToken));
        case 2:
          res = _context11.sent;
          (0, _chai.expect)(res.statusCode).to.equal(200);
          (0, _chai.expect)(res.body).to.have.property('message', 'sales retrieved successfully');
        case 5:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  })));
  it('should return an empty array if they are not sales', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
    var stub, res;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          stub = _sinon["default"].stub(_salesService["default"], 'getAllSaless').callsFake(function () {
            return [];
          });
          _context12.next = 3;
          return _chai["default"].request(_index["default"]).get('/sales/all').set('authorization', "bearer ".concat(adminToken));
        case 3:
          res = _context12.sent;
          stub.restore();
          (0, _chai.expect)(res.statusCode).to.equal(400);
          (0, _chai.expect)(res.body).to.have.property('message', 'sales Not found');
        case 7:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  })));
  it('return error message if something goes wrong', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
    var stub, res;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          stub = _sinon["default"].stub(_salesService["default"], 'getAllSaless')["throws"]('Something went wrong');
          _context13.next = 3;
          return _chai["default"].request(_index["default"]).get('/sales/all').set('authorization', "bearer ".concat(adminToken));
        case 3:
          res = _context13.sent;
          stub.restore();
          (0, _chai.expect)(res.statusCode).to.equal(503);
          (0, _chai.expect)(res.body).to.have.property('message', 'something went wrong Something went wrong');
        case 7:
        case "end":
          return _context13.stop();
      }
    }, _callee13);
  })));
});