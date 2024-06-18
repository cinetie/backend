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
var _earningServices = _interopRequireDefault(require("../services/earningServices"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
(0, _dotenv.config)();
_chai["default"].use(_chaiHttp["default"]);
(0, _mocha.describe)("GET CP VIDEO BY TYPE TEST", function () {
  (0, _mocha.it)("should return all cp videos", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var loginRes, res;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _chai["default"].request(_index["default"]).post("/cp/login").send({
            email: "cp0009@example.com",
            password: "izzeddin"
          });
        case 2:
          loginRes = _context.sent;
          _context.next = 5;
          return _chai["default"].request(_index["default"]).get("/cp/videos").set("authorization", "bearer ".concat(loginRes.body.data)).query({
            type: "movie"
          });
        case 5:
          res = _context.sent;
          (0, _chai.expect)(res.statusCode).to.equal(200);
          (0, _chai.expect)(res.body).to.have.property("message", "Data found");
          (0, _chai.expect)(res.body.data).to.be.an("array");
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  (0, _mocha.it)("should return 404 if the cp has not videos", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var loginRes, res;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _chai["default"].request(_index["default"]).post("/cp/login").send({
            email: "cp0011@example.com",
            password: "izzeddin"
          });
        case 2:
          loginRes = _context2.sent;
          _context2.next = 5;
          return _chai["default"].request(_index["default"]).get("/cp/videos").set("authorization", "bearer ".concat(loginRes.body.data)).query({
            type: "movie"
          });
        case 5:
          res = _context2.sent;
          (0, _chai.expect)(res.statusCode).to.equal(400);
          (0, _chai.expect)(res.body).to.have.property("message", "Data not found");
        case 8:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
});