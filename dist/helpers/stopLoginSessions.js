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
var Op = _sequelize.Sequelize.Op;
var start = new Date();
var date = new Date(start.getTime());
date.setDate(date.getDate() - 2);
var stopLoginSessions = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var sessions;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _models["default"].loginSessions.update({
            state: "out",
            timeOut: start.toTimeString()
          }, {
            where: {
              createdAt: (0, _defineProperty2["default"])({}, Op.lte, date)
            }
          });
        case 2:
          sessions = _context.sent;
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function stopLoginSessions() {
    return _ref.apply(this, arguments);
  };
}();
var _default = exports["default"] = stopLoginSessions;