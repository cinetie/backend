"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _axios = _interopRequireDefault(require("axios"));
/* eslint-disable no-console */

var post = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(url, data) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _axios["default"].post(url, data).then(function (response) {
            return response;
          })["catch"](function (error) {
            throw error;
          });
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function post(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var get = function get(url, options) {
  _axios["default"].get(url, options).then(function (response) {
    return response;
  })["catch"](function (error) {
    throw error;
  });
};
var _default = exports["default"] = {
  post: post,
  get: get
};