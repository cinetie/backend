"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _sequelize = require("sequelize");
var _viewingSessionsServices = _interopRequireDefault(require("../services/viewingSessionsServices"));
var _models = _interopRequireDefault(require("../database/models"));
var _earnings = _interopRequireDefault(require("./earnings"));
var Op = _sequelize.Sequelize.Op;
var today = new Date();
var calculateEarningController = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var data, i, date, sessions;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _models["default"].subscriptions.findAll({
            where: {
              state: "current"
            }
          });
        case 2:
          data = _context.sent;
          i = 0;
        case 4:
          if (!(i < Object.values(data).length)) {
            _context.next = 16;
            break;
          }
          date = new Date(data[i].dataValues.endDate);
          if (!(date.getTime() < today.getTime())) {
            _context.next = 13;
            break;
          }
          _context.next = 9;
          return _viewingSessionsServices["default"].getActiveAndSuspendedSessionsPerUser(data[i].dataValues.email);
        case 9:
          sessions = _context.sent;
          if (!(sessions.length > 0)) {
            _context.next = 13;
            break;
          }
          _context.next = 13;
          return (0, _earnings["default"])(data[i].dataValues.email);
        case 13:
          i++;
          _context.next = 4;
          break;
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function calculateEarningController() {
    return _ref.apply(this, arguments);
  };
}();
var _default = exports["default"] = calculateEarningController;