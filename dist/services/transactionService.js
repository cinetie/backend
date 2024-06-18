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
var transactionService = /*#__PURE__*/function () {
  function transactionService() {
    (0, _classCallCheck2["default"])(this, transactionService);
  }
  (0, _createClass2["default"])(transactionService, null, [{
    key: "createTransaction",
    value: function () {
      var _createTransaction = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
        var newTrans;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _models["default"].transactions.create(data);
            case 3:
              newTrans = _context.sent;
              return _context.abrupt("return", newTrans);
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
      function createTransaction(_x) {
        return _createTransaction.apply(this, arguments);
      }
      return createTransaction;
    }()
  }, {
    key: "getTransactionById",
    value: function () {
      var _getTransactionById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
        var data;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _models["default"].transactions.findOne({
                where: {
                  transactionId: id
                }
              });
            case 3:
              data = _context2.sent;
              return _context2.abrupt("return", data);
            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              throw _context2.t0;
            case 10:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 7]]);
      }));
      function getTransactionById(_x2) {
        return _getTransactionById.apply(this, arguments);
      }
      return getTransactionById;
    }()
  }, {
    key: "getByNumberId",
    value: function () {
      var _getByNumberId = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(number) {
        var data;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _models["default"].transactions.findOne({
                where: {
                  transactionId: (0, _defineProperty2["default"])({}, op.like, "%".concat(number, "%"))
                }
              });
            case 2:
              data = _context3.sent;
              return _context3.abrupt("return", data);
            case 4:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function getByNumberId(_x3) {
        return _getByNumberId.apply(this, arguments);
      }
      return getByNumberId;
    }()
  }, {
    key: "getTransactionsByEmail",
    value: function () {
      var _getTransactionsByEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(email, statusDesc) {
        var data;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _models["default"].transactions.findAll({
                where: (0, _defineProperty2["default"])({}, op.and, [{
                  email: email
                }, {
                  statusDesc: statusDesc
                }])
              });
            case 3:
              data = _context4.sent;
              return _context4.abrupt("return", data);
            case 7:
              _context4.prev = 7;
              _context4.t0 = _context4["catch"](0);
              throw _context4.t0;
            case 10:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 7]]);
      }));
      function getTransactionsByEmail(_x4, _x5) {
        return _getTransactionsByEmail.apply(this, arguments);
      }
      return getTransactionsByEmail;
    }()
  }, {
    key: "getRecentTransactionsByEmail",
    value: function () {
      var _getRecentTransactionsByEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(email, statusDesc) {
        var data;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _models["default"].transactions.findOne({
                where: (0, _defineProperty2["default"])({}, op.and, [{
                  email: email
                }, {
                  statusDesc: statusDesc
                }]),
                order: [["createdAt", "DESC"]]
              });
            case 3:
              data = _context5.sent;
              return _context5.abrupt("return", data);
            case 7:
              _context5.prev = 7;
              _context5.t0 = _context5["catch"](0);
              throw _context5.t0;
            case 10:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 7]]);
      }));
      function getRecentTransactionsByEmail(_x6, _x7) {
        return _getRecentTransactionsByEmail.apply(this, arguments);
      }
      return getRecentTransactionsByEmail;
    }()
  }, {
    key: "deleteTransaction",
    value: function () {
      var _deleteTransaction = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(id) {
        var deleted;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return _models["default"].transactions.destroy({
                where: {
                  transactionId: id
                }
              });
            case 3:
              deleted = _context6.sent;
              return _context6.abrupt("return", deleted);
            case 7:
              _context6.prev = 7;
              _context6.t0 = _context6["catch"](0);
              throw _context6.t0;
            case 10:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[0, 7]]);
      }));
      function deleteTransaction(_x8) {
        return _deleteTransaction.apply(this, arguments);
      }
      return deleteTransaction;
    }()
  }, {
    key: "updateTransaction",
    value: function () {
      var _updateTransaction = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(id, updates) {
        var data;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return _models["default"].transactions.update(updates, {
                where: {
                  transactionId: id
                }
              });
            case 3:
              data = _context7.sent;
              return _context7.abrupt("return", data);
            case 7:
              _context7.prev = 7;
              _context7.t0 = _context7["catch"](0);
              throw _context7.t0;
            case 10:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[0, 7]]);
      }));
      function updateTransaction(_x9, _x10) {
        return _updateTransaction.apply(this, arguments);
      }
      return updateTransaction;
    }()
  }]);
  return transactionService;
}();
var _default = exports["default"] = transactionService;