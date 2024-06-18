"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _earning = _interopRequireDefault(require("../controllers/earning"));
var _billingServices = _interopRequireDefault(require("../services/billingServices"));
var _userServices = _interopRequireDefault(require("../services/userServices"));
// helper for registering earnings/shares based
// on the amount of videos watched and subscription plan
var registerEarnings = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(email) {
    var user, updates, results;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _userServices["default"].getUserByMail(email);
        case 3:
          user = _context.sent;
          if (!user) {
            _context.next = 14;
            break;
          }
          _context.next = 7;
          return _billingServices["default"].updateSubscription(email, {
            dueState: true
          });
        case 7:
          updates = _context.sent;
          _context.next = 10;
          return _earning["default"].assignRateToEachVideo(email);
        case 10:
          results = _context.sent;
          if (!(updates[1] && results)) {
            _context.next = 13;
            break;
          }
          return _context.abrupt("return", 1);
        case 13:
          return _context.abrupt("return", 0);
        case 14:
          return _context.abrupt("return", 0);
        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", 0);
        case 20:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 17]]);
  }));
  return function registerEarnings(_x) {
    return _ref.apply(this, arguments);
  };
}();
var _default = exports["default"] = registerEarnings;