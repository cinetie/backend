"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _chai = _interopRequireWildcard(require("chai"));
var _dotenv = require("dotenv");
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _sinon = _interopRequireDefault(require("sinon"));
var _mocha = require("mocha");
var _index = _interopRequireDefault(require("../index"));
var _jwt = _interopRequireDefault(require("../helpers/jwt"));
var _tempVideoServices = _interopRequireDefault(require("../services/tempVideoServices"));
var aws = _interopRequireWildcard(require("../helpers/aws"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
(0, _dotenv.config)();
_chai["default"].use(_chaiHttp["default"]);
(0, _mocha.describe)("POST TEMP VIDEO TEST", function () {
  var adminToken;
  before( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var loginRes;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _chai["default"].request(_index["default"]).post("/staff/login").send({
            email: "staff@example.com",
            password: "izzeddin"
          });
        case 2:
          loginRes = _context.sent;
          adminToken = loginRes.body.data.token;
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  (0, _mocha.it)("should create a temp video(movie)", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var res;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _chai["default"].request(_index["default"]).post("/temp/new").set("cpid", "31978540-8bdf-41cc-81d7-26200b847c0a").set("authorization", "bearer ".concat(adminToken)).send({
            videoName: "integration",
            videoCast: "ggrtgrtg",
            videoSynopsis: "this is it",
            category: "action",
            rate: "everyone",
            resCountries: "england",
            portrait: "e3xcf5187-4dd8-49a9-86b1-087eb8476172.jpg",
            nameTag: "e3fg5187-4dd8-49a9-86b1-087ebgh8476173.jpg",
            landscape: "e3hhj5187-4dd8-49a9-86b1-087eb8476174.jpg",
            video: "e34b5187-4dd8-49a9-86b1-097gh8476171.mp4",
            type: "movie"
          });
        case 2:
          res = _context2.sent;
          (0, _chai.expect)(res.statusCode).to.equal(201);
          (0, _chai.expect)(res.body).to.have.property("message", "video uploaded successfully");
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  (0, _mocha.it)("should create a temp video(serie)", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var res;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _chai["default"].request(_index["default"]).post("/temp/new").set("cpid", "31978540-8bdf-41cc-81d7-26200b847c0a").set("authorization", "bearer ".concat(adminToken)).send({
            videoName: "integration serie",
            videoCast: "ggrtgrtg",
            videoSynopsis: "this is it",
            category: "action",
            rate: "everyone",
            resCountries: "england",
            portrait: "e3xcf5187-4dd8-49a9-86b1-087eb8476172.jpg",
            nameTag: "e3fg5187-4dd8-49a9-86b1-087ebgh8476173.jpg",
            landscape: "e3hhj5187-4dd8-49a9-86b1-087eb8476174.jpg",
            video: "e34b5187-4dd8-49a9-86b1-097gh8476171.mp4",
            type: "serie"
          });
        case 2:
          res = _context3.sent;
          (0, _chai.expect)(res.statusCode).to.equal(201);
          (0, _chai.expect)(res.body).to.have.property("message", "video uploaded successfully");
        case 5:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
  (0, _mocha.it)("should return 401 if the video can't be saved(movie)", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    var stub, res;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          stub = _sinon["default"].stub(_tempVideoServices["default"], "createNewVideos").returns(null);
          _context4.next = 3;
          return _chai["default"].request(_index["default"]).post("/temp/new").set("cpid", "31978540-8bdf-41cc-81d7-26200b847c0a").set("authorization", "bearer ".concat(adminToken)).send({
            videoName: "integration",
            videoCast: "ggrtgrtg",
            videoSynopsis: "this is it",
            category: "action",
            rate: "everyone",
            resCountries: "england",
            portrait: "e3xcf5187-4dd8-49a9-86b1-087eb8476172.jpg",
            nameTag: "e3fg5187-4dd8-49a9-86b1-087ebgh8476173.jpg",
            landscape: "e3hhj5187-4dd8-49a9-86b1-087eb8476174.jpg",
            video: "e34b5187-4dd8-49a9-86b1-097gh8476171.mp4",
            type: "movie"
          });
        case 3:
          res = _context4.sent;
          stub.restore();
          (0, _chai.expect)(res.statusCode).to.equal(401);
          (0, _chai.expect)(res.body).to.have.property("message", "Video can't be saved");
        case 7:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  })));
  (0, _mocha.it)("should return 401 if the video can't be saved(serie)", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
    var stub, res;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          stub = _sinon["default"].stub(_tempVideoServices["default"], "createNewVideos").returns(null);
          _context5.next = 3;
          return _chai["default"].request(_index["default"]).post("/temp/new").set("cpid", "31978540-8bdf-41cc-81d7-26200b847c0a").set("authorization", "bearer ".concat(adminToken)).send({
            videoName: "integration",
            videoCast: "ggrtgrtg",
            videoSynopsis: "this is it",
            category: "action",
            rate: "everyone",
            resCountries: "england",
            portrait: "e3xcf5187-4dd8-49a9-86b1-087eb8476172.jpg",
            nameTag: "e3fg5187-4dd8-49a9-86b1-087ebgh8476173.jpg",
            landscape: "e3hhj5187-4dd8-49a9-86b1-087eb8476174.jpg",
            video: "e34b5187-4dd8-49a9-86b1-097gh8476171.mp4",
            type: "serie"
          });
        case 3:
          res = _context5.sent;
          stub.restore();
          (0, _chai.expect)(res.statusCode).to.equal(401);
          (0, _chai.expect)(res.body).to.have.property("message", "Video can't be saved");
        case 7:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  })));
  (0, _mocha.it)("should return 401 if the video can't be asaved", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    var stub, res;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          stub = _sinon["default"].stub(_tempVideoServices["default"], "createNewVideos")["throws"](new Error("Something went wrong"));
          _context6.next = 3;
          return _chai["default"].request(_index["default"]).post("/temp/new").set("cpid", "31978540-8bdf-41cc-81d7-26200b847c0a").set("authorization", "bearer ".concat(adminToken)).send({
            videoName: "integration",
            videoCast: "ggrtgrtg",
            videoSynopsis: "this is it",
            category: "action",
            rate: "everyone",
            resCountries: "england",
            portrait: "e3xcf5187-4dd8-49a9-86b1-087eb8476172.jpg",
            nameTag: "e3fg5187-4dd8-49a9-86b1-087ebgh8476173.jpg",
            landscape: "e3hhj5187-4dd8-49a9-86b1-087eb8476174.jpg",
            video: "e34b5187-4dd8-49a9-86b1-097gh8476171.mp4",
            type: "movie"
          });
        case 3:
          res = _context6.sent;
          stub.restore();
          (0, _chai.expect)(res.statusCode).to.equal(503);
        case 6:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  })));
});