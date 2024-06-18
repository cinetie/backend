"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _billingServices = _interopRequireDefault(require("../services/billingServices"));
var _userServices = _interopRequireDefault(require("../services/userServices"));
var _planServices = _interopRequireDefault(require("../services/planServices"));
var _jwt = _interopRequireDefault(require("../helpers/jwt"));
var _utilities = _interopRequireDefault(require("../helpers/utilities"));
var util = new _utilities["default"]();
var updateSubscription = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var plan, _jwt$jwtVerify, email, user, subscription, planChosen;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          plan = req.body.plan;
          _jwt$jwtVerify = _jwt["default"].jwtVerify(req.headers.authorization.slice(7), process.env.SECRET), email = _jwt$jwtVerify.email;
          _context.next = 5;
          return _userServices["default"].getUserByMail(email);
        case 5:
          user = _context.sent;
          _context.next = 8;
          return _billingServices["default"].getSubscription(email);
        case 8:
          subscription = _context.sent;
          _context.next = 11;
          return _planServices["default"].getParticalPlan(plan);
        case 11:
          planChosen = _context.sent;
          if (planChosen) {
            _context.next = 14;
            break;
          }
          return _context.abrupt("return", util.setErrorResponse(res, "Plan not found. please input a valid plan before continuing. ex: Premium or Standard", 404));
        case 14:
          if (subscription) {
            _context.next = 16;
            break;
          }
          return _context.abrupt("return", util.setErrorResponse(res, "Subscription not found. Please make sure you already have subscription before changing the subscription", 404));
        case 16:
          _context.next = 18;
          return _userServices["default"].updateUser(user.email, {
            plan: planChosen.type,
            permissionLevel: -1
          });
        case 18:
          _context.next = 20;
          return _billingServices["default"].updateSubscription(user.email, {
            plan: planChosen.type,
            endDate: null,
            state: 'pending'
          });
        case 20:
          return _context.abrupt("return", next());
        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", util.setErrorResponse(res, "Something went sideways totally sideways contact support ".concat(_context.t0), 500));
        case 27:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 23]]);
  }));
  return function updateSubscription(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var _default = exports["default"] = updateSubscription;