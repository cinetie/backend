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
var _models = _interopRequireDefault(require("../database/models"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var AmbassadorServices = /*#__PURE__*/function () {
  function AmbassadorServices() {
    (0, _classCallCheck2["default"])(this, AmbassadorServices);
  }
  (0, _createClass2["default"])(AmbassadorServices, [{
    key: "getAmbassadorBase",
    value: function () {
      var _getAmbassadorBase = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(where) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              console.log(where);
              _context.next = 3;
              return _models["default"].Ambassador.findAll({
                attributes: {
                  exclude: ["createdAt", "updatedAt"]
                },
                where: _objectSpread({}, where)
              });
            case 3:
              return _context.abrupt("return", _context.sent);
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function getAmbassadorBase(_x) {
        return _getAmbassadorBase.apply(this, arguments);
      }
      return getAmbassadorBase;
    }()
  }], [{
    key: "getAmbassadorByEmail",
    value: function () {
      var _getAmbassadorByEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(email) {
        var ambassadorService, ambassador;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              ambassadorService = new AmbassadorServices();
              _context2.next = 3;
              return ambassadorService.getAmbassadorBase({
                email: email
              });
            case 3:
              ambassador = _context2.sent;
              if (!(ambassador.length >= 0)) {
                _context2.next = 6;
                break;
              }
              return _context2.abrupt("return", ambassador);
            case 6:
              return _context2.abrupt("return", null);
            case 7:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function getAmbassadorByEmail(_x2) {
        return _getAmbassadorByEmail.apply(this, arguments);
      }
      return getAmbassadorByEmail;
    }()
  }, {
    key: "verifyAmbassador",
    value: function () {
      var _verifyAmbassador = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _models["default"].Ambassador.update({
                isVerified: true
              }, {
                returning: true,
                where: {
                  id: id
                }
              });
            case 2:
              return _context3.abrupt("return", _context3.sent);
            case 3:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function verifyAmbassador(_x3) {
        return _verifyAmbassador.apply(this, arguments);
      }
      return verifyAmbassador;
    }()
  }, {
    key: "createNewAmbassador",
    value: function () {
      var _createNewAmbassador = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(newAmbassador) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _models["default"].Ambassador.create(newAmbassador);
            case 2:
              return _context4.abrupt("return", _context4.sent);
            case 3:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      function createNewAmbassador(_x4) {
        return _createNewAmbassador.apply(this, arguments);
      }
      return createNewAmbassador;
    }()
  }, {
    key: "getAllAmbassadors",
    value: function () {
      var _getAllAmbassadors = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
        var ambassadorService, ambassador;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              ambassadorService = new AmbassadorServices();
              _context5.next = 3;
              return ambassadorService.getAmbassadorBase(undefined);
            case 3:
              ambassador = _context5.sent;
              if (!(ambassador.length >= 0)) {
                _context5.next = 6;
                break;
              }
              return _context5.abrupt("return", ambassador);
            case 6:
              return _context5.abrupt("return", null);
            case 7:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      function getAllAmbassadors() {
        return _getAllAmbassadors.apply(this, arguments);
      }
      return getAllAmbassadors;
    }()
  }, {
    key: "getAmbassadorById",
    value: function () {
      var _getAmbassadorById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(id) {
        var ambassadorService, ambassador;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              ambassadorService = new AmbassadorServices();
              _context6.next = 3;
              return ambassadorService.getAmbassadorBase({
                id: id
              });
            case 3:
              ambassador = _context6.sent;
              if (!(ambassador.length >= 0)) {
                _context6.next = 6;
                break;
              }
              return _context6.abrupt("return", ambassador);
            case 6:
              return _context6.abrupt("return", null);
            case 7:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }));
      function getAmbassadorById(_x5) {
        return _getAmbassadorById.apply(this, arguments);
      }
      return getAmbassadorById;
    }()
  }, {
    key: "getAmbassadorByPromoCode",
    value: function () {
      var _getAmbassadorByPromoCode = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(ambassadorId) {
        var ambassadorService, ambassador;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              ambassadorService = new AmbassadorServices();
              _context7.next = 3;
              return ambassadorService.getAmbassadorBase({
                ambassadorId: ambassadorId
              });
            case 3:
              ambassador = _context7.sent;
              if (!(ambassador.length >= 0)) {
                _context7.next = 6;
                break;
              }
              return _context7.abrupt("return", ambassador);
            case 6:
              return _context7.abrupt("return", null);
            case 7:
            case "end":
              return _context7.stop();
          }
        }, _callee7);
      }));
      function getAmbassadorByPromoCode(_x6) {
        return _getAmbassadorByPromoCode.apply(this, arguments);
      }
      return getAmbassadorByPromoCode;
    }()
  }]);
  return AmbassadorServices;
}();
var _default = exports["default"] = AmbassadorServices;