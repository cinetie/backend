"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _userServices = _interopRequireDefault(require("../services/userServices"));
var _utilities = _interopRequireDefault(require("../helpers/utilities"));
var util = new _utilities["default"]();
var checkCredentials = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var user, status;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _userServices["default"].getUserByMail(req.body.email);
        case 3:
          user = _context.sent;
          if (user) {
            _context.next = 6;
            break;
          }
          return _context.abrupt("return", util.setErrorResponse(res, "Invalid email or password!", 400));
        case 6:
          _context.next = 8;
          return _bcrypt["default"].compare(req.body.password, user.password);
        case 8:
          status = _context.sent;
          if (status) {
            _context.next = 11;
            break;
          }
          return _context.abrupt("return", util.setErrorResponse(res, "Invalid email or password!", 400));
        case 11:
          if (user.isVerified) {
            _context.next = 13;
            break;
          }
          return _context.abrupt("return", util.setErrorResponse(res, "Verify your account first!", 401));
        case 13:
          req.user = user;
          return _context.abrupt("return", next());
        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", util.setErrorResponse(res, "Something Went wrong logging in ".concat(_context.t0), 500));
        case 20:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 17]]);
  }));
  return function checkCredentials(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var _default = exports["default"] = checkCredentials;