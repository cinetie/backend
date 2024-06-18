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
              return _models["default"].paypalTransactions.create(data);
            case 3:
              newTrans = _context.sent;
              newTrans || null;
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
              return _models["default"].paypalTransactions.findOne({
                where: {
                  transactionId: id
                }
              });
            case 3:
              data = _context2.sent;
              data || null;
              _context2.next = 10;
              break;
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
    key: "getTransactionsByEmail",
    value: function () {
      var _getTransactionsByEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(email) {
        var data;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _models["default"].paypalTransactions.findAll({
                where: {
                  email: email
                }
              });
            case 3:
              data = _context3.sent;
              data || null;
              _context3.next = 10;
              break;
            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);
              throw _context3.t0;
            case 10:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 7]]);
      }));
      function getTransactionsByEmail(_x3) {
        return _getTransactionsByEmail.apply(this, arguments);
      }
      return getTransactionsByEmail;
    }()
  }, {
    key: "deleteTransaction",
    value: function () {
      var _deleteTransaction = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id) {
        var deleted;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _models["default"].paypalTransactions.destroy({
                where: {
                  transactionId: id
                }
              });
            case 3:
              deleted = _context4.sent;
              deleted || null;
              _context4.next = 10;
              break;
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
      function deleteTransaction(_x4) {
        return _deleteTransaction.apply(this, arguments);
      }
      return deleteTransaction;
    }()
  }, {
    key: "updateTransaction",
    value: function () {
      var _updateTransaction = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id, updates) {
        var data;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _models["default"].paypalTransactions.update(updates, {
                where: {
                  transactionId: id
                }
              });
            case 3:
              data = _context5.sent;
              data || null;
              _context5.next = 10;
              break;
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
      function updateTransaction(_x5, _x6) {
        return _updateTransaction.apply(this, arguments);
      }
      return updateTransaction;
    }()
  }]);
  return transactionService;
}();
var _default = exports["default"] = transactionService;