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
var _generatePassword = _interopRequireDefault(require("generate-password"));
var _path = _interopRequireDefault(require("path"));
var _mailer = _interopRequireDefault(require("../helpers/mailer"));
var _staffServices = _interopRequireDefault(require("../services/staffServices"));
var _bcrypt = _interopRequireDefault(require("../helpers/bcrypt"));
var _utilities = _interopRequireDefault(require("../helpers/utilities"));
var _jwt = _interopRequireDefault(require("../helpers/jwt"));
var util = new _utilities["default"]();
var StaffController = /*#__PURE__*/function () {
  function StaffController() {
    (0, _classCallCheck2["default"])(this, StaffController);
  }
  (0, _createClass2["default"])(StaffController, null, [{
    key: "login",
    value: function () {
      var _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _req$body, email, password, staff, status, token;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$body = req.body, email = _req$body.email, password = _req$body.password;
              _context.next = 4;
              return _staffServices["default"].getStaffByMail(email);
            case 4:
              staff = _context.sent;
              if (staff) {
                _context.next = 7;
                break;
              }
              return _context.abrupt("return", util.setErrorResponse(res, "Invalid email or password!", 400));
            case 7:
              status = _bcrypt["default"].compare(password, staff.password);
              if (status) {
                _context.next = 10;
                break;
              }
              return _context.abrupt("return", util.setErrorResponse(res, "Invalid email or password!", 400));
            case 10:
              token = _jwt["default"].jwtSign({
                user: req.body.email,
                role: staff.role
              }, process.env.SECRET, "1d");
              return _context.abrupt("return", util.setSuccessResponse(res, "Logged in successfully!", 200, {
                token: token,
                role: staff.role
              }));
            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", util.setErrorResponse(res, "Something Went wrong logging in ".concat(_context.t0), 500));
            case 17:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 14]]);
      }));
      function login(_x, _x2) {
        return _login.apply(this, arguments);
      }
      return login;
    }()
  }, {
    key: "addNewStaff",
    value: function () {
      var _addNewStaff = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var _req$body2, email, role, password, staff, hiddenPassword, newStaff, EmailStatus;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _req$body2 = req.body, email = _req$body2.email, role = _req$body2.role;
              password = _generatePassword["default"].generate({
                length: 10,
                numbers: true
              });
              _context2.next = 5;
              return _staffServices["default"].getStaffByMail(email);
            case 5:
              staff = _context2.sent;
              _context2.next = 8;
              return _bcrypt["default"].encrypt(password);
            case 8:
              hiddenPassword = _context2.sent;
              if (!staff) {
                _context2.next = 11;
                break;
              }
              return _context2.abrupt("return", util.setErrorResponse(res, "the staff already exists", 403));
            case 11:
              _context2.next = 13;
              return _staffServices["default"].addNewStaff({
                email: email,
                role: role,
                password: hiddenPassword
              });
            case 13:
              newStaff = _context2.sent;
              EmailStatus = "an error occured while signing up";
              if (!newStaff) {
                _context2.next = 19;
                break;
              }
              _context2.next = 18;
              return StaffController.sendEmail(email, password);
            case 18:
              EmailStatus = _context2.sent;
            case 19:
              if (!EmailStatus) {
                _context2.next = 21;
                break;
              }
              return _context2.abrupt("return", util.setErrorResponse(res, EmailStatus, 500));
            case 21:
              return _context2.abrupt("return", util.setSuccessResponse(res, "Staff added successfully!", 201, null));
            case 24:
              _context2.prev = 24;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", util.setErrorResponse(res, "Something Went wrong logging in ".concat(_context2.t0), 500));
            case 27:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 24]]);
      }));
      function addNewStaff(_x3, _x4) {
        return _addNewStaff.apply(this, arguments);
      }
      return addNewStaff;
    }()
  }, {
    key: "changePassword",
    value: function () {
      var _changePassword = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var newPassword, user, staff, hiddenPassword, updatedStaff;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              newPassword = req.body.newPassword;
              user = req.user;
              _context3.next = 5;
              return _staffServices["default"].getStaffByMail(user);
            case 5:
              staff = _context3.sent;
              _context3.next = 8;
              return _bcrypt["default"].encrypt(newPassword);
            case 8:
              hiddenPassword = _context3.sent;
              if (staff) {
                _context3.next = 11;
                break;
              }
              return _context3.abrupt("return", util.setErrorResponse(res, "Staff not found", 404));
            case 11:
              _context3.next = 13;
              return _staffServices["default"].updateStaff(user, {
                password: hiddenPassword
              });
            case 13:
              updatedStaff = _context3.sent;
              if (updatedStaff[1]) {
                _context3.next = 16;
                break;
              }
              return _context3.abrupt("return", util.setErrorResponse(res, "An error occured while updating password", 400));
            case 16:
              return _context3.abrupt("return", util.setSuccessResponse(res, "password changed successfully!", 200, null));
            case 19:
              _context3.prev = 19;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", util.setErrorResponse(res, "Something Went wrong logging in ".concat(_context3.t0), 500));
            case 22:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 19]]);
      }));
      function changePassword(_x5, _x6) {
        return _changePassword.apply(this, arguments);
      }
      return changePassword;
    }()
  }, {
    key: "sendEmail",
    value: function () {
      var _sendEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(email, password) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return (0, _mailer["default"])([{
                email: email,
                password: password
              }, {
                from: "CINETIE support",
                to: email,
                subject: "Staff credentials"
              }, {
                path: "".concat(_path["default"].resolve("src/public/templates/staffPassword.ejs"))
              }]);
            case 2:
              return _context4.abrupt("return", _context4.sent);
            case 3:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      function sendEmail(_x7, _x8) {
        return _sendEmail.apply(this, arguments);
      }
      return sendEmail;
    }()
  }]);
  return StaffController;
}();
var _default = exports["default"] = StaffController;