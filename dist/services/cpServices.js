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
/* eslint-disable no-useless-catch */
var cpService = /*#__PURE__*/function () {
  function cpService() {
    (0, _classCallCheck2["default"])(this, cpService);
  }
  (0, _createClass2["default"])(cpService, null, [{
    key: "getCpByMail",
    value: function () {
      var _getCpByMail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(email) {
        var user;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _models["default"].contentProviders.findOne({
                attributes: {
                  exclude: ["createdAt", "updatedAt"]
                },
                where: {
                  email: email
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
      function getCpByMail(_x) {
        return _getCpByMail.apply(this, arguments);
      }
      return getCpByMail;
    }()
  }, {
    key: "getCpById",
    value: function () {
      var _getCpById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
        var user;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _models["default"].contentProviders.findOne({
                attributes: {
                  exclude: ["createdAt", "updatedAt"]
                },
                where: {
                  id: id
                }
              });
            case 3:
              user = _context2.sent;
              if (!user) {
                _context2.next = 6;
                break;
              }
              return _context2.abrupt("return", user);
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
      function getCpById(_x2) {
        return _getCpById.apply(this, arguments);
      }
      return getCpById;
    }()
  }, {
    key: "getCpByClientId",
    value: function () {
      var _getCpByClientId = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(clientId) {
        var user;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _models["default"].contentProviders.findOne({
                attributes: {
                  exclude: ["createdAt", "updatedAt"]
                },
                where: {
                  clientId: clientId
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
      function getCpByClientId(_x3) {
        return _getCpByClientId.apply(this, arguments);
      }
      return getCpByClientId;
    }()
  }, {
    key: "createNewCp",
    value: function () {
      var _createNewCp = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(newCp) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _models["default"].contentProviders.create(newCp);
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
      function createNewCp(_x4) {
        return _createNewCp.apply(this, arguments);
      }
      return createNewCp;
    }()
  }, {
    key: "updateCp",
    value: function () {
      var _updateCp = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(email, oldCp) {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _models["default"].contentProviders.update(oldCp, {
                returning: true,
                where: {
                  email: email
                }
              });
            case 3:
              return _context5.abrupt("return", _context5.sent);
            case 6:
              _context5.prev = 6;
              _context5.t0 = _context5["catch"](0);
              throw _context5.t0;
            case 9:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 6]]);
      }));
      function updateCp(_x5, _x6) {
        return _updateCp.apply(this, arguments);
      }
      return updateCp;
    }()
  }, {
    key: "deleteCp",
    value: function () {
      var _deleteCp = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(email) {
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return _models["default"].contentProviders.destroy({
                returning: true,
                where: {
                  email: email
                }
              });
            case 3:
              return _context6.abrupt("return", _context6.sent);
            case 6:
              _context6.prev = 6;
              _context6.t0 = _context6["catch"](0);
              throw _context6.t0;
            case 9:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[0, 6]]);
      }));
      function deleteCp(_x7) {
        return _deleteCp.apply(this, arguments);
      }
      return deleteCp;
    }()
  }, {
    key: "getAllCps",
    value: function () {
      var _getAllCps = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
        var cps;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return _models["default"].contentProviders.findAll({
                attributes: {
                  exclude: ["createdAt", "updatedAt", "password", "id", "isVerified", "cityOfResidence"]
                }
              });
            case 3:
              cps = _context7.sent;
              if (cps) {
                _context7.next = 6;
                break;
              }
              return _context7.abrupt("return", null);
            case 6:
              return _context7.abrupt("return", cps);
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
      function getAllCps() {
        return _getAllCps.apply(this, arguments);
      }
      return getAllCps;
    }()
  }]);
  return cpService;
}();
var _default = exports["default"] = cpService;