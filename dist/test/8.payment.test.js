"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _chai = _interopRequireWildcard(require("chai"));
var _payment = _interopRequireDefault(require("../helpers/payment"));
var _resData = require("./mock/resData.mock");
var _jwt = _interopRequireDefault(require("../helpers/jwt"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var details = {
  isBilledAnnually: true,
  plan: "Promo",
  email: "blaise1@gmail.com",
  phoneNumber: "+240799887212",
  paymentMethod: 2,
  clientId: "10201",
  price: 3
};
var details2 = {
  isBilledAnnually: false,
  plan: "Promo",
  email: "blaise12@gmail.com",
  phoneNumber: "+240799887212",
  paymentMethod: 2
};
var user = {
  phoneNumber: "+240799887212",
  email: "blaise1@gmail.com"
};
var pay = {
  data: {
    RequestId: "b77c3095-1ff2-441b-a19e-5d6f54cf35b9"
  }
};
var token = _jwt["default"].jwtSign(details, process.env.SECRET, "1d");
describe("PAYMENT HELPER", function () {
  it("should return price getPlanPricing()", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var results;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _payment["default"].getPlanPricing(details);
        case 2:
          results = _context.sent;
          (0, _chai.expect)(parseInt(results)).to.satisfy(Number.isInteger);
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  it("should return bill registerNewSubscription()", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var results;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _payment["default"].registerNewSubscription(details);
        case 2:
          results = _context2.sent;
          (0, _chai.expect)(results.email).to.be.equal("blaise1@gmail.com");
          (0, _chai.expect)(Number(results.price)).to.be.equal(12);
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  it("should return bill registerNewSubscription() isBilledAnnually false,", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var results;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _payment["default"].registerNewSubscription(details2);
        case 2:
          results = _context3.sent;
          (0, _chai.expect)(results.email).to.be.equal("blaise12@gmail.com");
          (0, _chai.expect)(Number(results.price)).to.be.equal(3);
        case 5:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));

  // it("should return pay chargeSpenn", async () => {
  //   const results = await payment.chargeSpenn(user, details, token);
  //   expect(results.status).to.be.equal(403);
  // });

  it("should return pay recordTransaction", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    var results;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _payment["default"].recordTransaction(user.email, details.price, pay.data.RequestId, "id234", "pending");
        case 2:
          results = _context4.sent;
          (0, _chai.expect)(results.email).to.be.equal("blaise1@gmail.com");
          (0, _chai.expect)(results.statusDesc).to.be.equal("id234");
        case 5:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  })));
});