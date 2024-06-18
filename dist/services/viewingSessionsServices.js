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
var viewingSessionservices = /*#__PURE__*/function () {
  function viewingSessionservices() {
    (0, _classCallCheck2["default"])(this, viewingSessionservices);
  }
  (0, _createClass2["default"])(viewingSessionservices, null, [{
    key: "registerViewingSessions",
    value: function () {
      var _registerViewingSessions = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(newViewingSessions) {
        var added;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _models["default"].viewingSessions.create(newViewingSessions);
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
      function registerViewingSessions(_x) {
        return _registerViewingSessions.apply(this, arguments);
      }
      return registerViewingSessions;
    }()
  }, {
    key: "getActiveSessionsPerVideo",
    value: function () {
      var _getActiveSessionsPerVideo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(videoId) {
        var sessions;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _models["default"].viewingSessions.findAll({
                attributes: {
                  include: [[_sequelize["default"].fn("count", _sequelize["default"].col("videoId")), "userCount"]]
                },
                where: (0, _defineProperty2["default"])({}, op.and, [{
                  videoId: videoId
                }, {
                  sessionState: "Active"
                }])
              });
            case 3:
              sessions = _context2.sent;
              if (!sessions) {
                _context2.next = 6;
                break;
              }
              return _context2.abrupt("return", sessions);
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
      function getActiveSessionsPerVideo(_x2) {
        return _getActiveSessionsPerVideo.apply(this, arguments);
      }
      return getActiveSessionsPerVideo;
    }() // will provide all videos the user has watched in a month/subscription period
  }, {
    key: "getActiveSessionsPerUser",
    value: function () {
      var _getActiveSessionsPerUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(userId) {
        var sessions;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _models["default"].viewingSessions.findAll({
                where: (0, _defineProperty2["default"])({}, op.and, [{
                  userId: userId
                }, {
                  sessionState: "Active"
                }])
              });
            case 3:
              sessions = _context3.sent;
              if (!sessions) {
                _context3.next = 6;
                break;
              }
              return _context3.abrupt("return", sessions);
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
      function getActiveSessionsPerUser(_x3) {
        return _getActiveSessionsPerUser.apply(this, arguments);
      }
      return getActiveSessionsPerUser;
    }() // active and suspended streams represent all streams recorded in both the duration
    // of the subscription and the extension when the automatic payment failed
  }, {
    key: "getActiveAndSuspendedSessionsPerUser",
    value: function () {
      var _getActiveAndSuspendedSessionsPerUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(userId) {
        var sessions;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _models["default"].viewingSessions.findAll({
                where: (0, _defineProperty2["default"])({}, op.and, [{
                  userId: userId
                }, {
                  sessionState: (0, _defineProperty2["default"])({}, op.not, "inActive")
                }])
              });
            case 3:
              sessions = _context4.sent;
              if (!sessions) {
                _context4.next = 6;
                break;
              }
              return _context4.abrupt("return", sessions);
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
      function getActiveAndSuspendedSessionsPerUser(_x4) {
        return _getActiveAndSuspendedSessionsPerUser.apply(this, arguments);
      }
      return getActiveAndSuspendedSessionsPerUser;
    }()
  }, {
    key: "getSessionsPerVideo",
    value: function () {
      var _getSessionsPerVideo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(videoId) {
        var sessions;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _models["default"].viewingSessions.findAll({
                where: {
                  videoId: videoId
                }
              });
            case 3:
              sessions = _context5.sent;
              if (!sessions) {
                _context5.next = 6;
                break;
              }
              return _context5.abrupt("return", sessions);
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
      function getSessionsPerVideo(_x5) {
        return _getSessionsPerVideo.apply(this, arguments);
      }
      return getSessionsPerVideo;
    }()
  }, {
    key: "getSesssionPerVideoUser",
    value: function () {
      var _getSesssionPerVideoUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(userId, videoId) {
        var sessions;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return _models["default"].viewingSessions.findAll({
                where: (0, _defineProperty2["default"])({}, op.and, [{
                  userId: userId
                }, {
                  videoId: videoId
                }])
              });
            case 3:
              sessions = _context6.sent;
              if (!sessions) {
                _context6.next = 6;
                break;
              }
              return _context6.abrupt("return", sessions);
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
      function getSesssionPerVideoUser(_x6, _x7) {
        return _getSesssionPerVideoUser.apply(this, arguments);
      }
      return getSesssionPerVideoUser;
    }()
  }, {
    key: "getSessionsPerUser",
    value: function () {
      var _getSessionsPerUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(userId) {
        var sessions;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return _models["default"].viewingSessions.findAll({
                attributes: {
                  attributes: [[_sequelize["default"].fn("count", _sequelize["default"].col("userId")), "watchCount"]]
                },
                where: {
                  userId: userId
                }
              });
            case 3:
              sessions = _context7.sent;
              if (!sessions) {
                _context7.next = 6;
                break;
              }
              return _context7.abrupt("return", sessions);
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
      function getSessionsPerUser(_x8) {
        return _getSessionsPerUser.apply(this, arguments);
      }
      return getSessionsPerUser;
    }()
  }, {
    key: "updateViewingSessions",
    value: function () {
      var _updateViewingSessions = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(id, updated) {
        var status;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _context8.next = 3;
              return _models["default"].viewingSessions.update(updated, {
                where: {
                  id: id
                }
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
      function updateViewingSessions(_x9, _x10) {
        return _updateViewingSessions.apply(this, arguments);
      }
      return updateViewingSessions;
    }()
  }]);
  return viewingSessionservices;
}();
var _default = exports["default"] = viewingSessionservices;