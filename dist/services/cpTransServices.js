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
var _If = _interopRequireDefault(require("../helpers/If"));
/* eslint-disable no-useless-catch */

var op = _sequelize["default"].Op;
// Services for  handling Content providers cash transactions like withdrawals and invoicing
var cpTransServices = /*#__PURE__*/function () {
  function cpTransServices() {
    (0, _classCallCheck2["default"])(this, cpTransServices);
  }
  (0, _createClass2["default"])(cpTransServices, null, [{
    key: "createTrans",
    value: function () {
      var _createTrans = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(newTrans) {
        var returnedData;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _models["default"].cpTransactions.create(newTrans);
            case 3:
              returnedData = _context.sent;
              _If["default"].checker(returnedData, null);
              _context.next = 10;
              break;
            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              throw _context.t0;
            case 10:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 7]]);
      }));
      function createTrans(_x) {
        return _createTrans.apply(this, arguments);
      }
      return createTrans;
    }()
  }, {
    key: "getAllTrans",
    value: function () {
      var _getAllTrans = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var data;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _models["default"].cpTransactions.findAll();
            case 3:
              data = _context2.sent;
              if (!data) {
                _context2.next = 6;
                break;
              }
              return _context2.abrupt("return", data);
            case 6:
              return _context2.abrupt("return", null);
            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);
              throw _context2.t0;
            case 12:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 9]]);
      }));
      function getAllTrans() {
        return _getAllTrans.apply(this, arguments);
      }
      return getAllTrans;
    }()
  }, {
    key: "getTransById",
    value: function () {
      var _getTransById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(clientId) {
        var data;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _models["default"].cpTransactions.findAll({
                where: {
                  clientId: clientId
                }
              });
            case 3:
              data = _context3.sent;
              if (!data) {
                _context3.next = 6;
                break;
              }
              return _context3.abrupt("return", data);
            case 6:
              return _context3.abrupt("return", null);
            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](0);
              throw _context3.t0;
            case 12:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 9]]);
      }));
      function getTransById(_x2) {
        return _getTransById.apply(this, arguments);
      }
      return getTransById;
    }()
  }, {
    key: "updateTrans",
    value: function () {
      var _updateTrans = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id, updates) {
        var data;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _models["default"].cpTransactions.update(updates, {
                where: (0, _defineProperty2["default"])({}, op.and, [{
                  id: id
                }, {
                  state: "Not Approved"
                }])
              });
            case 3:
              data = _context4.sent;
              if (!data) {
                _context4.next = 6;
                break;
              }
              return _context4.abrupt("return", data);
            case 6:
              return _context4.abrupt("return", null);
            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](0);
              throw _context4.t0;
            case 12:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 9]]);
      }));
      function updateTrans(_x3, _x4) {
        return _updateTrans.apply(this, arguments);
      }
      return updateTrans;
    }()
  }]);
  return cpTransServices;
}();
var _default = exports["default"] = cpTransServices;