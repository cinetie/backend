"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _chai = require("chai");
var _mocha = require("mocha");
var _redis = require("../helpers/redis");
(0, _mocha.describe)("Webhooks", function () {
  (0, _mocha.it)("it should return undefined if no element with the such key exists", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var res;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _redis.get)("uuuid");
        case 2:
          res = _context.sent;
          (0, _chai.expect)(res).to.be["null"];
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  (0, _mocha.it)("It should return a value if an element with such key exists", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var raw, setValue;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          raw = [{
            val: 0,
            val1: 1
          }];
          _context2.next = 3;
          return (0, _redis.set)('uuid', raw);
        case 3:
          _context2.next = 5;
          return (0, _redis.get)('uuid');
        case 5:
          setValue = _context2.sent;
          (0, _chai.expect)(setValue[0].val).to.be.equals(raw[0].val);
          (0, _chai.expect)(setValue[0].val1).to.be.equals(raw[0].val1);
        case 8:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
});