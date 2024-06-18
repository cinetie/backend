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
var _path = _interopRequireDefault(require("path"));
var _uuid = require("uuid");
var _dotenv = require("dotenv");
var _userServices = _interopRequireDefault(require("../services/userServices"));
var _tokenService = _interopRequireDefault(require("../services/tokenService"));
var _billingServices = _interopRequireDefault(require("../services/billingServices"));
var _loginSessionServices = _interopRequireDefault(require("../services/loginSessionServices"));
var _payment = _interopRequireDefault(require("../helpers/payment"));
var _bcrypt = _interopRequireDefault(require("../helpers/bcrypt"));
var _response2 = _interopRequireDefault(require("../helpers/response"));
var _jwt = _interopRequireDefault(require("../helpers/jwt"));
var _crypto = _interopRequireDefault(require("../helpers/crypto"));
var _utilities = _interopRequireDefault(require("../helpers/utilities"));
var _date2 = _interopRequireDefault(require("../helpers/date"));
var _mailer = _interopRequireDefault(require("../helpers/mailer"));
var _rave = _interopRequireDefault(require("../helpers/rave"));
var _fetch = _interopRequireDefault(require("../helpers/fetch"));
var _RavePaymentRequest = _interopRequireDefault(require("../helpers/RavePaymentRequest"));
var _mailingServices = _interopRequireDefault(require("../services/mailingServices"));
var _ambassadorServices = _interopRequireDefault(require("../services/ambassadorServices"));
var _promoCodeServices = _interopRequireDefault(require("../services/promoCodeServices"));
var _stripe = require("../helpers/stripe");
var _countryNumbers = _interopRequireDefault(require("../helpers/countryNumbers"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; } /* eslint-disable no-console */ /* eslint-disable no-shadow */ /* eslint-disable consistent-return */
(0, _dotenv.config)();
var util = new _utilities["default"]();
var userController = /*#__PURE__*/function () {
  function userController() {
    (0, _classCallCheck2["default"])(this, userController);
  }
  (0, _createClass2["default"])(userController, null, [{
    key: "signupUser",
    value: function () {
      var _signupUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var promoCode, isOnPromo, newUser, search, createdUser, part1, token, tokenToSave, userToken, stripeUser;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              promoCode = req.body.promoCode;
              isOnPromo = !!promoCode;
              newUser = userController.initializeVarsForSignup(req);
              _context.next = 6;
              return _userServices["default"].getUserByMail(newUser.email);
            case 6:
              search = _context.sent;
              if (!search) {
                _context.next = 11;
                break;
              }
              util.setErrorResponse(res, "user already exists", 403);
              _context.next = 34;
              break;
            case 11:
              _context.next = 13;
              return _userServices["default"].createNewUser(_objectSpread(_objectSpread({}, newUser), {}, {
                isOnPromo: isOnPromo,
                isOnExtension: false,
                permissionLevel: -1,
                isBilledAnnually: false,
                isVerified: true
              }));
            case 13:
              createdUser = _context.sent;
              part1 = _crypto["default"].crypto();
              token = userController.signToken(part1, newUser);
              tokenToSave = userController.generateTokenToSave(newUser, token);
              _context.next = 19;
              return _tokenService["default"].createNewToken(tokenToSave, token);
            case 19:
              userToken = _jwt["default"].jwtSign({
                key: _crypto["default"].crypto(),
                email: createdUser.email
              }, process.env.SECRET, "1d");
              _context.next = 22;
              return (0, _stripe.createCustomer)(createdUser.email);
            case 22:
              stripeUser = _context.sent;
              if (!stripeUser) {
                _context.next = 28;
                break;
              }
              _context.next = 26;
              return _userServices["default"].updateUser(createdUser.email, {
                stripeId: stripeUser.id
              });
            case 26:
              _context.next = 29;
              break;
            case 28:
              return _context.abrupt("return", util.setErrorResponse(res, "Something went wrong, please try again", 500));
            case 29:
              createdUser.token = userToken;
              delete createdUser.password;
              _context.next = 33;
              return _mailingServices["default"].addToMailingList(createdUser.email);
            case 33:
              util.setSuccessResponse(res, "Signed up successfully", 201, userToken);
            case 34:
              _context.next = 40;
              break;
            case 36:
              _context.prev = 36;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);
              util.setErrorResponse(res, _context.t0.message, 500);
            case 40:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 36]]);
      }));
      function signupUser(_x, _x2) {
        return _signupUser.apply(this, arguments);
      }
      return signupUser;
    }()
  }, {
    key: "generateTokenToSave",
    value: function generateTokenToSave(newUser, token) {
      return {
        email: newUser.email,
        token: token,
        desc: "Login-Active"
      };
    }
  }, {
    key: "signToken",
    value: function signToken(part1, newUser) {
      return _jwt["default"].jwtSign({
        key: part1,
        email: newUser.email
      }, process.env.SECRET);
    }
  }, {
    key: "sendEmail",
    value: function () {
      var _sendEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _mailer["default"])([{
                link: "".concat(process.env.HOST, "/auth/verify?token=").concat(_jwt["default"].jwtSign(req.body.email, process.env.SECRET))
              }, {
                from: "CINETIE support",
                to: req.body.email,
                subject: "Email verification"
              }, {
                path: "".concat(_path["default"].resolve("src/public/templates/VerifyEmail.ejs"))
              }]);
            case 2:
              return _context2.abrupt("return", _context2.sent);
            case 3:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function sendEmail(_x3) {
        return _sendEmail.apply(this, arguments);
      }
      return sendEmail;
    }()
  }, {
    key: "initializeVarsForSignup",
    value: function initializeVarsForSignup(req) {
      var newUser = req.body;
      newUser.password = _bcrypt["default"].encrypt(newUser.password);
      newUser.isVerified = false;
      newUser.plan = "Setup";
      newUser.permissionLevel = 1;
      newUser.isOnTrial = false;
      return newUser;
    }
  }, {
    key: "verify",
    value: function () {
      var _verify = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var token, decoded, user, newUser, updatedUser;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              token = req.query.token;
              decoded = _jwt["default"].jwtVerify(token, process.env.SECRET);
              _context3.next = 5;
              return _userServices["default"].getUserByMail(decoded);
            case 5:
              user = _context3.sent;
              if (user) {
                _context3.next = 8;
                break;
              }
              return _context3.abrupt("return", _response2["default"].errorResponse(res, 404, "User not found"));
            case 8:
              _jwt["default"].jwtVerify(token, process.env.SECRET);
              newUser = {
                isVerified: true
              };
              _context3.next = 12;
              return _tokenService["default"].destroyToken(token);
            case 12:
              _context3.next = 14;
              return _userServices["default"].updateUser(decoded, newUser);
            case 14:
              updatedUser = _context3.sent;
              if (!updatedUser) util.setErrorResponse(res, "Can't verify user ".concat(decoded), 400);
              _context3.next = 18;
              return (0, _mailer["default"])([{
                name: user.firstName
              }, {
                to: user.email,
                from: "CINETIE support",
                subject: "Success email has been verified"
              }, {
                path: "".concat(_path["default"].join(__dirname, "../public/templates/EmailVerificationSuccess.ejs"))
              }]);
            case 18:
              return _context3.abrupt("return", res.render("redirect", {
                url: "https://www.cinetie.com/u/signin"
              }));
            case 21:
              _context3.prev = 21;
              _context3.t0 = _context3["catch"](0);
              util.setErrorResponse(res, "Something went wrong ".concat(_context3.t0.message), 500);
            case 24:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 21]]);
      }));
      function verify(_x4, _x5) {
        return _verify.apply(this, arguments);
      }
      return verify;
    }()
  }, {
    key: "loginUser",
    value: function () {
      var _loginUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var user, token, dateSession, session, addedSession;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              user = req.user;
              token = _jwt["default"].jwtSign({
                key: _crypto["default"].crypto(),
                email: req.body.email
              }, process.env.SECRET, "1d");
              user.token = token;
              delete user.password;
              dateSession = new Date();
              session = {
                email: user.email,
                date: dateSession.toDateString(),
                timeIn: dateSession.toTimeString(),
                timeOut: null,
                state: "in"
              };
              _context4.next = 9;
              return _loginSessionServices["default"].addSession(session);
            case 9:
              addedSession = _context4.sent;
              if (addedSession) {
                _context4.next = 12;
                break;
              }
              return _context4.abrupt("return", util.setErrorResponse(res, "Can't register session", 500));
            case 12:
              return _context4.abrupt("return", util.setSuccessResponse(res, "Logged in successfully!", 200, token));
            case 15:
              _context4.prev = 15;
              _context4.t0 = _context4["catch"](0);
              util.setErrorResponse(res, "Something Went wrong logging in ".concat(_context4.t0), 500);
            case 18:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 15]]);
      }));
      function loginUser(_x6, _x7) {
        return _loginUser.apply(this, arguments);
      }
      return loginUser;
    }()
  }, {
    key: "forgotPassword",
    value: function () {
      var _forgotPassword = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var user, newDate, token;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _userServices["default"].getUserByMail(req.body.email);
            case 3:
              user = _context5.sent;
              if (user) {
                _context5.next = 6;
                break;
              }
              return _context5.abrupt("return", _response2["default"].errorResponse(res, 404, "User not found!"));
            case 6:
              // const date = new Date();
              newDate = _date2["default"].addMoreDays(1);
              token = _jwt["default"].jwtSign(newDate.getTime(), process.env.SECRET);
              _context5.next = 10;
              return (0, _mailer["default"])([{
                link: "".concat(process.env.FRONT_END_USER, "/u/new-password/").concat(user.id, "/").concat(token)
              }, {
                from: "CINETIE support",
                to: req.body.email,
                subject: "Password help"
              }, {
                path: "".concat(_path["default"].resolve("src/public/templates/ForgotPassword.ejs"))
              }]);
            case 10:
              return _context5.abrupt("return", _response2["default"].successResponse(res, 200, "Reset password link sent successfully!"));
            case 13:
              _context5.prev = 13;
              _context5.t0 = _context5["catch"](0);
              util.setErrorResponse(res, "Something Went wrong logging in ".concat(_context5.t0), 500);
            case 16:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 13]]);
      }));
      function forgotPassword(_x8, _x9) {
        return _forgotPassword.apply(this, arguments);
      }
      return forgotPassword;
    }()
  }, {
    key: "resetPassword",
    value: function () {
      var _resetPassword = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
        var _req$query, token, id, user_, hash, newPass, result;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _req$query = req.query, token = _req$query.token, id = _req$query.id;
              _jwt["default"].jwtVerify(token, process.env.SECRET);
              // eslint-disable-next-line no-underscore-dangle
              _context6.next = 5;
              return _userServices["default"].getUserById(id);
            case 5:
              user_ = _context6.sent;
              if (!user_) _response2["default"].errorResponse(res, 404, "User not found!", "user undefined");
              hash = _bcrypt["default"].encrypt(req.body.password);
              newPass = {
                password: hash
              };
              _context6.next = 11;
              return _userServices["default"].updateUser(user_.email, newPass);
            case 11:
              result = _context6.sent;
              if (!(result[1] === 0)) {
                _context6.next = 16;
                break;
              }
              util.setErrorResponse(res, "Something Went wrong updating user password", 400);
              _context6.next = 19;
              break;
            case 16:
              _context6.next = 18;
              return (0, _mailer["default"])([{
                name: user_.firstName,
                body: "Your password has been reset successfully"
              }, {
                from: "CINETIE support",
                to: user_.email,
                subject: "Password help"
              }, {
                path: "".concat(_path["default"].resolve("src/public/templates/notification.ejs"))
              }]);
            case 18:
              return _context6.abrupt("return", res.render("redirect", {
                url: "https://cinetie.com/u/signin"
              }));
            case 19:
              _context6.next = 24;
              break;
            case 21:
              _context6.prev = 21;
              _context6.t0 = _context6["catch"](0);
              util.setErrorResponse(res, "Something Went wrong resetting password ".concat(_context6.t0), 500);
            case 24:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[0, 21]]);
      }));
      function resetPassword(_x10, _x11) {
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
              return _userServices["default"].getUserByMail(req.user.email);
            case 3:
              user = _context7.sent;
              if (user) {
                _context7.next = 8;
                break;
              }
              _context7.next = 7;
              return _userServices["default"].createNewUser(req.user, req.user.email);
            case 7:
              user = _context7.sent;
            case 8:
              token = _jwt["default"].jwtSign({
                key: _crypto["default"].crypto(),
                email: req.user.email
              }, process.env.SECRET, "1d");
              res.redirect(200, "https://cinetie-frontend.herokuapp.com/social_auth?token=".concat(token));
              _context7.next = 15;
              break;
            case 12:
              _context7.prev = 12;
              _context7.t0 = _context7["catch"](0);
              _response2["default"].errorResponse(res, 500, "Something went wrong!", _context7.t0.message);
            case 15:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[0, 12]]);
      }));
      function socialLogin(_x12, _x13) {
        return _socialLogin.apply(this, arguments);
      }
      return socialLogin;
    }()
  }, {
    key: "deleteAccount",
    value: function () {
      var _deleteAccount = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
        var token, decoded, user, status, deleteSubscription;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              token = req.headers.authorization.slice(7);
              decoded = _jwt["default"].jwtVerify(token, process.env.SECRET);
              _context8.next = 5;
              return _userServices["default"].getUserByMail(decoded.email);
            case 5:
              user = _context8.sent;
              _context8.next = 8;
              return _userServices["default"].deleteUser(user.id);
            case 8:
              status = _context8.sent;
              _context8.next = 11;
              return _billingServices["default"].deleteSubscription(decoded.email);
            case 11:
              deleteSubscription = _context8.sent;
              if (status !== 0 && deleteSubscription !== 0) {
                util.setSuccessResponse(res, "deleted successfully", 200, status);
              } else {
                util.setErrorResponse(res, "An error occured", 400);
              }
              _context8.next = 18;
              break;
            case 15:
              _context8.prev = 15;
              _context8.t0 = _context8["catch"](0);
              util.setErrorResponse(res, "An error occured : ".concat(_context8.t0), 500);
            case 18:
            case "end":
              return _context8.stop();
          }
        }, _callee8, null, [[0, 15]]);
      }));
      function deleteAccount(_x14, _x15) {
        return _deleteAccount.apply(this, arguments);
      }
      return deleteAccount;
    }()
  }, {
    key: "updateAccount",
    value: function () {
      var _updateAccount = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
        var decoded, user, paymentMethod, newInfo, type, updated;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              decoded = _jwt["default"].jwtVerify(req.headers.authorization.slice(7), process.env.SECRET);
              _context9.next = 4;
              return _userServices["default"].getUserByMail(decoded.email);
            case 4:
              user = _context9.sent;
              paymentMethod = req.body.paymentMethod;
              if (!user) util.setErrorResponse(res, "Can't find that user", 422);
              newInfo = req.body;
              type = req.query.type;
              if (type === "change") newInfo.permissionLevel = -1;
              if (!(paymentMethod !== undefined || paymentMethod !== null)) {
                _context9.next = 13;
                break;
              }
              _context9.next = 13;
              return _billingServices["default"].updateSubscription(decoded.email, {
                paymentMethod: paymentMethod
              });
            case 13:
              _context9.next = 15;
              return _userServices["default"].updateUser(decoded.email, newInfo);
            case 15:
              updated = _context9.sent;
              if (updated[0] !== 0) {
                util.setSuccessResponse(res, "updated successfully", 200, updated);
              } else {
                util.setErrorResponse(res, "An error occured", 400);
              }
              _context9.next = 22;
              break;
            case 19:
              _context9.prev = 19;
              _context9.t0 = _context9["catch"](0);
              util.setErrorResponse(res, _context9.t0, 522);
            case 22:
            case "end":
              return _context9.stop();
          }
        }, _callee9, null, [[0, 19]]);
      }));
      function updateAccount(_x16, _x17) {
        return _updateAccount.apply(this, arguments);
      }
      return updateAccount;
    }()
  }, {
    key: "createSubcription",
    value: function () {
      var _createSubcription = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
        var _jwt$jwtVerify, email, type, getSubscription, today, endDate, user, paymentMethod, subscriptionData, subscriptionDetails, ambassador, _user, _paymentMethod, _subscriptionData, _subscriptionDetails, _ambassador, promoCodeUsed;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              _jwt$jwtVerify = _jwt["default"].jwtVerify(req.headers.authorization.slice(7), process.env.SECRET), email = _jwt$jwtVerify.email;
              type = req.query.type;
              _context10.next = 5;
              return _billingServices["default"].getSubscription(email);
            case 5:
              getSubscription = _context10.sent;
              today = new Date();
              endDate = new Date(getSubscription ? getSubscription.endDate : "");
              if (getSubscription) {
                _context10.next = 30;
                break;
              }
              _context10.next = 11;
              return _userServices["default"].getUserByMail(email);
            case 11:
              user = _context10.sent;
              paymentMethod = req.body.paymentMethod;
              subscriptionData = {
                paymentMethod: paymentMethod,
                email: email,
                plan: user.plan,
                phoneNumber: user.phoneNumber,
                isBilledAnnually: user.isBilledAnnually
              };
              _context10.next = 16;
              return _payment["default"].registerNewSubscription(subscriptionData);
            case 16:
              subscriptionDetails = _context10.sent;
              if (!subscriptionDetails) {
                _context10.next = 27;
                break;
              }
              if (!user.isOnPromo) {
                _context10.next = 24;
                break;
              }
              _context10.next = 21;
              return _ambassadorServices["default"].getAmbassadorByPromoCode(user.promoCode);
            case 21:
              ambassador = _context10.sent;
              _context10.next = 24;
              return _promoCodeServices["default"].addNewPromoUsage(user.email, ambassador[0].email, user.plan);
            case 24:
              util.setSuccessResponse(res, "Completed signup process", 201, subscriptionDetails);
              _context10.next = 28;
              break;
            case 27:
              util.setErrorResponse(res, "Something went sideways completing the signup", 400);
            case 28:
              _context10.next = 58;
              break;
            case 30:
              if (!(getSubscription.state === "pending" || endDate.getTime() <= today.getTime() || type === "change")) {
                _context10.next = 57;
                break;
              }
              _context10.next = 33;
              return _userServices["default"].getUserByMail(email);
            case 33:
              _user = _context10.sent;
              _paymentMethod = req.body.paymentMethod;
              _subscriptionData = {
                paymentMethod: _paymentMethod,
                email: email,
                plan: _user.plan,
                phoneNumber: _user.phoneNumber,
                isBilledAnnually: _user.isBilledAnnually
              };
              if (type === "change") _subscriptionData.state = "pending";
              _context10.next = 39;
              return _payment["default"].updatePendingSubscription(_subscriptionData);
            case 39:
              _subscriptionDetails = _context10.sent;
              if (!_subscriptionDetails) {
                _context10.next = 54;
                break;
              }
              if (!(_user.isOnPromo && _user.plan.includes("discount"))) {
                _context10.next = 51;
                break;
              }
              _context10.next = 44;
              return _ambassadorServices["default"].getAmbassadorByPromoCode(_user.promoCode);
            case 44:
              _ambassador = _context10.sent;
              _context10.next = 47;
              return _promoCodeServices["default"].getPromoCodeUtizationByEmail(_user.email, _ambassador[0].email);
            case 47:
              promoCodeUsed = _context10.sent;
              if (promoCodeUsed) {
                _context10.next = 51;
                break;
              }
              _context10.next = 51;
              return _promoCodeServices["default"].addNewPromoUsage(_user.email, _ambassador[0].email, _user.plan);
            case 51:
              util.setSuccessResponse(res, "Completed signup process and update", 200, _subscriptionDetails);
              _context10.next = 55;
              break;
            case 54:
              util.setErrorResponse(res, "Something went sideways completing the signup", 400);
            case 55:
              _context10.next = 58;
              break;
            case 57:
              util.setErrorResponse(res, "You have an active current subscription", 400);
            case 58:
              _context10.next = 63;
              break;
            case 60:
              _context10.prev = 60;
              _context10.t0 = _context10["catch"](0);
              util.setErrorResponse(res, "Something went sideways totally sideways contact support ".concat(_context10.t0), 500);
            case 63:
            case "end":
              return _context10.stop();
          }
        }, _callee10, null, [[0, 60]]);
      }));
      function createSubcription(_x18, _x19) {
        return _createSubcription.apply(this, arguments);
      }
      return createSubcription;
    }()
  }, {
    key: "updateAccountAndSubscription",
    value: function () {
      var _updateAccountAndSubscription = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
        var _jwt$jwtVerify2, email, user, subscriptionData, price, currentSubscription, paymentData, token, momoData, updates, ambassador, txRef, data, pay, _ambassador2, _pay, _updates, _ambassador3, _txRef, paymentType, requestData, _txRef2, _paymentType, _requestData, _txRef3, _paymentType2, _requestData2, _txRef4, _paymentType3, _requestData3, _txRef5, _paymentType4, _requestData4, _txRef6, _paymentType5, _requestData5, _txRef7, _paymentType6, _requestData6, _txRef8, _paymentType7, _requestData7, _txRef9, _paymentType8, _requestData8, _txRef10, _paymentType9, _requestData9;
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _context11.prev = 0;
              _jwt$jwtVerify2 = _jwt["default"].jwtVerify(req.headers.authorization.slice(7), process.env.SECRET), email = _jwt$jwtVerify2.email;
              _context11.next = 4;
              return _userServices["default"].getUserByMail(email);
            case 4:
              user = _context11.sent;
              subscriptionData = {
                email: email,
                plan: user.plan,
                isBilledAnnually: user.isBilledAnnually
              };
              _context11.next = 8;
              return _payment["default"].getPlanPricing(subscriptionData);
            case 8:
              price = _context11.sent;
              _context11.next = 11;
              return _billingServices["default"].getCurrentSubscription(email, "pending");
            case 11:
              currentSubscription = _context11.sent;
              // if (user.isOnTrial === false) {
              //   util.setErrorResponse(res, 'account is already activated', 400);
              // } else {
              paymentData = userController.getAndSetPaymentData(req, price, user, email);
              token = _jwt["default"].jwtSign({
                role: "main-api",
                user: email
              }, process.env.SECRET, 1000);
              _context11.t0 = Number(currentSubscription.paymentMethod);
              _context11.next = _context11.t0 === 1 ? 17 : _context11.t0 === 2 ? 41 : _context11.t0 === 3 ? 60 : _context11.t0 === 4 ? 84 : _context11.t0 === 5 ? 90 : _context11.t0 === 6 ? 96 : _context11.t0 === 7 ? 102 : _context11.t0 === 8 ? 108 : _context11.t0 === 9 ? 114 : _context11.t0 === 10 ? 120 : _context11.t0 === 11 ? 126 : _context11.t0 === 12 ? 126 : _context11.t0 === 13 ? 126 : _context11.t0 === 14 ? 126 : _context11.t0 === 15 ? 132 : _context11.t0 === 16 ? 138 : 144;
              break;
            case 17:
              _context11.next = 19;
              return userController.sendPaymentRequest(paymentData, token, null, "charge/momo");
            case 19:
              momoData = _context11.sent;
              if (!(momoData.status === 200)) {
                _context11.next = 39;
                break;
              }
              _context11.next = 23;
              return _userServices["default"].updateUser(email, {
                isOnTrial: false
              });
            case 23:
              updates = _context11.sent;
              if (!(updates[1] > 0)) {
                _context11.next = 36;
                break;
              }
              _context11.next = 27;
              return _payment["default"].recordTransaction(user.email, currentSubscription.price, paymentData.txRef, "pending");
            case 27:
              if (!user.isOnPromo) {
                _context11.next = 33;
                break;
              }
              _context11.next = 30;
              return _ambassadorServices["default"].getAmbassadorByPromoCode(user.promoCode);
            case 30:
              ambassador = _context11.sent;
              _context11.next = 33;
              return _promoCodeServices["default"].updatePromoCodeUtizationByEmail(user.email, ambassador[0].email, {
                plan: user.plan
              });
            case 33:
              util.setSuccessResponse(res, "Pending subscription  activation with MoMo", 201, momoData);
              _context11.next = 37;
              break;
            case 36:
              util.setErrorResponse(res, "Something went sideways creating a subscription", 400);
            case 37:
              _context11.next = 40;
              break;
            case 39:
              util.setErrorResponse(res, "Sorry payment failed", 500);
            case 40:
              return _context11.abrupt("break", 145);
            case 41:
              txRef = (0, _uuid.v4)();
              data = {
                plan: user.plan,
                isBilledAnnually: user.isBilledAnnually,
                email: user.email,
                name: "".concat(user.firstName, " ").concat(user.lastName),
                paymentOptions: "card",
                txRef: txRef
              };
              _context11.next = 45;
              return userController.sendPaymentRequest(data, token, null, "charge/rave-standard");
            case 45:
              pay = _context11.sent;
              if (!user.isOnPromo) {
                _context11.next = 52;
                break;
              }
              _context11.next = 49;
              return _ambassadorServices["default"].getAmbassadorByPromoCode(user.promoCode);
            case 49:
              _ambassador2 = _context11.sent;
              _context11.next = 52;
              return _promoCodeServices["default"].updatePromoCodeUtizationByEmail(user.email, _ambassador2[0].email, {
                plan: user.plan
              });
            case 52:
              if (!(pay.status === 200)) {
                _context11.next = 58;
                break;
              }
              _context11.next = 55;
              return _payment["default"].recordTransaction(user.email, currentSubscription.price, txRef, "pending");
            case 55:
              util.setSuccessResponse(res, "Link generated", 201, {
                link: pay.data.link
              });
              _context11.next = 59;
              break;
            case 58:
              util.setErrorResponse(res, "Something went wrong", 400);
            case 59:
              return _context11.abrupt("break", 145);
            case 60:
              _context11.next = 62;
              return _payment["default"].chargeSpenn(user, currentSubscription, token);
            case 62:
              _pay = _context11.sent;
              if (!(_pay.status === 200)) {
                _context11.next = 82;
                break;
              }
              _context11.next = 66;
              return _userServices["default"].updateUser(email, {
                isOnTrial: false
              });
            case 66:
              _updates = _context11.sent;
              if (!(_updates[1] === 1)) {
                _context11.next = 79;
                break;
              }
              _context11.next = 70;
              return _payment["default"].recordTransaction(user.email, currentSubscription.price, _pay.data.RequestId, "pending");
            case 70:
              if (!user.isOnPromo) {
                _context11.next = 76;
                break;
              }
              _context11.next = 73;
              return _ambassadorServices["default"].getAmbassadorByPromoCode(user.promoCode);
            case 73:
              _ambassador3 = _context11.sent;
              _context11.next = 76;
              return _promoCodeServices["default"].updatePromoCodeUtizationByEmail(user.email, _ambassador3[0].email, {
                plan: user.plan
              });
            case 76:
              util.setSuccessResponse(res, _pay.message, 200, _pay);
              _context11.next = 80;
              break;
            case 79:
              util.setErrorResponse(res, _pay.message, 400);
            case 80:
              _context11.next = 83;
              break;
            case 82:
              util.setErrorResponse(res, _pay.message, 400);
            case 83:
              return _context11.abrupt("break", 145);
            case 84:
              _txRef = (0, _uuid.v4)();
              paymentType = "mpesa";
              requestData = {
                txRef: _txRef,
                amount: price,
                email: email,
                phoneNumber: user.phoneNumber,
                currency: "KES"
              };
              _context11.next = 89;
              return (0, _RavePaymentRequest["default"])(req, res, requestData, token, paymentType, email, currentSubscription, user);
            case 89:
              return _context11.abrupt("break", 145);
            case 90:
              _txRef2 = (0, _uuid.v4)();
              _paymentType = "mobile_money_uganda";
              _requestData = {
                txRef: _txRef2,
                amount: price,
                email: email,
                currency: "UGX"
              };
              _context11.next = 95;
              return (0, _RavePaymentRequest["default"])(req, res, _requestData, token, _paymentType, email, currentSubscription, user);
            case 95:
              return _context11.abrupt("break", 145);
            case 96:
              _txRef3 = (0, _uuid.v4)();
              _paymentType2 = "mobile_money_zambia";
              _requestData2 = {
                txRef: _txRef3,
                amount: price,
                email: email,
                currency: "ZMW",
                network: "MTN"
              };
              _context11.next = 101;
              return (0, _RavePaymentRequest["default"])(req, res, _requestData2, token, _paymentType2, email, currentSubscription, user);
            case 101:
              return _context11.abrupt("break", 145);
            case 102:
              _txRef4 = (0, _uuid.v4)();
              _paymentType3 = "mobile_money_zambia";
              _requestData3 = {
                txRef: _txRef4,
                amount: price,
                email: email,
                currency: "ZMW",
                network: "ZAMTEL"
              };
              _context11.next = 107;
              return (0, _RavePaymentRequest["default"])(req, res, _requestData3, token, _paymentType3, email, currentSubscription, user);
            case 107:
              return _context11.abrupt("break", 145);
            case 108:
              _txRef5 = (0, _uuid.v4)();
              _paymentType4 = "mobile_money_ghana";
              _requestData4 = {
                txRef: _txRef5,
                amount: price,
                email: email,
                currency: "GHS",
                network: "MTN"
              };
              _context11.next = 113;
              return (0, _RavePaymentRequest["default"])(req, res, _requestData4, token, _paymentType4, email, currentSubscription, user);
            case 113:
              return _context11.abrupt("break", 145);
            case 114:
              _txRef6 = (0, _uuid.v4)();
              _paymentType5 = "mobile_money_ghana";
              _requestData5 = {
                txRef: _txRef6,
                amount: price,
                email: email,
                currency: "GHS",
                network: "VODAFONE"
              };
              _context11.next = 119;
              return (0, _RavePaymentRequest["default"])(req, res, _requestData5, token, _paymentType5, email, currentSubscription, user);
            case 119:
              return _context11.abrupt("break", 145);
            case 120:
              _txRef7 = (0, _uuid.v4)();
              _paymentType6 = "mobile_money_ghana";
              _requestData6 = {
                txRef: _txRef7,
                amount: price,
                email: email,
                currency: "GHS",
                network: "TIGO"
              };
              _context11.next = 125;
              return (0, _RavePaymentRequest["default"])(req, res, _requestData6, token, _paymentType6, email, currentSubscription, user);
            case 125:
              return _context11.abrupt("break", 145);
            case 126:
              _txRef8 = (0, _uuid.v4)();
              _paymentType7 = "mobile_money_franco";
              _requestData7 = {
                txRef: _txRef8,
                amount: price,
                email: email,
                currency: _countryNumbers["default"][currentSubscription.paymentMethod]
              };
              _context11.next = 131;
              return (0, _RavePaymentRequest["default"])(req, res, _requestData7, token, _paymentType7, email, currentSubscription, user);
            case 131:
              return _context11.abrupt("break", 145);
            case 132:
              _txRef9 = (0, _uuid.v4)();
              _paymentType8 = "mobile_money_tanzania";
              _requestData8 = {
                txRef: _txRef9,
                amount: price,
                email: email,
                currency: "TZS"
              };
              _context11.next = 137;
              return (0, _RavePaymentRequest["default"])(req, res, _requestData8, token, _paymentType8, email, currentSubscription, user);
            case 137:
              return _context11.abrupt("break", 145);
            case 138:
              _txRef10 = (0, _uuid.v4)();
              _paymentType9 = "mobile_money_malawi";
              _requestData9 = {
                txRef: _txRef10,
                amount: price,
                email: email,
                currency: "MWK"
              };
              _context11.next = 143;
              return (0, _RavePaymentRequest["default"])(req, res, _requestData9, token, _paymentType9, email, currentSubscription, user);
            case 143:
              return _context11.abrupt("break", 145);
            case 144:
              util.setErrorResponse(res, "Sorry payment failed", 500);
            case 145:
              _context11.next = 151;
              break;
            case 147:
              _context11.prev = 147;
              _context11.t1 = _context11["catch"](0);
              console.log(_context11.t1);
              return _context11.abrupt("return", _response2["default"].errorResponse(res, 500, "Something wrong happened ".concat(_context11.t1.message), _context11.t1));
            case 151:
            case "end":
              return _context11.stop();
          }
        }, _callee11, null, [[0, 147]]);
      }));
      function updateAccountAndSubscription(_x20, _x21) {
        return _updateAccountAndSubscription.apply(this, arguments);
      }
      return updateAccountAndSubscription;
    }()
  }, {
    key: "removeTrial",
    value: function () {
      var _removeTrial = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(email, res, pay) {
        var updates;
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return _userServices["default"].updateUser(email, {
                isOnTrial: false
              });
            case 2:
              updates = _context12.sent;
              if (updates[1] > 0) {
                util.setSuccessResponse(res, "Success", 201, {
                  user: updates,
                  payment: _objectSpread(_objectSpread({}, pay.meta), {}, {
                    flw_ref: pay.data.flw_ref
                  })
                });
              } else {
                util.setErrorResponse(res, "Something went sideways creating a subscription", 400);
              }
            case 4:
            case "end":
              return _context12.stop();
          }
        }, _callee12);
      }));
      function removeTrial(_x22, _x23, _x24) {
        return _removeTrial.apply(this, arguments);
      }
      return removeTrial;
    }()
  }, {
    key: "verifyOTP",
    value: function () {
      var _verifyOTP = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
        var _jwt$jwtVerify3, email, otpStatus;
        return _regenerator["default"].wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              _context13.prev = 0;
              _jwt$jwtVerify3 = _jwt["default"].jwtVerify(req.headers.authorization.slice(7), process.env.SECRET), email = _jwt$jwtVerify3.email;
              if (!(req.body.authorization.mode === "otp-verify")) {
                _context13.next = 13;
                break;
              }
              _context13.next = 5;
              return _rave["default"].validateACharge({
                otp: req.body.authorization.otp,
                flw_ref: req.body.flw_ref
              });
            case 5:
              otpStatus = _context13.sent;
              if (!(otpStatus.data.processor_response !== "successful")) {
                _context13.next = 10;
                break;
              }
              return _context13.abrupt("return", util.setErrorResponse(res, otpStatus.message, 400, "BAD_REQUEST"));
            case 10:
              _context13.next = 12;
              return userController.removeTrial(email, res, otpStatus);
            case 12:
              return _context13.abrupt("return", util.setSuccessResponse(res, "OTP verified", 200, otpStatus, null));
            case 13:
              _context13.next = 18;
              break;
            case 15:
              _context13.prev = 15;
              _context13.t0 = _context13["catch"](0);
              return _context13.abrupt("return", util.setErrorResponse(res, _context13.t0.message || _context13.t0, 500, "SERVER_ERROR"));
            case 18:
            case "end":
              return _context13.stop();
          }
        }, _callee13, null, [[0, 15]]);
      }));
      function verifyOTP(_x25, _x26) {
        return _verifyOTP.apply(this, arguments);
      }
      return verifyOTP;
    }()
  }, {
    key: "getAndSetPaymentData",
    value: function getAndSetPaymentData(req, price, user, email) {
      return _objectSpread(_objectSpread({}, req.body), {}, {
        amount: price,
        currency: "RWF",
        phone_number: user.phoneNumber,
        fullname: "".concat(user.firstName, " ").concat(user.lastName),
        email: email,
        txRef: (0, _uuid.v4)()
      });
    }
  }, {
    key: "sendPaymentRequest",
    value: function () {
      var _sendPaymentRequest = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(data, token, type, path) {
        var result;
        return _regenerator["default"].wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return (0, _fetch["default"])(data, {
                Authorization: "Bearer ".concat(token),
                "Content-Type": "application/json"
              }, "".concat(process.env.PAY_HOST, "/").concat(path, "?type=").concat(type), "POST");
            case 2:
              result = _context14.sent;
              return _context14.abrupt("return", result);
            case 4:
            case "end":
              return _context14.stop();
          }
        }, _callee14);
      }));
      function sendPaymentRequest(_x27, _x28, _x29, _x30) {
        return _sendPaymentRequest.apply(this, arguments);
      }
      return sendPaymentRequest;
    }()
  }, {
    key: "getAllAccounts",
    value: function () {
      var _getAllAccounts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(res) {
        var users;
        return _regenerator["default"].wrap(function _callee15$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              _context15.prev = 0;
              _context15.next = 3;
              return _userServices["default"].getAllUsers();
            case 3:
              users = _context15.sent;
              _response2["default"].successResponse(res, 200, "List of users", users);
              _context15.next = 10;
              break;
            case 7:
              _context15.prev = 7;
              _context15.t0 = _context15["catch"](0);
              util.setErrorResponse(res, _context15.t0, 503);
            case 10:
            case "end":
              return _context15.stop();
          }
        }, _callee15, null, [[0, 7]]);
      }));
      function getAllAccounts(_x31) {
        return _getAllAccounts.apply(this, arguments);
      }
      return getAllAccounts;
    }()
  }, {
    key: "getSubscribersInRange",
    value: function () {
      var _getSubscribersInRange = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(req, res) {
        var start, end, data;
        return _regenerator["default"].wrap(function _callee16$(_context16) {
          while (1) switch (_context16.prev = _context16.next) {
            case 0:
              _context16.prev = 0;
              // in Milliseconds since epoch.
              start = _date2["default"].convertToTimestamp(req.query.start);
              end = _date2["default"].convertToTimestamp(req.query.end);
              _context16.next = 5;
              return _billingServices["default"].getMonthlySubscribers(start, end);
            case 5:
              data = _context16.sent;
              if (Object.values(data).length > 0) {
                util.setSuccessResponse(res, "Data was found", 200, {
                  size: Object.values(data).length,
                  data: data
                });
              } else {
                util.setErrorResponse(res, "Data was not found", 400);
              }
              _context16.next = 12;
              break;
            case 9:
              _context16.prev = 9;
              _context16.t0 = _context16["catch"](0);
              util.setErrorResponse(res, "Something Went wrong logging in ".concat(_context16.t0), 500);
            case 12:
            case "end":
              return _context16.stop();
          }
        }, _callee16, null, [[0, 9]]);
      }));
      function getSubscribersInRange(_x32, _x33) {
        return _getSubscribersInRange.apply(this, arguments);
      }
      return getSubscribersInRange;
    }()
  }, {
    key: "getLiveUsers",
    value: function () {
      var _getLiveUsers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(req, res) {
        var data;
        return _regenerator["default"].wrap(function _callee17$(_context17) {
          while (1) switch (_context17.prev = _context17.next) {
            case 0:
              _context17.prev = 0;
              _context17.next = 3;
              return _loginSessionServices["default"].getLiveSessions();
            case 3:
              data = _context17.sent;
              if (data) {
                util.setSuccessResponse(res, "Found ", 200, {
                  size: Object.values(data).length,
                  data: data
                });
              } else {
                util.setErrorResponse(res, "Can't find Live users ".concat(JSON.stringify(data)), 404);
              }
              _context17.next = 10;
              break;
            case 7:
              _context17.prev = 7;
              _context17.t0 = _context17["catch"](0);
              util.setErrorResponse(res, _context17.t0.message, 500);
            case 10:
            case "end":
              return _context17.stop();
          }
        }, _callee17, null, [[0, 7]]);
      }));
      function getLiveUsers(_x34, _x35) {
        return _getLiveUsers.apply(this, arguments);
      }
      return getLiveUsers;
    }()
  }, {
    key: "getUserByEmail",
    value: function () {
      var _getUserByEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18(req, res) {
        var _jwt$jwtVerify4, email, user, subscription;
        return _regenerator["default"].wrap(function _callee18$(_context18) {
          while (1) switch (_context18.prev = _context18.next) {
            case 0:
              _context18.prev = 0;
              _jwt$jwtVerify4 = _jwt["default"].jwtVerify(req.headers.authorization.slice(7), process.env.SECRET), email = _jwt$jwtVerify4.email;
              _context18.next = 4;
              return _userServices["default"].getUserByMail(email);
            case 4:
              user = _context18.sent;
              _context18.next = 7;
              return _billingServices["default"].getSubscriptionByEmail(email);
            case 7:
              subscription = _context18.sent;
              if (user) {
                if (subscription) {
                  util.setSuccessResponse(res, "Found", 200, {
                    user: user,
                    paymentMethod: subscription.paymentMethod || "null",
                    price: subscription.price || "null",
                    subscritption: subscription.state
                  });
                } else {
                  util.setSuccessResponse(res, "Found", 200, {
                    user: user
                  });
                }
              } else {
                util.setErrorResponse(res, "Data not found", 404);
              }
              _context18.next = 14;
              break;
            case 11:
              _context18.prev = 11;
              _context18.t0 = _context18["catch"](0);
              util.setErrorResponse(res, _context18.t0.message, 500);
            case 14:
            case "end":
              return _context18.stop();
          }
        }, _callee18, null, [[0, 11]]);
      }));
      function getUserByEmail(_x36, _x37) {
        return _getUserByEmail.apply(this, arguments);
      }
      return getUserByEmail;
    }()
  }, {
    key: "getUserProfile",
    value: function () {
      var _getUserProfile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19(req, res) {
        var _jwt$jwtVerify5, email, currentSubscription, _response;
        return _regenerator["default"].wrap(function _callee19$(_context19) {
          while (1) switch (_context19.prev = _context19.next) {
            case 0:
              _context19.prev = 0;
              _jwt$jwtVerify5 = _jwt["default"].jwtVerify(req.headers.authorization.slice(7), process.env.SECRET), email = _jwt$jwtVerify5.email;
              _context19.next = 4;
              return _billingServices["default"].getCurrentSubscription(email);
            case 4:
              currentSubscription = _context19.sent;
              _context19.next = 7;
              return _userServices["default"].getUser(email);
            case 7:
              _response = _context19.sent;
              _response.paymentMethod = currentSubscription.paymentMethod;
              util.setSuccessResponse(res, "Found", 200, _response);
              _context19.next = 15;
              break;
            case 12:
              _context19.prev = 12;
              _context19.t0 = _context19["catch"](0);
              util.setErrorResponse(res, _context19.t0.message, 500);
            case 15:
            case "end":
              return _context19.stop();
          }
        }, _callee19, null, [[0, 12]]);
      }));
      function getUserProfile(_x38, _x39) {
        return _getUserProfile.apply(this, arguments);
      }
      return getUserProfile;
    }()
  }, {
    key: "logout",
    value: function () {
      var _logout = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20(req, res) {
        var _date, email, sessions, logoutStatus;
        return _regenerator["default"].wrap(function _callee20$(_context20) {
          while (1) switch (_context20.prev = _context20.next) {
            case 0:
              _context20.prev = 0;
              _date = new Date();
              email = req.user;
              _context20.next = 5;
              return _loginSessionServices["default"].getParticularSession(email);
            case 5:
              sessions = _context20.sent;
              if (!(sessions.length === 0)) {
                _context20.next = 10;
                break;
              }
              util.setErrorResponse(res, "Login to logout", 400);
              _context20.next = 14;
              break;
            case 10:
              _context20.next = 12;
              return _loginSessionServices["default"].updateSession(sessions[0].id, {
                state: "out",
                timeOut: _date.toTimeString()
              });
            case 12:
              logoutStatus = _context20.sent;
              if (logoutStatus) {
                util.setSuccessResponse(res, "Logout successfully", 200);
              } else {
                util.setErrorResponse(res, "Something went wrong", 400);
              }
            case 14:
              _context20.next = 19;
              break;
            case 16:
              _context20.prev = 16;
              _context20.t0 = _context20["catch"](0);
              util.setErrorResponse(res, _context20.t0.message, 500);
            case 19:
            case "end":
              return _context20.stop();
          }
        }, _callee20, null, [[0, 16]]);
      }));
      function logout(_x40, _x41) {
        return _logout.apply(this, arguments);
      }
      return logout;
    }()
  }, {
    key: "serveVerifyPassword",
    value: function () {
      var _serveVerifyPassword = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21(req, res) {
        return _regenerator["default"].wrap(function _callee21$(_context21) {
          while (1) switch (_context21.prev = _context21.next) {
            case 0:
              _context21.prev = 0;
              return _context21.abrupt("return", res.render("ResetPassword", {
                host: process.env.HOST,
                role: "auth"
              }));
            case 4:
              _context21.prev = 4;
              _context21.t0 = _context21["catch"](0);
              util.setErrorResponse(res, _context21.t0.message, 500);
            case 7:
            case "end":
              return _context21.stop();
          }
        }, _callee21, null, [[0, 4]]);
      }));
      function serveVerifyPassword(_x42, _x43) {
        return _serveVerifyPassword.apply(this, arguments);
      }
      return serveVerifyPassword;
    }()
  }]);
  return userController;
}();
var _default = exports["default"] = userController;