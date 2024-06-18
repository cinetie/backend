"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var getCummulativeSum = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(total, num) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", total + num);
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getCummulativeSum(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var average = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(arrayLen, sum) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", sum / arrayLen);
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function average(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var _default = exports["default"] = {
  getCummulativeSum: getCummulativeSum,
  average: average
};