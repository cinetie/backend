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
var _models = _interopRequireDefault(require("../database/models"));
var PromoCodeServices = /*#__PURE__*/function () {
  function PromoCodeServices() {
    (0, _classCallCheck2["default"])(this, PromoCodeServices);
  }
  (0, _createClass2["default"])(PromoCodeServices, null, [{
    key: "addNewPromoUsage",
    value: function () {
      var _addNewPromoUsage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userEmail, ambassadorEmail, plan) {
        var newPromoCodeUsage;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _models["default"].PromoCodeUtilization.create({
                userEmail: userEmail,
                ambassadorEmail: ambassadorEmail,
                plan: plan,
                status: "pending"
              });
            case 2:
              newPromoCodeUsage = _context.sent;
              return _context.abrupt("return", newPromoCodeUsage);
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function addNewPromoUsage(_x, _x2, _x3) {
        return _addNewPromoUsage.apply(this, arguments);
      }
      return addNewPromoUsage;
    }()
  }, {
    key: "getPromoCodeUtizationByEmail",
    value: function () {
      var _getPromoCodeUtizationByEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(userEmail, ambassadorEmail) {
        var promoCodeUtilization;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _models["default"].PromoCodeUtilization.findOne({
                where: {
                  userEmail: userEmail,
                  ambassadorEmail: ambassadorEmail
                }
              });
            case 2:
              promoCodeUtilization = _context2.sent;
              return _context2.abrupt("return", promoCodeUtilization);
            case 4:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function getPromoCodeUtizationByEmail(_x4, _x5) {
        return _getPromoCodeUtizationByEmail.apply(this, arguments);
      }
      return getPromoCodeUtizationByEmail;
    }()
  }, {
    key: "getAllPromoCodeUtizations",
    value: function () {
      var _getAllPromoCodeUtizations = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var promoCodeUtilizations;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _models["default"].PromoCodeUtilization.findAll();
            case 2:
              promoCodeUtilizations = _context3.sent;
              return _context3.abrupt("return", promoCodeUtilizations);
            case 4:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function getAllPromoCodeUtizations() {
        return _getAllPromoCodeUtizations.apply(this, arguments);
      }
      return getAllPromoCodeUtizations;
    }()
  }, {
    key: "getAllPromoCodeUtizationsByAmbassador",
    value: function () {
      var _getAllPromoCodeUtizationsByAmbassador = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(ambassadorEmail) {
        var promoCodeUtilizations;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _models["default"].PromoCodeUtilization.findAll({
                where: {
                  ambassadorEmail: ambassadorEmail
                }
              });
            case 2:
              promoCodeUtilizations = _context4.sent;
              return _context4.abrupt("return", promoCodeUtilizations);
            case 4:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      function getAllPromoCodeUtizationsByAmbassador(_x6) {
        return _getAllPromoCodeUtizationsByAmbassador.apply(this, arguments);
      }
      return getAllPromoCodeUtizationsByAmbassador;
    }()
  }, {
    key: "updatePromoCodeUtizationByEmail",
    value: function () {
      var _updatePromoCodeUtizationByEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(userEmail, ambassadorEmail, updates) {
        var promoCodeUtilization;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _models["default"].PromoCodeUtilization.findOne({
                where: {
                  userEmail: userEmail,
                  ambassadorEmail: ambassadorEmail
                }
              });
            case 2:
              promoCodeUtilization = _context5.sent;
              if (!promoCodeUtilization) {
                _context5.next = 6;
                break;
              }
              _context5.next = 6;
              return promoCodeUtilization.update(updates);
            case 6:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      function updatePromoCodeUtizationByEmail(_x7, _x8, _x9) {
        return _updatePromoCodeUtizationByEmail.apply(this, arguments);
      }
      return updatePromoCodeUtizationByEmail;
    }()
  }]);
  return PromoCodeServices;
}();
var _default = exports["default"] = PromoCodeServices;