"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _chai = require("chai");
var _sinon = _interopRequireDefault(require("sinon"));
var _nodeMocksHttp = _interopRequireDefault(require("node-mocks-http"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _nock = _interopRequireDefault(require("nock"));
var _trailerService = _interopRequireDefault(require("../services/trailerService"));
var _video = _interopRequireDefault(require("../controllers/video"));
var _videoServices = _interopRequireDefault(require("../services/videoServices"));
var _jwt = _interopRequireDefault(require("../helpers/jwt"));
var aws = _interopRequireWildcard(require("../helpers/aws"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
describe("VIDEO TEST", function () {
  describe("ADD VIDEO", function () {
    it("should get a 500 statu code when there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var req, res;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                id: 1600000000000
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context.next = 4;
            return _video["default"].addVideo(req, res);
          case 4:
            (0, _chai.expect)(res.statusCode).to.equal(500);
          case 5:
          case "end":
            return _context.stop();
        }
      }, _callee);
    })));
  });
  describe("DELETE VIDEO", function () {
    it("should return 400 status code when the the video is not found", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var req, res;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                id: 123999
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context2.next = 4;
            return _video["default"].deleteAvideo(req, res);
          case 4:
            (0, _chai.expect)(res.statusCode).to.equal(400);
          case 5:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    })));
    it("should return 200 when the video is successfully deleted(movie)", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            stub = _sinon["default"].stub(aws, "deleteObject").callsFake(function () {
              return {};
            });
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                id: "b4677dsw3-4f34d-9921-8418-c0f364dfrty9de1"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context3.next = 5;
            return _video["default"].deleteAvideo(req, res);
          case 5:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(200);
          case 7:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    })));
    it("should return 200 when the video is successfully deleted(serie)", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var req, res;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            // const stub = sinon.stub(aws, 'deleteObject').callsFake(() => {
            //     return {};
            //   })
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                id: "b4677fy7w3-4f378i-9921-8418-c0f364dfrty9de1"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context4.next = 4;
            return _video["default"].deleteAvideo(req, res);
          case 4:
            (0, _chai.expect)(res.statusCode).to.equal(200);
          case 5:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    })));
    it("should return 500 when the video wasn't saved(movie)", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var stub, stub2, req, res;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            stub = _sinon["default"].stub(aws, "deleteObject").callsFake(function () {
              return {
                status: "fail"
              };
            });
            stub2 = _sinon["default"].stub(_videoServices["default"], "deleteVideo").callsFake(function () {
              return null;
            });
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                id: "b4677fy7w3-4f34d-9921-8418-c0f364dfrty9de1"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context5.next = 6;
            return _video["default"].deleteAvideo(req, res);
          case 6:
            stub.restore();
            stub2.restore();
            (0, _chai.expect)(res.statusCode).to.equal(500);
          case 9:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    })));
    it("should return 500 when the video wasn't saved(serie)", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            stub = _sinon["default"].stub(_videoServices["default"], "deleteVideo").callsFake(function () {
              return null;
            });
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                id: "b4677fy7w3-4f378i-kk21-8418-c0f364dfrty9de1"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context6.next = 5;
            return _video["default"].deleteAvideo(req, res);
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
  describe("GET VIDEOS BY POPULARITY", function () {
    it("should return all the popular videos(movies)", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var req, res;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                type: "movie",
                offset: 0,
                limit: 5
              },
              headers: {
                country: "Rwanda"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context7.next = 4;
            return _video["default"].getVideosByPopularity(req, res);
          case 4:
            (0, _chai.expect)(res.statusCode).to.equal(200);
          case 5:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    })));
    it("should return 404 if no popular video(movies) is found", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      var req, res;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                type: "movie",
                offset: 50000,
                limit: 5
              },
              headers: {
                country: "Rwanda"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context8.next = 4;
            return _video["default"].getVideosByPopularity(req, res);
          case 4:
            (0, _chai.expect)(res.statusCode).to.equal(404);
          case 5:
          case "end":
            return _context8.stop();
        }
      }, _callee8);
    })));
    it("should return 500 if there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            stub = _sinon["default"].stub(_videoServices["default"], "getPopularVideos")["throws"](new Error("something went wrong"));
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                type: "movie",
                offset: 50000,
                limit: 5
              },
              headers: {
                country: "Rwanda"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context9.next = 5;
            return _video["default"].getVideosByPopularity(req, res);
          case 5:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(500);
          case 7:
          case "end":
            return _context9.stop();
        }
      }, _callee9);
    })));
  });
  describe("GET VIDEO BY TREND TEST", function () {
    it("should return all the trending videos", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
      var req, res;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                type: "movie",
                offset: 0,
                limit: 5
              },
              headers: {
                country: "Rwanda"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context10.next = 4;
            return _video["default"].getVideosByTrend(req, res);
          case 4:
            (0, _chai.expect)(res.statusCode).to.equal(200);
          case 5:
          case "end":
            return _context10.stop();
        }
      }, _callee10);
    })));
    it("should return 404 status code if no trending video is found", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
      var req, res;
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                type: "movie",
                offset: 100000,
                limit: 5
              },
              headers: {
                country: "Rwanda"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context11.next = 4;
            return _video["default"].getVideosByTrend(req, res);
          case 4:
            (0, _chai.expect)(res.statusCode).to.equal(404);
          case 5:
          case "end":
            return _context11.stop();
        }
      }, _callee11);
    })));
    it("should returb a 500 status code if there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            stub = _sinon["default"].stub(_videoServices["default"], "getTrendingVideos")["throws"](new Error("something went wrong"));
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                type: "movie",
                offset: 100000,
                limit: 5
              },
              headers: {
                country: "Rwanda"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context12.next = 5;
            return _video["default"].getVideosByTrend(req, res);
          case 5:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(500);
          case 7:
          case "end":
            return _context12.stop();
        }
      }, _callee12);
    })));
  });
  describe("GET VIDEO BY CATEGORY", function () {
    it("should return all the videos in the category", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
      var req, res;
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                q: "Documentary"
              },
              headers: {
                country: "Rwanda"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context13.next = 4;
            return _video["default"].getVideosByCategory(req, res);
          case 4:
            (0, _chai.expect)(res.statusCode).to.equal(200);
          case 5:
          case "end":
            return _context13.stop();
        }
      }, _callee13);
    })));
    it("should return 404 if no video is found", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
      var req, res;
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
          case 0:
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                q: "SCifiterg"
              },
              headers: {
                country: "Rwanda"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context14.next = 4;
            return _video["default"].getVideosByCategory(req, res);
          case 4:
            (0, _chai.expect)(res.statusCode).to.equal(404);
          case 5:
          case "end":
            return _context14.stop();
        }
      }, _callee14);
    })));
    it("should return 500 if there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee15$(_context15) {
        while (1) switch (_context15.prev = _context15.next) {
          case 0:
            stub = _sinon["default"].stub(_videoServices["default"], "getVideosByCategory")["throws"](new Error("something went wrong"));
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                q: "Documentary"
              },
              headers: {
                country: "Rwanda"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context15.next = 5;
            return _video["default"].getVideosByCategory(req, res);
          case 5:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(500);
          case 7:
          case "end":
            return _context15.stop();
        }
      }, _callee15);
    })));
  });
  describe("GET VIDEOS BY SEARCH TEST", function () {
    it("should return the videos searched", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16() {
      var req, res;
      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) switch (_context16.prev = _context16.next) {
          case 0:
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                q: "vid",
                offset: 0
              },
              headers: {
                country: "Rwanda"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context16.next = 4;
            return _video["default"].search(req, res);
          case 4:
            (0, _chai.expect)(res.statusCode).to.equal(200);
          case 5:
          case "end":
            return _context16.stop();
        }
      }, _callee16);
    })));
    it("should 404 if no video is found", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17() {
      var req, res;
      return _regenerator["default"].wrap(function _callee17$(_context17) {
        while (1) switch (_context17.prev = _context17.next) {
          case 0:
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                q: "vidsqerr hea",
                offset: 400000
              },
              headers: {
                country: "Rwanda"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context17.next = 4;
            return _video["default"].search(req, res);
          case 4:
            (0, _chai.expect)(res.statusCode).to.equal(404);
          case 5:
          case "end":
            return _context17.stop();
        }
      }, _callee17);
    })));
    it("should 503 if there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee18$(_context18) {
        while (1) switch (_context18.prev = _context18.next) {
          case 0:
            stub = _sinon["default"].stub(_videoServices["default"], "search")["throws"](new Error("something went wrong"));
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                q: "vid",
                offset: 0
              },
              headers: {
                country: "Rwanda"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context18.next = 5;
            return _video["default"].search(req, res);
          case 5:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(503);
          case 7:
          case "end":
            return _context18.stop();
        }
      }, _callee18);
    })));
  });
  describe("GET ALL VIDEOS LOCAL TEST", function () {
    it("should return all videos", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19() {
      var req, res;
      return _regenerator["default"].wrap(function _callee19$(_context19) {
        while (1) switch (_context19.prev = _context19.next) {
          case 0:
            req = _nodeMocksHttp["default"].createRequest();
            res = _nodeMocksHttp["default"].createResponse();
            _context19.next = 4;
            return _video["default"].getAllVideosLocal(req, res);
          case 4:
            (0, _chai.expect)(res.statusCode).to.equal(200);
          case 5:
          case "end":
            return _context19.stop();
        }
      }, _callee19);
    })));
    it("should 404 if no video is found", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee20$(_context20) {
        while (1) switch (_context20.prev = _context20.next) {
          case 0:
            stub = _sinon["default"].stub(_videoServices["default"], "getAllVideosForAdmin").callsFake(function () {
              return [];
            });
            req = _nodeMocksHttp["default"].createRequest();
            res = _nodeMocksHttp["default"].createResponse();
            _context20.next = 5;
            return _video["default"].getAllVideosLocal(req, res);
          case 5:
            (0, _chai.expect)(res.statusCode).to.equal(404);
          case 6:
          case "end":
            return _context20.stop();
        }
      }, _callee20);
    })));
  });
  describe("GET MAIN FEATURED FILM", function () {
    it("should return the featured video", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21() {
      var req, res;
      return _regenerator["default"].wrap(function _callee21$(_context21) {
        while (1) switch (_context21.prev = _context21.next) {
          case 0:
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                type: "movie"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context21.next = 4;
            return _video["default"].getMainFeaturedFilm(req, res);
          case 4:
            (0, _chai.expect)(res.statusCode).to.equal(200);
          case 5:
          case "end":
            return _context21.stop();
        }
      }, _callee21);
    })));
    it("should 404 status code when no video is found", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee22$(_context22) {
        while (1) switch (_context22.prev = _context22.next) {
          case 0:
            stub = _sinon["default"].stub(_videoServices["default"], "getMainFeaturedVideo").callsFake(function () {
              return [];
            });
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                type: "movie"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context22.next = 5;
            return _video["default"].getMainFeaturedFilm(req, res);
          case 5:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(404);
          case 7:
          case "end":
            return _context22.stop();
        }
      }, _callee22);
    })));
    it("should 404 status code when no video trailer is found", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee23$(_context23) {
        while (1) switch (_context23.prev = _context23.next) {
          case 0:
            stub = _sinon["default"].stub(_trailerService["default"], "getAllTrailers").callsFake(function () {
              return [];
            });
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                type: "movie"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context23.next = 5;
            return _video["default"].getMainFeaturedFilm(req, res);
          case 5:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(404);
          case 7:
          case "end":
            return _context23.stop();
        }
      }, _callee23);
    })));
    it("should 500 if there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee24() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee24$(_context24) {
        while (1) switch (_context24.prev = _context24.next) {
          case 0:
            stub = _sinon["default"].stub(_trailerService["default"], "getAllTrailers")["throws"](new Error("something went wrong"));
            req = _nodeMocksHttp["default"].createResponse({
              query: {
                type: "movie"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context24.next = 5;
            return _video["default"].getMainFeaturedFilm(req, res);
          case 5:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(503);
          case 7:
          case "end":
            return _context24.stop();
        }
      }, _callee24);
    })));
  });
  describe("GET SECOND FEATURED FILM TEST", function () {
    it("should return the second featured film", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee25() {
      var req, res;
      return _regenerator["default"].wrap(function _callee25$(_context25) {
        while (1) switch (_context25.prev = _context25.next) {
          case 0:
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                type: "movie"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context25.next = 4;
            return _video["default"].getSecondFeaturedFilm(req, res);
          case 4:
            (0, _chai.expect)(res.statusCode).to.equal(200);
          case 5:
          case "end":
            return _context25.stop();
        }
      }, _callee25);
    })));
    it("should return 404 status code if no video is found", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee26() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee26$(_context26) {
        while (1) switch (_context26.prev = _context26.next) {
          case 0:
            stub = _sinon["default"].stub(_videoServices["default"], "getSecondFeaturedVideo").callsFake(function () {
              return [];
            });
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                type: "movie"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context26.next = 5;
            return _video["default"].getSecondFeaturedFilm(req, res);
          case 5:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(404);
          case 7:
          case "end":
            return _context26.stop();
        }
      }, _callee26);
    })));
    it("should return 404 status code if no video trailer is found", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee27() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee27$(_context27) {
        while (1) switch (_context27.prev = _context27.next) {
          case 0:
            stub = _sinon["default"].stub(_trailerService["default"], "getAllTrailers").callsFake(function () {
              return [];
            });
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                type: "movie"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context27.next = 5;
            return _video["default"].getSecondFeaturedFilm(req, res);
          case 5:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(404);
          case 7:
          case "end":
            return _context27.stop();
        }
      }, _callee27);
    })));
    it("should 500 if there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee28() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee28$(_context28) {
        while (1) switch (_context28.prev = _context28.next) {
          case 0:
            stub = _sinon["default"].stub(_trailerService["default"], "getAllTrailers")["throws"](new Error("something went wrong"));
            req = _nodeMocksHttp["default"].createResponse({
              query: {
                type: "movie"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context28.next = 5;
            return _video["default"].getSecondFeaturedFilm(req, res);
          case 5:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(503);
          case 7:
          case "end":
            return _context28.stop();
        }
      }, _callee28);
    })));
  });
  describe("GET NEW VIDEO TEST", function () {
    it("should return the new video", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee29() {
      var req, res;
      return _regenerator["default"].wrap(function _callee29$(_context29) {
        while (1) switch (_context29.prev = _context29.next) {
          case 0:
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                limit: 2,
                offset: 0,
                type: "serie"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context29.next = 4;
            return _video["default"].getAllNewVideos(req, res);
          case 4:
            (0, _chai.expect)(res.statusCode).to.equal(200);
          case 5:
          case "end":
            return _context29.stop();
        }
      }, _callee29);
    })));
    it("should 404 if video is not found", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee30() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee30$(_context30) {
        while (1) switch (_context30.prev = _context30.next) {
          case 0:
            stub = _sinon["default"].stub(_videoServices["default"], "getNewVideos").callsFake(function () {
              return [];
            });
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                limit: 2,
                offset: 0,
                type: "serie"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context30.next = 5;
            return _video["default"].getAllNewVideos(req, res);
          case 5:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(404);
          case 7:
          case "end":
            return _context30.stop();
        }
      }, _callee30);
    })));
    it("should return 503 when there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee31() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee31$(_context31) {
        while (1) switch (_context31.prev = _context31.next) {
          case 0:
            stub = _sinon["default"].stub(_videoServices["default"], "getNewVideos")["throws"](new Error("something went wrong"));
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                limit: 2,
                offset: 0,
                type: "serie"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context31.next = 5;
            return _video["default"].getAllNewVideos(req, res);
          case 5:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(503);
          case 7:
          case "end":
            return _context31.stop();
        }
      }, _callee31);
    })));
  });
  describe("GET VIDEOS BY TYPE", function () {
    it("should return videos", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee32() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee32$(_context32) {
        while (1) switch (_context32.prev = _context32.next) {
          case 0:
            stub = _sinon["default"].stub(_jwt["default"], "jwtVerify").callsFake(function () {
              return {
                clientId: "31978540-8bdf-41cc-81d7-26200b847c0a"
              };
            });
            req = _nodeMocksHttp["default"].createRequest({
              headers: {
                authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjMxOTc4NTQwLThiZGYtNDFjYy04MWQ3LTI2MjAwYjg0N2MwYSIsImlhdCI6MTYwODEyNDIyN30.Ngvirxcl8ho9gFve8Hcks35ogXfN6a47TjyUppKw-aQ"
              },
              query: {
                type: "movie"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context32.next = 5;
            return _video["default"].getAllVideosByType(req, res);
          case 5:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(200);
          case 7:
          case "end":
            return _context32.stop();
        }
      }, _callee32);
    })));
    it("should return 404 if no video is found", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee33() {
      var stub, stub3, req, res;
      return _regenerator["default"].wrap(function _callee33$(_context33) {
        while (1) switch (_context33.prev = _context33.next) {
          case 0:
            stub = _sinon["default"].stub(_jwt["default"], "jwtVerify").callsFake(function () {
              return {
                clientId: "31978540-8bdf-41cc-81d7-26200b847c0a"
              };
            });
            stub3 = _sinon["default"].stub(_videoServices["default"], "getVideosByType").callsFake(function () {
              return [];
            });
            req = _nodeMocksHttp["default"].createRequest({
              headers: {
                authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjMxOTc4NTQwLThiZGYtNDFjYy04MWQ3LTI2MjAwYjg0N2MwYSIsImlhdCI6MTYwODEyNDIyN30.Ngvirxcl8ho9gFve8Hcks35ogXfN6a47TjyUppKw-aQ"
              },
              query: {
                type: "movie"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context33.next = 6;
            return _video["default"].getAllVideosByType(req, res);
          case 6:
            stub.restore();
            stub3.restore();
            (0, _chai.expect)(res.statusCode).to.equal(404);
          case 9:
          case "end":
            return _context33.stop();
        }
      }, _callee33);
    })));
    it("should return 503 if there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee34() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee34$(_context34) {
        while (1) switch (_context34.prev = _context34.next) {
          case 0:
            stub = _sinon["default"].stub(_videoServices["default"], "getVideosByType")["throws"](new Error("something went wrong"));
            req = _nodeMocksHttp["default"].createRequest({
              headers: {
                authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjMxOTc4NTQwLThiZGYtNDFjYy04MWQ3LTI2MjAwYjg0N2MwYSIsImlhdCI6MTYwODEyNDIyN30.Ngvirxcl8ho9gFve8Hcks35ogXfN6a47TjyUppKw-aQ"
              },
              query: {
                type: "movie",
                limit: 5,
                offset: 0
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context34.next = 5;
            return _video["default"].getAllVideosByType(req, res);
          case 5:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(503);
          case 7:
          case "end":
            return _context34.stop();
        }
      }, _callee34);
    })));
  });
  describe("GET VIDEO BY ID TEST", function () {
    it("should return the video(movie)", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee35() {
      var req, res;
      return _regenerator["default"].wrap(function _callee35$(_context35) {
        while (1) switch (_context35.prev = _context35.next) {
          case 0:
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                id: "fr474rtt7w3-4f378i-kk21-0878-c0f364dfrty5tyh"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context35.next = 4;
            return _video["default"].getVideoById(req, res);
          case 4:
            (0, _chai.expect)(res.statusCode).to.equal(200);
          case 5:
          case "end":
            return _context35.stop();
        }
      }, _callee35);
    })));
    it("should return the video(serie)", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee36() {
      var req, res;
      return _regenerator["default"].wrap(function _callee36$(_context36) {
        while (1) switch (_context36.prev = _context36.next) {
          case 0:
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                id: "fr474rtt7w3-4f345t-kk21-0878-c0f364dfrty5tyh"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context36.next = 4;
            return _video["default"].getVideoById(req, res);
          case 4:
            (0, _chai.expect)(res.statusCode).to.equal(200);
          case 5:
          case "end":
            return _context36.stop();
        }
      }, _callee36);
    })));
    // it('should return 404 if the video is not found', async () => {
    //     const req = httpMock.createRequest({
    //         query: {
    //             id: 'fr474rtt7w3-4f37'
    //         }
    //     });
    //     const res = httpMock.createResponse();
    //     await videoController.getVideoById(req, res);
    //     expect(res.statusCode).to.equal(404);
    // });
    it("should return 503 if there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee37() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee37$(_context37) {
        while (1) switch (_context37.prev = _context37.next) {
          case 0:
            stub = _sinon["default"].stub(_videoServices["default"], "getVideoById")["throws"](new Error("something went wrong"));
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                id: "fr474rtt7w3-4f378i-kk21-0878-c0f364dfrty5tyh"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context37.next = 5;
            return _video["default"].getVideoById(req, res);
          case 5:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(503);
          case 7:
          case "end":
            return _context37.stop();
        }
      }, _callee37);
    })));
  });
  describe("UPDATE VIDEO TEST", function () {
    it("should update the video and return 200 status code", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee38() {
      var req, res;
      return _regenerator["default"].wrap(function _callee38$(_context38) {
        while (1) switch (_context38.prev = _context38.next) {
          case 0:
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                id: "fr474rtt7w3-4f345t-kk21-5679-c0f364dfrty5tyh"
              },
              body: {
                videoName: "The hyena"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context38.next = 4;
            return _video["default"].updateVideos(req, res);
          case 4:
            (0, _chai.expect)(res.statusCode).to.equal(200);
          case 5:
          case "end":
            return _context38.stop();
        }
      }, _callee38);
    })));
    // it('should return 404 if the video is not found', async () => {
    //     const req = httpMock.createRequest({
    //         query: {
    //             id: 'fr474rtt7w3-4f345t-kk21'
    //         },
    //         body: {
    //             videoName: 'The hyena'
    //         }
    //     });
    //     const res = httpMock.createResponse();
    //     await videoController.updateVideos(req, res);
    //     expect(res.statusCode).to.equal(404)
    // });
    it("should return 500  if there i a server", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee39() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee39$(_context39) {
        while (1) switch (_context39.prev = _context39.next) {
          case 0:
            stub = _sinon["default"].stub(_videoServices["default"], "getVideoById")["throws"](new Error("something went wrong"));
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                id: "fr474rtt7w3-4f345t-kk21-5679-c0f364dfrty5tyh"
              },
              body: {
                videoName: "The hyena"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context39.next = 5;
            return _video["default"].updateVideos(req, res);
          case 5:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(500);
          case 7:
          case "end":
            return _context39.stop();
        }
      }, _callee39);
    })));
  });
  describe("FEATURE VIDEO TEST", function () {
    it("should return 404 if video is not found", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee40() {
      var req, res;
      return _regenerator["default"].wrap(function _callee40$(_context40) {
        while (1) switch (_context40.prev = _context40.next) {
          case 0:
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                id: "dfergrg"
              },
              body: {
                isFeatured: true,
                type: "movie",
                featureType: 1
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context40.next = 4;
            return _video["default"].featureVideo(req, res);
          case 4:
            (0, _chai.expect)(res.statusCode).to.equal(404);
          case 5:
          case "end":
            return _context40.stop();
        }
      }, _callee40);
    })));
    it("should return 500 status code if there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee41() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee41$(_context41) {
        while (1) switch (_context41.prev = _context41.next) {
          case 0:
            stub = _sinon["default"].stub(_videoServices["default"], "getVideoById")["throws"](new Error("something went wrong"));
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                id: "dfergrg"
              },
              body: {
                isFeatured: true,
                type: "movie",
                featureType: 1
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context41.next = 5;
            return _video["default"].featureVideo(req, res);
          case 5:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(500);
          case 7:
          case "end":
            return _context41.stop();
        }
      }, _callee41);
    })));
    it("should return 200 after the vide has been updated", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee42() {
      var req, res;
      return _regenerator["default"].wrap(function _callee42$(_context42) {
        while (1) switch (_context42.prev = _context42.next) {
          case 0:
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                id: "fr474rttx34-4f345t-kk21-5679-c0f364dfrtyv7ui"
              },
              body: {
                isFeatured: true,
                type: "movie",
                featureType: 1
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context42.next = 4;
            return _video["default"].featureVideo(req, res);
          case 4:
            (0, _chai.expect)(res.statusCode).to.equal(200);
          case 5:
          case "end":
            return _context42.stop();
        }
      }, _callee42);
    })));
  });
  describe("getAttachedThumbsMultiple TEST", function () {
    it("should update the video arrays and thumbnailsLink", function () {
      var videos = [{
        id: 32,
        videoLink: "14acd40f-54e6-4d41fg-88a1-2efbdf49dfgcac59.mp4",
        videoId: "fr474rttx34-4f345t-kk21-5679-c0f364dfrtyv7ui",
        videoName: "video 10",
        videoCast: "basmah ,reyhab , rasha",
        videoSynopsis: " a women who have given an oath to help women deliver their babies safely, even in times of conflict in Azraq Refugee Camp, Jordan",
        videoWatchCount: 0,
        videoThumbnailLink: "71254d4dft5-5127-4036-be54-782721b5t5327.jpg",
        videoIdVimeo: "0000",
        videoClientId: "31978540-8bdf-41cc-81d7-26200b847c0a",
        rate: "1599144054255",
        isFeatured: true,
        category: "Documentary",
        type: "movie",
        featureType: 0,
        resCountries: "Uganda, Kenya",
        videoSuspensionState: false,
        nameTagThumbNailLink: "742bfa3b68-1fb14-418e-ak84-82ce251103de.jpg",
        tallThumbNailLink: "6bfdb5tw3-2455-4578-b9D4a-7abfd412f9c814.png",
        creationTime: new Date().getTime(),
        updatedAt: new Date(),
        createdAt: new Date()
      }];
      _video["default"].getAttachedThumbsMultiple(videos);
      (0, _chai.expect)(videos[0].videoThumbnailLink).to.be.a("string");
      (0, _chai.expect)(videos[0].tallThumbNailLink).to.be.a("string");
      (0, _chai.expect)(videos[0].nameTagThumbNailLink).to.be.a("string");
    });
  });
  describe("CREATE NEW WATCH COUNT TESTS", function () {
    it("should return 400 status code if the ip or videoId is not provided", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee43() {
      var req, res;
      return _regenerator["default"].wrap(function _callee43$(_context43) {
        while (1) switch (_context43.prev = _context43.next) {
          case 0:
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                id: null
              },
              headers: {
                authorization: "dfrrrrrrrrrrrrrrrrrrrrrrr",
                ip: null
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context43.next = 4;
            return _video["default"].createNewWatchCount(req, res);
          case 4:
            (0, _chai.expect)(res.statusCode).to.equal(400);
          case 5:
          case "end":
            return _context43.stop();
        }
      }, _callee43);
    })));
    // it('should return 404 if the video is not found', async () => {
    //     const req = httpMock.createRequest({
    //         query: {
    //             id: 'frefergtrgtrgrt'
    //         },
    //         headers: {
    //             authorization: 'ferferffffffffffffffffffffffffffffffff',
    //             ip: '168.212.226.204',
    //         }
    //     });
    //     const res = httpMock.createResponse();
    //     await videoController.createNewWatchCount(req, res);
    //     expect(res.statusCode).to.equal(404);
    // });
    it("should return 201 when a view session is registered", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee44() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee44$(_context44) {
        while (1) switch (_context44.prev = _context44.next) {
          case 0:
            stub = _sinon["default"].stub(_jwt["default"], "jwtVerify").callsFake(function () {
              return {
                email: "user3456@example.com"
              };
            });
            (0, _nock["default"])("http://api.ipstack.com").get("/168.212.226.204?access_key=".concat(process.env.IP_STACK_ACCESS_TOKEN)).reply(200, {
              country_name: "Rwanda"
            });
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                id: "fr474rtt7w3-4f378i-kk21-0878-c0f364dfgts5tyh"
              },
              headers: {
                authorization: "ferferffffffffffffffffffffffffffffffff",
                ip: "168.212.226.204"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context44.next = 6;
            return _video["default"].createNewWatchCount(req, res);
          case 6:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(201);
          case 8:
          case "end":
            return _context44.stop();
        }
      }, _callee44);
    })));
    it("should return 400 if the user is on trial", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee45() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee45$(_context45) {
        while (1) switch (_context45.prev = _context45.next) {
          case 0:
            stub = _sinon["default"].stub(_jwt["default"], "jwtVerify").callsFake(function () {
              return {
                email: "user34567@example.com"
              };
            });
            (0, _nock["default"])("http://api.ipstack.com").get("/168.212.226.204?access_key=".concat(process.env.IP_STACK_ACCESS_TOKEN)).reply(200, {
              country_name: "Rwanda"
            });
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                id: "fr474rtt7w3-4f378i-kk21-0878-c0f364dfgts5tyh"
              },
              headers: {
                authorization: "ferferffffffffffffffffffffffffffffffff",
                ip: "168.212.226.204"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context45.next = 6;
            return _video["default"].createNewWatchCount(req, res);
          case 6:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(400);
          case 8:
          case "end":
            return _context45.stop();
        }
      }, _callee45);
    })));
    it("should return 500 if there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee46() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee46$(_context46) {
        while (1) switch (_context46.prev = _context46.next) {
          case 0:
            stub = _sinon["default"].stub(_jwt["default"], "jwtVerify")["throws"](new Error("something went wrong"));
            (0, _nock["default"])("http://api.ipstack.com").get("/168.212.226.204?access_key=".concat(process.env.IP_STACK_ACCESS_TOKEN)).reply(200, {
              country_name: "Rwanda"
            });
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                id: "fr474rtt7w3-4f378i-kk21-0878-c0f364dfgts5tyh"
              },
              headers: {
                authorization: "ferferffffffffffffffffffffffffffffffff",
                ip: "168.212.226.204"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context46.next = 6;
            return _video["default"].createNewWatchCount(req, res);
          case 6:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(500);
          case 8:
          case "end":
            return _context46.stop();
        }
      }, _callee46);
    })));
  });
});