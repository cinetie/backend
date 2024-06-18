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
var _index = _interopRequireDefault(require("../index"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
(0, _dotenv.config)();
_chai["default"].use(_chaiHttp["default"]);
(0, _mocha.describe)("GET ALL SERIE SEASONS TEST", function () {
  (0, _mocha.it)("should return the seasons", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var loginRes, res;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _chai["default"].request(_index["default"]).post("/auth/login").send({
            email: "yyufmrieoewirq@workingtall.com",
            password: "123456789"
          });
        case 2:
          loginRes = _context.sent;
          _context.next = 5;
          return _chai["default"].request(_index["default"]).get("/series/all/seasons").query({
            videoId: "fr474rtt7w3-4f378i-vv4w-7865-c0f364dfr567hji"
          }).set("authorization", "bearer ".concat(loginRes.body.data));
        case 5:
          res = _context.sent;
          (0, _chai.expect)(res.statusCode).to.equal(200);
          (0, _chai.expect)(res.body.data).to.an("object");
        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  (0, _mocha.it)("should return 400 if there is not season found", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var loginRes, res;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _chai["default"].request(_index["default"]).post("/auth/login").send({
            email: "yyufmrieoewirq@workingtall.com",
            password: "123456789"
          });
        case 2:
          loginRes = _context2.sent;
          _context2.next = 5;
          return _chai["default"].request(_index["default"]).get("/series/all/seasons").query({
            videoId: "fr474rtt7w3-4f378i-vv4w-7865"
          }).set("authorization", "bearer ".concat(loginRes.body.data));
        case 5:
          res = _context2.sent;
          (0, _chai.expect)(res.statusCode).to.equal(400);
          (0, _chai.expect)(res.body).to.have.property("message", "Can't find what you requested");
        case 8:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  (0, _mocha.it)("should return 500 if there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var stub, loginRes, res;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          stub = _sinon["default"].stub(_serieServices["default"], "getAllSeasons")["throws"](new Error("Something went wrong"));
          _context3.next = 3;
          return _chai["default"].request(_index["default"]).post("/auth/login").send({
            email: "yyufmrieoewirq@workingtall.com",
            password: "123456789"
          });
        case 3:
          loginRes = _context3.sent;
          _context3.next = 6;
          return _chai["default"].request(_index["default"]).get("/series/all/seasons").query({
            videoId: "fr474rtt7w3-4f378i-vv4w-7865"
          }).set("authorization", "bearer ".concat(loginRes.body.data.token));
        case 6:
          res = _context3.sent;
          stub.restore();
          (0, _chai.expect)(res.statusCode).to.equal(500);
        case 9:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
});