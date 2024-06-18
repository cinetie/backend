"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
require("@babel/polyfill");
var _path = _interopRequireDefault(require("path"));
var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cors = _interopRequireDefault(require("cors"));
var _morgan = _interopRequireDefault(require("morgan"));
var _nodeCron = _interopRequireDefault(require("node-cron"));
var _dotenv = require("dotenv");
var _expressFileupload = _interopRequireDefault(require("express-fileupload"));
var _expressXmlBodyparser = _interopRequireDefault(require("express-xml-bodyparser"));
var _response = _interopRequireDefault(require("./helpers/response"));
var _stopLoginSessions = _interopRequireDefault(require("./helpers/stopLoginSessions"));
var _calculateEarning = _interopRequireDefault(require("./helpers/calculateEarning"));
var _routes = _interopRequireDefault(require("./routes"));
var _endSubscription = _interopRequireDefault(require("./helpers/endSubscription"));
var _subscriptionService = require("./services/subscriptionService");
var _planServices = _interopRequireDefault(require("./services/planServices"));
var _transactionService = _interopRequireDefault(require("./services/transactionService"));
var _userServices = _interopRequireDefault(require("./services/userServices"));
/* eslint-disable no-console */

(0, _dotenv.config)({
  path: "../.env.".concat(process.env.NODE_ENV)
});
_nodeCron["default"].schedule("0 0 0 * * *", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.next = 2;
        return (0, _stopLoginSessions["default"])();
      case 2:
      case "end":
        return _context.stop();
    }
  }, _callee);
})));
_nodeCron["default"].schedule("0 0 * * *", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
  return _regenerator["default"].wrap(function _callee2$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        _context2.prev = 0;
        _context2.next = 3;
        return (0, _calculateEarning["default"])();
      case 3:
        _context2.next = 9;
        break;
      case 5:
        _context2.prev = 5;
        _context2.t0 = _context2["catch"](0);
        console.error(_context2.t0);
        console.log("An error occured while calculating earnings");
      case 9:
      case "end":
        return _context2.stop();
    }
  }, _callee2, null, [[0, 5]]);
})), {
  scheduled: true,
  timezone: "Africa/Cairo"
});
_nodeCron["default"].schedule("0 0 * * *", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
  return _regenerator["default"].wrap(function _callee3$(_context3) {
    while (1) switch (_context3.prev = _context3.next) {
      case 0:
        _context3.prev = 0;
        _context3.next = 3;
        return (0, _endSubscription["default"])();
      case 3:
        _context3.next = 9;
        break;
      case 5:
        _context3.prev = 5;
        _context3.t0 = _context3["catch"](0);
        console.error(_context3.t0);
        console.log("An error occured while ending subscriptions");
      case 9:
      case "end":
        return _context3.stop();
    }
  }, _callee3, null, [[0, 5]]);
})), {
  scheduled: true,
  timezone: "Africa/Cairo"
});
_nodeCron["default"].schedule("*/2 * * * *", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
  var subs;
  return _regenerator["default"].wrap(function _callee5$(_context5) {
    while (1) switch (_context5.prev = _context5.next) {
      case 0:
        console.log("cron started");
        _context5.prev = 1;
        _context5.next = 4;
        return (0, _subscriptionService.getExpiredSubscriptions)();
      case 4:
        subs = _context5.sent;
        subs.forEach( /*#__PURE__*/function () {
          var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(subscription) {
            var latestTransaction, plan, user;
            return _regenerator["default"].wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return _transactionService["default"].getRecentTransactionsByEmail(subscription.email, "pending");
                case 2:
                  latestTransaction = _context4.sent;
                  if (!latestTransaction) {
                    _context4.next = 6;
                    break;
                  }
                  console.log("already have a pending transaction");
                  return _context4.abrupt("return");
                case 6:
                  _context4.next = 8;
                  return _planServices["default"].getParticalPlan(subscription.plan);
                case 8:
                  plan = _context4.sent;
                  _context4.next = 11;
                  return _userServices["default"].getUser(subscription.email);
                case 11:
                  user = _context4.sent;
                  if (!(user != null)) {
                    _context4.next = 15;
                    break;
                  }
                  _context4.next = 15;
                  return _transactionService["default"].createTransaction({
                    currency: "USD",
                    paidAmount: user.isBilledAnnually ? plan.yearlyPrice : plan.monthlyPrice,
                    email: user.email,
                    statusDesc: "pending"
                  });
                case 15:
                case "end":
                  return _context4.stop();
              }
            }, _callee4);
          }));
          return function (_x) {
            return _ref5.apply(this, arguments);
          };
        }());
        _context5.next = 12;
        break;
      case 8:
        _context5.prev = 8;
        _context5.t0 = _context5["catch"](1);
        console.error(_context5.t0);
        console.error("An error occured while creating user transactions");
      case 12:
      case "end":
        return _context5.stop();
    }
  }, _callee5, null, [[1, 8]]);
})));
var app = (0, _express["default"])();
app.enable("trust proxy");
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_bodyParser["default"].json());
app.use((0, _expressXmlBodyparser["default"])());
app.use((0, _expressFileupload["default"])({
  useTempFiles: true,
  tempFileDir: "/tmp/",
  limits: {
    fileSize: 5000 * 1024 * 1024
  }
}));
app.use((0, _morgan["default"])("dev"));
app.get("/", function (req, res) {
  return _response["default"].successResponse(res, 200, "Welcome to Cinetie");
});
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, OPTIONS, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use("/", _routes["default"]);
app.use(function (req, res) {
  return _response["default"].errorResponse(res, 404, "Not found", "Undefined URL");
});
app.set("views", _path["default"].join(__dirname, "/public/templates"));
app.set("view engine", "ejs");
var PORT = process.env.PORT || 3001;
if (!module.parent) {
  app.listen(PORT, function () {
    return console.log("Up and running on port ".concat(PORT, " ").concat(process.env.HOST));
  });
}
module.exports = app;