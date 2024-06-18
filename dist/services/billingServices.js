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
// services for implementing the billing service
var billingServices = /*#__PURE__*/function () {
  function billingServices() {
    (0, _classCallCheck2["default"])(this, billingServices);
  }
  (0, _createClass2["default"])(billingServices, null, [{
    key: "registerSubscription",
    value: function () {
      var _registerSubscription = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(newSubscription) {
        var added;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _models["default"].subscriptions.create(newSubscription);
            case 3:
              added = _context.sent;
              if (!added) {
                _context.next = 6;
                break;
              }
              return _context.abrupt("return", added);
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
      function registerSubscription(_x) {
        return _registerSubscription.apply(this, arguments);
      }
      return registerSubscription;
    }()
  }, {
    key: "getEndingSubscription",
    value: function () {
      var _getEndingSubscription = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(email) {
        var date, currentSubs;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              date = new Date();
              _context2.next = 4;
              return _models["default"].subscriptions.findOne({
                where: (0, _defineProperty2["default"])({}, op.and, [{
                  email: email
                }, {
                  state: "current"
                }, {
                  endDate: date.toDateString().toString()
                }])
              });
            case 4:
              currentSubs = _context2.sent;
              if (!currentSubs) {
                _context2.next = 7;
                break;
              }
              return _context2.abrupt("return", currentSubs);
            case 7:
              return _context2.abrupt("return", null);
            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](0);
              throw _context2.t0;
            case 13:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 10]]);
      }));
      function getEndingSubscription(_x2) {
        return _getEndingSubscription.apply(this, arguments);
      }
      return getEndingSubscription;
    }()
  }, {
    key: "getCurrentSubscription",
    value: function () {
      var _getCurrentSubscription = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(email, state) {
        var currentSubs;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _models["default"].subscriptions.findOne({
                where: (0, _defineProperty2["default"])({}, op.and, [{
                  email: email
                }, {
                  state: state || "current"
                }])
              });
            case 3:
              currentSubs = _context3.sent;
              if (!currentSubs) {
                _context3.next = 6;
                break;
              }
              return _context3.abrupt("return", currentSubs);
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
      function getCurrentSubscription(_x3, _x4) {
        return _getCurrentSubscription.apply(this, arguments);
      }
      return getCurrentSubscription;
    }()
  }, {
    key: "getPendingSubscription",
    value: function () {
      var _getPendingSubscription = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(email) {
        var currentSubs;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _models["default"].subscriptions.findOne({
                where: (0, _defineProperty2["default"])({}, op.and, [{
                  email: email
                }, {
                  state: "pending"
                }])
              });
            case 3:
              currentSubs = _context4.sent;
              if (!currentSubs) {
                _context4.next = 6;
                break;
              }
              return _context4.abrupt("return", currentSubs);
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
      function getPendingSubscription(_x5) {
        return _getPendingSubscription.apply(this, arguments);
      }
      return getPendingSubscription;
    }()
  }, {
    key: "getSubscription",
    value: function () {
      var _getSubscription = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(email) {
        var currentSubs;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _models["default"].subscriptions.findOne({
                where: (0, _defineProperty2["default"])({}, op.and, [{
                  email: email
                }])
              });
            case 3:
              currentSubs = _context5.sent;
              if (!currentSubs) {
                _context5.next = 6;
                break;
              }
              return _context5.abrupt("return", currentSubs);
            case 6:
              return _context5.abrupt("return", null);
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
      function getSubscription(_x6) {
        return _getSubscription.apply(this, arguments);
      }
      return getSubscription;
    }()
  }, {
    key: "getMonthlySubscribers",
    value: function () {
      var _getMonthlySubscribers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(start, end) {
        var data;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return _models["default"].subscriptions.findAll({
                where: (0, _defineProperty2["default"])({}, op.and, [{
                  start: (0, _defineProperty2["default"])({}, op.gte, start)
                }, {
                  start: (0, _defineProperty2["default"])({}, op.lte, end)
                }])
              });
            case 3:
              data = _context6.sent;
              if (!data) {
                _context6.next = 6;
                break;
              }
              return _context6.abrupt("return", data);
            case 6:
              return _context6.abrupt("return", null);
            case 9:
              _context6.prev = 9;
              _context6.t0 = _context6["catch"](0);
              throw _context6.t0;
            case 12:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[0, 9]]);
      }));
      function getMonthlySubscribers(_x7, _x8) {
        return _getMonthlySubscribers.apply(this, arguments);
      }
      return getMonthlySubscribers;
    }()
  }, {
    key: "updateSubscription",
    value: function () {
      var _updateSubscription = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(email, updated) {
        var status;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return _models["default"].subscriptions.update(updated, {
                returning: true,
                where: {
                  email: email
                }
              });
            case 3:
              status = _context7.sent;
              if (!status) {
                _context7.next = 6;
                break;
              }
              return _context7.abrupt("return", status);
            case 6:
              return _context7.abrupt("return", null);
            case 9:
              _context7.prev = 9;
              _context7.t0 = _context7["catch"](0);
              throw _context7.t0;
            case 12:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[0, 9]]);
      }));
      function updateSubscription(_x9, _x10) {
        return _updateSubscription.apply(this, arguments);
      }
      return updateSubscription;
    }()
  }, {
    key: "setSubscriptionToSettled",
    value: function () {
      var _setSubscriptionToSettled = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(email, updated) {
        var status;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _context8.next = 3;
              return _models["default"].subscriptions.update(updated, {
                where: (0, _defineProperty2["default"])({}, op.and, [{
                  email: email
                }, {
                  state: "current"
                }])
              });
            case 3:
              status = _context8.sent;
              if (!status) {
                _context8.next = 6;
                break;
              }
              return _context8.abrupt("return", status);
            case 6:
              return _context8.abrupt("return", null);
            case 9:
              _context8.prev = 9;
              _context8.t0 = _context8["catch"](0);
              throw _context8.t0;
            case 12:
            case "end":
              return _context8.stop();
          }
        }, _callee8, null, [[0, 9]]);
      }));
      function setSubscriptionToSettled(_x11, _x12) {
        return _setSubscriptionToSettled.apply(this, arguments);
      }
      return setSubscriptionToSettled;
    }() // get subscription given an email
  }, {
    key: "getSubscriptionByEmail",
    value: function () {
      var _getSubscriptionByEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(email) {
        var data;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              if (!email) {
                _context9.next = 8;
                break;
              }
              _context9.next = 4;
              return _models["default"].subscriptions.findOne({
                where: {
                  email: email
                }
              });
            case 4:
              data = _context9.sent;
              if (!data) {
                _context9.next = 7;
                break;
              }
              return _context9.abrupt("return", data);
            case 7:
              return _context9.abrupt("return", null);
            case 8:
              return _context9.abrupt("return", {
                status: 400,
                message: "Parameter email is not provided"
              });
            case 11:
              _context9.prev = 11;
              _context9.t0 = _context9["catch"](0);
              throw _context9.t0;
            case 14:
            case "end":
              return _context9.stop();
          }
        }, _callee9, null, [[0, 11]]);
      }));
      function getSubscriptionByEmail(_x13) {
        return _getSubscriptionByEmail.apply(this, arguments);
      }
      return getSubscriptionByEmail;
    }()
  }, {
    key: "deleteSubscription",
    value: function () {
      var _deleteSubscription = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(email) {
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              _context10.next = 3;
              return _models["default"].subscriptions.destroy({
                returning: true,
                where: {
                  email: email
                }
              });
            case 3:
              return _context10.abrupt("return", _context10.sent);
            case 6:
              _context10.prev = 6;
              _context10.t0 = _context10["catch"](0);
              throw _context10.t0;
            case 9:
            case "end":
              return _context10.stop();
          }
        }, _callee10, null, [[0, 6]]);
      }));
      function deleteSubscription(_x14) {
        return _deleteSubscription.apply(this, arguments);
      }
      return deleteSubscription;
    }()
  }]);
  return billingServices;
}();
var _default = exports["default"] = billingServices;