"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _chai = _interopRequireWildcard(require("chai"));
var _dotenv = require("dotenv");
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _sinon = _interopRequireDefault(require("sinon"));
var _mocha = require("mocha");
var _index = _interopRequireDefault(require("../index"));
var _jwt = _interopRequireDefault(require("../helpers/jwt"));
var aws = _interopRequireWildcard(require("../helpers/aws"));
var _cpServices = _interopRequireDefault(require("../services/cpServices"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
(0, _dotenv.config)();
_chai["default"].use(_chaiHttp["default"]);
(0, _mocha.describe)("GET ALL CP ACCOUNTS", function () {
  var adminToken;
  before( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var loginRes;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _chai["default"].request(_index["default"]).post("/staff/login").send({
            email: "staff@example.com",
            password: "izzeddin"
          });
        case 2:
          loginRes = _context.sent;
          adminToken = loginRes.body.data.token;
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  (0, _mocha.it)("should return an error message if the user is not an admin", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var token, res;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          token = _jwt["default"].jwtSign({
            user: "cp0005@example.com"
          }, process.env.SECRET, "1d");
          _context2.next = 3;
          return _chai["default"].request(_index["default"]).get("/cp/all").set("authorization", "bearer ".concat(token));
        case 3:
          res = _context2.sent;
          (0, _chai.expect)(res.statusCode).to.equal(403);
          (0, _chai.expect)(res.body).to.have.property("message", "Access denied  ");
        case 6:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  (0, _mocha.it)("should return an error message if the token is not provided", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var res;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _chai["default"].request(_index["default"]).get("/cp/all");
        case 2:
          res = _context3.sent;
          (0, _chai.expect)(res.statusCode).to.equal(400);
          (0, _chai.expect)(res.body).to.have.property("message", "Invalid access token");
        case 5:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
  (0, _mocha.it)("should return an error message if the user is not found", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    var token, res;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          token = _jwt["default"].jwtSign({
            email: "cp005"
          }, process.env.SECRET, "1d");
          _context4.next = 3;
          return _chai["default"].request(_index["default"]).get("/cp/all").set("authorization", "bearer ".concat(token));
        case 3:
          res = _context4.sent;
          (0, _chai.expect)(res.statusCode).to.equal(400);
          (0, _chai.expect)(res.body).to.have.property("message", "Invalid access token");
        case 6:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  })));
  (0, _mocha.it)("should return all the cp", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
    var stub, res;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          stub = _sinon["default"].stub(aws, "getObject").callsFake(function () {
            return "fergegergeerg.jpg";
          });
          _context5.next = 3;
          return _chai["default"].request(_index["default"]).get("/cp/all").set("authorization", "bearer ".concat(adminToken));
        case 3:
          res = _context5.sent;
          stub.restore();
          (0, _chai.expect)(res.statusCode).to.equal(200);
          (0, _chai.expect)(res.body).to.have.property("message", "success");
          (0, _chai.expect)(res.body.data).to.be.an("array");
        case 8:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  })));
  (0, _mocha.it)("should return 500 status code if there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    var stub, res;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          stub = _sinon["default"].stub(_cpServices["default"], "getAllCps")["throws"](new Error("something went wrong"));
          _context6.next = 3;
          return _chai["default"].request(_index["default"]).get("/cp/all").set("authorization", "bearer ".concat(adminToken));
        case 3:
          res = _context6.sent;
          stub.restore();
          (0, _chai.expect)(res.statusCode).to.equal(503);
        case 6:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  })));
});