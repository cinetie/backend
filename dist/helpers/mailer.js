"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _ejs = _interopRequireDefault(require("ejs"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
/* eslint-disable no-useless-catch */
/* eslint-disable no-console */

var mailer = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(emailToSend) {
    var transporter, path;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _nodemailer["default"].createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
              user: process.env.SENDGRID_USER,
              pass: process.env.SENDGRID_PASS
            }
          });
        case 3:
          transporter = _context.sent;
          path = emailToSend[2].path;
          return _context.abrupt("return", _ejs["default"].renderFile(path, emailToSend[0], function (error, data) {
            if (error) {} else {
              var emailOptions = {
                from: '"Cinetie Support" <support@cinetie.com>',
                to: emailToSend[1].to,
                subject: emailToSend[1].subject,
                html: data
              };
              transporter.sendMail(emailOptions).then(function (success) {
                return success;
              })["catch"](function (err) {
                throw error;
              });
            }
          }));
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          throw _context.t0;
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function mailer(_x) {
    return _ref.apply(this, arguments);
  };
}();
var _default = exports["default"] = mailer;