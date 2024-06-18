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
/* eslint-disable no-useless-catch */

var op = _sequelize["default"].Op;
var saleService = /*#__PURE__*/function () {
  function saleService() {
    (0, _classCallCheck2["default"])(this, saleService);
  }
  (0, _createClass2["default"])(saleService, null, [{
    key: "getSalesByModeOfPayment",
    value: function () {
      var _getSalesByModeOfPayment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(method) {
        var user;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _models["default"].sales.findOne({
                attributes: {
                  exclude: ["createdAt", "updatedAt", "id"]
                },
                where: {
                  method: method
                }
              });
            case 3:
              user = _context.sent;
              if (!user) {
                _context.next = 6;
                break;
              }
              return _context.abrupt("return", user);
            case 6:
              return _context.abrupt("return", null);
            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              throw _context.t0;
            case 12:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 9]]);
      }));
      function getSalesByModeOfPayment(_x) {
        return _getSalesByModeOfPayment.apply(this, arguments);
      }
      return getSalesByModeOfPayment;
    }()
  }, {
    key: "getSalesInTimeRange",
    value: function () {
      var _getSalesInTimeRange = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(start, end) {
        var data;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _models["default"].sales.findAll({
                attributes: {
                  exclude: ["createdAt", "updatedAt", "id"]
                },
                where: (0, _defineProperty2["default"])({}, op.and, [{
                  creationTime: (0, _defineProperty2["default"])({}, op.gte, start)
                }, {
                  creationTime: (0, _defineProperty2["default"])({}, op.lte, end)
                }])
              });
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
      function getSalesInTimeRange(_x2, _x3) {
        return _getSalesInTimeRange.apply(this, arguments);
      }
      return getSalesInTimeRange;
    }()
  }, {
    key: "getSalesById",
    value: function () {
      var _getSalesById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id) {
        var user;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _models["default"].sales.findOne({
                attributes: {
                  exclude: ["createdAt", "updatedAt"]
                },
                where: {
                  id: id
                }
              });
            case 3:
              user = _context3.sent;
              if (!user) {
                _context3.next = 6;
                break;
              }
              return _context3.abrupt("return", user);
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
      function getSalesById(_x4) {
        return _getSalesById.apply(this, arguments);
      }
      return getSalesById;
    }()
  }, {
    key: "createNewSales",
    value: function () {
      var _createNewSales = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(newSales) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _models["default"].sales.create(newSales);
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
      function createNewSales(_x5) {
        return _createNewSales.apply(this, arguments);
      }
      return createNewSales;
    }()
  }, {
    key: "getAllSaless",
    value: function () {
      var _getAllSaless = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
        var sales;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _models["default"].sales.findAll({
                attributes: {
                  exclude: ['createdAt', 'updatedAt']
                }
              });
            case 3:
              sales = _context5.sent;
              if (sales) {
                _context5.next = 6;
                break;
              }
              return _context5.abrupt("return", null);
            case 6:
              return _context5.abrupt("return", sales);
            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](0);
              throw _context5.t0;
            case 12:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 9]]);
      }));
      function getAllSaless() {
        return _getAllSaless.apply(this, arguments);
      }
      return getAllSaless;
    }()
  }]);
  return saleService;
}();
var _default = exports["default"] = saleService;