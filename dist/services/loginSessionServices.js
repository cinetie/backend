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
var loginSessionServices = /*#__PURE__*/function () {
  function loginSessionServices() {
    (0, _classCallCheck2["default"])(this, loginSessionServices);
  }
  (0, _createClass2["default"])(loginSessionServices, null, [{
    key: "addSession",
    value: function () {
      var _addSession = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(newSession) {
        var addedSession;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _models["default"].loginSessions.create(newSession);
            case 3:
              addedSession = _context.sent;
              if (!addedSession) {
                _context.next = 6;
                break;
              }
              return _context.abrupt("return", addedSession);
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
      function addSession(_x) {
        return _addSession.apply(this, arguments);
      }
      return addSession;
    }()
  }, {
    key: "getParticularSession",
    value: function () {
      var _getParticularSession = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(email) {
        var session;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _models["default"].loginSessions.findAll({
                where: (0, _defineProperty2["default"])({}, op.and, [{
                  email: email
                }, {
                  state: "in"
                }])
              });
            case 3:
              session = _context2.sent;
              if (!session) {
                _context2.next = 6;
                break;
              }
              return _context2.abrupt("return", session);
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
      function getParticularSession(_x2) {
        return _getParticularSession.apply(this, arguments);
      }
      return getParticularSession;
    }()
  }, {
    key: "getLiveSessions",
    value: function () {
      var _getLiveSessions = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var session;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _models["default"].loginSessions.findAll({
                where: {
                  state: "in"
                }
              });
            case 3:
              session = _context3.sent;
              if (!session) {
                _context3.next = 6;
                break;
              }
              return _context3.abrupt("return", session);
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
      function getLiveSessions() {
        return _getLiveSessions.apply(this, arguments);
      }
      return getLiveSessions;
    }()
  }, {
    key: "getAllSession",
    value: function () {
      var _getAllSession = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
        var sessions;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _models["default"].loginSessions.findAll();
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
      function getAllSession() {
        return _getAllSession.apply(this, arguments);
      }
      return getAllSession;
    }()
  }, {
    key: "updateSession",
    value: function () {
      var _updateSession = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id, session) {
        var updated;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _models["default"].loginSessions.update(session, {
                where: {
                  id: id
                }
              });
            case 3:
              updated = _context5.sent;
              if (!updated) {
                _context5.next = 6;
                break;
              }
              return _context5.abrupt("return", updated);
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
      function updateSession(_x3, _x4) {
        return _updateSession.apply(this, arguments);
      }
      return updateSession;
    }()
  }]);
  return loginSessionServices;
}();
var _default = exports["default"] = loginSessionServices;