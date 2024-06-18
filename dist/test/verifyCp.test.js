"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _chai = _interopRequireWildcard(require("chai"));
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _sinon = _interopRequireDefault(require("sinon"));
var _mocha = require("mocha");
var _jwt = _interopRequireDefault(require("../helpers/jwt"));
var _date = _interopRequireDefault(require("../helpers/date"));
var mailer = _interopRequireWildcard(require("../helpers/mailer"));
var _index = _interopRequireDefault(require("../index"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
_chai["default"].use(_chaiHttp["default"]);
(0, _mocha.describe)("RESET CP PASSWORD TEST", function () {
  (0, _mocha.it)("should return 404 status code if the user is not found", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var token, res;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          token = _jwt["default"].jwtSign({
            exp: new Date().getTime()
          }, process.env.SECRET, "1d");
          _context.next = 3;
          return _chai["default"].request(_index["default"]).get("/cp/verify/").query({
            id: 10045667,
            token: token
          }).send({
            password: "newpassword"
          });
        case 3:
          res = _context.sent;
          (0, _chai.expect)(res.statusCode).to.equal(404);
          (0, _chai.expect)(res.body).to.have.property("message", "can't find user");
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  (0, _mocha.it)("should redirect the user after verifying", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var token, res;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          token = _jwt["default"].jwtSign({
            exp: new Date().getTime()
          }, process.env.SECRET, "1d");
          _context2.next = 3;
          return _chai["default"].request(_index["default"]).get("/cp/verify/").query({
            id: 1007,
            token: token
          }).redirects(0);
        case 3:
          res = _context2.sent;
          (0, _chai.expect)(res.statusCode).to.equal(200);
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  (0, _mocha.it)("should redirect the user after verifying", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var stub, token, res;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          stub = _sinon["default"].stub(mailer, "default")["throws"](new Error("something went wrong"));
          token = _jwt["default"].jwtSign({
            exp: new Date().getTime()
          }, process.env.SECRET, "1d");
          _context3.next = 4;
          return _chai["default"].request(_index["default"]).get("/cp/verify/").query({
            id: 1007,
            token: token
          }).redirects(0);
        case 4:
          res = _context3.sent;
          stub.restore();
          (0, _chai.expect)(res.statusCode).to.equal(500);
          (0, _chai.expect)(res.body.message.includes("Something went wrong")).to.be["true"];
        case 8:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
});