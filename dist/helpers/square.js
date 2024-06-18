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
var _crypto = _interopRequireDefault(require("crypto"));
/* eslint-disable camelcase */
var Square = exports["default"] = /*#__PURE__*/function () {
  function Square() {
    (0, _classCallCheck2["default"])(this, Square);
  }
  (0, _createClass2["default"])(Square, null, [{
    key: "createCustomer",
    value: function () {
      var _createCustomer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
        var response, responseToJson;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _nodeFetch["default"])("".concat(process.env.SQUARE_API_URL, "/v2/customers"), {
                method: "POST",
                headers: {
                  "Square-Version": "2020-03-25",
                  Authorization: "Bearer ".concat(process.env.SQUARE_ACCESS_TOKEN),
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  email_address: data.email
                })
              });
            case 2:
              response = _context.sent;
              _context.next = 5;
              return response.json();
            case 5:
              responseToJson = _context.sent;
              return _context.abrupt("return", responseToJson);
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function createCustomer(_x) {
        return _createCustomer.apply(this, arguments);
      }
      return createCustomer;
    }()
  }, {
    key: "attachCard",
    value: function () {
      var _attachCard = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data) {
        var response, responseToJson;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _nodeFetch["default"])("".concat(process.env.SQUARE_API_URL, "/v2/customers/").concat(data.customerId, "/cards"), {
                method: "POST",
                headers: {
                  "Square-Version": "2020-03-25",
                  Authorization: "Bearer ".concat(process.env.SQUARE_ACCESS_TOKEN),
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  card_nonce: data.nonce
                })
              });
            case 2:
              response = _context2.sent;
              _context2.next = 5;
              return response.json();
            case 5:
              responseToJson = _context2.sent;
              return _context2.abrupt("return", responseToJson.card.id);
            case 7:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function attachCard(_x2) {
        return _attachCard.apply(this, arguments);
      }
      return attachCard;
    }()
  }, {
    key: "billCard",
    value: function () {
      var _billCard = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(data) {
        var response, jsonResponse, status, card_brand;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return (0, _nodeFetch["default"])("".concat(process.env.SQUARE_API_URL, "/v2/payments"), {
                method: "POST",
                headers: {
                  "Square-Version": "2020-03-25",
                  Authorization: "Bearer ".concat(process.env.SQUARE_ACCESS_TOKEN),
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  customer_id: data.customerId,
                  source_id: data.source_id,
                  amount_money: data.amount_money,
                  idempotency_key: _crypto["default"].randomBytes(22).toString("hex")
                })
              });
            case 2:
              response = _context3.sent;
              _context3.next = 5;
              return response.json();
            case 5:
              jsonResponse = _context3.sent;
              status = jsonResponse.payment.status;
              card_brand = jsonResponse.payment.card_details.card.card_brand;
              return _context3.abrupt("return", {
                status: status,
                cardBrand: card_brand
              });
            case 9:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function billCard(_x3) {
        return _billCard.apply(this, arguments);
      }
      return billCard;
    }() // static async
  }]);
  return Square;
}();