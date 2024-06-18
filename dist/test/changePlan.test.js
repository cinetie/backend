"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _chai = _interopRequireWildcard(require("chai"));
var _nodeMocksHttp = _interopRequireDefault(require("node-mocks-http"));
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _mocha = require("mocha");
var _updateSubscription = _interopRequireDefault(require("../middlewares/updateSubscription"));
var _jwt = _interopRequireDefault(require("../helpers/jwt"));
var _index = _interopRequireDefault(require("../index"));
var _sinon = _interopRequireDefault(require("sinon"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
_chai["default"].use(_chaiHttp["default"]);
var response = _nodeMocksHttp["default"].createResponse();
var createRequest = function createRequest(plan, token) {
  return {
    body: {
      plan: plan
    },
    headers: {
      authorization: "Bearer ".concat(token)
    }
  };
};
(0, _mocha.describe)("change plan Middleware", function () {
  (0, _mocha.it)("should return 404 if the plan doesn't exist", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var email, token, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          email = 'nonexistantuser@example.com';
          token = _jwt["default"].jwtSign({
            email: email,
            clientId: '0'
          }, process.env.SECRET, "1d");
          _context.next = 4;
          return (0, _updateSubscription["default"])(createRequest('fullyearfreeplan', token), response);
        case 4:
          data = _context.sent;
          (0, _chai.expect)(data.statusCode).to.be.equal(404);
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  (0, _mocha.it)('should return 404 if the user doesn\'t have a subscription', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var email, token, data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          email = 'userwithoutsubscription@example.com';
          token = _jwt["default"].jwtSign({
            email: email,
            clientId: '0'
          }, process.env.SECRET, "1d");
          _context2.next = 4;
          return (0, _updateSubscription["default"])(createRequest('Premium', token), response);
        case 4:
          data = _context2.sent;
          (0, _chai.expect)(data.statusCode).to.be.equal(404);
        case 6:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  (0, _mocha.it)('should return 201 when their subscription is changed', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var nextSpy, email, token, data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          nextSpy = _sinon["default"].spy();
          email = 'subscribedusern@example.com';
          token = _jwt["default"].jwtSign({
            email: email,
            clientId: '0'
          }, process.env.SECRET, "1d");
          _context3.next = 5;
          return (0, _updateSubscription["default"])(createRequest('Premium', token), response, nextSpy);
        case 5:
          data = _context3.sent;
          (0, _chai.expect)(nextSpy.calledOnce).to.be["true"];
        case 7:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
});