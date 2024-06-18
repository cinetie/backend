"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set = exports.get = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _ioredis = _interopRequireDefault(require("ioredis"));
var _env = _interopRequireDefault(require("../config/env"));
var host = _env["default"].NODE_ENV === "staging" ? _env["default"].REDIS_HOST : "127.0.0.1";
var port = _env["default"].NODE_ENV === "staging" ? _env["default"].REDIS_PORT : "6379";
var username = _env["default"].NODE_ENV === "staging" ? _env["default"].REDIS_USERNAME : "default";
var password = _env["default"].NODE_ENV === "staging" ? _env["default"].REDIS_PASSWORD : "";
var redis = new _ioredis["default"]({
  port: port,
  username: username,
  password: password,
  host: host
});
var get = exports.get = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(key) {
    var result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log(key);
          _context.next = 3;
          return redis.get(key);
        case 3:
          result = _context.sent;
          return _context.abrupt("return", result ? JSON.parse(result) : null);
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function get(_x) {
    return _ref.apply(this, arguments);
  };
}();
var set = exports.set = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(key, value, exp) {
    var result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return redis.setex(key, exp || 86400, JSON.stringify(value));
        case 2:
          result = _context2.sent;
          return _context2.abrupt("return", result);
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function set(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();