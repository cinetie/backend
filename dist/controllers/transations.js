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
var _uuid = require("uuid");
var _transactionService = _interopRequireDefault(require("../services/transactionService"));
var _utilities = _interopRequireDefault(require("../helpers/utilities"));
var _payment = _interopRequireDefault(require("../helpers/payment"));
var _fetch = _interopRequireDefault(require("../helpers/fetch"));
var _jwt = _interopRequireDefault(require("../helpers/jwt"));
var _billingServices = _interopRequireDefault(require("../services/billingServices"));
var _stripe = require("../helpers/stripe");
var _planServices = _interopRequireDefault(require("../services/planServices"));
var _userServices = _interopRequireDefault(require("../services/userServices"));
var _ambassadorServices = _interopRequireDefault(require("../services/ambassadorServices"));
var _promoCodeServices = _interopRequireDefault(require("../services/promoCodeServices"));
/* eslint-disable no-console */

var util = new _utilities["default"]();
var transactionsController = /*#__PURE__*/function () {
  function transactionsController() {
    (0, _classCallCheck2["default"])(this, transactionsController);
  }
  (0, _createClass2["default"])(transactionsController, null, [{
    key: "createNewTrans",
    value: function () {
      var _createNewTrans = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var data, createdTrans;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              data = req.body;
              delete data.statusCode;
              delete data.status;
              _context.next = 6;
              return _transactionService["default"].createTransaction(data);
            case 6:
              createdTrans = _context.sent;
              if (createdTrans) {
                util.setSuccessResponse(res, "Payment Done", 200, createdTrans);
              } else {
                util.setErrorResponse(res, "Oops something went wrong", 500);
              }
              _context.next = 13;
              break;
            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](0);
              util.setErrorResponse(res, _context.t0, 500);
            case 13:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 10]]);
      }));
      function createNewTrans(_x, _x2) {
        return _createNewTrans.apply(this, arguments);
      }
      return createNewTrans;
    }()
  }, {
    key: "getNewSessionId",
    value: function () {
      var _getNewSessionId = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var token, raw;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              token = _jwt["default"].jwtSign({
                role: "main-api"
              }, process.env.SECRET, 1000);
              _context2.next = 4;
              return (0, _fetch["default"])(undefined, {
                Authorization: "Bearer ".concat(token),
                "Content-Type": "application/json"
              }, "".concat(process.env.PAY_HOST, "/charge/get-session-id"), "GET");
            case 4:
              raw = _context2.sent;
              if (raw.status === 201) {
                util.setSuccessResponse(res, "Session id found", 200, raw);
              } else {
                util.setErrorResponse(res, "Something went wrong", 400);
              }
              _context2.next = 11;
              break;
            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](0);
              util.setErrorResponse(res, _context2.t0, 500);
            case 11:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 8]]);
      }));
      function getNewSessionId(_x3, _x4) {
        return _getNewSessionId.apply(this, arguments);
      }
      return getNewSessionId;
    }()
  }, {
    key: "getRaveStandardLink",
    value: function () {
      var _getRaveStandardLink = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var user, currentSubscription, plan, userUsedPromo, stripePlan, stripeUser, subscriptions, stripeSubscription, ambassador;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _userServices["default"].getUserByMail(req.user);
            case 3:
              user = _context3.sent;
              _context3.next = 6;
              return _billingServices["default"].getCurrentSubscription(user.email, "pending");
            case 6:
              currentSubscription = _context3.sent;
              plan = null;
              userUsedPromo = user.isOnPromo && user.plan.includes("discount");
              if (!userUsedPromo) {
                _context3.next = 15;
                break;
              }
              _context3.next = 12;
              return _planServices["default"].getParticalPlan(user.plan.split("-")[0]);
            case 12:
              plan = _context3.sent;
              _context3.next = 18;
              break;
            case 15:
              _context3.next = 17;
              return _planServices["default"].getParticalPlan(user.plan);
            case 17:
              plan = _context3.sent;
            case 18:
              _context3.next = 20;
              return (0, _stripe.getProduct)(plan.stripeId);
            case 20:
              stripePlan = _context3.sent;
              if (user.stripeId) {
                _context3.next = 29;
                break;
              }
              _context3.next = 24;
              return (0, _stripe.createCustomer)(user.email);
            case 24:
              stripeUser = _context3.sent;
              _context3.next = 27;
              return _userServices["default"].updateUser(user.email, {
                stripeId: stripeUser.id
              });
            case 27:
              _context3.next = 37;
              break;
            case 29:
              _context3.next = 31;
              return (0, _stripe.getCustomer)(user.stripeId);
            case 31:
              stripeUser = _context3.sent;
              _context3.next = 34;
              return (0, _stripe.getUserSubscriptions)(stripeUser.id);
            case 34:
              subscriptions = _context3.sent;
              _context3.next = 37;
              return Promise.all(subscriptions.data.map(function (sub) {
                return (0, _stripe.cancelSubscription)(sub.id);
              }));
            case 37:
              if (stripePlan) {
                _context3.next = 39;
                break;
              }
              return _context3.abrupt("return", util.setErrorResponse(res, "Something went wrong", 400));
            case 39:
              _context3.next = 41;
              return (0, _stripe.createSubscription)(stripeUser.id, stripePlan.default_price, userUsedPromo);
            case 41:
              stripeSubscription = _context3.sent;
              if (stripeSubscription) {
                _context3.next = 44;
                break;
              }
              return _context3.abrupt("return", util.setErrorResponse(res, "Something went wrong", 400));
            case 44:
              if (!stripeSubscription) {
                _context3.next = 54;
                break;
              }
              _context3.next = 47;
              return _payment["default"].recordTransaction(user.email, currentSubscription.dataValues.price, user.phoneNumber, "pending", stripeSubscription.id);
            case 47:
              if (!user.isOnPromo) {
                _context3.next = 53;
                break;
              }
              _context3.next = 50;
              return _ambassadorServices["default"].getAmbassadorByPromoCode(user.promoCode);
            case 50:
              ambassador = _context3.sent;
              _context3.next = 53;
              return _promoCodeServices["default"].updatePromoCodeUtizationByEmail(user.email, ambassador[0].email, {
                plan: user.plan
              });
            case 53:
              return _context3.abrupt("return", util.setSuccessResponse(res, "Link generated", 201, {
                link: stripeSubscription.latest_invoice.hosted_invoice_url
              }));
            case 54:
              return _context3.abrupt("return", util.setErrorResponse(res, "Something went wrong", 400));
            case 57:
              _context3.prev = 57;
              _context3.t0 = _context3["catch"](0);
              console.log("Error: ".concat(_context3.t0));
              return _context3.abrupt("return", util.setErrorResponse(res, _context3.t0, 500));
            case 61:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 57]]);
      }));
      function getRaveStandardLink(_x5, _x6) {
        return _getRaveStandardLink.apply(this, arguments);
      }
      return getRaveStandardLink;
    }()
  }, {
    key: "getFlutterwaveLink",
    value: function () {
      var _getFlutterwaveLink = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var token, user, currentSubscription, txRef, raw, ambassador;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              token = _jwt["default"].jwtSign({
                role: "main-api",
                user: req.user
              }, process.env.SECRET, 1000);
              _context4.next = 4;
              return _userServices["default"].getUserByMail(req.user);
            case 4:
              user = _context4.sent;
              _context4.next = 7;
              return _billingServices["default"].getCurrentSubscription(user.email, "pending");
            case 7:
              currentSubscription = _context4.sent;
              txRef = (0, _uuid.v4)();
              _context4.next = 11;
              return (0, _fetch["default"])({
                plan: user.plan,
                isBilledAnnually: user.isBilledAnnually,
                email: user.email,
                name: "".concat(user.firstName, " ").concat(user.lastName),
                paymentOptions: "card",
                txRef: txRef
              }, {
                "Content-Type": "application/json",
                Authorization: "Bearer ".concat(token)
              }, "".concat(process.env.PAY_HOST, "/charge/rave-standard"), "POST");
            case 11:
              raw = _context4.sent;
              if (!(raw.status === 200)) {
                _context4.next = 24;
                break;
              }
              _context4.next = 15;
              return _payment["default"].recordFlutterwaveTransaction(user, currentSubscription, txRef, "pending");
            case 15:
              if (!user.isOnPromo) {
                _context4.next = 21;
                break;
              }
              _context4.next = 18;
              return _ambassadorServices["default"].getAmbassadorByPromoCode(user.promoCode);
            case 18:
              ambassador = _context4.sent;
              _context4.next = 21;
              return _promoCodeServices["default"].updatePromoCodeUtizationByEmail(user.email, ambassador[0].email, {
                plan: user.plan
              });
            case 21:
              util.setSuccessResponse(res, "Link generated", 201, {
                link: raw.data.link
              });
              _context4.next = 25;
              break;
            case 24:
              util.setErrorResponse(res, "Something went wrong", 400);
            case 25:
              _context4.next = 30;
              break;
            case 27:
              _context4.prev = 27;
              _context4.t0 = _context4["catch"](0);
              util.setErrorResponse(res, _context4.t0, 500);
            case 30:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 27]]);
      }));
      function getFlutterwaveLink(_x7, _x8) {
        return _getFlutterwaveLink.apply(this, arguments);
      }
      return getFlutterwaveLink;
    }()
  }, {
    key: "cancelSubscription",
    value: function () {
      var _cancelSubscription = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var _this = this;
        var email, user, subscription, stripeUser, subscriptions, token, raw;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              email = req.user;
              _context5.next = 4;
              return _userServices["default"].getUserByMail(email);
            case 4:
              user = _context5.sent;
              _context5.next = 7;
              return _billingServices["default"].getCurrentSubscription(email);
            case 7:
              subscription = _context5.sent;
              if (subscription) {
                _context5.next = 10;
                break;
              }
              return _context5.abrupt("return", util.setErrorResponse(res, "You don't have an active subscription", 400));
            case 10:
              _context5.next = 12;
              return _billingServices["default"].updateSubscription(email, {
                state: "cancelled"
              });
            case 12:
              if (!(subscription.paymentMethod === 2)) {
                _context5.next = 30;
                break;
              }
              if (!user.stripeId) {
                _context5.next = 23;
                break;
              }
              _context5.next = 16;
              return (0, _stripe.getCustomer)(user.stripeId);
            case 16:
              stripeUser = _context5.sent;
              _context5.next = 19;
              return (0, _stripe.getUserSubscriptions)(stripeUser.id);
            case 19:
              subscriptions = _context5.sent;
              _context5.next = 22;
              return Promise.all(subscriptions.data.map(function (sub) {
                return _this.cancelSubscription(sub.id);
              }));
            case 22:
              return _context5.abrupt("return", util.setSuccessResponse(res, "Subscription cancelled", 200));
            case 23:
              token = _jwt["default"].jwtSign({
                role: "main-api",
                user: email
              }, process.env.SECRET, 1000);
              _context5.next = 26;
              return (0, _fetch["default"])({
                email: email
              }, {
                "Content-Type": "application/json",
                Authorization: "Bearer ".concat(token)
              }, "".concat(process.env.PAY_HOST, "/charge/cancel-subscription"), "PUT");
            case 26:
              raw = _context5.sent;
              if (!(raw.status === 201)) {
                _context5.next = 29;
                break;
              }
              return _context5.abrupt("return", util.setSuccessResponse(res, "Subscription cancelled", 200));
            case 29:
              return _context5.abrupt("return", util.setErrorResponse(res, "Something went wrong", 400, raw));
            case 30:
              return _context5.abrupt("return", util.setSuccessResponse(res, "Subscription cancelled", 200));
            case 33:
              _context5.prev = 33;
              _context5.t0 = _context5["catch"](0);
              console.log("+++++++++++++++++++++++++++++++ ERRROR DDDD");
              return _context5.abrupt("return", util.setErrorResponse(res, _context5.t0, 500));
            case 37:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 33]]);
      }));
      function cancelSubscription(_x9, _x10) {
        return _cancelSubscription.apply(this, arguments);
      }
      return cancelSubscription;
    }()
  }, {
    key: "reactivateSubscription",
    value: function () {
      var _reactivateSubscription = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
        var email, permissionLevel, token, raw;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              email = req.user;
              permissionLevel = req.fullUser.permissionLevel;
              if (!(permissionLevel === 1)) {
                _context6.next = 5;
                break;
              }
              return _context6.abrupt("return", util.setErrorResponse(res, "your permissionLevel is already 1", 400));
            case 5:
              token = _jwt["default"].jwtSign({
                role: "main-api",
                user: email
              }, process.env.SECRET, 1000);
              _context6.next = 8;
              return (0, _fetch["default"])({
                email: email
              }, {
                "Content-Type": "application/json",
                Authorization: "Bearer ".concat(token)
              }, "".concat(process.env.PAY_HOST, "/charge/activate-subscription"), "PUT");
            case 8:
              raw = _context6.sent;
              if (!(raw.status === 201)) {
                _context6.next = 13;
                break;
              }
              _context6.next = 12;
              return _userServices["default"].updateUser(email, {
                permissionLevel: 1
              });
            case 12:
              return _context6.abrupt("return", util.setSuccessResponse(res, raw.message, raw.status));
            case 13:
              return _context6.abrupt("return", util.setErrorResponse(res, raw.message, 400, raw));
            case 16:
              _context6.prev = 16;
              _context6.t0 = _context6["catch"](0);
              return _context6.abrupt("return", util.setErrorResponse(res, _context6.t0, 500));
            case 19:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[0, 16]]);
      }));
      function reactivateSubscription(_x11, _x12) {
        return _reactivateSubscription.apply(this, arguments);
      }
      return reactivateSubscription;
    }()
  }]);
  return transactionsController;
}();
var _default = exports["default"] = transactionsController;