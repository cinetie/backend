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
var _crypto = _interopRequireDefault(require("../helpers/crypto"));
var _jwt = _interopRequireDefault(require("../helpers/jwt"));
var _utilities = _interopRequireDefault(require("../helpers/utilities"));
// This middleware checks that the user provied credentials  collide with the
// sysadmin's crendentials

var util = new _utilities["default"]();
var authenticator = /*#__PURE__*/function () {
  function authenticator() {
    (0, _classCallCheck2["default"])(this, authenticator);
  }
  (0, _createClass2["default"])(authenticator, null, [{
    key: "verifyAdmin",
    value: function () {
      var _verifyAdmin = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
        var payload, token;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              try {
                if (req.body.email == null || req.body.password == null) util.setErrorResponse(res, "some fields are empty", 400);
                payload = _crypto["default"].crypto();
                token = _jwt["default"].jwtSign({
                  payload: payload,
                  user: process.env.ADMIN_USER
                }, process.env.SECRET);
                if (req.body.password === process.env.ADMIN_PASS && req.body.email === process.env.ADMIN_USER) {
                  util.setSuccessResponse(res, "Access granted", 200, token);
                } else {
                  next();
                }
              } catch (error) {
                util.setErrorResponse(res, error.message, 500);
              }
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function verifyAdmin(_x, _x2, _x3) {
        return _verifyAdmin.apply(this, arguments);
      }
      return verifyAdmin;
    }()
  }]);
  return authenticator;
}();
var _default = exports["default"] = authenticator;