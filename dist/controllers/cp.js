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
var _path = _interopRequireDefault(require("path"));
var _tokenService = _interopRequireDefault(require("../services/tokenService"));
var _loginSessionServices = _interopRequireDefault(require("../services/loginSessionServices"));
var _videoServices = _interopRequireDefault(require("../services/videoServices"));
var _cpServices = _interopRequireDefault(require("../services/cpServices"));
var _bcrypt = _interopRequireDefault(require("../helpers/bcrypt"));
var _jwt = _interopRequireDefault(require("../helpers/jwt"));
var _crypto = _interopRequireDefault(require("../helpers/crypto"));
var _mailer = _interopRequireDefault(require("../helpers/mailer"));
var _utilities = _interopRequireDefault(require("../helpers/utilities"));
var _uuid = _interopRequireDefault(require("../helpers/uuid"));
var _date = _interopRequireDefault(require("../helpers/date"));
var _aws = require("../helpers/aws");
var util = new _utilities["default"]();
// add an isVerified column to cp
var cpController = /*#__PURE__*/function () {
  function cpController() {
    (0, _classCallCheck2["default"])(this, cpController);
  }
  (0, _createClass2["default"])(cpController, null, [{
    key: "signupCp",
    value: function () {
      var _signupCp = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var newUser, checkUser, createdUser, part1, token, tokenToSave, id, EmailStatus, userToken;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              newUser = req.body;
              newUser.password = _bcrypt["default"].encrypt(newUser.password);
              newUser.isVerified = false;
              newUser.clientId = _uuid["default"].generator();
              _context.next = 7;
              return _cpServices["default"].getCpByMail(newUser.email);
            case 7:
              checkUser = _context.sent;
              if (!(checkUser != null)) {
                _context.next = 10;
                break;
              }
              return _context.abrupt("return", util.setErrorResponse(res, "cp already exists", 422));
            case 10:
              _context.next = 12;
              return _cpServices["default"].createNewCp(newUser);
            case 12:
              createdUser = _context.sent;
              part1 = _crypto["default"].crypto();
              token = _jwt["default"].jwtSign("".concat(part1).concat(newUser.email), process.env.SECRET, "1d");
              tokenToSave = {
                email: newUser.email,
                token: token
              };
              _context.next = 18;
              return _tokenService["default"].createNewToken(tokenToSave, token);
            case 18:
              id = createdUser.id;
              _context.next = 21;
              return (0, _mailer["default"])([{
                link: "".concat(process.env.HOST, "/cp/verify?id=").concat(id, "&&token=").concat(_jwt["default"].jwtSign(req.body.email, process.env.SECRET))
              }, {
                from: "CINETIE support",
                to: req.body.email,
                subject: "Email verification"
              }, {
                path: "".concat(_path["default"].join(__dirname, "../public/templates/VerifyEmail.ejs"))
              }]);
            case 21:
              EmailStatus = _context.sent;
              if (EmailStatus) {
                util.setErrorResponse(res, "can't send email", 500);
              } else {
                userToken = _jwt["default"].jwtSign(createdUser.email, process.env.SECRET, "1d");
                createdUser.token = userToken;
                createdUser.password = undefined;
                util.setSuccessResponse(res, "Signed up successfully", 201, createdUser);
              }
              _context.next = 28;
              break;
            case 25:
              _context.prev = 25;
              _context.t0 = _context["catch"](0);
              util.setErrorResponse(res, "Something went wrong ".concat(_context.t0.message), 500);
            case 28:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 25]]);
      }));
      function signupCp(_x, _x2) {
        return _signupCp.apply(this, arguments);
      }
      return signupCp;
    }() // eslint-disable-next-line consistent-return
  }, {
    key: "verify",
    value: function () {
      var _verify = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var id, token, user, newUser, updatedUser, EmailStatus;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              id = req.query.id;
              token = req.query.token;
              _context2.next = 5;
              return _cpServices["default"].getCpById(id);
            case 5:
              user = _context2.sent;
              if (user) {
                _context2.next = 8;
                break;
              }
              return _context2.abrupt("return", util.setErrorResponse(res, "can't find user", 404));
            case 8:
              _jwt["default"].jwtVerify(token, process.env.SECRET);
              newUser = {
                isVerified: true
              };
              _context2.next = 12;
              return _tokenService["default"].destroyToken(token);
            case 12:
              _context2.next = 14;
              return _cpServices["default"].updateCp(user.email, newUser);
            case 14:
              updatedUser = _context2.sent;
              _context2.next = 17;
              return (0, _mailer["default"])([{
                name: user.firstName
              }, {
                to: user.email,
                from: "CINETIE support",
                subject: "Success email has been verified"
              }, {
                path: "".concat(_path["default"].join(__dirname, "../public/templates/EmailVerificationSuccess.ejs"))
              }]);
            case 17:
              EmailStatus = _context2.sent;
              if (!EmailStatus) {
                _context2.next = 22;
                break;
              }
              util.setErrorResponse(res, "can't send email", 500);
              _context2.next = 24;
              break;
            case 22:
              updatedUser.password = undefined;
              return _context2.abrupt("return", res.render("redirect", {
                url: "https://cp.cinetie.com/signin"
              }));
            case 24:
              _context2.next = 29;
              break;
            case 26:
              _context2.prev = 26;
              _context2.t0 = _context2["catch"](0);
              util.setErrorResponse(res, "Something went wrong ".concat(_context2.t0.message), 500);
            case 29:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 26]]);
      }));
      function verify(_x3, _x4) {
        return _verify.apply(this, arguments);
      }
      return verify;
    }()
  }, {
    key: "loginUser",
    value: function () {
      var _loginUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var user, status, token, cpDate, session, addedSession;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _cpServices["default"].getCpByMail(req.body.email);
            case 3:
              user = _context3.sent;
              if (user) {
                _context3.next = 8;
                break;
              }
              util.setErrorResponse(res, "Invalid email or password!", 400);
              _context3.next = 22;
              break;
            case 8:
              status = _bcrypt["default"].compare(req.body.password, user.password);
              if (status) {
                _context3.next = 13;
                break;
              }
              util.setErrorResponse(res, "Passwords don't match", 400);
              _context3.next = 22;
              break;
            case 13:
              token = _jwt["default"].jwtSign({
                key: _crypto["default"].crypto(),
                email: user.email,
                clientId: user.clientId
              }, process.env.SECRET, "1d");
              user.token = token;
              delete user.password;
              cpDate = new Date();
              session = {
                email: user.email,
                date: cpDate.toDateString(),
                timeIn: cpDate.toTimeString(),
                timeOut: null,
                state: "in"
              };
              _context3.next = 20;
              return _loginSessionServices["default"].addSession(session);
            case 20:
              addedSession = _context3.sent;
              if (!addedSession) {
                util.setErrorResponse(res, "Can't register session", 500);
              } else {
                util.setSuccessResponse(res, "Logged in successfully!", 200, token);
              }
            case 22:
              _context3.next = 27;
              break;
            case 24:
              _context3.prev = 24;
              _context3.t0 = _context3["catch"](0);
              util.setErrorResponse(res, "Something Went wrong logging in ".concat(_context3.t0.message), 500);
            case 27:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 24]]);
      }));
      function loginUser(_x5, _x6) {
        return _loginUser.apply(this, arguments);
      }
      return loginUser;
    }()
  }, {
    key: "getCpDetails",
    value: function () {
      var _getCpDetails = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var decoded, user;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              decoded = _jwt["default"].jwtVerify(req.headers.authorization.slice(7), process.env.SECRET);
              _context4.next = 4;
              return _cpServices["default"].getCpByMail(decoded.email);
            case 4:
              user = _context4.sent;
              _context4.next = 7;
              return (0, _aws.getObject)("contentproviderids", user.idLink, 5000);
            case 7:
              user.idLink = _context4.sent;
              user.password = undefined;
              if (!user) {
                util.setErrorResponse(res, "Data not found", 404);
              } else {
                util.setSuccessResponse(res, "Data found", 200, user);
              }
              _context4.next = 15;
              break;
            case 12:
              _context4.prev = 12;
              _context4.t0 = _context4["catch"](0);
              util.setErrorResponse(res, "Something went wrong", 500);
            case 15:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 12]]);
      }));
      function getCpDetails(_x7, _x8) {
        return _getCpDetails.apply(this, arguments);
      }
      return getCpDetails;
    }()
  }, {
    key: "forgotPassword",
    value: function () {
      var _forgotPassword = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var user, exp, token;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _cpServices["default"].getCpByMail(req.body.email);
            case 3:
              user = _context5.sent;
              if (user) {
                _context5.next = 6;
                break;
              }
              return _context5.abrupt("return", util.setErrorResponse(res, "can't find user", 404));
            case 6:
              exp = _date["default"].addMoreDays(2);
              token = _jwt["default"].jwtSign({
                exp: exp.getTime()
              }, process.env.SECRET, "1d");
              _context5.next = 10;
              return (0, _mailer["default"])([{
                link: "".concat(process.env.FRONTEND_CP, "/newPassword/?id=").concat(user.id, "&token=").concat(token)
              }, {
                from: "CINETIE support",
                to: req.body.email,
                subject: "Password help"
              }, {
                path: "".concat(_path["default"].resolve("src/public/templates/ForgotPassword.ejs"))
              }]);
            case 10:
              return _context5.abrupt("return", util.setSuccessResponse(res, "Password reset link sent successfully", 200, user));
            case 13:
              _context5.prev = 13;
              _context5.t0 = _context5["catch"](0);
              return _context5.abrupt("return", util.setErrorResponse(res, "Something went wrong", 500));
            case 16:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 13]]);
      }));
      function forgotPassword(_x9, _x10) {
        return _forgotPassword.apply(this, arguments);
      }
      return forgotPassword;
    }()
  }, {
    key: "resetPassword",
    value: function () {
      var _resetPassword = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
        var _req$query, token, id, _jwt$jwtVerify, exp, user_, _todayDate, hash, newPass, status;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _req$query = req.query, token = _req$query.token, id = _req$query.id;
              _jwt$jwtVerify = _jwt["default"].jwtVerify(token, process.env.SECRET), exp = _jwt$jwtVerify.exp;
              _context6.next = 5;
              return _cpServices["default"].getCpById(id);
            case 5:
              user_ = _context6.sent;
              _todayDate = new Date();
              if (!(!user_ || exp <= _todayDate.getTime())) {
                _context6.next = 11;
                break;
              }
              util.setErrorResponse(res, "Link has expired", 400);
              _context6.next = 23;
              break;
            case 11:
              hash = _bcrypt["default"].encrypt(req.body.password);
              newPass = {
                password: hash
              };
              _context6.next = 15;
              return _cpServices["default"].updateCp(user_.email, newPass);
            case 15:
              status = _context6.sent;
              if (!(status[1] !== 1)) {
                _context6.next = 20;
                break;
              }
              util.setErrorResponse(res, "Something Went wrong updating  your password", 400);
              _context6.next = 23;
              break;
            case 20:
              _context6.next = 22;
              return (0, _mailer["default"])([{
                name: user_.name,
                body: "Your password has been reset successfully"
              }, {
                from: "CINETIE support",
                to: user_.email,
                subject: "Password help"
              }, {
                path: "".concat(_path["default"].resolve("src/public/templates/notification.ejs"))
              }]);
            case 22:
              res.redirect(200, "https://www.cinetie.com/cp/signin");
            case 23:
              _context6.next = 28;
              break;
            case 25:
              _context6.prev = 25;
              _context6.t0 = _context6["catch"](0);
              util.setErrorResponse(res, "Something went wrong", 500);
            case 28:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[0, 25]]);
      }));
      function resetPassword(_x11, _x12) {
        return _resetPassword.apply(this, arguments);
      }
      return resetPassword;
    }()
  }, {
    key: "socialLogin",
    value: function () {
      var _socialLogin = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
        var user, token;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return _cpServices["default"].getCpByMail(req.user.email);
            case 3:
              user = _context7.sent;
              if (user) {
                _context7.next = 8;
                break;
              }
              _context7.next = 7;
              return _cpServices["default"].createNewCp(req.user, req.user.email);
            case 7:
              user = _context7.sent;
            case 8:
              token = _jwt["default"].jwtSign(user.email, process.env.SECRET, "1d");
              user.token = token;
              util.setErrorResponse(res, "Logged in successfully", 500);
              _context7.next = 16;
              break;
            case 13:
              _context7.prev = 13;
              _context7.t0 = _context7["catch"](0);
              util.setErrorResponse(res, "Something went wrong", 500);
            case 16:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[0, 13]]);
      }));
      function socialLogin(_x13, _x14) {
        return _socialLogin.apply(this, arguments);
      }
      return socialLogin;
    }()
  }, {
    key: "deleteAccount",
    value: function () {
      var _deleteAccount = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
        var token, _jwt$jwtVerify2, email, status;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              token = req.headers.authorization.slice(7);
              _jwt$jwtVerify2 = _jwt["default"].jwtVerify(token, process.env.SECRET), email = _jwt$jwtVerify2.email;
              _context8.next = 5;
              return _cpServices["default"].deleteCp(email);
            case 5:
              status = _context8.sent;
              if (status !== false) {
                util.setSuccessResponse(res, "deleted successfully", 200, status);
              } else {
                util.setErrorResponse(res, "An error occured", 422);
              }
              _context8.next = 12;
              break;
            case 9:
              _context8.prev = 9;
              _context8.t0 = _context8["catch"](0);
              util.setErrorResponse(res, "An error occured : ".concat(_context8.t0), 522);
            case 12:
            case "end":
              return _context8.stop();
          }
        }, _callee8, null, [[0, 9]]);
      }));
      function deleteAccount(_x15, _x16) {
        return _deleteAccount.apply(this, arguments);
      }
      return deleteAccount;
    }()
  }, {
    key: "updateAccount",
    value: function () {
      var _updateAccount = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
        var token, _jwt$jwtVerify3, email, newInfo, updated;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              token = req.headers.authorization.slice(7);
              _jwt$jwtVerify3 = _jwt["default"].jwtVerify(token, process.env.SECRET), email = _jwt$jwtVerify3.email;
              newInfo = req.body;
              _context9.next = 6;
              return _cpServices["default"].updateCp(email, newInfo);
            case 6:
              updated = _context9.sent;
              if (updated !== false) {
                util.setSuccessResponse(res, "updated successfully", 200, updated);
              } else {
                util.setErrorResponse(res, "An error occured", 422);
              }
              _context9.next = 13;
              break;
            case 10:
              _context9.prev = 10;
              _context9.t0 = _context9["catch"](0);
              util.setErrorResponse(res, _context9.t0, 522);
            case 13:
            case "end":
              return _context9.stop();
          }
        }, _callee9, null, [[0, 10]]);
      }));
      function updateAccount(_x17, _x18) {
        return _updateAccount.apply(this, arguments);
      }
      return updateAccount;
    }()
  }, {
    key: "getAllAccounts",
    value: function () {
      var _getAllAccounts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
        var cps, i;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              _context10.next = 3;
              return _cpServices["default"].getAllCps();
            case 3:
              cps = _context10.sent;
              for (i = 0; i < cps.length; i += 1) {
                // eslint-disable-next-line no-await-in-loop
                cps[i].password = undefined;
              }
              util.setSuccessResponse(res, "success", 200, cps);
              _context10.next = 11;
              break;
            case 8:
              _context10.prev = 8;
              _context10.t0 = _context10["catch"](0);
              util.setErrorResponse(res, _context10.t0, 503);
            case 11:
            case "end":
              return _context10.stop();
          }
        }, _callee10, null, [[0, 8]]);
      }));
      function getAllAccounts(_x19, _x20) {
        return _getAllAccounts.apply(this, arguments);
      }
      return getAllAccounts;
    }()
  }, {
    key: "getAllVideosLocal",
    value: function () {
      var _getAllVideosLocal = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
        var type, decoded, videos;
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              type = req.query.type;
              decoded = _jwt["default"].jwtVerify(req.headers.authorization.slice(7), process.env.SECRET);
              _context11.next = 4;
              return _videoServices["default"].getAllVideos(decoded.clientId, type);
            case 4:
              videos = _context11.sent;
              if (videos.length) {
                util.setSuccessResponse(res, "Data found", 200, videos);
              } else {
                util.setErrorResponse(res, "Data not found", 400);
              }
            case 6:
            case "end":
              return _context11.stop();
          }
        }, _callee11);
      }));
      function getAllVideosLocal(_x21, _x22) {
        return _getAllVideosLocal.apply(this, arguments);
      }
      return getAllVideosLocal;
    }() // eslint-disable-next-line consistent-return
  }, {
    key: "serveVerifyPassword",
    value: function () {
      var _serveVerifyPassword = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res) {
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              _context12.prev = 0;
              return _context12.abrupt("return", res.render("ResetPassword", {
                host: process.env.HOST,
                role: "cp"
              }));
            case 4:
              _context12.prev = 4;
              _context12.t0 = _context12["catch"](0);
              util.setErrorResponse(res, _context12.t0.message, 500);
            case 7:
            case "end":
              return _context12.stop();
          }
        }, _callee12, null, [[0, 4]]);
      }));
      function serveVerifyPassword(_x23, _x24) {
        return _serveVerifyPassword.apply(this, arguments);
      }
      return serveVerifyPassword;
    }()
  }, {
    key: "getS3Tokens",
    value: function () {
      var _getS3Tokens = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
        var params;
        return _regenerator["default"].wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              try {
                params = {
                  AWS_REGION: process.env.AWS_REGION,
                  AWS_ID: process.env.AWS_UPLOAD_ID,
                  AWS_SECRET: process.env.AWS_UPLOAD_ACCESS_KEY
                };
                util.setSuccessResponse(res, "results", 200, params);
              } catch (error) {
                util.setErrorResponse(res, "something went wrong ".concat(error, " || ").concat(error.message), 500);
              }
            case 1:
            case "end":
              return _context13.stop();
          }
        }, _callee13);
      }));
      function getS3Tokens(_x25, _x26) {
        return _getS3Tokens.apply(this, arguments);
      }
      return getS3Tokens;
    }()
  }]);
  return cpController;
}();
var _default = exports["default"] = cpController;