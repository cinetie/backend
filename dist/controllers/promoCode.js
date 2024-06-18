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
var _promoCodeServices = _interopRequireDefault(require("../services/promoCodeServices"));
var util = new _utilities["default"]();
var PromoCodeController = /*#__PURE__*/function () {
  function PromoCodeController() {
    (0, _classCallCheck2["default"])(this, PromoCodeController);
  }
  (0, _createClass2["default"])(PromoCodeController, null, [{
    key: "getAllPromoCodeUtilizations",
    value: function () {
      var _getAllPromoCodeUtilizations = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var ambassadors;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _promoCodeServices["default"].getAllPromoCodeUtizations();
            case 3:
              ambassadors = _context.sent;
              if (!(ambassadors.length === 0)) {
                _context.next = 6;
                break;
              }
              return _context.abrupt("return", util.setErrorResponse(res, "No promo code utilization found yet", 404));
            case 6:
              return _context.abrupt("return", util.setSuccessResponse(res, "all promo code utilization  fetched successfully!", 200, ambassadors));
            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", util.setErrorResponse(res, "Something Went wrong, error: ".concat(_context.t0), 500));
            case 12:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 9]]);
      }));
      function getAllPromoCodeUtilizations(_x, _x2) {
        return _getAllPromoCodeUtilizations.apply(this, arguments);
      }
      return getAllPromoCodeUtilizations;
    }()
  }, {
    key: "getAmbassadorPromoCodeUtilizations",
    value: function () {
      var _getAmbassadorPromoCodeUtilizations = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var email, promoCodeUtilization;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              email = req.ambassador[0].email;
              console.log(req.ambassador);
              _context2.next = 5;
              return _promoCodeServices["default"].getAllPromoCodeUtizationsByAmbassador(email);
            case 5:
              promoCodeUtilization = _context2.sent;
              if (!(promoCodeUtilization.length === 0)) {
                _context2.next = 8;
                break;
              }
              return _context2.abrupt("return", util.setErrorResponse(res, "No promo code utilization found yet", 404));
            case 8:
              return _context2.abrupt("return", util.setSuccessResponse(res, "all promo code utilization  fetched successfully!", 200, promoCodeUtilization));
            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);
              return _context2.abrupt("return", util.setErrorResponse(res, "Something Went wrong, error: ".concat(_context2.t0), 500));
            case 15:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 11]]);
      }));
      function getAmbassadorPromoCodeUtilizations(_x3, _x4) {
        return _getAmbassadorPromoCodeUtilizations.apply(this, arguments);
      }
      return getAmbassadorPromoCodeUtilizations;
    }()
  }]);
  return PromoCodeController;
}();
var _default = exports["default"] = PromoCodeController;