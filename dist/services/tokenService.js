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
var _sequelize = _interopRequireDefault(require("sequelize"));
var _models = _interopRequireDefault(require("../database/models"));
var op = _sequelize["default"].Op;
var tokenService = /*#__PURE__*/function () {
  function tokenService() {
    (0, _classCallCheck2["default"])(this, tokenService);
  }
  (0, _createClass2["default"])(tokenService, null, [{
    key: "createNewToken",
    value: function () {
      var _createNewToken = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(token, search) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _models["default"].token.create(token);
            case 3:
              return _context.abrupt("return", _context.sent);
            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](0);
              throw _context.t0;
            case 9:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 6]]);
      }));
      function createNewToken(_x, _x2) {
        return _createNewToken.apply(this, arguments);
      }
      return createNewToken;
    }()
  }, {
    key: "getTokenByMail",
    value: function () {
      var _getTokenByMail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(email) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _models["default"].token.findOne({
                attributes: {
                  exclude: ["createdAt", "updatedAt", "lastName"]
                },
                where: {
                  email: email
                }
              });
            case 3:
              return _context2.abrupt("return", _context2.sent);
            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2["catch"](0);
              throw _context2.t0;
            case 9:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 6]]);
      }));
      function getTokenByMail(_x3) {
        return _getTokenByMail.apply(this, arguments);
      }
      return getTokenByMail;
    }()
  }, {
    key: "getToken",
    value: function () {
      var _getToken = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(token) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _models["default"].token.findOne({
                attributes: {
                  exclude: ["createdAt", "updatedAt", "lastName"]
                },
                where: (0, _defineProperty2["default"])({}, op.and, [{
                  token: token
                }, {
                  desc: "PayPal-Active"
                }])
              });
            case 3:
              return _context3.abrupt("return", _context3.sent);
            case 6:
              _context3.prev = 6;
              _context3.t0 = _context3["catch"](0);
              throw _context3.t0;
            case 9:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 6]]);
      }));
      function getToken(_x4) {
        return _getToken.apply(this, arguments);
      }
      return getToken;
    }()
  }, {
    key: "destroyToken",
    value: function () {
      var _destroyToken = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(token) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _models["default"].token.destroy({
                where: {
                  token: token
                }
              });
            case 3:
              return _context4.abrupt("return", _context4.sent);
            case 6:
              _context4.prev = 6;
              _context4.t0 = _context4["catch"](0);
              throw _context4.t0;
            case 9:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 6]]);
      }));
      function destroyToken(_x5) {
        return _destroyToken.apply(this, arguments);
      }
      return destroyToken;
    }()
  }]);
  return tokenService;
}();
var _default = exports["default"] = tokenService;