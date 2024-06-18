"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _billingServices = _interopRequireDefault(require("../services/billingServices"));
var _userServices = _interopRequireDefault(require("../services/userServices"));
var _planServices = _interopRequireDefault(require("../services/planServices"));
var _transactionService = _interopRequireDefault(require("../services/transactionService"));
var _fetch = _interopRequireDefault(require("./fetch"));
var _date = _interopRequireDefault(require("./date"));
/* eslint-disable no-unused-expressions */
var payment = /*#__PURE__*/function () {
  function payment() {
    (0, _classCallCheck2["default"])(this, payment);
  }
  (0, _createClass2["default"])(payment, null, [{
    key: "getPlanPricing",
    value: function () {
      var _getPlanPricing = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(details) {
        var price, plan;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              price = 0;
              _context.next = 4;
              return _planServices["default"].getParticalPlan(details.plan);
            case 4:
              plan = _context.sent;
              details.isBilledAnnually ? price = plan.yearlyPrice : price = plan.monthlyPrice;
              return _context.abrupt("return", price);
            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              throw _context.t0;
            case 12:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 9]]);
      }));
      function getPlanPricing(_x) {
        return _getPlanPricing.apply(this, arguments);
      }
      return getPlanPricing;
    }()
  }, {
    key: "updatePendingSubscription",
    value: function () {
      var _updatePendingSubscription = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(details) {
        var data, plan, user, bill;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              data = {};
              _context2.next = 4;
              return _planServices["default"].getParticalPlan(details.plan);
            case 4:
              plan = _context2.sent;
              details.isBilledAnnually ? data.price = plan.yearlyPrice : data.price = plan.monthlyPrice;
              data.email = details.email;
              data.plan = details.plan;
              data.state = "pending";
              data.phoneNumber = details.phoneNumber;
              if (details.isBilledAnnually === true) {
                data.endDate = _date["default"].addMoreDays(365).toDateString();
              } else {
                data.endDate = _date["default"].addMoreDays(30).toDateString();
              }
              data.paymentMethod = details.paymentMethod;
              _context2.next = 14;
              return _userServices["default"].getUserByMail(details.email);
            case 14:
              user = _context2.sent;
              if (user.isOnTrial === true) {
                data.trialEnds = _date["default"].addMoreDays(5).getTime();
              }
              _context2.next = 18;
              return _billingServices["default"].updateSubscription(data.email, data);
            case 18:
              bill = _context2.sent;
              if (!bill) {
                _context2.next = 21;
                break;
              }
              return _context2.abrupt("return", bill);
            case 21:
              return _context2.abrupt("return", null);
            case 24:
              _context2.prev = 24;
              _context2.t0 = _context2["catch"](0);
              throw _context2.t0;
            case 27:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 24]]);
      }));
      function updatePendingSubscription(_x2) {
        return _updatePendingSubscription.apply(this, arguments);
      }
      return updatePendingSubscription;
    }()
  }, {
    key: "registerNewSubscription",
    value: function () {
      var _registerNewSubscription = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(details) {
        var data, plan, user, bill;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              data = {};
              _context3.next = 4;
              return _planServices["default"].getParticalPlan(details.plan);
            case 4:
              plan = _context3.sent;
              details.isBilledAnnually ? data.price = plan.yearlyPrice : data.price = plan.monthlyPrice;
              data.email = details.email;
              data.plan = details.plan;
              data.state = "pending";
              data.phoneNumber = details.phoneNumber;
              data.serviceCode = plan.serviceCode;
              if (details.isBilledAnnually === true) {
                data.endDate = _date["default"].addMoreDays(365).toDateString();
              } else {
                data.endDate = _date["default"].addMoreDays(30).toDateString();
              }
              data.paymentMethod = details.paymentMethod;
              _context3.next = 15;
              return _userServices["default"].getUserByMail(details.email);
            case 15:
              user = _context3.sent;
              _context3.next = 18;
              return _billingServices["default"].registerSubscription(data);
            case 18:
              bill = _context3.sent;
              if (!bill) {
                _context3.next = 21;
                break;
              }
              return _context3.abrupt("return", bill);
            case 21:
              return _context3.abrupt("return", null);
            case 24:
              _context3.prev = 24;
              _context3.t0 = _context3["catch"](0);
              throw _context3.t0;
            case 27:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 24]]);
      }));
      function registerNewSubscription(_x3) {
        return _registerNewSubscription.apply(this, arguments);
      }
      return registerNewSubscription;
    }()
  }, {
    key: "chargeSpenn",
    value: function () {
      var _chargeSpenn = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(user, details, token) {
        var pay;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return (0, _fetch["default"])({
                phone: user.phoneNumber,
                amount: details.price
              }, {
                Authorization: "Bearer ".concat(token),
                "Content-Type": "application/json"
              }, "".concat(process.env.PAY_HOST, "/charge/spenn"), "POST");
            case 3:
              pay = _context4.sent;
              return _context4.abrupt("return", pay);
            case 7:
              _context4.prev = 7;
              _context4.t0 = _context4["catch"](0);
              throw _context4.t0;
            case 10:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 7]]);
      }));
      function chargeSpenn(_x4, _x5, _x6) {
        return _chargeSpenn.apply(this, arguments);
      }
      return chargeSpenn;
    }()
  }, {
    key: "recordTransaction",
    value: function () {
      var _recordTransaction = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(email, price, transactionId, status, transToken) {
        var result;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _transactionService["default"].createTransaction({
                email: email,
                statusDesc: status,
                paidAmount: price,
                transactionId: transactionId,
                transToken: transToken,
                currency: "USD"
              });
            case 2:
              result = _context5.sent;
              return _context5.abrupt("return", result);
            case 4:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      function recordTransaction(_x7, _x8, _x9, _x10, _x11) {
        return _recordTransaction.apply(this, arguments);
      }
      return recordTransaction;
    }()
  }, {
    key: "recordFlutterwaveTransaction",
    value: function () {
      var _recordFlutterwaveTransaction = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(user, details, requestId, status) {
        var result;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _transactionService["default"].createTransaction({
                email: user.email,
                statusDesc: status,
                paidAmount: details.price,
                transactionId: requestId,
                currency: "USD"
              });
            case 2:
              result = _context6.sent;
              return _context6.abrupt("return", result);
            case 4:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }));
      function recordFlutterwaveTransaction(_x12, _x13, _x14, _x15) {
        return _recordFlutterwaveTransaction.apply(this, arguments);
      }
      return recordFlutterwaveTransaction;
    }()
  }]);
  return payment;
}();
var _default = exports["default"] = payment;