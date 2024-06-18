"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExpiredSubscriptions = getExpiredSubscriptions;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _sequelize = require("sequelize");
var _models = _interopRequireDefault(require("../database/models"));
/* eslint-disable import/prefer-default-export */
function getExpiredSubscriptions() {
  return _getExpiredSubscriptions.apply(this, arguments);
}
function _getExpiredSubscriptions() {
  _getExpiredSubscriptions = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var today, subs;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          today = new Date();
          subs = _models["default"].subscriptions.findAll({
            where: _sequelize.Sequelize.literal("STR_TO_DATE(endDate, '%a %b %d %Y') <= '".concat(today.toISOString(), "'"))
          });
          return _context.abrupt("return", subs);
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _getExpiredSubscriptions.apply(this, arguments);
}