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
var _serieServices = _interopRequireDefault(require("../services/serieServices"));
var _jwt = _interopRequireDefault(require("../helpers/jwt"));
var aws = _interopRequireWildcard(require("../helpers/aws"));
var _index = _interopRequireDefault(require("../index"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
(0, _dotenv.config)();
_chai["default"].use(_chaiHttp["default"]);
(0, _mocha.describe)("DELETE AN EPISODE TEST", function () {
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
  (0, _mocha.it)("should delete an episode", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var stub, res;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          stub = _sinon["default"].stub(aws, "deleteObject").callsFake(function () {
            return [];
          });
          _context2.next = 3;
          return _chai["default"].request(_index["default"])["delete"]("/series/delete/151").set("authorization", "bearer ".concat(adminToken));
        case 3:
          res = _context2.sent;
          stub.restore();
          (0, _chai.expect)(res.statusCode).to.equal(200);
          (0, _chai.expect)(res.body).to.have.property("message", "deleted easily");
        case 7:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  (0, _mocha.it)("should return 400 if the aws file wasn't deleted", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var stub, res;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          stub = _sinon["default"].stub(aws, "deleteObject").callsFake(function () {
            return [1];
          });
          _context3.next = 3;
          return _chai["default"].request(_index["default"])["delete"]("/series/delete/151").set("authorization", "bearer ".concat(adminToken));
        case 3:
          res = _context3.sent;
          stub.restore();
          (0, _chai.expect)(res.statusCode).to.equal(400);
          (0, _chai.expect)(res.body).to.have.property("message", "Can't find what you requested");
        case 7:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
  (0, _mocha.it)("should return 400 status code if the user can't delete an episode", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    var res;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _chai["default"].request(_index["default"])["delete"]("/series/delete/15154").set("authorization", "bearer ".concat(adminToken));
        case 2:
          res = _context4.sent;
          (0, _chai.expect)(res.statusCode).to.equal(400);
          (0, _chai.expect)(res.body).to.have.property("message", "Can't find what you requested");
        case 5:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  })));
  (0, _mocha.it)("should return 500 status code if there is a  server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
    var stub, res;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          stub = _sinon["default"].stub(_serieServices["default"], "getSingleEpisode")["throws"]("Something went wrong");
          _context5.next = 3;
          return _chai["default"].request(_index["default"])["delete"]("/series/delete/15156").set("authorization", "bearer ".concat(adminToken));
        case 3:
          res = _context5.sent;
          stub.restore();
          (0, _chai.expect)(res.statusCode).to.equal(500);
        case 6:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  })));
});
(0, _mocha.describe)("DELETE TEMP EPISODE TEST", function () {
  var adminToken;
  before( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    var loginRes;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return _chai["default"].request(_index["default"]).post("/staff/login").send({
            email: "staff@example.com",
            password: "izzeddin"
          });
        case 2:
          loginRes = _context6.sent;
          adminToken = loginRes.body.data.token;
        case 4:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  })));
  (0, _mocha.it)("should delete a temporary episode", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
    var stub, res;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          stub = _sinon["default"].stub(aws, "deleteObject").callsFake(function () {
            return [];
          });
          _context7.next = 3;
          return _chai["default"].request(_index["default"])["delete"]("/series/delete/temp/163").set("authorization", "bearer ".concat(adminToken));
        case 3:
          res = _context7.sent;
          stub.restore();
          (0, _chai.expect)(res.statusCode).to.equal(200);
          (0, _chai.expect)(res.body).to.have.property("message", "deleted easily");
        case 7:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  })));
  (0, _mocha.it)("should return 400 if the aws file wasn't deleted on aws", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
    var stub, res;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          stub = _sinon["default"].stub(aws, "deleteObject").callsFake(function () {
            return [1];
          });
          _context8.next = 3;
          return _chai["default"].request(_index["default"])["delete"]("/series/delete/temp/164").set("authorization", "bearer ".concat(adminToken));
        case 3:
          res = _context8.sent;
          stub.restore();
          (0, _chai.expect)(res.statusCode).to.equal(400);
          (0, _chai.expect)(res.body).to.have.property("message", "Can't find what you requested");
        case 7:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  })));
  (0, _mocha.it)("should return 400 status code if the user can't delete a temporary episode", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
    var res;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return _chai["default"].request(_index["default"])["delete"]("/series/delete/temp/15154").set("authorization", "bearer ".concat(adminToken));
        case 2:
          res = _context9.sent;
          (0, _chai.expect)(res.statusCode).to.equal(400);
          (0, _chai.expect)(res.body).to.have.property("message", "Can't find what you requested");
        case 5:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  })));
  (0, _mocha.it)("should return 500 status code if there is a  server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
    var stub, res;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          stub = _sinon["default"].stub(_serieServices["default"], "getSingleEpisode")["throws"]("Something went wrong");
          _context10.next = 3;
          return _chai["default"].request(_index["default"])["delete"]("/series/delete/15156").set("authorization", "bearer ".concat(adminToken));
        case 3:
          res = _context10.sent;
          stub.restore();
          (0, _chai.expect)(res.statusCode).to.equal(500);
        case 6:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  })));
});