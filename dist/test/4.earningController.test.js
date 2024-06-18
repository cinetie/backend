"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _chai = _interopRequireWildcard(require("chai"));
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _mocha = require("mocha");
var _earning = _interopRequireDefault(require("../controllers/earning"));
var _empty = _interopRequireDefault(require("./mock/empty.mock"));
var _video = _interopRequireDefault(require("./mock/video.mock"));
var _earnings = _interopRequireDefault(require("./mock/earnings.mock"));
var _jwt = _interopRequireDefault(require("../helpers/jwt"));
var _index = _interopRequireDefault(require("../index"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
_chai["default"].use(_chaiHttp["default"]);
var email = "email@gmail.com";
(0, _mocha.describe)("EARNING CONTROLLER", function () {
  (0, _mocha.it)("should return null if email subprised have no registed user", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _earning["default"].getCurrentSubscriptionDetails(email);
        case 2:
          data = _context.sent;
          (0, _chai.expect)(data).to.be["null"];
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  (0, _mocha.it)("should return an object getting subscription details", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _earning["default"].getCurrentSubscriptionDetails("blaise1@gmail.com");
        case 2:
          data = _context2.sent;
          (0, _chai.expect)(data.email).to.be.equal("blaise1@gmail.com");
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  (0, _mocha.it)("should return true while tryin to get assign Rate", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _earning["default"].assignRateToEachVideo("blaise1@gmail.com");
        case 2:
          data = _context3.sent;
          (0, _chai.expect)(data).to.be.equal(true);
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
  (0, _mocha.it)("should return 200/OK getting all earnings", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    var data;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _earning["default"].getAllEarnings(_video["default"].request, _video["default"].response);
        case 2:
          data = _context4.sent;
          (0, _chai.expect)(data.statusCode).to.be.equal(200);
        case 4:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  })));
  (0, _mocha.it)("should return 200/OK getting all Active earnings", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
    var data;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return _earning["default"].getAllActiveEarnings(_video["default"].request, _video["default"].response);
        case 2:
          data = _context5.sent;
          (0, _chai.expect)(data.statusCode).to.be.equal(200);
        case 4:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  })));
  (0, _mocha.it)("should return 200/OK getting earnings per video", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    var data;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return _earning["default"].getAllEarningsPerVideo(_video["default"].request, _video["default"].response);
        case 2:
          data = _context6.sent;
          (0, _chai.expect)(data.statusCode).to.be.equal(200);
        case 4:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  })));
  (0, _mocha.it)("should return 500 getting earnings per video with no vidoe id", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
    var data;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return _earning["default"].getAllEarningsPerVideo(_empty["default"].request, _empty["default"].response);
        case 2:
          data = _context7.sent;
          (0, _chai.expect)(data.statusCode).to.be.equal(500);
        case 4:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  })));
  (0, _mocha.it)("should return 200/OK getting earnings per video", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
    var data;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return _earning["default"].getActiveEarningsPerVideo(_video["default"].request, _video["default"].response);
        case 2:
          data = _context8.sent;
          (0, _chai.expect)(data.statusCode).to.be.equal(200);
        case 4:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  })));
  (0, _mocha.it)("should return 200/ok if the clientId had earnings", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
    var data;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return _earning["default"].getActiveEarningsPerClient(_video["default"].request, _video["default"].response);
        case 2:
          data = _context9.sent;
          (0, _chai.expect)(data.statusCode).to.be.equal(200);
        case 4:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  })));
  (0, _mocha.it)("should return 500 if the token is not supplied", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
    var data;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return _earning["default"].getActiveEarningsPerClient(_empty["default"].request, _empty["default"].response);
        case 2:
          data = _context10.sent;
          (0, _chai.expect)(data.statusCode).to.be.equal(500);
        case 4:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  })));
  (0, _mocha.it)("should return 404 if the clientId in the toke is has no earnings", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
    var data;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return _earning["default"].getActiveEarningsPerClient(_earnings["default"].request, _earnings["default"].response);
        case 2:
          data = _context11.sent;
          (0, _chai.expect)(data.statusCode).to.be.equal(404);
        case 4:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  })));
  (0, _mocha.it)("should return 200/ok if the clientId had active earnings", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
    var data;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return _earning["default"].getEarningsPerClient(_video["default"].request, _video["default"].response);
        case 2:
          data = _context12.sent;
          (0, _chai.expect)(data.statusCode).to.be.equal(200);
        case 4:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  })));
  (0, _mocha.it)("should return 404 if the clientId in the toke is has no active earnings", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
    var data;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return _earning["default"].getEarningsPerClient(_earnings["default"].request, _earnings["default"].response);
        case 2:
          data = _context13.sent;
          (0, _chai.expect)(data.statusCode).to.be.equal(404);
        case 4:
        case "end":
          return _context13.stop();
      }
    }, _callee13);
  })));
  (0, _mocha.it)("should return 500 if the token is not supplied", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
    var data;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return _earning["default"].getEarningsPerClient(_empty["default"].request, _empty["default"].response);
        case 2:
          data = _context14.sent;
          (0, _chai.expect)(data.statusCode).to.be.equal(500);
        case 4:
        case "end":
          return _context14.stop();
      }
    }, _callee14);
  })));
});