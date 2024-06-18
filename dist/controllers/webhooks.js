"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Transaction = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _flutterwaveNodeV = _interopRequireDefault(require("flutterwave-node-v3"));
var _path = _interopRequireDefault(require("path"));
var _axios = _interopRequireDefault(require("axios"));
var _userServices = _interopRequireDefault(require("../services/userServices"));
var _utilities = _interopRequireDefault(require("../helpers/utilities"));
var _sales = _interopRequireDefault(require("../helpers/sales"));
var _earnings = _interopRequireDefault(require("../helpers/earnings"));
var _mailer = _interopRequireDefault(require("../helpers/mailer"));
var _transactionService = _interopRequireDefault(require("../services/transactionService"));
var _viewingSessionsServices = _interopRequireDefault(require("../services/viewingSessionsServices"));
var _billingServices = _interopRequireDefault(require("../services/billingServices"));
var _date = _interopRequireDefault(require("../helpers/date"));
var _fetch = _interopRequireDefault(require("../helpers/fetch"));
var _xml = _interopRequireDefault(require("xml"));
/* eslint-disable no-unused-vars */

var util = new _utilities["default"]();
var rave = new _flutterwaveNodeV["default"](process.env.RAVE_PUBLIC, process.env.RAVE_SECRET, Boolean(process.env.RAVE_PRODUCTION));
var Transaction = exports.Transaction = rave.Transaction;
var WebHooks = exports["default"] = /*#__PURE__*/function () {
  function WebHooks() {
    (0, _classCallCheck2["default"])(this, WebHooks);
  }
  (0, _createClass2["default"])(WebHooks, null, [{
    key: "flutterWave",
    value: // eslint-disable-next-line consistent-return
    function () {
      var _flutterWave = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var response, user, test, transVerification, updates, userUpdates, rates, converted, status, _updates, _response, _user, _updates2;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              response = req.body.data ? req.body.data : req.body;
              _context.next = 4;
              return _userServices["default"].getUserByMail(response.customer.email || response.data.customer.email);
            case 4:
              user = _context.sent;
              _context.next = 7;
              return _transactionService["default"].updateTransaction(response.tx_ref, {
                statusDesc: response.status.toLowerCase()
              });
            case 7:
              test = _context.sent;
              _context.next = 10;
              return WebHooks.transVerification(response.id);
            case 10:
              transVerification = _context.sent;
              if (!(transVerification.status === "success")) {
                _context.next = 34;
                break;
              }
              updates = {};
              _context.next = 15;
              return _billingServices["default"].updateSubscription(user.email, {
                endDate: !user.isBilledAnnually ? _date["default"].addMoreDays(30).toDateString() : _date["default"].addMoreDays(365).toDateString(),
                state: "current"
              });
            case 15:
              userUpdates = response["event.type"] === "CARD_TRANSACTION" ? {
                permissionLevel: 1,
                card_nonce: transVerification.data.card.token
              } : {
                permissionLevel: 1
              };
              _context.next = 18;
              return _userServices["default"].updateUser(user.email, userUpdates);
            case 18:
              updates = _context.sent;
              if (!(response.currency === "USD")) {
                _context.next = 25;
                break;
              }
              _context.next = 22;
              return (0, _fetch["default"])(undefined, {
                Accept: "application/json"
              }, "https://apilayer.net/api/live?access_key=".concat(process.env.ACCESS_KEY_CURRENCY_LAYER, "&currencies=RWF&source=USD&format=1"), "GET");
            case 22:
              rates = _context.sent;
              converted = Math.floor(rates.quotes.USDRWF * response.amount);
              response.amount = converted;
            case 25:
              _context.next = 27;
              return WebHooks.registerSales(response, user, req, res);
            case 27:
              status = _context.sent;
              if (!(status === true)) {
                _context.next = 32;
                break;
              }
              _context.next = 31;
              return _billingServices["default"].updateSubscription(user.email, {
                state: "current"
              });
            case 31:
              return _context.abrupt("return", util.setSuccessResponse(res, "Success", 200, {
                status: "sucesss"
              }));
            case 32:
              _context.next = 40;
              break;
            case 34:
              _context.next = 36;
              return _userServices["default"].updateUser(user.email, {
                permissionLevel: -1
              });
            case 36:
              _updates = _context.sent;
              if (!_updates) {
                _context.next = 39;
                break;
              }
              return _context.abrupt("return", util.setSuccessResponse(res, "Payment failed", 400, _updates));
            case 39:
              return _context.abrupt("return", util.setErrorResponse(res, "Server Error: can't update subscription", 400));
            case 40:
              _context.next = 56;
              break;
            case 42:
              _context.prev = 42;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);
              if (!req) {
                _context.next = 55;
                break;
              }
              _response = req.body.data ? req.body.data : req.body;
              _context.next = 49;
              return _userServices["default"].getUserByMail(_response.customer.email || _response.data.customer.email);
            case 49:
              _user = _context.sent;
              _context.next = 52;
              return _userServices["default"].updateUser(_user.email, {
                permissionLevel: -1
              });
            case 52:
              _updates2 = _context.sent;
              _context.next = 55;
              return _billingServices["default"].updateSubscription(_user.email, {
                state: "ended"
              });
            case 55:
              return _context.abrupt("return", util.setErrorResponse(res, "Server Error ".concat(_context.t0 || _context.t0.message), 500));
            case 56:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 42]]);
      }));
      function flutterWave(_x, _x2) {
        return _flutterWave.apply(this, arguments);
      }
      return flutterWave;
    }()
  }, {
    key: "transVerification",
    value: function () {
      var _transVerification = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
        var transVerification;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _axios["default"].get("https://api.flutterwave.com/v3/transactions/".concat(id, "/verify"), {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer ".concat(process.env.RAVE_SECRET)
                }
              });
            case 2:
              transVerification = _context2.sent;
              return _context2.abrupt("return", transVerification.data);
            case 4:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function transVerification(_x3) {
        return _transVerification.apply(this, arguments);
      }
      return transVerification;
    }()
  }, {
    key: "registerSales",
    value: function () {
      var _registerSales = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(response, user, req, res) {
        var sales;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _sales["default"].addRecord({
                method: response.payment_type,
                plan: user.plan,
                amount: response.amount * 0.3,
                user: user.email
              });
            case 2:
              sales = _context3.sent;
              if (!sales) {
                _context3.next = 5;
                break;
              }
              return _context3.abrupt("return", true);
            case 5:
              throw new Error("Sales recording error");
            case 6:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function registerSales(_x4, _x5, _x6, _x7) {
        return _registerSales.apply(this, arguments);
      }
      return registerSales;
    }()
  }, {
    key: "registerDPOSales",
    value: function () {
      var _registerDPOSales = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(transaction, user, req, res) {
        var sales;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _sales["default"].addRecord({
                plan: user.plan,
                amount: transaction.paidAmount * 0.3,
                user: user.email
              });
            case 2:
              sales = _context4.sent;
              if (!sales) {
                _context4.next = 5;
                break;
              }
              return _context4.abrupt("return", true);
            case 5:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      function registerDPOSales(_x8, _x9, _x10, _x11) {
        return _registerDPOSales.apply(this, arguments);
      }
      return registerDPOSales;
    }()
  }, {
    key: "DPOwebhook",
    value: function () {
      var _DPOwebhook = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var findTransaction, user, updates, rates, converted, afterRatesAmount, status;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              console.log("================ body start ===============");
              console.log(req.body);
              console.log("================ body end =================");
              _context5.prev = 3;
              _context5.next = 6;
              return _transactionService["default"].getByNumberId(req.body.api3g.customerphone[0]);
            case 6:
              findTransaction = _context5.sent;
              if (findTransaction) {
                _context5.next = 9;
                break;
              }
              return _context5.abrupt("return", res.set("Content-Type", "text/xml").send((0, _xml["default"])({
                API3G: [{
                  Response: "OK"
                }]
              })));
            case 9:
              _context5.next = 11;
              return findTransaction.update({
                statusDesc: "approved"
              });
            case 11:
              _context5.next = 13;
              return _userServices["default"].getUserByMail(findTransaction.email);
            case 13:
              user = _context5.sent;
              updates = {};
              _context5.next = 17;
              return _billingServices["default"].updateSubscription(user.email, {
                endDate: !user.isBilledAnnually ? _date["default"].addMoreDays(30).toDateString() : _date["default"].addMoreDays(365).toDateString(),
                state: "current"
              });
            case 17:
              _context5.next = 19;
              return _userServices["default"].updateUser(user.email, {
                permissionLevel: 1
              });
            case 19:
              updates = _context5.sent;
              _context5.next = 22;
              return (0, _fetch["default"])(undefined, {
                Accept: "application/json"
              }, "https://apilayer.net/api/live?access_key=".concat(process.env.ACCESS_KEY_CURRENCY_LAYER, "&currencies=RWF&source=USD&format=1"), "GET");
            case 22:
              rates = _context5.sent;
              converted = Math.floor(rates.quotes.USDRWF * findTransaction.paidAmount);
              afterRatesAmount = converted;
              _context5.next = 27;
              return WebHooks.registerDPOSales(findTransaction, user, req, res);
            case 27:
              status = _context5.sent;
              if (!(status === true)) {
                _context5.next = 32;
                break;
              }
              _context5.next = 31;
              return _billingServices["default"].updateSubscription(user.email, {
                state: "current"
              });
            case 31:
              return _context5.abrupt("return", res.set("Content-Type", "text/xml").send((0, _xml["default"])({
                API3G: [{
                  Response: "OK"
                }]
              })));
            case 32:
              _context5.next = 37;
              break;
            case 34:
              _context5.prev = 34;
              _context5.t0 = _context5["catch"](3);
              return _context5.abrupt("return", util.setErrorResponse(res, "Server Error ".concat(_context5.t0 || _context5.t0.message), 500));
            case 37:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[3, 34]]);
      }));
      function DPOwebhook(_x12, _x13) {
        return _DPOwebhook.apply(this, arguments);
      }
      return DPOwebhook;
    }()
  }]);
  return WebHooks;
}();