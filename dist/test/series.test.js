"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _chai = _interopRequireWildcard(require("chai"));
var _sinon = _interopRequireDefault(require("sinon"));
var _nodeMocksHttp = _interopRequireDefault(require("node-mocks-http"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _series = _interopRequireDefault(require("../controllers/series"));
var _tempSerieService = _interopRequireDefault(require("../services/tempSerieService"));
var _serieServices = _interopRequireDefault(require("../services/serieServices"));
var _jwt = _interopRequireDefault(require("../helpers/jwt"));
var aws = _interopRequireWildcard(require("../helpers/aws"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
describe("SERIES TEST", function () {
  describe("CREATE SERIE TEST", function () {
    // it('should create a new serie', async () => {
    //     const stub = sinon.stub(aws, 'copyObjects').callsFake(() => {
    //         return [{ status: 'success' }];
    //     })
    //     const stub2 = sinon.stub(aws, 'deleteObject').callsFake(() => {
    //         return [{ status: 'success' }];
    //     })
    //     const req = httpMock.createRequest({
    //         query: {
    //             id: 157
    //         }
    //     });
    //     const res = httpMock.createResponse();
    //     await serieController.create(req, res);
    //     stub.restore();
    //     stub2.restore();
    //     expect(res.statusCode).to.equal(201);

    // });
    // it("should return 400 if there is an error saving the video", async () => {
    //   const stub = sinon.stub(aws, "copyObjects").callsFake(() => {
    //     return [{ status: "success" }];
    //   });
    //   const stub3 = sinon.stub(aws, "deleteObject").callsFake(() => {
    //     return [{ status: "success" }];
    //   });
    //   const stub2 = sinon
    //     .stub(tempSerieService, "deleteSeries")
    //     .callsFake(() => {
    //       return null;
    //     });
    //   const req = httpMock.createRequest({
    //     query: {
    //       id: 158,
    //     },
    //   });
    //   const res = httpMock.createResponse();
    //   await serieController.create(req, res);
    //   stub.restore();
    //   stub2.restore();
    //   stub3.restore();
    //   expect(res.statusCode).to.equal(400);
    // });
    it("should return 500 if there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var stub, stub2, req, res;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            stub = _sinon["default"].stub(_tempSerieService["default"], "getParticularVideo")["throws"](new Error("Something went wrong"));
            stub2 = _sinon["default"].stub(aws, "deleteObject").callsFake(function () {
              return [{
                status: "success"
              }];
            });
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                id: 157
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context.next = 6;
            return _series["default"].create(req, res);
          case 6:
            stub.restore();
            stub2.restore();
            (0, _chai.expect)(res.statusCode).to.equal(500);
          case 9:
          case "end":
            return _context.stop();
        }
      }, _callee);
    })));
  });
  describe("GET A EPISODE SERIE TEST", function () {
    it("should get a single episode and return 200 status code", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            stub = _sinon["default"].stub(aws, "getObject").callsFake(function () {
              return [{
                uri: "erfejbkegjerjgbemsd,m.com/efeferf.mp4"
              }];
            });
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                ep: 140
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context2.next = 5;
            return _series["default"].getSingleEpisode(req, res);
          case 5:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(200);
          case 7:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    })));
    it("return 400 status code if the episode is not found", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            stub = _sinon["default"].stub(aws, "getObject").callsFake(function () {
              return [{
                uri: "erfejbkegjerjgbemsd,m.com/efeferf.mp4"
              }];
            });
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                ep: 14000000
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context3.next = 5;
            return _series["default"].getSingleEpisode(req, res);
          case 5:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(400);
          case 7:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    })));
    it("return 500 status code if there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            stub = _sinon["default"].stub(_serieServices["default"], "getSingleEpisode")["throws"](new Error("something went wrong"));
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                ep: 140
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context4.next = 5;
            return _series["default"].getSingleEpisode(req, res);
          case 5:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(500);
          case 7:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    })));
  });
  describe("GET A SINGLE SEASON TEST", function () {
    it("should return a single season", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var req, res;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                limit: 5,
                offset: 0,
                s: "6",
                id: "fr474rtt7w3-4f378i-vv4w-7865-c0f364dfgts5tyh"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context5.next = 4;
            return _series["default"].getSingleSeason(req, res);
          case 4:
            (0, _chai.expect)(res.statusCode).to.equal(200);
          case 5:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    })));
    it("should return 400 if the season is not found", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var req, res;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                limit: 5,
                offset: 0,
                s: "200000000",
                id: "fr474rtt7w3-4f378i-vv4w-7865-c0f364dfgts5tyh"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context6.next = 4;
            return _series["default"].getSingleSeason(req, res);
          case 4:
            (0, _chai.expect)(res.statusCode).to.equal(400);
          case 5:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    })));
    it("should return 500 if there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            stub = _sinon["default"].stub(_serieServices["default"], "getSingleSeason")["throws"](new Error("something went wrong"));
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                limit: 5,
                offset: 0,
                s: "200000000",
                id: "fr474rtt7w3-4f378i-vv4w-7865-c0f364dfgts5tyh"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context7.next = 5;
            return _series["default"].getSingleSeason(req, res);
          case 5:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(500);
          case 7:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    })));
  });
  describe("GET ALL SEASONS", function () {
    it("should return all seasons' episodes", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      var req, res;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                videoId: "fr474rtt7w3-4f378i-vv4w-7865-c0f364dfgts5tyh"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context8.next = 4;
            return _series["default"].getAllSeasons(req, res);
          case 4:
            (0, _chai.expect)(res.statusCode).to.equal(200);
          case 5:
          case "end":
            return _context8.stop();
        }
      }, _callee8);
    })));
    it("should return 400 if no season is found", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      var req, res;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                videoId: "fr474rtt7w3-4f378i-vv4w-7865-c0f364dfgts5tyh1234567890qw"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context9.next = 4;
            return _series["default"].getAllSeasons(req, res);
          case 4:
            (0, _chai.expect)(res.statusCode).to.equal(400);
          case 5:
          case "end":
            return _context9.stop();
        }
      }, _callee9);
    })));
    it("should return 500 if there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            stub = _sinon["default"].stub(_serieServices["default"], "getAllSeasons")["throws"](new Error("something went wrong"));
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                videoId: "fr474rtt7w3-4f378i-vv4w-7865-c0f364dfgts5tyh"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context10.next = 5;
            return _series["default"].getAllSeasons(req, res);
          case 5:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(500);
          case 7:
          case "end":
            return _context10.stop();
        }
      }, _callee10);
    })));
  });
  describe("UPDATE SERIE TEST", function () {
    it("should update a serie", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
      var req, res;
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            req = _nodeMocksHttp["default"].createRequest({
              body: {
                id: 144,
                episodeName: "changed name"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context11.next = 4;
            return _series["default"].updateSerie(req, res);
          case 4:
            (0, _chai.expect)(res.statusCode).to.equal(201);
          case 5:
          case "end":
            return _context11.stop();
        }
      }, _callee11);
    })));
    it("should return 400 if the serie is not updated", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
      var req, res;
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            req = _nodeMocksHttp["default"].createRequest({
              body: {
                id: 14456677889,
                episodeName: "changed name"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context12.next = 4;
            return _series["default"].updateSerie(req, res);
          case 4:
            (0, _chai.expect)(res.statusCode).to.equal(400);
          case 5:
          case "end":
            return _context12.stop();
        }
      }, _callee12);
    })));
    it("should return 500 if there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            stub = _sinon["default"].stub(_serieServices["default"], "update")["throws"](new Error("something went wrong"));
            req = _nodeMocksHttp["default"].createRequest({
              body: {
                id: 144,
                episodeName: "changed name"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context13.next = 5;
            return _series["default"].updateSerie(req, res);
          case 5:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(500);
          case 7:
          case "end":
            return _context13.stop();
        }
      }, _callee13);
    })));
  });
  describe("DELETE EPISODE TEST", function () {
    it("should delete the episode and return 200 status code", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
          case 0:
            stub = _sinon["default"].stub(aws, "deleteObject").callsFake(function () {
              return [];
            });
            req = _nodeMocksHttp["default"].createRequest({
              params: {
                id: 145
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context14.next = 5;
            return _series["default"]["delete"](req, res);
          case 5:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(200);
          case 7:
          case "end":
            return _context14.stop();
        }
      }, _callee14);
    })));
    it("should return 400 status code if the serie is not found", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
      var req, res;
      return _regenerator["default"].wrap(function _callee15$(_context15) {
        while (1) switch (_context15.prev = _context15.next) {
          case 0:
            req = _nodeMocksHttp["default"].createRequest({
              params: {
                id: 1450000
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context15.next = 4;
            return _series["default"]["delete"](req, res);
          case 4:
            (0, _chai.expect)(res.statusCode).to.equal(400);
          case 5:
          case "end":
            return _context15.stop();
        }
      }, _callee15);
    })));
    it("should return 400 status code if the serie is not deleted", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) switch (_context16.prev = _context16.next) {
          case 0:
            stub = _sinon["default"].stub(aws, "deleteObject").callsFake(function () {
              return [{
                status: "error"
              }];
            });
            req = _nodeMocksHttp["default"].createRequest({
              params: {
                id: 146
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context16.next = 5;
            return _series["default"]["delete"](req, res);
          case 5:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(400);
          case 7:
          case "end":
            return _context16.stop();
        }
      }, _callee16);
    })));
    it("return 500 status code if there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee17$(_context17) {
        while (1) switch (_context17.prev = _context17.next) {
          case 0:
            stub = _sinon["default"].stub(_serieServices["default"], "getSingleEpisode")["throws"](new Error("something went wrong"));
            req = _nodeMocksHttp["default"].createRequest({
              params: {
                id: 145
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context17.next = 5;
            return _series["default"]["delete"](req, res);
          case 5:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(500);
          case 7:
          case "end":
            return _context17.stop();
        }
      }, _callee17);
    })));
  });
  describe("GET EPISODES BY CLIENT ID", function () {
    it("should return the episode and 200 status code", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee18$(_context18) {
        while (1) switch (_context18.prev = _context18.next) {
          case 0:
            stub = _sinon["default"].stub(_jwt["default"], "jwtVerify").callsFake(function () {
              return {
                clientId: "31978540-8bdf-41cc-81d7-26200b847c0a"
              };
            });
            req = _nodeMocksHttp["default"].createRequest({
              headers: {
                authorization: "erfergrgregergergergregerger"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context18.next = 5;
            return _series["default"].getVideosByClientId(req, res);
          case 5:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(200);
          case 7:
          case "end":
            return _context18.stop();
        }
      }, _callee18);
    })));
    it("should return 400 status code if the client doesn't have any episode", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee19$(_context19) {
        while (1) switch (_context19.prev = _context19.next) {
          case 0:
            stub = _sinon["default"].stub(_jwt["default"], "jwtVerify").callsFake(function () {
              return {
                clientId: "31978540-8bdf-41cc-81d7-26200b847c0a12356778"
              };
            });
            req = _nodeMocksHttp["default"].createRequest({
              headers: {
                authorization: "erfergrgregergergergregerger"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context19.next = 5;
            return _series["default"].getVideosByClientId(req, res);
          case 5:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(400);
          case 7:
          case "end":
            return _context19.stop();
        }
      }, _callee19);
    })));
    it("should return 500 status code if there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee20$(_context20) {
        while (1) switch (_context20.prev = _context20.next) {
          case 0:
            stub = _sinon["default"].stub(_jwt["default"], "jwtVerify")["throws"](new Error("something went wrong"));
            req = _nodeMocksHttp["default"].createRequest({
              headers: {
                authorization: "erfergrgregergergergregerger"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context20.next = 5;
            return _series["default"].getVideosByClientId(req, res);
          case 5:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(500);
          case 7:
          case "end":
            return _context20.stop();
        }
      }, _callee20);
    })));
  });
});