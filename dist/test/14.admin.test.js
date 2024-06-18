"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _chai = _interopRequireWildcard(require("chai"));
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _sinon = _interopRequireDefault(require("sinon"));
var _sinonStubPromise = _interopRequireDefault(require("sinon-stub-promise"));
var _nodeMocksHttp = _interopRequireDefault(require("node-mocks-http"));
var _admin = _interopRequireDefault(require("../controllers/admin"));
var _earningServices = _interopRequireDefault(require("../services/earningServices"));
var _videoServices = _interopRequireDefault(require("../services/videoServices"));
var _jwt = _interopRequireDefault(require("../helpers/jwt"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
_chai["default"].use(_chaiHttp["default"]);
_chai["default"].should();
(0, _sinonStubPromise["default"])(_sinon["default"]);
describe("ADMIN CONTROLLER", function (req, res, status) {
  it("Test getEarningsPerClient should be Okay", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var req, res, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          req = _nodeMocksHttp["default"].createRequest({
            query: {
              clientId: "f9a02384-d04a-4ef6-aaee-afb745630474"
            },
            body: {
              start: "2020-11-31",
              end: "2021-12-14"
            }
          });
          res = _nodeMocksHttp["default"].createResponse();
          _context.next = 4;
          return _admin["default"].getEarningsPerClient(req, res);
        case 4:
          data = _context.sent;
          (0, _chai.expect)(data.statusCode).to.equal(200);
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  it("Test getEarningsPerClient should be 404", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var stub, req, res;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          stub = _sinon["default"].stub(_earningServices["default"], "getEarningsByClientId").callsFake(function () {
            return [];
          });
          req = _nodeMocksHttp["default"].createRequest({
            query: {
              clientId: "f9a02384-d04a-4ef6-aaee-afb745630474"
            },
            body: {
              start: "2020-11-31",
              end: "2021-12-14"
            }
          });
          res = _nodeMocksHttp["default"].createResponse();
          _context2.next = 5;
          return _admin["default"].getEarningsPerClient(req, res);
        case 5:
          stub.restore();
          (0, _chai.expect)(res.statusCode).to.equal(404);
        case 7:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  it("Test getEarningsPerClient should return 500 when there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var stub, req, res;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          stub = _sinon["default"].stub(_earningServices["default"], "getEarningsByClientId")["throws"](new Error());
          req = _nodeMocksHttp["default"].createRequest({
            query: {
              clientId: "f9a02384-d04a-4ef6-aaee-afb745630474"
            },
            body: {
              start: "2020-11-31",
              end: "2021-12-14"
            }
          });
          res = _nodeMocksHttp["default"].createResponse();
          _context3.next = 5;
          return _admin["default"].getEarningsPerClient(req, res);
        case 5:
          stub.restore();
          (0, _chai.expect)(res.statusCode).to.equal(500);
        case 7:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
  it("Test getVideosPerCp should be Okay", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    var req, res;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          req = _nodeMocksHttp["default"].createRequest({
            query: {
              clientId: "67b6c3a8-884f-48af-8e8f-1a60b15824de"
            },
            body: {
              start: "2020-11-31",
              end: "2021-12-14"
            }
          });
          res = _nodeMocksHttp["default"].createResponse();
          _context4.next = 4;
          return _admin["default"].getVideosPerCp(req, res);
        case 4:
          (0, _chai.expect)(res.statusCode).to.equal(200);
        case 5:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  })));
  it("Test getVideosPerCp should be 400", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
    var stub, req, res;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          stub = _sinon["default"].stub(_videoServices["default"], "getAllVideos").callsFake(function () {
            return undefined;
          });
          req = _nodeMocksHttp["default"].createRequest({
            query: {
              clientId: "67b6c3a8-884f-48af-8e8f-1a60b15824de"
            },
            body: {
              start: "2020-11-31",
              end: "2021-12-14"
            }
          });
          res = _nodeMocksHttp["default"].createResponse();
          _context5.next = 5;
          return _admin["default"].getVideosPerCp(req, res);
        case 5:
          stub.restore();
          (0, _chai.expect)(res.statusCode).to.equal(400);
        case 7:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  })));
  it("Test getAllVideos should be Okay", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    var req, res;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          req = _nodeMocksHttp["default"].createRequest({
            query: {
              clientId: "f9a02384-d04a-4ef6-aaee-afb745630474"
            },
            body: {
              start: "2020-11-31",
              end: "2021-12-14"
            }
          });
          res = _nodeMocksHttp["default"].createResponse();
          _context6.next = 4;
          return _admin["default"].getAllVideos(req, res);
        case 4:
          (0, _chai.expect)(res.statusCode).to.equal(200);
        case 5:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  })));
  it("Test getVideosPerCp should be 400", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
    var stub, req, res;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          stub = _sinon["default"].stub(_videoServices["default"], "getAllVideosForAdmin").callsFake(function () {
            return undefined;
          });
          req = _nodeMocksHttp["default"].createRequest({
            query: {
              clientId: "67b6c3a8-884f-48af-8e8f-1a60b15824de"
            },
            body: {
              start: "2020-11-31",
              end: "2021-12-14"
            }
          });
          res = _nodeMocksHttp["default"].createResponse();
          _context7.next = 5;
          return _admin["default"].getAllVideos(req, res);
        case 5:
          stub.restore();
          (0, _chai.expect)(res.statusCode).to.equal(400);
        case 7:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  })));
  it("Test getAllEarningsPerVideo should be Okay", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
    var req, res;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          req = _nodeMocksHttp["default"].createRequest({
            query: {
              videoId: "67404feb-f743-481c-bb19-9841324188a3"
            }
          });
          res = _nodeMocksHttp["default"].createResponse();
          _context8.next = 4;
          return _admin["default"].getAllEarningsPerVideo(req, res);
        case 4:
          (0, _chai.expect)(res.statusCode).to.equal(200);
        case 5:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  })));
  it("Test getAllEarningsPerVideo should be 404", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
    var stub, req, res;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          stub = _sinon["default"].stub(_earningServices["default"], "getEarningsByVideo").callsFake(function () {
            return [];
          });
          req = _nodeMocksHttp["default"].createRequest({
            query: {
              videoId: "67404feb-f743-481c-bb19-9841324188a3"
            }
          });
          res = _nodeMocksHttp["default"].createResponse();
          _context9.next = 5;
          return _admin["default"].getAllEarningsPerVideo(req, res);
        case 5:
          stub.restore();
          (0, _chai.expect)(res.statusCode).to.equal(404);
        case 7:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  })));
  it("Test getAllEarningsPerVideo should return 500 when there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
    var stub, req, res;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          stub = _sinon["default"].stub(_earningServices["default"], "getEarningsByVideo")["throws"](new Error());
          req = _nodeMocksHttp["default"].createRequest({
            query: {
              videoId: "67404feb-f743-481c-bb19-9841324188a3"
            }
          });
          res = _nodeMocksHttp["default"].createResponse();
          _context10.next = 5;
          return _admin["default"].getAllEarningsPerVideo(req, res);
        case 5:
          stub.restore();
          (0, _chai.expect)(res.statusCode).to.equal(500);
        case 7:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  })));
  it("Test gainAccess should be Okay", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
    var req, res;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          req = _nodeMocksHttp["default"].createRequest({
            body: {
              clientId: "67404feb-f743-481c-bb19-9841324188a3",
              email: "test@gmail.com"
            }
          });
          res = _nodeMocksHttp["default"].createResponse();
          _context11.next = 4;
          return _admin["default"].gainAccess(req, res);
        case 4:
          (0, _chai.expect)(res.statusCode).to.equal(200);
        case 5:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  })));
  it("Test gainAccess should return 500 when there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
    var stub, req, res;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          stub = _sinon["default"].stub(_jwt["default"], "jwtSign")["throws"](new Error());
          req = _nodeMocksHttp["default"].createRequest({});
          res = _nodeMocksHttp["default"].createResponse();
          _context12.next = 5;
          return _admin["default"].gainAccess(req, res);
        case 5:
          stub.restore();
          (0, _chai.expect)(res.statusCode).to.equal(500);
        case 7:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  })));
  it("Test gainAccess should return 400", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
    var stub, req, res;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          stub = _sinon["default"].stub(_jwt["default"], "jwtSign").callsFake(function () {
            return null;
          });
          req = _nodeMocksHttp["default"].createRequest({});
          res = _nodeMocksHttp["default"].createResponse();
          _context13.next = 5;
          return _admin["default"].gainAccess(req, res);
        case 5:
          stub.restore();
          (0, _chai.expect)(res.statusCode).to.equal(400);
        case 7:
        case "end":
          return _context13.stop();
      }
    }, _callee13);
  })));
});