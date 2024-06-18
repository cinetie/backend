"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _sequelize = require("sequelize");
var _models = _interopRequireDefault(require("../database/models"));
var stopLoginSessions = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var subscription;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _models["default"].subscriptions.findAll({
            where: (0, _defineProperty2["default"])({}, _sequelize.Op.or, [{
              state: "current"
            }, {
              state: "pending"
            }, {
              state: "cancelled"
            }])
          });
        case 2:
          subscription = _context2.sent;
          subscription.forEach( /*#__PURE__*/function () {
            var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(sub) {
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    if (!(new Date(sub.endDate).getTime() < new Date().getTime())) {
                      _context.next = 6;
                      break;
                    }
                    _context.next = 3;
                    return _models["default"].User.update({
                      permissionLevel: -1
                    }, {
                      where: {
                        email: sub.email
                      }
                    });
                  case 3:
                    if (!(sub.state === "pending")) {
                      _context.next = 6;
                      break;
                    }
                    _context.next = 6;
                    return _models["default"].subscriptions.update({
                      state: "canceled"
                    }, {
                      returning: true,
                      where: {
                        id: sub.id
                      }
                    });
                  case 6:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function (_x) {
              return _ref2.apply(this, arguments);
            };
          }());
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function stopLoginSessions() {
    return _ref.apply(this, arguments);
  };
}();
var _default = exports["default"] = stopLoginSessions;