"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _fetch = _interopRequireDefault(require("./fetch"));
var _utilities = _interopRequireDefault(require("./utilities"));
var _payment = _interopRequireDefault(require("./payment"));
var _userServices = _interopRequireDefault(require("../services/userServices"));
var _ambassadorServices = _interopRequireDefault(require("../services/ambassadorServices"));
var _promoCodeServices = _interopRequireDefault(require("../services/promoCodeServices"));
var util = new _utilities["default"]();
var _default = exports["default"] = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, requestData, token, paymentType, email, currentSubscription, user) {
    var data, updates, ambassador;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _fetch["default"])(requestData, {
            Authorization: "Bearer ".concat(token),
            "Content-Type": "application/json"
          }, "".concat(process.env.PAY_HOST, "/charge/all?type=").concat(paymentType), "POST");
        case 2:
          data = _context.sent;
          if (!(data.status === 200)) {
            _context.next = 22;
            break;
          }
          _context.next = 6;
          return _userServices["default"].updateUser(email, {
            isOnTrial: false
          });
        case 6:
          updates = _context.sent;
          if (!(updates[1] > 0)) {
            _context.next = 19;
            break;
          }
          _context.next = 10;
          return _payment["default"].recordTransaction(user.email, currentSubscription.price, requestData.txRef, "pending");
        case 10:
          if (!user.isOnPromo) {
            _context.next = 16;
            break;
          }
          _context.next = 13;
          return _ambassadorServices["default"].getAmbassadorByPromoCode(user.promoCode);
        case 13:
          ambassador = _context.sent;
          _context.next = 16;
          return _promoCodeServices["default"].updatePromoCodeUtizationByEmail(user.email, ambassador[0].email, {
            plan: user.plan
          });
        case 16:
          util.setSuccessResponse(res, paymentType === "mpesa" ? "Pending subscription  activation with mpesa" : "Pending subscription  activation with MoMo", 201, data);
          _context.next = 20;
          break;
        case 19:
          util.setErrorResponse(res, "Something went sideways creating a subscription", 400);
        case 20:
          _context.next = 23;
          break;
        case 22:
          util.setErrorResponse(res, "Sorry payment failed", 500);
        case 23:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8) {
    return _ref.apply(this, arguments);
  };
}();