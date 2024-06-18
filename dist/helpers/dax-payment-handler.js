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
var _nodeFetch = _interopRequireDefault(require("node-fetch"));
var _uuid = _interopRequireDefault(require("./uuid"));
// handler for dax payment services
var paymentHandler = /*#__PURE__*/function () {
  function paymentHandler() {
    (0, _classCallCheck2["default"])(this, paymentHandler);
  }
  (0, _createClass2["default"])(paymentHandler, null, [{
    key: "creditCards",
    value: function () {
      var _creditCards = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(details) {
        var data, response, results;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              data = {
                keys: {
                  PUBLIC: "".concat(process.env.FLUTTERWAVE_PUBLIC_KEY),
                  SECRET: "".concat(process.env.FLUTTERWAVE_SECRET_KEY)
                },
                payload: {
                  cardno: details.card.crNumber,
                  cvv: details.card.crCVC,
                  expirymonth: details.card.expMonth,
                  expiryyear: details.card.expYear,
                  currency: "RWF",
                  country: "RW",
                  amount: details.transaction.amount.toString(),
                  email: details.user.email,
                  phonenumber: details.user.phoneNumber,
                  firstname: details.user.cardFirstName,
                  lastname: details.user.cardLastName,
                  txRef: _uuid["default"].generator()
                }
              };
              _context.next = 3;
              return (0, _nodeFetch["default"])("".concat(process.env.DAX_PAY_URL, "/credit-card"), {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
              });
            case 3:
              response = _context.sent;
              _context.next = 6;
              return response.json();
            case 6:
              results = _context.sent;
              if (!response) {
                _context.next = 11;
                break;
              }
              if (!results.error) {
                _context.next = 10;
                break;
              }
              return _context.abrupt("return", 0);
            case 10:
              return _context.abrupt("return", 1);
            case 11:
              return _context.abrupt("return", {
                state: "Fetch error"
              });
            case 12:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function creditCards(_x) {
        return _creditCards.apply(this, arguments);
      }
      return creditCards;
    }()
  }, {
    key: "momo",
    value: function () {
      var _momo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(details) {
        var data, response, results;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              data = {
                keys: {
                  PUBLIC: "".concat(process.env.FLUTTERWAVE_PUBLIC_KEY),
                  SECRET: "".concat(process.env.FLUTTERWAVE_SECRET_KEY)
                },
                payload: {
                  amount: details.amount.toString(),
                  email: details.email,
                  phonenumber: details.phonenumber,
                  firstname: details.firstName,
                  lastname: details.lastName,
                  txRef: _uuid["default"].generator()
                }
              };
              _context2.next = 3;
              return (0, _nodeFetch["default"])("".concat(process.env.DAX_PAY_URL, "/mobile-money"), {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
              });
            case 3:
              response = _context2.sent;
              _context2.next = 6;
              return response.json();
            case 6:
              results = _context2.sent;
              if (!response) {
                _context2.next = 11;
                break;
              }
              if (!results.error) {
                _context2.next = 10;
                break;
              }
              return _context2.abrupt("return", 0);
            case 10:
              return _context2.abrupt("return", 1);
            case 11:
              return _context2.abrupt("return", {
                state: "Fetch error"
              });
            case 12:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function momo(_x2) {
        return _momo.apply(this, arguments);
      }
      return momo;
    }()
  }]);
  return paymentHandler;
}();
var _default = exports["default"] = paymentHandler;