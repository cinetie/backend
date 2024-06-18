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
var _sequelize = _interopRequireDefault(require("sequelize"));
var _models = _interopRequireDefault(require("../database/models"));
/* eslint-disable no-useless-catch */

var op = _sequelize["default"].Op;
var paypalAggreementServices = /*#__PURE__*/function () {
  function paypalAggreementServices() {
    (0, _classCallCheck2["default"])(this, paypalAggreementServices);
  }
  (0, _createClass2["default"])(paypalAggreementServices, null, [{
    key: "createNewAggreement",
    value: function () {
      var _createNewAggreement = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(aggreement) {
        var data;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _models["default"].paypalSubscription.create(aggreement);
            case 3:
              data = _context.sent;
              if (!(Object.values(data).length === 1)) {
                _context.next = 6;
                break;
              }
              return _context.abrupt("return", data);
            case 6:
              return _context.abrupt("return", null);
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
      function createNewAggreement(_x) {
        return _createNewAggreement.apply(this, arguments);
      }
      return createNewAggreement;
    }()
  }, {
    key: "getLiveAggreement",
    value: function () {
      var _getLiveAggreement = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(email) {
        var data;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _models["default"].paypalSubscription.findOne({
                where: (0, _defineProperty2["default"])({}, op.and, [{
                  email: email
                }, {
                  state: "alive"
                }])
              });
            case 3:
              data = _context2.sent;
              if (!data) {
                _context2.next = 6;
                break;
              }
              return _context2.abrupt("return", data);
            case 6:
              return _context2.abrupt("return", null);
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
      function getLiveAggreement(_x2) {
        return _getLiveAggreement.apply(this, arguments);
      }
      return getLiveAggreement;
    }()
  }, {
    key: "updateAggreement",
    value: function () {
      var _updateAggreement = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(aggreementId, aggreement) {
        var data;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _models["default"].paypalSubscription.update(aggreement, {
                "return": true,
                where: {
                  aggreementId: aggreementId
                }
              });
            case 3:
              data = _context3.sent;
              if (!data) {
                _context3.next = 6;
                break;
              }
              return _context3.abrupt("return", data);
            case 6:
              return _context3.abrupt("return", null);
            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](0);
              throw _context3.t0;
            case 12:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 9]]);
      }));
      function updateAggreement(_x3, _x4) {
        return _updateAggreement.apply(this, arguments);
      }
      return updateAggreement;
    }()
  }]);
  return paypalAggreementServices;
}();
var _default = exports["default"] = paypalAggreementServices;