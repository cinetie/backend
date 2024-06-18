"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _chai = _interopRequireWildcard(require("chai"));
var _sinon = _interopRequireDefault(require("sinon"));
var _nodeMocksHttp = _interopRequireDefault(require("node-mocks-http"));
var _tempSerie = _interopRequireDefault(require("../controllers/tempSerie"));
var _tempSerieService = _interopRequireDefault(require("../services/tempSerieService"));
var aws = _interopRequireWildcard(require("../helpers/aws"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
describe("TEMP SERIE TESTS", function () {
  describe("CREATE SERIE TEST", function () {
    it("should add a new serie", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var req, res;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            req = _nodeMocksHttp["default"].createRequest({
              headers: {
                cpid: "31978540-8bdf-41cc-81d7-26200b847c0a"
              },
              body: {
                video: "ferkgergerg.mp4",
                episodeName: "part 1",
                season: 1,
                videoId: "b467da83-4f0d-4421-8818-c0f364cty9de1",
                synopsis: "The begining of everything as we excepect",
                thumb: "6bbdb89d-2455-4440-b9ea-7ba412f9c914.png",
                episodeNumber: 2
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context.next = 4;
            return _tempSerie["default"].createSerie(req, res);
          case 4:
            (0, _chai.expect)(res.statusCode).to.equal(201);
          case 5:
          case "end":
            return _context.stop();
        }
      }, _callee);
    })));
    it("should return 401 error if the serie wasn't saved", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            stub = _sinon["default"].stub(_tempSerieService["default"], "createNewSeries").callsFake(function () {
              return null;
            });
            req = _nodeMocksHttp["default"].createRequest({
              headers: {
                cpid: "31978540-8bdf-41cc-81d7-26200b847c0a"
              },
              body: {
                video: "erfergergergerg.mp4",
                episodeName: "part 1",
                season: 1,
                videoId: "b467da83-4f0d-4421-8818-c0f364cty9de",
                synopsis: "The begining of everything as we excepect",
                thumb: "6bbdb89d-2455-4440-b9ea-7ba412f9c914.png",
                episodeNumber: 2
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context2.next = 5;
            return _tempSerie["default"].createSerie(req, res);
          case 5:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(422);
          case 7:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    })));
    it("should return 500 status when there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            stub = _sinon["default"].stub(_tempSerieService["default"], "createNewSeries")["throws"](new Error("Something went wrong"));
            req = _nodeMocksHttp["default"].createRequest({
              body: {
                video: "erfergergergerg.mp4",
                episodeName: "part 1",
                season: 1,
                videoId: "b467da83-4f0d-4421-8818-c0f364cty9de",
                synopsis: "The begining of everything as we excepect",
                thumb: "6bbdb89d-2455-4440-b9ea-7ba412f9c914.png",
                episodeNumber: 2
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context3.next = 5;
            return _tempSerie["default"].createSerie(req, res);
          case 5:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(500);
          case 7:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    })));
  });
  describe("GET ALL SERIES", function () {
    // it('gets all series', async () => {
    //     const req = httpMock.createRequest();
    //     const res = httpMock.createResponse();
    //     await TempSerieController.getAllSeries(req, res);
    //     expect(res.statusCode).to.equal(200);
    // });
    it("returns 404 status when there is not series", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            stub = _sinon["default"].stub(_tempSerieService["default"], "getAllSeries").callsFake(function () {
              return [];
            });
            req = _nodeMocksHttp["default"].createRequest();
            res = _nodeMocksHttp["default"].createResponse();
            _context4.next = 5;
            return _tempSerie["default"].getAllSeries(req, res);
          case 5:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(404);
          case 7:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    })));
    it("returns 503 status when there is a server errror", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            stub = _sinon["default"].stub(_tempSerieService["default"], "getAllSeries")["throws"](new Error("something is wrong"));
            req = _nodeMocksHttp["default"].createRequest();
            res = _nodeMocksHttp["default"].createResponse();
            _context5.next = 5;
            return _tempSerie["default"].getAllSeries(req, res);
          case 5:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(500);
          case 7:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    })));
  });
  describe("GET SIGNED URL TempSeries TEST", function () {
    // it("should return 200 status when getting when the req and res body are given", async () => {
    //   const req = httpMock.createRequest();
    //   const res = httpMock.createResponse();
    //   await TempSerieController.getSignedUrlTempSeries(req, res);
    //   expect(res.statusCode).to.equal(200);
    // });
    it("should return a 500 status error if there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            stub = _sinon["default"].stub(aws, "getSignedUrl")["throws"](new Error("something is wrong"));
            req = _nodeMocksHttp["default"].createRequest();
            res = _nodeMocksHttp["default"].createResponse();
            _context6.next = 5;
            return _tempSerie["default"].getSignedUrlTempSeries(req, res);
          case 5:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(500);
          case 7:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    })));
  });
  describe("GENERATE SIGNED URL", function () {
    it("should return 404 status when the video is not found", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var req, res;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                id: 578686979
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context7.next = 4;
            return _tempSerie["default"].generateSignedUrl(req, res);
          case 4:
            (0, _chai.expect)(res.statusCode).to.equal(404);
          case 5:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    })));
    // it("should return 200 when the video is found", async () => {
    //   const req = httpMock.createRequest({
    //     query: {
    //       id: 156,
    //     },
    //   });
    //   const res = httpMock.createResponse();
    //   await TempSerieController.generateSignedUrl(req, res);
    //   expect(res.statusCode).to.equal(200);
    // });
    it("should return 500 when there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            stub = _sinon["default"].stub(_tempSerieService["default"], "getParticularVideo")["throws"](new Error("something is wrong"));
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                id: 34
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context8.next = 5;
            return _tempSerie["default"].generateSignedUrl(req, res);
          case 5:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(500);
          case 7:
          case "end":
            return _context8.stop();
        }
      }, _callee8);
    })));
  });
});