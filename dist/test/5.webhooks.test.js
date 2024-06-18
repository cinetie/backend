"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _chai = _interopRequireWildcard(require("chai"));
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _mocha = require("mocha");
var _sinon = _interopRequireDefault(require("sinon"));
var _webhooks = _interopRequireWildcard(require("../controllers/webhooks"));
var _transactionService = _interopRequireDefault(require("../services/transactionService"));
var _empty = _interopRequireDefault(require("./mock/empty.mock"));
var _flutterwave = require("./mock/flutterwave.mock");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
_chai["default"].use(_chaiHttp["default"]);
var response = {
  payment_type: "",
  amount: 3
};
var user = {
  plan: "Promo",
  email: "blaise1@gmail.com"
};
var userFake = {
  plan: "none"
};
var transPassFake = {
  // Faking a successful transaction
  status: "success",
  statusCode: 200,
  data: {
    card: {
      token: "nuornuonoenfoenoenonn"
    },
    amount: 250
  }
};
var transFailFake = {
  // Faking a successful transaction
  status: "fail",
  statusCode: 200,
  data: {
    card: {
      token: "nuornuonoenfoenoenonn"
    },
    amount: 250
  }
};
(0, _mocha.describe)("WEBHOOKS", function () {
  (0, _mocha.it)("should return 500 if no body is provided", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var stub, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          stub = _sinon["default"].stub(_transactionService["default"], "updateTransaction")["throws"](new Error());
          _context.next = 3;
          return _webhooks["default"].flutterWave(_flutterwave.FlutterMocksError.request, _flutterwave.FlutterMocksError.response);
        case 3:
          data = _context.sent;
          stub.restore();
          (0, _chai.expect)(data.statusCode).to.be.equal(500);
          return _context.abrupt("return", 0);
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  (0, _mocha.it)("should return 200 if body is provided", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var stub, data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          stub = _sinon["default"].stub(_webhooks["default"], "transVerification").callsFake(function () {
            return _flutterwave.verifyTransResponse;
          });
          _context2.next = 3;
          return _webhooks["default"].flutterWave(_flutterwave.FlutterMocks.request, _flutterwave.FlutterMocks.response);
        case 3:
          data = _context2.sent;
          stub.restore();
          (0, _chai.expect)(data.statusCode).to.be.equal(200);
          return _context2.abrupt("return", 0);
        case 7:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  (0, _mocha.it)("should return 400 if transaction verification returned a failed status", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var stub, data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          stub = _sinon["default"].stub(_webhooks["default"], "transVerification").callsFake(function () {
            return _flutterwave.verifyTransResponseFailed;
          });
          _context3.next = 3;
          return _webhooks["default"].flutterWave(_flutterwave.FlutterMocks.request, _flutterwave.FlutterMocks.response);
        case 3:
          data = _context3.sent;
          stub.restore();
          (0, _chai.expect)(data.statusCode).to.be.equal(400);
        case 6:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
  (0, _mocha.it)("should return true", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    var data;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _webhooks["default"].registerSales(response, user, _empty["default"].request, _empty["default"].response);
        case 2:
          data = _context4.sent;
          (0, _chai.expect)(data).to.be.equal(true);
          return _context4.abrupt("return", 0);
        case 5:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  })));
});