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
var _jwt = _interopRequireDefault(require("../helpers/jwt"));
var _userServices = _interopRequireDefault(require("../services/userServices"));
var _staffServices = _interopRequireDefault(require("../services/staffServices"));
var _utilities = _interopRequireDefault(require("../helpers/utilities"));
var _cpServices = _interopRequireDefault(require("../services/cpServices"));
var _ambassadorServices = _interopRequireDefault(require("../services/ambassadorServices"));
var util = new _utilities["default"]();
var Access = /*#__PURE__*/function () {
  function Access() {
    (0, _classCallCheck2["default"])(this, Access);
  }
  (0, _createClass2["default"])(Access, null, [{
    key: "isAdmin",
    value: // 0 normal user ( view own account and profiles,watch movies)
    // 1 producer user ( view views of each of their videos,upload videos in test area)
    // 2 admin user ( manage all profiles,manage all accounts,metrics on each video,
    // approve n reject videos,view sales metrics,manage plans )
    // level 2 permission checkpoint
    function () {
      var _isAdmin = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
        var token, decoded, user, admin;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              if (req.headers.authorization) {
                _context.next = 3;
                break;
              }
              return _context.abrupt("return", util.setErrorResponse(res, "Invalid access token", 400));
            case 3:
              token = req.headers.authorization.slice(7);
              decoded = _jwt["default"].jwtVerify(token, process.env.SECRET);
              user = decoded.user;
              if (user) {
                _context.next = 8;
                break;
              }
              return _context.abrupt("return", util.setErrorResponse(res, "Invalid access token", 400));
            case 8:
              _context.next = 10;
              return _staffServices["default"].getStaffByMail(user);
            case 10:
              admin = _context.sent;
              if (!(!admin || admin.role !== "admin")) {
                _context.next = 13;
                break;
              }
              return _context.abrupt("return", util.setErrorResponse(res, "Access denied  ", 403));
            case 13:
              return _context.abrupt("return", next());
            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", util.setErrorResponse(res, _context.t0.message, 500));
            case 19:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 16]]);
      }));
      function isAdmin(_x, _x2, _x3) {
        return _isAdmin.apply(this, arguments);
      }
      return isAdmin;
    }() // level 1 permission checkpoint
  }, {
    key: "isProducer",
    value: function () {
      var _isProducer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
        var token, decoded, email, clientId, user;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              if (req.headers.authorization) {
                _context2.next = 3;
                break;
              }
              return _context2.abrupt("return", util.setErrorResponse(res, "Invalid access token", 401));
            case 3:
              token = req.headers.authorization.slice(7);
              decoded = _jwt["default"].jwtVerify(token, process.env.SECRET);
              email = decoded.email, clientId = decoded.clientId;
              _context2.next = 8;
              return _cpServices["default"].getCpByMail(email);
            case 8:
              user = _context2.sent;
              if (!user) {
                util.setErrorResponse(res, "Access denied", 403);
              } else {
                req.user = clientId;
                next();
              }
              _context2.next = 15;
              break;
            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](0);
              util.setErrorResponse(res, _context2.t0.message, 500);
            case 15:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 12]]);
      }));
      function isProducer(_x4, _x5, _x6) {
        return _isProducer.apply(this, arguments);
      }
      return isProducer;
    }() // level 0 permission checkpoint
  }, {
    key: "isNormalUser",
    value: function () {
      var _isNormalUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
        var token, decoded, email, user;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              if (req.headers.authorization) {
                _context3.next = 3;
                break;
              }
              return _context3.abrupt("return", util.setErrorResponse(res, "Invalid access token", 401));
            case 3:
              token = req.headers.authorization.slice(7);
              decoded = _jwt["default"].jwtVerify(token, process.env.SECRET);
              email = decoded.email;
              _context3.next = 8;
              return _userServices["default"].getUserByMail(email);
            case 8:
              user = _context3.sent;
              if (user) {
                _context3.next = 11;
                break;
              }
              return _context3.abrupt("return", util.setErrorResponse(res, "Invalid Token", 400));
            case 11:
              if (user.permissionLevel === 0) {
                util.setErrorResponse(res, "Access denied ", 403);
              } else {
                req.user = email;
                req.fullUser = user;
                next();
              }
              _context3.next = 18;
              break;
            case 14:
              _context3.prev = 14;
              _context3.t0 = _context3["catch"](0);
              console.log("+++++++++++++++++++++++++++++++ ERRROR");
              util.setErrorResponse(res, _context3.t0.message, 500);
            case 18:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 14]]);
      }));
      function isNormalUser(_x7, _x8, _x9) {
        return _isNormalUser.apply(this, arguments);
      }
      return isNormalUser;
    }()
  }, {
    key: "isLoggedIn",
    value: function () {
      var _isLoggedIn = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
        var token, decoded, email, user, admin;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              if (req.headers.authorization) {
                _context4.next = 3;
                break;
              }
              return _context4.abrupt("return", util.setErrorResponse(res, "Invalid access token", 401));
            case 3:
              token = req.headers.authorization.slice(7);
              decoded = _jwt["default"].jwtVerify(token, process.env.SECRET);
              email = decoded.email;
              if (!email) {
                _context4.next = 11;
                break;
              }
              req.user = email;
              next();
              _context4.next = 22;
              break;
            case 11:
              if (!(!email && decoded)) {
                _context4.next = 21;
                break;
              }
              user = decoded.user;
              _context4.next = 15;
              return _staffServices["default"].getStaffByMail(user);
            case 15:
              admin = _context4.sent;
              if (!(!admin || admin.role !== "admin")) {
                _context4.next = 18;
                break;
              }
              return _context4.abrupt("return", util.setErrorResponse(res, "Access denied", 403));
            case 18:
              next();
              _context4.next = 22;
              break;
            case 21:
              return _context4.abrupt("return", util.setErrorResponse(res, "Access denied", 403));
            case 22:
              _context4.next = 27;
              break;
            case 24:
              _context4.prev = 24;
              _context4.t0 = _context4["catch"](0);
              return _context4.abrupt("return", util.setErrorResponse(res, _context4.t0.message, 500));
            case 27:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 24]]);
      }));
      function isLoggedIn(_x10, _x11, _x12) {
        return _isLoggedIn.apply(this, arguments);
      }
      return isLoggedIn;
    }()
  }, {
    key: "isRave",
    value: function () {
      var _isRave = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
        var hash;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              try {
                hash = req.headers["verif-hash"] || req.headers["verify-hash"] || req.headers["Verif-Hash"];
                if (hash !== process.env.RAVE_SECRET) {
                  util.setErrorResponse(res, "Access denied", 403);
                } else {
                  next();
                }
              } catch (error) {
                util.setErrorResponse(res, error.message || error, 500);
              }
            case 1:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      function isRave(_x13, _x14, _x15) {
        return _isRave.apply(this, arguments);
      }
      return isRave;
    }()
  }, {
    key: "isPayment",
    value: function () {
      var _isPayment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
        var token, user;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              if (req.headers.authorization) {
                _context6.next = 3;
                break;
              }
              return _context6.abrupt("return", util.setErrorResponse(res, "Invalid access token", 401));
            case 3:
              token = req.headers.authorization.slice(7);
              user = _jwt["default"].jwtVerify(token, process.env.SECRET);
              if (user.role === "payment-api") {
                next();
              } else {
                util.setErrorResponse(res, "Access denied", 403);
              }
              _context6.next = 11;
              break;
            case 8:
              _context6.prev = 8;
              _context6.t0 = _context6["catch"](0);
              util.setErrorResponse(res, _context6.t0.message || _context6.t0, 500);
            case 11:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[0, 8]]);
      }));
      function isPayment(_x16, _x17, _x18) {
        return _isPayment.apply(this, arguments);
      }
      return isPayment;
    }()
  }, {
    key: "isAmbassador",
    value: function () {
      var _isAmbassador = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
        var token, decoded, email, ambassador;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              if (req.headers.authorization) {
                _context7.next = 3;
                break;
              }
              return _context7.abrupt("return", util.setErrorResponse(res, "Invalid access token", 401));
            case 3:
              token = req.headers.authorization.slice(7);
              decoded = _jwt["default"].jwtVerify(token, process.env.SECRET);
              email = decoded.email;
              _context7.next = 8;
              return _ambassadorServices["default"].getAmbassadorByEmail(email);
            case 8:
              ambassador = _context7.sent;
              if (ambassador[0]) {
                _context7.next = 11;
                break;
              }
              return _context7.abrupt("return", util.setErrorResponse(res, "Invalid Token", 400));
            case 11:
              if (!ambassador[0].isVerified) {
                util.setErrorResponse(res, "Access denied ", 403);
              } else {
                req.ambassador = ambassador;
                next();
              }
              _context7.next = 17;
              break;
            case 14:
              _context7.prev = 14;
              _context7.t0 = _context7["catch"](0);
              util.setErrorResponse(res, _context7.t0.message, 500);
            case 17:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[0, 14]]);
      }));
      function isAmbassador(_x19, _x20, _x21) {
        return _isAmbassador.apply(this, arguments);
      }
      return isAmbassador;
    }()
  }]);
  return Access;
}();
var _default = exports["default"] = Access;