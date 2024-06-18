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
var _utilities = _interopRequireDefault(require("../helpers/utilities"));
var _userServices = _interopRequireDefault(require("../services/userServices"));
var _planServices = _interopRequireDefault(require("../services/planServices"));
var _loginSessionServices = _interopRequireDefault(require("../services/loginSessionServices"));
var _billingServices = _interopRequireDefault(require("../services/billingServices"));
/* eslint-disable consistent-return */
// this middleware checks whether the user hasn't exceeded the amount of simultaneus screens
// this middleware implements the number of screens feature of cinetie

var util = new _utilities["default"]();
var screenValidation = /*#__PURE__*/function () {
  function screenValidation() {
    (0, _classCallCheck2["default"])(this, screenValidation);
  }
  (0, _createClass2["default"])(screenValidation, null, [{
    key: "getEmail",
    value: // this method uses a decoded email from the token to fetch
    // and return the type of plan a user subscribed on
    function () {
      var _getEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var email, user, details;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              email = req.body.email;
              _context.next = 4;
              return _userServices["default"].getUserByMail(email);
            case 4:
              user = _context.sent;
              if (!user) util.setErrorResponse(res, "Login Credentials incorrect", 402);
              details = {
                email: email,
                plan: user.plan
              };
              return _context.abrupt("return", details);
            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](0);
              util.setErrorResponse(res, "An error occured ".concat(_context.t0), 500);
            case 13:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 10]]);
      }));
      function getEmail(_x, _x2) {
        return _getEmail.apply(this, arguments);
      }
      return getEmail;
    }() // this method uses the returned plan to fetch it's property number of screens
  }, {
    key: "getPlan",
    value: function () {
      var _getPlan = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var details, plan, screensAndEmail;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return screenValidation.getEmail(req, res);
            case 3:
              details = _context2.sent;
              _context2.next = 6;
              return _planServices["default"].getParticalPlan(details.plan);
            case 6:
              plan = _context2.sent;
              screensAndEmail = {
                screens: Number(plan.numberOfScreens),
                email: details.email
              };
              return _context2.abrupt("return", screensAndEmail);
            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](0);
              util.setErrorResponse(res, "an error occured ".concat(_context2.t0), 500);
            case 14:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 11]]);
      }));
      function getPlan(_x3, _x4) {
        return _getPlan.apply(this, arguments);
      }
      return getPlan;
    }() // this method uses the returned numberOfScreens property to validate the login session
  }, {
    key: "validateNumberOfScreens",
    value: function () {
      var _validateNumberOfScreens = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
        var user, details, activeSessions, subscriptionStatus;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              if (!(req.body.email !== process.env.ADMIN_USER)) {
                _context3.next = 17;
                break;
              }
              _context3.next = 4;
              return _userServices["default"].getUserByMail(req.body.email);
            case 4:
              user = _context3.sent;
              _context3.next = 7;
              return screenValidation.getPlan(req, res);
            case 7:
              details = _context3.sent;
              _context3.next = 10;
              return _loginSessionServices["default"].getParticularSession(details.email);
            case 10:
              activeSessions = _context3.sent;
              _context3.next = 13;
              return _billingServices["default"].getSubscription(req.body.email);
            case 13:
              subscriptionStatus = _context3.sent;
              if (activeSessions.length !== details.screens || user.plan === "Setup" || subscriptionStatus.state === "pending") {
                next();
              } else {
                util.setErrorResponse(res, "Maximum screens in your plan has reached ", 403);
              }
              _context3.next = 18;
              break;
            case 17:
              next();
            case 18:
              _context3.next = 23;
              break;
            case 20:
              _context3.prev = 20;
              _context3.t0 = _context3["catch"](0);
              util.setErrorResponse(res, "an error occured  ".concat(_context3.t0), 500);
            case 23:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 20]]);
      }));
      function validateNumberOfScreens(_x5, _x6, _x7) {
        return _validateNumberOfScreens.apply(this, arguments);
      }
      return validateNumberOfScreens;
    }()
  }, {
    key: "verifyPermissionLevel",
    value: function () {
      var _verifyPermissionLevel = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
        var data;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _userServices["default"].getUserByMail(req.body.email);
            case 3:
              data = _context4.sent;
              if (data.permissionLevel !== 1) {
                util.setErrorResponse(res, "Please sent up your billing", 402);
              } else {
                next();
              }
              _context4.next = 10;
              break;
            case 7:
              _context4.prev = 7;
              _context4.t0 = _context4["catch"](0);
              util.setErrorResponse(res, "an error occured  ".concat(_context4.t0), 500);
            case 10:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 7]]);
      }));
      function verifyPermissionLevel(_x8, _x9, _x10) {
        return _verifyPermissionLevel.apply(this, arguments);
      }
      return verifyPermissionLevel;
    }()
  }]);
  return screenValidation;
}();
var _default = exports["default"] = screenValidation;