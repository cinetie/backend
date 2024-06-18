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
var _uuid = require("uuid");
var _utilities = _interopRequireDefault(require("../helpers/utilities"));
var _mailer = _interopRequireDefault(require("../helpers/mailer"));
var _userServices = _interopRequireDefault(require("../services/userServices"));
var _date = _interopRequireDefault(require("../helpers/date"));
var _jwt = _interopRequireDefault(require("../helpers/jwt"));
var _fetch = _interopRequireDefault(require("../helpers/fetch"));
var _viewingSessionsServices = _interopRequireDefault(require("../services/viewingSessionsServices"));
var _transactionService = _interopRequireDefault(require("../services/transactionService"));
var _webhooks = _interopRequireDefault(require("../controllers/webhooks"));
var _payment = _interopRequireDefault(require("../helpers/payment"));
var _billingServices = _interopRequireDefault(require("../services/billingServices"));
/* eslint-disable no-dupe-class-members */
/* eslint-disable no-return-await */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */

var util = new _utilities["default"]();
// middlware to perfom actual payment and registering transactions
var billing = /*#__PURE__*/function () {
  function billing() {
    (0, _classCallCheck2["default"])(this, billing);
  }
  (0, _createClass2["default"])(billing, null, [{
    key: "fetchCurrentSubscription",
    value: function () {
      var _fetchCurrentSubscription = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, state) {
        var details;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _billingServices["default"].getCurrentSubscription(req.body.email, state);
            case 3:
              details = _context.sent;
              return _context.abrupt("return", details);
            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              util.setErrorResponse(res, _context.t0, 500);
            case 10:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 7]]);
      }));
      function fetchCurrentSubscription(_x, _x2, _x3) {
        return _fetchCurrentSubscription.apply(this, arguments);
      }
      return fetchCurrentSubscription;
    }()
  }, {
    key: "handleFailPaymentStatus",
    value: function () {
      var _handleFailPaymentStatus = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, next) {
        var user;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _userServices["default"].getUserByMail(req.body.email);
            case 2:
              user = _context2.sent;
              _context2.next = 5;
              return _userServices["default"].updateUser(req.body.email, {
                permissionLevel: -1
              });
            case 5:
              // await billing.sendBillingNotification(
              //   user,
              //   req,
              //   "We would like you to know that your account has been put onhold . \n since your  payment didn't work out"
              // );
              next();
              // } else {
              // Temporarily disable extensions
              // const viewingSessions = await ViewingSessions.getActiveSessionsPerUser(req.body.email);
              // viewingSessions.forEach(async (data) => {
              //   const updates = {
              //     sessionState: 'suspended'
              //   };
              //   await ViewingSessions.updateViewingSessions(data.id, updates);
              // });
              // await billingService.updateSubscription(req.body.email, {
              //   endDate: date.addMoreDays(5).toDateString(),
              // });
              // await userService.updateUser(req.body.email, { isOnExtension: true });
              // await billing.sendBillingNotification(user, req,
              // 'Hello, Your cinetie subscription has ended and automatic billing has failed,
              // we extended your subscription for five days ');
              // next();~
              // }
            case 6:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function handleFailPaymentStatus(_x4, _x5) {
        return _handleFailPaymentStatus.apply(this, arguments);
      }
      return handleFailPaymentStatus;
    }()
  }, {
    key: "sendBillingNotification",
    value: function () {
      var _sendBillingNotification = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(user, req, body) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return (0, _mailer["default"])([{
                body: body,
                name: "".concat(user.firstName)
              }, {
                from: "Cinetie support",
                to: req.body.email,
                subject: "Cinetie subscription"
              }, {
                path: "".concat(_path["default"].join(__dirname, "../public/templates/notification.ejs"))
              }]);
            case 2:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function sendBillingNotification(_x6, _x7, _x8) {
        return _sendBillingNotification.apply(this, arguments);
      }
      return sendBillingNotification;
    }()
  }, {
    key: "updateSubscription",
    value: function () {
      var _updateSubscription = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var today, details, updates;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _userServices["default"].getUserByMail(req.body.email);
            case 2:
              details = _context4.sent;
              if (details.isBilledAnnually === true) {
                today = _date["default"].addMoreDays(365).toDateString();
              } else {
                today = _date["default"].addMoreDays(31).toDateString();
              }
              _context4.next = 6;
              return _billingServices["default"].updateSubscription(req.body.email, {
                dueState: true,
                endDate: today
              });
            case 6:
              updates = _context4.sent;
              return _context4.abrupt("return", {
                updates: updates,
                today: today
              });
            case 8:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      function updateSubscription(_x9, _x10) {
        return _updateSubscription.apply(this, arguments);
      }
      return updateSubscription;
    }()
  }, {
    key: "renewPayment",
    value: function () {
      var _renewPayment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
        var user, pendingSubscription, details, today, endDate, token, txRef, momoStatus, currentSubscription, recentTransactions, pay, _txRef, requestData, data, _currentSubscription, _txRef2, _requestData, _data, _currentSubscription2, _txRef3, _requestData2, _data2, _currentSubscription3, _txRef4, _requestData3, _data3, _currentSubscription4, _txRef5, _requestData4, _data4, _currentSubscription5, _txRef6, _requestData5, _data5, _currentSubscription6, _txRef7, _requestData6, _data6, _currentSubscription7;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _userServices["default"].getUserByMail(req.body.email);
            case 3:
              user = _context5.sent;
              _context5.next = 6;
              return billing.fetchCurrentSubscription(req, res, "pending");
            case 6:
              pendingSubscription = _context5.sent;
              _context5.next = 9;
              return billing.fetchCurrentSubscription(req, res);
            case 9:
              details = _context5.sent;
              if (user) {
                _context5.next = 12;
                break;
              }
              return _context5.abrupt("return", util.setErrorResponse(res, "user doesn't exist", 400));
            case 12:
              if (!(pendingSubscription || user.plan === "Setup" || details === null)) {
                _context5.next = 16;
                break;
              }
              next();
              _context5.next = 189;
              break;
            case 16:
              today = new Date();
              endDate = new Date(details.endDate);
              token = _jwt["default"].jwtSign({
                role: "main-api",
                user: user.email
              }, process.env.SECRET, 1000);
              if (!(endDate.getTime() <= today.getTime())) {
                _context5.next = 188;
                break;
              }
              if (!(Number(details.paymentMethod) === 1)) {
                _context5.next = 37;
                break;
              }
              txRef = (0, _uuid.v4)();
              _context5.next = 24;
              return (0, _fetch["default"])({
                currency: "RWF",
                amount: details.price,
                email: user.email,
                phone_number: user.phoneNumber,
                txRef: txRef,
                fullname: "".concat(user.firstName, " ").concat(user.lastName)
              }, {
                Authorization: "Bearer ".concat(token),
                "Content-Type": "application/json"
              }, "".concat(process.env.PAY_HOST, "/charge/momo"), "POST");
            case 24:
              momoStatus = _context5.sent;
              if (!(momoStatus.status === 200)) {
                _context5.next = 34;
                break;
              }
              _context5.next = 28;
              return _billingServices["default"].getCurrentSubscription(user.email);
            case 28:
              currentSubscription = _context5.sent;
              _context5.next = 31;
              return _payment["default"].recordTransaction(user.email, currentSubscription.price, txRef, "pending");
            case 31:
              util.setSuccessResponse(res, "Please follow this link to renew your subscription with Mobile money", 200, momoStatus);
              _context5.next = 35;
              break;
            case 34:
              billing.handleFailPaymentStatus(req, next);
            case 35:
              _context5.next = 186;
              break;
            case 37:
              if (!(Number(details.paymentMethod) === 2)) {
                _context5.next = 41;
                break;
              }
              // charge tokenised
              // await Fetch({ email: user.email }, {
              //   Authorization: `Bearer ${token}`,
              //   'Content-Type': 'application/json'
              // }, `${process.env.PAY_HOST}/charge/card-token`, 'POST');
              billing.handleFailPaymentStatus(req, next);
              _context5.next = 186;
              break;
            case 41:
              if (!(Number(details.paymentMethod) === 3)) {
                _context5.next = 62;
                break;
              }
              _context5.next = 44;
              return _transactionService["default"].getTransactionsByEmail(user.email, "pending");
            case 44:
              recentTransactions = _context5.sent;
              if (!(recentTransactions.length > 0)) {
                _context5.next = 50;
                break;
              }
              _context5.next = 48;
              return billing.checkRecentPendingSpennTransaction(recentTransactions, token, user, details, req, res, next);
            case 48:
              _context5.next = 60;
              break;
            case 50:
              _context5.next = 52;
              return _payment["default"].chargeSpenn(user, details, token);
            case 52:
              pay = _context5.sent;
              if (!(pay.status === 200)) {
                _context5.next = 59;
                break;
              }
              _context5.next = 56;
              return _payment["default"].recordTransaction(user.email, details, pay.data.RequestId, "pending");
            case 56:
              // await billingService.updateSubscription(user.email,
              //   { state: 'current' });
              util.setSuccessResponse(res, pay.message, 201, pay);
              _context5.next = 60;
              break;
            case 59:
              return _context5.abrupt("return", billing.handleFailPaymentStatus(req, next));
            case 60:
              _context5.next = 186;
              break;
            case 62:
              if (!(Number(details.paymentMethod) === 4)) {
                _context5.next = 80;
                break;
              }
              _txRef = (0, _uuid.v4)();
              requestData = {
                txRef: _txRef,
                amount: details.price,
                email: user.email,
                currency: "KES"
              };
              _context5.next = 67;
              return (0, _fetch["default"])(requestData, {
                Authorization: "Bearer ".concat(token),
                "Content-Type": "application/json"
              }, "".concat(process.env.PAY_HOST, "/charge/all?type=mpesa"), "POST");
            case 67:
              data = _context5.sent;
              if (!(data.status === 200)) {
                _context5.next = 77;
                break;
              }
              _context5.next = 71;
              return _billingServices["default"].getCurrentSubscription(user.email);
            case 71:
              _currentSubscription = _context5.sent;
              _context5.next = 74;
              return _payment["default"].recordTransaction(user.email, _currentSubscription.price, _txRef, "pending");
            case 74:
              util.setSuccessResponse(res, "Confirm your Payment with mpesa", 200, data);
              _context5.next = 78;
              break;
            case 77:
              billing.handleFailPaymentStatus(req, next);
            case 78:
              _context5.next = 186;
              break;
            case 80:
              if (!(Number(details.paymentMethod) === 5)) {
                _context5.next = 98;
                break;
              }
              _txRef2 = (0, _uuid.v4)();
              _requestData = {
                txRef: _txRef2,
                amount: details.price,
                email: user.email,
                currency: "UGX"
              };
              _context5.next = 85;
              return (0, _fetch["default"])(_requestData, {
                Authorization: "Bearer ".concat(token),
                "Content-Type": "application/json"
              }, "".concat(process.env.PAY_HOST, "/charge/all?type=mobile_money_uganda"), "POST");
            case 85:
              _data = _context5.sent;
              if (!(_data.status === 200)) {
                _context5.next = 95;
                break;
              }
              _context5.next = 89;
              return _billingServices["default"].getCurrentSubscription(user.email);
            case 89:
              _currentSubscription2 = _context5.sent;
              _context5.next = 92;
              return _payment["default"].recordTransaction(user.email, _currentSubscription2.price, _txRef2, "pending");
            case 92:
              util.setSuccessResponse(res, "Please follow this link to renew your subscription with Mobile money", 200, _data);
              _context5.next = 96;
              break;
            case 95:
              billing.handleFailPaymentStatus(req, next);
            case 96:
              _context5.next = 186;
              break;
            case 98:
              if (!(Number(details.paymentMethod) === 6)) {
                _context5.next = 116;
                break;
              }
              _txRef3 = (0, _uuid.v4)();
              _requestData2 = {
                txRef: _txRef3,
                amount: details.price,
                email: user.email,
                currency: "ZMW",
                network: "MTN"
              };
              _context5.next = 103;
              return (0, _fetch["default"])(_requestData2, {
                Authorization: "Bearer ".concat(token),
                "Content-Type": "application/json"
              }, "".concat(process.env.PAY_HOST, "/charge/all?type=mobile_money_zambia"), "POST");
            case 103:
              _data2 = _context5.sent;
              if (!(_data2.status === 200)) {
                _context5.next = 113;
                break;
              }
              _context5.next = 107;
              return _billingServices["default"].getCurrentSubscription(user.email);
            case 107:
              _currentSubscription3 = _context5.sent;
              _context5.next = 110;
              return _payment["default"].recordTransaction(user.email, _currentSubscription3.price, _txRef3, "pending");
            case 110:
              util.setSuccessResponse(res, "Please follow this link to renew your subscription with Mobile money", 200, _data2);
              _context5.next = 114;
              break;
            case 113:
              billing.handleFailPaymentStatus(req, next);
            case 114:
              _context5.next = 186;
              break;
            case 116:
              if (!(Number(details.paymentMethod) === 7)) {
                _context5.next = 134;
                break;
              }
              _txRef4 = (0, _uuid.v4)();
              _requestData3 = {
                txRef: _txRef4,
                amount: details.price,
                email: user.email,
                currency: "ZMW",
                network: "ZAMTEL"
              };
              _context5.next = 121;
              return (0, _fetch["default"])(_requestData3, {
                Authorization: "Bearer ".concat(token),
                "Content-Type": "application/json"
              }, "".concat(process.env.PAY_HOST, "/charge/all?type=mobile_money_zambia"), "POST");
            case 121:
              _data3 = _context5.sent;
              if (!(_data3.status === 200)) {
                _context5.next = 131;
                break;
              }
              _context5.next = 125;
              return _billingServices["default"].getCurrentSubscription(user.email);
            case 125:
              _currentSubscription4 = _context5.sent;
              _context5.next = 128;
              return _payment["default"].recordTransaction(user.email, _currentSubscription4.price, _txRef4, "pending");
            case 128:
              util.setSuccessResponse(res, "Please follow this link to renew your subscription with Mobile money", 200, _data3);
              _context5.next = 132;
              break;
            case 131:
              billing.handleFailPaymentStatus(req, next);
            case 132:
              _context5.next = 186;
              break;
            case 134:
              if (!(Number(details.paymentMethod) === 8)) {
                _context5.next = 152;
                break;
              }
              _txRef5 = (0, _uuid.v4)();
              _requestData4 = {
                txRef: _txRef5,
                amount: details.price,
                email: user.email,
                currency: "GHS",
                network: "MTN"
              };
              _context5.next = 139;
              return (0, _fetch["default"])(_requestData4, {
                Authorization: "Bearer ".concat(token),
                "Content-Type": "application/json"
              }, "".concat(process.env.PAY_HOST, "/charge/all?type=mobile_money_ghana"), "POST");
            case 139:
              _data4 = _context5.sent;
              if (!(_data4.status === 200)) {
                _context5.next = 149;
                break;
              }
              _context5.next = 143;
              return _billingServices["default"].getCurrentSubscription(user.email);
            case 143:
              _currentSubscription5 = _context5.sent;
              _context5.next = 146;
              return _payment["default"].recordTransaction(user.email, _currentSubscription5.price, _txRef5, "pending");
            case 146:
              util.setSuccessResponse(res, "Please follow this link to renew your subscription with Mobile money", 200, _data4);
              _context5.next = 150;
              break;
            case 149:
              billing.handleFailPaymentStatus(req, next);
            case 150:
              _context5.next = 186;
              break;
            case 152:
              if (!(Number(details.paymentMethod) === 9)) {
                _context5.next = 170;
                break;
              }
              _txRef6 = (0, _uuid.v4)();
              _requestData5 = {
                txRef: _txRef6,
                amount: details.price,
                email: user.email,
                currency: "GHS",
                network: "VODAFONE"
              };
              _context5.next = 157;
              return (0, _fetch["default"])(_requestData5, {
                Authorization: "Bearer ".concat(token),
                "Content-Type": "application/json"
              }, "".concat(process.env.PAY_HOST, "/charge/all?type=mobile_money_ghana"), "POST");
            case 157:
              _data5 = _context5.sent;
              if (!(_data5.status === 200)) {
                _context5.next = 167;
                break;
              }
              _context5.next = 161;
              return _billingServices["default"].getCurrentSubscription(user.email);
            case 161:
              _currentSubscription6 = _context5.sent;
              _context5.next = 164;
              return _payment["default"].recordTransaction(user.email, _currentSubscription6.price, _txRef6, "pending");
            case 164:
              util.setSuccessResponse(res, "Please follow this link to renew your subscription with Mobile money", 200, _data5);
              _context5.next = 168;
              break;
            case 167:
              billing.handleFailPaymentStatus(req, next);
            case 168:
              _context5.next = 186;
              break;
            case 170:
              if (!(Number(details.paymentMethod) === 10)) {
                _context5.next = 186;
                break;
              }
              _txRef7 = (0, _uuid.v4)();
              _requestData6 = {
                txRef: _txRef7,
                amount: details.price,
                email: user.email,
                currency: "GHS",
                network: "TIGO"
              };
              _context5.next = 175;
              return (0, _fetch["default"])(_requestData6, {
                Authorization: "Bearer ".concat(token),
                "Content-Type": "application/json"
              }, "".concat(process.env.PAY_HOST, "/charge/all?type=mobile_money_ghana"), "POST");
            case 175:
              _data6 = _context5.sent;
              if (!(_data6.status === 200)) {
                _context5.next = 185;
                break;
              }
              _context5.next = 179;
              return _billingServices["default"].getCurrentSubscription(user.email);
            case 179:
              _currentSubscription7 = _context5.sent;
              _context5.next = 182;
              return _payment["default"].recordTransaction(user.email, _currentSubscription7.email, _txRef7, "pending");
            case 182:
              util.setSuccessResponse(res, "Please follow this link to renew your subscription with Mobile money", 200, _data6);
              _context5.next = 186;
              break;
            case 185:
              billing.handleFailPaymentStatus(req, next);
            case 186:
              _context5.next = 189;
              break;
            case 188:
              next();
            case 189:
              _context5.next = 194;
              break;
            case 191:
              _context5.prev = 191;
              _context5.t0 = _context5["catch"](0);
              util.setErrorResponse(res, _context5.t0.message, 500);
            case 194:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 191]]);
      }));
      function renewPayment(_x11, _x12, _x13) {
        return _renewPayment.apply(this, arguments);
      }
      return renewPayment;
    }()
  }, {
    key: "checkRecentPendingSpennTransaction",
    value: function () {
      var _checkRecentPendingSpennTransaction = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(recentTransactions, token, user, details, req, res, next) {
        var recentTransaction;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return billing.checkSpenn(recentTransactions[recentTransactions.length - 1].transactionId, token);
            case 2:
              recentTransaction = _context6.sent;
              if (!(recentTransaction.data.Status === "Approved" || recentTransaction.data.Status === "TransactionVerified")) {
                _context6.next = 10;
                break;
              }
              _context6.next = 6;
              return billing.updateTransactionsAndRegisterSales(recentTransactions[0].transactionId, user, details, req, res, next);
            case 6:
              _context6.next = 8;
              return _billingServices["default"].updateSubscription(user.email, {
                state: "current"
              });
            case 8:
              _context6.next = 11;
              break;
            case 10:
              billing.handleFailPaymentStatus(req, next);
            case 11:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }));
      function checkRecentPendingSpennTransaction(_x14, _x15, _x16, _x17, _x18, _x19, _x20) {
        return _checkRecentPendingSpennTransaction.apply(this, arguments);
      }
      return checkRecentPendingSpennTransaction;
    }()
  }, {
    key: "verifySpennTransactions",
    value: function () {
      var _verifySpennTransactions = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
        var user, details, recentTransactions, token;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return _userServices["default"].getUserByMail(req.body.email);
            case 3:
              user = _context7.sent;
              if (user) {
                _context7.next = 6;
                break;
              }
              return _context7.abrupt("return", util.setErrorResponse(res, "user doesn't exist", 400));
            case 6:
              _context7.next = 8;
              return billing.fetchCurrentSubscription(req, res, "pending");
            case 8:
              details = _context7.sent;
              if (!(details === null)) {
                _context7.next = 13;
                break;
              }
              next();
              _context7.next = 27;
              break;
            case 13:
              if (!(Number(details.paymentMethod) === 3)) {
                _context7.next = 26;
                break;
              }
              _context7.next = 16;
              return _transactionService["default"].getTransactionsByEmail(user.email, "pending");
            case 16:
              recentTransactions = _context7.sent;
              if (!(recentTransactions.length > 0)) {
                _context7.next = 23;
                break;
              }
              token = _jwt["default"].jwtSign({
                role: "main-api",
                user: user.email
              }, process.env.SECRET, 1000);
              _context7.next = 21;
              return billing.checkRecentPendingSpennTransaction(recentTransactions, token, user, details, req, res, next);
            case 21:
              _context7.next = 24;
              break;
            case 23:
              next();
            case 24:
              _context7.next = 27;
              break;
            case 26:
              next();
            case 27:
              _context7.next = 32;
              break;
            case 29:
              _context7.prev = 29;
              _context7.t0 = _context7["catch"](0);
              // eslint-disable-next-line no-console
              util.setErrorResponse(res, _context7.t0.message, 500);
            case 32:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[0, 29]]);
      }));
      function verifySpennTransactions(_x21, _x22, _x23) {
        return _verifySpennTransactions.apply(this, arguments);
      }
      return verifySpennTransactions;
    }()
  }, {
    key: "updateTransactionsAndRegisterSales",
    value: function () {
      var _updateTransactionsAndRegisterSales = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(recentTrans, user, details, req, res, next) {
        var rates, converted, updates, updatedSubscription, status;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return (0, _fetch["default"])(undefined, {
                Accept: "application/json"
              }, "http://apilayer.net/api/live?access_key=".concat(process.env.ACCESS_KEY_CURRENCY_LAYER, "&currencies=RWF&source=USD&format=1"), "GET");
            case 2:
              rates = _context8.sent;
              converted = Math.floor(rates.quotes.USDRWF * details.price);
              details.price = converted;
              _context8.next = 7;
              return _userServices["default"].updateUser(user.email, {
                permissionLevel: 1
              });
            case 7:
              updates = _context8.sent;
              if (!(user.isBilledAnnually === true)) {
                _context8.next = 14;
                break;
              }
              _context8.next = 11;
              return _billingServices["default"].updateSubscription(user.email, {
                endDate: _date["default"].addMoreDays(365).toDateString()
              });
            case 11:
              _context8.t0 = _context8.sent;
              _context8.next = 17;
              break;
            case 14:
              _context8.next = 16;
              return _billingServices["default"].updateSubscription(user.email, {
                endDate: _date["default"].addMoreDays(30).toDateString()
              });
            case 16:
              _context8.t0 = _context8.sent;
            case 17:
              updatedSubscription = _context8.t0;
              if (!(updates[1] === 1 && updatedSubscription[1] === 1)) {
                _context8.next = 31;
                break;
              }
              _context8.next = 21;
              return _webhooks["default"].registerSales({
                payment_type: "spenn",
                amount: details.price
              }, details, req, res);
            case 21:
              status = _context8.sent;
              if (!(status === true)) {
                _context8.next = 28;
                break;
              }
              _context8.next = 25;
              return _transactionService["default"].updateTransaction(recentTrans, {
                statusDesc: "approved"
              });
            case 25:
              next();
              _context8.next = 29;
              break;
            case 28:
              return _context8.abrupt("return", util.setErrorResponse(res, "Contact support Error: SPENN transaction error", 500));
            case 29:
              _context8.next = 32;
              break;
            case 31:
              return _context8.abrupt("return", util.setErrorResponse(res, "Contact support Error: Subscription renewal", 500));
            case 32:
            case "end":
              return _context8.stop();
          }
        }, _callee8);
      }));
      function updateTransactionsAndRegisterSales(_x24, _x25, _x26, _x27, _x28, _x29) {
        return _updateTransactionsAndRegisterSales.apply(this, arguments);
      }
      return updateTransactionsAndRegisterSales;
    }()
  }, {
    key: "chargeSpenn",
    value: function () {
      var _chargeSpenn = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(user, details, token) {
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return (0, _fetch["default"])({
                phone: user.phoneNumber,
                amount: details.price
              }, {
                Authorization: "Bearer ".concat(token),
                "Content-Type": "application/json"
              }, "".concat(process.env.PAY_HOST, "/charge/spenn"), "POST");
            case 2:
              return _context9.abrupt("return", _context9.sent);
            case 3:
            case "end":
              return _context9.stop();
          }
        }, _callee9);
      }));
      function chargeSpenn(_x30, _x31, _x32) {
        return _chargeSpenn.apply(this, arguments);
      }
      return chargeSpenn;
    }()
  }, {
    key: "checkSpenn",
    value: function () {
      var _checkSpenn = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(requestId, token) {
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return (0, _fetch["default"])(undefined, {
                Authorization: "Bearer ".concat(token),
                "Content-Type": "application/json"
              }, "".concat(process.env.PAY_HOST, "/charge/spenn-check?requestId=").concat(requestId), "GET");
            case 2:
              return _context10.abrupt("return", _context10.sent);
            case 3:
            case "end":
              return _context10.stop();
          }
        }, _callee10);
      }));
      function checkSpenn(_x33, _x34) {
        return _checkSpenn.apply(this, arguments);
      }
      return checkSpenn;
    }()
  }, {
    key: "recordTransaction",
    value: function () {
      var _recordTransaction = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(user, details, pay) {
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return _transactionService["default"].createTransaction({
                email: user.email,
                statusDesc: "pending",
                paidAmount: details.price,
                transactionId: pay.data.RequestId,
                currency: "RWF"
              });
            case 2:
            case "end":
              return _context11.stop();
          }
        }, _callee11);
      }));
      function recordTransaction(_x35, _x36, _x37) {
        return _recordTransaction.apply(this, arguments);
      }
      return recordTransaction;
    }()
  }, {
    key: "verifyPermissionLevel",
    value: function () {
      var _verifyPermissionLevel = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res, next) {
        var _jwt$jwtVerify, email, data;
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              _context12.prev = 0;
              _jwt$jwtVerify = _jwt["default"].jwtVerify(req.headers.authorization.slice(7), process.env.SECRET), email = _jwt$jwtVerify.email;
              _context12.next = 4;
              return _userServices["default"].getUserByMail(email);
            case 4:
              data = _context12.sent;
              if (!(data.permissionLevel === -1)) {
                _context12.next = 7;
                break;
              }
              return _context12.abrupt("return", util.setErrorResponse(res, "Please set up your billing", 402));
            case 7:
              next();
              _context12.next = 13;
              break;
            case 10:
              _context12.prev = 10;
              _context12.t0 = _context12["catch"](0);
              util.setErrorResponse(res, "an error occured  ".concat(_context12.t0), 500);
            case 13:
            case "end":
              return _context12.stop();
          }
        }, _callee12, null, [[0, 10]]);
      }));
      function verifyPermissionLevel(_x38, _x39, _x40) {
        return _verifyPermissionLevel.apply(this, arguments);
      }
      return verifyPermissionLevel;
    }()
  }, {
    key: "trial",
    value: function () {
      var _trial = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res, next) {
        var _jwt$jwtVerify2, email, data, today, subscription, viewingSessions, updates;
        return _regenerator["default"].wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              _context13.prev = 0;
              _jwt$jwtVerify2 = _jwt["default"].jwtVerify(req.headers.authorization.slice(7), process.env.SECRET), email = _jwt$jwtVerify2.email;
              _context13.next = 4;
              return _userServices["default"].getUserByMail(email);
            case 4:
              data = _context13.sent;
              if (!(data.isOnTrial === false && data.isOnExtension === false)) {
                _context13.next = 9;
                break;
              }
              next();
              _context13.next = 28;
              break;
            case 9:
              today = new Date();
              _context13.next = 12;
              return _billingServices["default"].getCurrentSubscription(email);
            case 12:
              subscription = _context13.sent;
              _context13.next = 15;
              return _viewingSessionsServices["default"].getActiveSessionsPerUser(email);
            case 15:
              viewingSessions = _context13.sent;
              if (!(subscription.trialEnds > today.getTime() && viewingSessions.length < 3)) {
                _context13.next = 20;
                break;
              }
              next();
              _context13.next = 28;
              break;
            case 20:
              _context13.next = 22;
              return _userServices["default"].updateUser(email, {
                permissionLevel: -1
              });
            case 22:
              updates = _context13.sent;
              if (!(updates[1] > 0)) {
                _context13.next = 27;
                break;
              }
              // await mailer([
              //   {
              //     body: "We would like you to know that your account has been put onhold. \n since your  trial just ended",
              //   },
              //   {
              //     from: "Cinetie support",
              //     to: email,
              //     subject: "Update payment details",
              //   },
              //   {
              //     path: `${path.join(
              //       __dirname,
              //       "../public/templates/notification.ejs"
              //     )}`,
              //   },
              // ]);
              util.setErrorResponse(res, "Please activate your account as your trial just ended", 402);
              _context13.next = 28;
              break;
            case 27:
              return _context13.abrupt("return", util.setErrorResponse(res, "Something went wrong ", 502));
            case 28:
              _context13.next = 33;
              break;
            case 30:
              _context13.prev = 30;
              _context13.t0 = _context13["catch"](0);
              util.setErrorResponse(res, "Something went wrong".concat(_context13.t0.message), 500);
            case 33:
            case "end":
              return _context13.stop();
          }
        }, _callee13, null, [[0, 30]]);
      }));
      function trial(_x41, _x42, _x43) {
        return _trial.apply(this, arguments);
      }
      return trial;
    }()
  }]);
  return billing;
}();
var _default = exports["default"] = billing;