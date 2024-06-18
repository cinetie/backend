"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _nodeForge = _interopRequireDefault(require("node-forge"));
var _fetch = _interopRequireDefault(require("./fetch"));
var _uuid = _interopRequireDefault(require("./uuid"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Rave = exports["default"] = /*#__PURE__*/function () {
  function Rave() {
    (0, _classCallCheck2["default"])(this, Rave);
  }
  (0, _createClass2["default"])(Rave, null, [{
    key: "encrypt",
    value: function encrypt(card, key) {
      var cardDetails = JSON.stringify(card);
      var cipher = _nodeForge["default"].cipher.createCipher("3DES-ECB", _nodeForge["default"].util.createBuffer(key));
      cipher.start({
        iv: ""
      });
      cipher.update(_nodeForge["default"].util.createBuffer(cardDetails, "utf-8"));
      cipher.finish();
      var encrypted = cipher.output;
      return _nodeForge["default"].util.encode64(encrypted.getBytes());
    }
  }, {
    key: "chargeMomo",
    value: function () {
      var _chargeMomo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(raw) {
        var responseMomo;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return (0, _fetch["default"])(_objectSpread(_objectSpread({}, raw), {}, {
                tx_ref: _uuid["default"].generator()
              }), {
                "Content-Type": "application/json",
                Authorization: process.env.RAVE_SECRET
              }, "".concat(process.env.RAVE_CHARGE_URL, "/v3/charges?type=mobile_money_rwanda"), "POST");
            case 3:
              responseMomo = _context.sent;
              return _context.abrupt("return", responseMomo);
            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              throw _context.t0;
            case 10:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 7]]);
      }));
      function chargeMomo(_x) {
        return _chargeMomo.apply(this, arguments);
      }
      return chargeMomo;
    }()
  }, {
    key: "chargeCard",
    value: function () {
      var _chargeCard = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(raw) {
        var payload, client, responseCard;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              payload = _objectSpread(_objectSpread({}, raw), {}, {
                redirect_url: "https://cinetie.com/home",
                tx_ref: _uuid["default"].generator(),
                flw_ref: _uuid["default"].generator()
              });
              client = Rave.encrypt(payload, process.env.RAVE_ENC_KEY);
              _context2.next = 5;
              return (0, _fetch["default"])({
                client: client
              }, {
                "Content-Type": "application/json",
                Authorization: process.env.RAVE_SECRET
              }, "".concat(process.env.RAVE_CHARGE_URL, "/v3/charges?type=card"), "POST");
            case 5:
              responseCard = _context2.sent;
              return _context2.abrupt("return", responseCard);
            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);
              throw _context2.t0;
            case 12:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 9]]);
      }));
      function chargeCard(_x2) {
        return _chargeCard.apply(this, arguments);
      }
      return chargeCard;
    }()
  }, {
    key: "verifyTransaction",
    value: function () {
      var _verifyTransaction = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id) {
        var responseVerification;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return (0, _fetch["default"])("", {
                "Content-Type": "application/json",
                Authorization: process.env.RAVE_SECRET
              }, "".concat(process.env.RAVE_CHARGE_URL, "/v3/transactions/").concat(id, "/verify"), "GET");
            case 3:
              responseVerification = _context3.sent;
              return _context3.abrupt("return", responseVerification);
            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);
              throw _context3.t0;
            case 10:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 7]]);
      }));
      function verifyTransaction(_x3) {
        return _verifyTransaction.apply(this, arguments);
      }
      return verifyTransaction;
    }()
  }, {
    key: "validateACharge",
    value: function () {
      var _validateACharge = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(raw) {
        var responseChargeValidation;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return (0, _fetch["default"])(raw, {
                "Content-Type": "application/json",
                Authorization: process.env.RAVE_SECRET
              }, "".concat(process.env.RAVE_CHARGE_URL, "/v3/validate-charge"), "POST");
            case 3:
              responseChargeValidation = _context4.sent;
              return _context4.abrupt("return", responseChargeValidation);
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
      function validateACharge(_x4) {
        return _validateACharge.apply(this, arguments);
      }
      return validateACharge;
    }()
  }, {
    key: "chargeTokenised",
    value: function () {
      var _chargeTokenised = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(raw) {
        var responseTokenised;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return (0, _fetch["default"])(_objectSpread(_objectSpread({}, raw), {}, {
                tx_ref: _uuid["default"].generator(),
                currency: "RWF",
                country: "RW"
              }), {
                "Content-Type": "application/json",
                Authorization: process.env.RAVE_SECRET
              }, "".concat(process.env.RAVE_CHARGE_URL, "/v3/tokenized-charges"), "POST");
            case 3:
              responseTokenised = _context5.sent;
              return _context5.abrupt("return", responseTokenised);
            case 7:
              _context5.prev = 7;
              _context5.t0 = _context5["catch"](0);
              throw _context5.t0;
            case 10:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 7]]);
      }));
      function chargeTokenised(_x5) {
        return _chargeTokenised.apply(this, arguments);
      }
      return chargeTokenised;
    }()
  }]);
  return Rave;
}();