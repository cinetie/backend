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
var userService = /*#__PURE__*/function () {
  function userService() {
    (0, _classCallCheck2["default"])(this, userService);
  }
  (0, _createClass2["default"])(userService, null, [{
    key: "getUserByMail",
    value: function () {
      var _getUserByMail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(email) {
        var user;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _models["default"].User.findOne({
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
      function getUserByMail(_x) {
        return _getUserByMail.apply(this, arguments);
      }
      return getUserByMail;
    }()
  }, {
    key: "getUserById",
    value: function () {
      var _getUserById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _models["default"].User.findOne({
                attributes: {
                  exclude: ["createdAt", "updatedAt"]
                },
                where: {
                  id: id
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
      function getUserById(_x2) {
        return _getUserById.apply(this, arguments);
      }
      return getUserById;
    }()
  }, {
    key: "createNewUser",
    value: function () {
      var _createNewUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(newUser) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _models["default"].User.create(newUser);
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
      function createNewUser(_x3) {
        return _createNewUser.apply(this, arguments);
      }
      return createNewUser;
    }()
  }, {
    key: "updateUser",
    value: function () {
      var _updateUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(email, updates) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _models["default"].User.update(updates, {
                returning: true,
                where: {
                  email: email
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
      function updateUser(_x4, _x5) {
        return _updateUser.apply(this, arguments);
      }
      return updateUser;
    }()
  }, {
    key: "deleteUser",
    value: function () {
      var _deleteUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id) {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _models["default"].User.destroy({
                returning: true,
                where: {
                  id: id
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
      function deleteUser(_x6) {
        return _deleteUser.apply(this, arguments);
      }
      return deleteUser;
    }()
  }, {
    key: "getAllUsers",
    value: function () {
      var _getAllUsers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return _models["default"].User.findAll();
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
      function getAllUsers() {
        return _getAllUsers.apply(this, arguments);
      }
      return getAllUsers;
    }()
  }, {
    key: "getUser",
    value: function () {
      var _getUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(email) {
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return _models["default"].User.findOne({
                where: {
                  email: email
                }
              });
            case 3:
              return _context7.abrupt("return", _context7.sent);
            case 6:
              _context7.prev = 6;
              _context7.t0 = _context7["catch"](0);
              throw _context7.t0;
            case 9:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[0, 6]]);
      }));
      function getUser(_x7) {
        return _getUser.apply(this, arguments);
      }
      return getUser;
    }()
  }]);
  return userService;
}();
var _default = exports["default"] = userService;