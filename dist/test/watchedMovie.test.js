"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _chai = _interopRequireWildcard(require("chai"));
var _dotenv = require("dotenv");
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _mocha = require("mocha");
var _index = _interopRequireDefault(require("../index"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
(0, _dotenv.config)();
_chai["default"].use(_chaiHttp["default"]);
(0, _mocha.describe)("WATCHED MOVIE TIME TEST", function () {
  (0, _mocha.it)("should return an error if one the data is invalid", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var loginRes, res;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _chai["default"].request(_index["default"]).post("/auth/login").send({
            email: "user345679xd@example.com",
            password: "izzeddin"
          });
        case 2:
          loginRes = _context.sent;
          _context.next = 5;
          return _chai["default"].request(_index["default"]).post("/video/time").set("authorization", "bearer ".concat(loginRes.body.data)).send({
            watched: 0,
            type: "movie"
          });
        case 5:
          res = _context.sent;
          (0, _chai.expect)(res.statusCode).to.equal(422);
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  (0, _mocha.it)("should save the watchedTime if one gives valid info and the video is a movie", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var loginRes, res;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _chai["default"].request(_index["default"]).post("/auth/login").send({
            email: "user345679xd@example.com",
            password: "izzeddin"
          });
        case 2:
          loginRes = _context2.sent;
          _context2.next = 5;
          return _chai["default"].request(_index["default"]).post("/video/time?videoId=fr474rtddfrd4w3-4f378i-kk21-0878-c0f364dfgts5tyh").set("authorization", "bearer ".concat(loginRes.body.data)).send({
            watchedTime: 20,
            type: "movie"
          });
        case 5:
          res = _context2.sent;
          (0, _chai.expect)(res.statusCode).to.equal(201);
          (0, _chai.expect)(res.body).to.have.property("message", "time saved successfully");
        case 8:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  (0, _mocha.it)("should save the watchedTime if one gives valid info and the video is an episode", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var loginRes, res;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _chai["default"].request(_index["default"]).post("/auth/login").send({
            email: "user345679xd@example.com",
            password: "izzeddin"
          });
        case 2:
          loginRes = _context3.sent;
          _context3.next = 5;
          return _chai["default"].request(_index["default"]).post("/video/time?videoId=b467da83-4f0d-4421-7765-c0f364ca93ws").set("authorization", "bearer ".concat(loginRes.body.data)).send({
            watchedTime: 20,
            type: "serie",
            episodeId: "101"
          });
        case 5:
          res = _context3.sent;
          (0, _chai.expect)(res.statusCode).to.equal(201);
          (0, _chai.expect)(res.body).to.have.property("message", "time saved successfully");
        case 8:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
  (0, _mocha.it)("should update the watchedTime if one gives valid info and the user has watched the video before", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    var loginRes, res;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _chai["default"].request(_index["default"]).post("/auth/login").send({
            email: "user345679xde@example.com",
            password: "izzeddin"
          });
        case 2:
          loginRes = _context4.sent;
          _context4.next = 5;
          return _chai["default"].request(_index["default"]).post("/video/time?videoId=b467da83-4f0d-4421-7765-c0f364ca93ws").set("authorization", "bearer ".concat(loginRes.body.data)).send({
            watchedTime: 20,
            type: "serie",
            episodeId: "101"
          });
        case 5:
          res = _context4.sent;
          (0, _chai.expect)(res.statusCode).to.equal(201);
          (0, _chai.expect)(res.body).to.have.property("message", "time saved successfully");
        case 8:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  })));
  (0, _mocha.it)("should return an error if the episode doesn't exist", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
    var loginRes, res;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return _chai["default"].request(_index["default"]).post("/auth/login").send({
            email: "user345679xde@example.com",
            password: "izzeddin"
          });
        case 2:
          loginRes = _context5.sent;
          _context5.next = 5;
          return _chai["default"].request(_index["default"]).post("/video/time?videoId=b467da83-4f0d-4421-7765-c0f364ca93ws").set("authorization", "bearer ".concat(loginRes.body.data)).send({
            watchedTime: 20,
            type: "serie",
            episodeId: "10101011"
          });
        case 5:
          res = _context5.sent;
          (0, _chai.expect)(res.statusCode).to.equal(404);
          (0, _chai.expect)(res.body).to.have.property("message", "episode not found");
        case 8:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  })));
  (0, _mocha.it)("should return an error if the episodeId is not given for series", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    var loginRes, res;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return _chai["default"].request(_index["default"]).post("/auth/login").send({
            email: "user345679xde@example.com",
            password: "izzeddin"
          });
        case 2:
          loginRes = _context6.sent;
          _context6.next = 5;
          return _chai["default"].request(_index["default"]).post("/video/time?videoId=b467da83-4f0d-4421-7765-c0f364ca93ws").set("authorization", "bearer ".concat(loginRes.body.data)).send({
            watchedTime: 20,
            type: "serie"
          });
        case 5:
          res = _context6.sent;
          (0, _chai.expect)(res.statusCode).to.equal(400);
          (0, _chai.expect)(res.body).to.have.property("message", "episodeId is required to save an episode");
        case 8:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  })));
  (0, _mocha.it)("should return an error message if the video doesn't exist", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
    var loginRes, res;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return _chai["default"].request(_index["default"]).post("/auth/login").send({
            email: "user345679xde@example.com",
            password: "izzeddin"
          });
        case 2:
          loginRes = _context7.sent;
          _context7.next = 5;
          return _chai["default"].request(_index["default"]).post("/video/time?videoId=10100056").set("authorization", "bearer ".concat(loginRes.body.data)).send({
            watchedTime: 20,
            type: "movie"
          });
        case 5:
          res = _context7.sent;
          (0, _chai.expect)(res.statusCode).to.equal(404);
          (0, _chai.expect)(res.body).to.have.property("message", "video not found");
        case 8:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  })));
});
(0, _mocha.describe)("GET WATCHED MOVIE TIME TEST", function () {
  (0, _mocha.it)("should return an error if the user hasn't watched the movie", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
    var loginRes, res;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return _chai["default"].request(_index["default"]).post("/auth/login").send({
            email: "user345679xde@example.com",
            password: "izzeddin"
          });
        case 2:
          loginRes = _context8.sent;
          _context8.next = 5;
          return _chai["default"].request(_index["default"]).get("/video/time?videoId=10000234").set("authorization", "bearer ".concat(loginRes.body.data));
        case 5:
          res = _context8.sent;
          (0, _chai.expect)(res.statusCode).to.equal(404);
          (0, _chai.expect)(res.body).to.have.property("message", "The video has not been watched yet");
        case 8:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  })));
  (0, _mocha.it)("should return the watched time if the user has seen the movie before", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
    var loginRes, res;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return _chai["default"].request(_index["default"]).post("/auth/login").send({
            email: "user345679xde@example.com",
            password: "izzeddin"
          });
        case 2:
          loginRes = _context9.sent;
          _context9.next = 5;
          return _chai["default"].request(_index["default"]).get("/video/time?videoId=100").set("authorization", "bearer ".concat(loginRes.body.data));
        case 5:
          res = _context9.sent;
          (0, _chai.expect)(res.statusCode).to.equal(200);
          (0, _chai.expect)(res.body).to.have.property("message", "watch session retrieved successfully");
        case 8:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  })));
});