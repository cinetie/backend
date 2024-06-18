"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _bcrypt = _interopRequireDefault(require("../helpers/bcrypt"));
var _path = _interopRequireDefault(require("path"));
var _utilities = _interopRequireDefault(require("../helpers/utilities"));
var _ambassadorServices = _interopRequireDefault(require("../services/ambassadorServices"));
var _jwt = _interopRequireDefault(require("../helpers/jwt"));
var _crypto = _interopRequireDefault(require("../helpers/crypto"));
var _mailer = _interopRequireDefault(require("../helpers/mailer"));
var _promoCodeServices = _interopRequireDefault(require("../services/promoCodeServices"));
var _startOfToday = _interopRequireDefault(require("date-fns/startOfToday"));
var _isWithinInterval = _interopRequireDefault(require("date-fns/isWithinInterval"));
var _endOfDay = _interopRequireDefault(require("date-fns/endOfDay"));
var _startOfMonth = _interopRequireDefault(require("date-fns/startOfMonth"));
var _endOfMonth = _interopRequireDefault(require("date-fns/endOfMonth"));
var _endOfYear = _interopRequireDefault(require("date-fns/endOfYear"));
var _startOfYear = _interopRequireDefault(require("date-fns/startOfYear"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var util = new _utilities["default"]();
var AmbassadorsController = /*#__PURE__*/function () {
  function AmbassadorsController() {
    (0, _classCallCheck2["default"])(this, AmbassadorsController);
  }
  (0, _createClass2["default"])(AmbassadorsController, null, [{
    key: "signup",
    value: function () {
      var _signup = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _req$body, email, password, promoCode, ambassador, ambassadorIdDuplicates, newAmbassador, createdAmbassador;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$body = req.body, email = _req$body.email, password = _req$body.password;
              promoCode = email.split("@")[0];
              _context.next = 5;
              return _ambassadorServices["default"].getAmbassadorByEmail(email);
            case 5:
              ambassador = _context.sent;
              if (!(ambassador.length > 0)) {
                _context.next = 8;
                break;
              }
              return _context.abrupt("return", util.setErrorResponse(res, "Email already exists", 403));
            case 8:
              _context.next = 10;
              return _ambassadorServices["default"].getAmbassadorByPromoCode(promoCode);
            case 10:
              ambassadorIdDuplicates = _context.sent;
              if (ambassadorIdDuplicates.length > 0) {
                promoCode = "".concat(promoCode).concat(Math.floor(Math.random() * 10));
              }
              newAmbassador = _objectSpread(_objectSpread({}, req.body), {}, {
                ambassadorId: promoCode,
                users: 0,
                password: _bcrypt["default"].encrypt(password),
                isVerified: false
              });
              _context.next = 15;
              return _ambassadorServices["default"].createNewAmbassador(newAmbassador);
            case 15:
              createdAmbassador = _context.sent;
              if (createdAmbassador) {
                _context.next = 18;
                break;
              }
              return _context.abrupt("return", util.setSuccessResponse(res, "Could not signup", 400, null));
            case 18:
              return _context.abrupt("return", util.setSuccessResponse(res, "Signed up successfully", 201, createdAmbassador));
            case 21:
              _context.prev = 21;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", util.setErrorResponse(res, "Something Went wrong, error: ".concat(_context.t0), 500));
            case 24:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 21]]);
      }));
      function signup(_x, _x2) {
        return _signup.apply(this, arguments);
      }
      return signup;
    }()
  }, {
    key: "login",
    value: function () {
      var _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var _req$body2, email, password, ambassador, status, token;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
              _context2.next = 4;
              return _ambassadorServices["default"].getAmbassadorByEmail(email);
            case 4:
              ambassador = _context2.sent;
              if (ambassador) {
                _context2.next = 7;
                break;
              }
              return _context2.abrupt("return", util.setErrorResponse(res, "Invalid email or password!", 403));
            case 7:
              status = _bcrypt["default"].compare(password, ambassador[0].password);
              if (status) {
                _context2.next = 10;
                break;
              }
              return _context2.abrupt("return", util.setErrorResponse(res, "Invalid email or password!", 403));
            case 10:
              if (!(ambassador[0].isVerified === false)) {
                _context2.next = 12;
                break;
              }
              return _context2.abrupt("return", util.setErrorResponse(res, "Ambassador not verified yet", 400));
            case 12:
              token = _jwt["default"].jwtSign({
                key: _crypto["default"].crypto(),
                email: email
              }, process.env.SECRET, "1d");
              return _context2.abrupt("return", util.setSuccessResponse(res, "Logged in successfully!", 200, token));
            case 16:
              _context2.prev = 16;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);
              return _context2.abrupt("return", util.setErrorResponse(res, "Something Went wrong, error: ".concat(_context2.t0), 500));
            case 20:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 16]]);
      }));
      function login(_x3, _x4) {
        return _login.apply(this, arguments);
      }
      return login;
    }()
  }, {
    key: "verify",
    value: function () {
      var _verify = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var ambassador, verifiedAmbassador, date;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _ambassadorServices["default"].getAmbassadorById(req.params.id);
            case 3:
              ambassador = _context3.sent;
              _context3.next = 6;
              return _ambassadorServices["default"].verifyAmbassador(req.params.id);
            case 6:
              verifiedAmbassador = _context3.sent;
              if (verifiedAmbassador) {
                _context3.next = 9;
                break;
              }
              return _context3.abrupt("return", util.setErrorResponse(res, "Ambassador not verified", 400));
            case 9:
              date = new Date();
              (0, _mailer["default"])([{
                name: ambassador[0].firstName,
                year: date.getFullYear(),
                body: "Your account has been verified! and your promo code is ".concat(ambassador[0].ambassadorId)
              }, {
                from: "CINETIE Support",
                to: ambassador[0].email,
                subject: "Account verification"
              }, {
                path: "".concat(_path["default"].resolve("src/public/templates/notification.ejs"))
              }]);
              return _context3.abrupt("return", util.setSuccessResponse(res, "Verified successfully!", 200));
            case 14:
              _context3.prev = 14;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", util.setErrorResponse(res, "Something Went wrong, error: ".concat(_context3.t0), 500));
            case 17:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 14]]);
      }));
      function verify(_x5, _x6) {
        return _verify.apply(this, arguments);
      }
      return verify;
    }()
  }, {
    key: "getAmbassadors",
    value: function () {
      var _getAmbassadors = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var ambassadors;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _ambassadorServices["default"].getAllAmbassadors();
            case 3:
              ambassadors = _context4.sent;
              if (!(ambassadors.length === 0)) {
                _context4.next = 6;
                break;
              }
              return _context4.abrupt("return", util.setErrorResponse(res, "No ambassadors found", 404));
            case 6:
              return _context4.abrupt("return", util.setSuccessResponse(res, "Ambassadors fetched successfully!", 200, ambassadors));
            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](0);
              return _context4.abrupt("return", util.setErrorResponse(res, "Something Went wrong, error: ".concat(_context4.t0), 500));
            case 12:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 9]]);
      }));
      function getAmbassadors(_x7, _x8) {
        return _getAmbassadors.apply(this, arguments);
      }
      return getAmbassadors;
    }()
  }, {
    key: "getAmbassadorDetails",
    value: function () {
      var _getAmbassadorDetails = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var ambassador, today, midnight, currentMonth, EndOfCurrentMoth, currentYear, endOfCurrentYear, utilization, filteredByDailyUsage, filteredBymonthlyUsage, filteredByYearlyUsage, info;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              ambassador = req.ambassador;
              today = (0, _startOfToday["default"])();
              midnight = (0, _endOfDay["default"])(today);
              currentMonth = (0, _startOfMonth["default"])(today);
              EndOfCurrentMoth = (0, _endOfMonth["default"])(today);
              currentYear = (0, _startOfYear["default"])(today);
              endOfCurrentYear = (0, _endOfYear["default"])(today);
              _context5.next = 10;
              return _promoCodeServices["default"].getAllPromoCodeUtizationsByAmbassador(ambassador[0].email);
            case 10:
              utilization = _context5.sent;
              filteredByDailyUsage = utilization.filter(function (data) {
                return (0, _isWithinInterval["default"])(data.createdAt, {
                  start: today,
                  end: midnight
                });
              });
              filteredBymonthlyUsage = utilization.filter(function (data) {
                return (0, _isWithinInterval["default"])(data.createdAt, {
                  start: currentMonth,
                  end: EndOfCurrentMoth
                });
              });
              filteredByYearlyUsage = utilization.filter(function (data) {
                return (0, _isWithinInterval["default"])(data.createdAt, {
                  start: currentYear,
                  end: endOfCurrentYear
                });
              });
              info = {
                promoCode: ambassador[0].ambassadorId,
                stats: {
                  totalUsage: utilization.length,
                  today: filteredByDailyUsage.length,
                  monthly: filteredBymonthlyUsage.length,
                  yearly: filteredByYearlyUsage.length
                }
              };
              console.log(info);
              return _context5.abrupt("return", util.setSuccessResponse(res, "Ambassadors information fetched successfully!", 200, info));
            case 19:
              _context5.prev = 19;
              _context5.t0 = _context5["catch"](0);
              return _context5.abrupt("return", util.setErrorResponse(res, "Something Went wrong, error: ".concat(_context5.t0), 500));
            case 22:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 19]]);
      }));
      function getAmbassadorDetails(_x9, _x10) {
        return _getAmbassadorDetails.apply(this, arguments);
      }
      return getAmbassadorDetails;
    }()
  }, {
    key: "getAmbassadorStats",
    value: function () {
      var _getAmbassadorStats = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
        var id, today, midnight, currentMonth, EndOfCurrentMoth, currentYear, endOfCurrentYear, ambassador, utilization, filteredByDailyUsage, filteredBymonthlyUsage, filteredByYearlyUsage, info;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              id = req.params.id;
              today = (0, _startOfToday["default"])();
              midnight = (0, _endOfDay["default"])(today);
              currentMonth = (0, _startOfMonth["default"])(today);
              EndOfCurrentMoth = (0, _endOfMonth["default"])(today);
              currentYear = (0, _startOfYear["default"])(today);
              endOfCurrentYear = (0, _endOfYear["default"])(today);
              _context6.next = 10;
              return _ambassadorServices["default"].getAmbassadorById(req.params.id);
            case 10:
              ambassador = _context6.sent;
              _context6.next = 13;
              return _promoCodeServices["default"].getAllPromoCodeUtizationsByAmbassador(ambassador[0].email);
            case 13:
              utilization = _context6.sent;
              filteredByDailyUsage = utilization.filter(function (data) {
                return (0, _isWithinInterval["default"])(data.createdAt, {
                  start: today,
                  end: midnight
                });
              });
              filteredBymonthlyUsage = utilization.filter(function (data) {
                return (0, _isWithinInterval["default"])(data.createdAt, {
                  start: currentMonth,
                  end: EndOfCurrentMoth
                });
              });
              filteredByYearlyUsage = utilization.filter(function (data) {
                return (0, _isWithinInterval["default"])(data.createdAt, {
                  start: currentYear,
                  end: endOfCurrentYear
                });
              });
              info = {
                totalUsage: utilization.length,
                today: filteredByDailyUsage.length,
                monthly: filteredBymonthlyUsage.length,
                yearly: filteredByYearlyUsage.length
              };
              console.log(info);
              return _context6.abrupt("return", util.setSuccessResponse(res, "Ambassadors stats fetched successfully!", 200, info));
            case 22:
              _context6.prev = 22;
              _context6.t0 = _context6["catch"](0);
              return _context6.abrupt("return", util.setErrorResponse(res, "Something Went wrong, error: ".concat(_context6.t0), 500));
            case 25:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[0, 22]]);
      }));
      function getAmbassadorStats(_x11, _x12) {
        return _getAmbassadorStats.apply(this, arguments);
      }
      return getAmbassadorStats;
    }()
  }]);
  return AmbassadorsController;
}();
var _default = exports["default"] = AmbassadorsController;