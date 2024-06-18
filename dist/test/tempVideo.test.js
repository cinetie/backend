"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _chai = _interopRequireWildcard(require("chai"));
var _sinon = _interopRequireDefault(require("sinon"));
var _fs = _interopRequireDefault(require("fs"));
var _nodeMocksHttp = _interopRequireDefault(require("node-mocks-http"));
var _path = _interopRequireDefault(require("path"));
var _tempVideo = _interopRequireDefault(require("../controllers/tempVideo"));
var _aws = _interopRequireWildcard(require("../helpers/aws"));
var aws = _aws;
var _videoUploader = _interopRequireDefault(require("../helpers/videoUploader"));
var _tempVideoServices = _interopRequireDefault(require("../services/tempVideoServices"));
var _jwt = _interopRequireDefault(require("../helpers/jwt"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// let urls;
// const video = fs.readFileSync(path.join(__dirname, 'mock/test.mp4'));
// const tagname = fs.readFileSync(path.join(__dirname, 'mock/tagname.jpg'));
// const landScape = fs.readFileSync(path.join(__dirname, 'mock/landscape.jpg'));
// const portrait = fs.readFileSync(path.join(__dirname, 'mock/portrait.jpg'));
describe("TEMP VIDEO TESTS", function () {
  // before(async () => {
  //     urls = await uploader(video,landScape,portrait, tagname, 'movie', 'mp4');
  // })
  // after(async () => {
  //     await deleteObject('cinetie-temp-movies', urls.videoUrl.Key);
  //     await deleteObject('cinetie-thumbnails', urls.portraitUrl.Key);
  //     await deleteObject('cinetie-thumbnails', urls.landscapeUrl.Key);
  //     await deleteObject('cinetie-thumbnails', urls.nameTagUrl.Key);
  // })
  describe("CREATE VIDEO CONTROLLER TEST", function () {
    it("should return a 201 status after the video have been saved and the video is type movie", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var req, res, result;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            req = _nodeMocksHttp["default"].createRequest({
              headers: {
                cpid: "31978540-8bdf-41cc-81d7-26200b847c0a"
              },
              body: {
                portrait: "e34b5187-4dd8-49a9-86b1-087eb8476172.jpg",
                tagname: "e34b5187-4dd8-49a9-86b1-087eb8476173.jpg",
                landScape: "e34b5187-4dd8-49a9-86b1-087eb8476174.jpg",
                video: "e34b5187-4dd8-49a9-86b1-097eb8476171.mp4",
                type: "movie"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context.next = 4;
            return _tempVideo["default"].createVideoController(req, res);
          case 4:
            result = _context.sent;
            (0, _chai.expect)(res.statusCode).to.equal(201);
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee);
    })));
    it("should return a 201 status after the video have been saved and the video is type serie", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var req, res, result;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            req = _nodeMocksHttp["default"].createRequest({
              body: {
                portrait: "e34b5187-4dd8-49a9-86b1-087eb8576172.jpg",
                tagname: "e34b5187-4dd8-49a9-86b1-088eb8476173.jpg",
                landScape: "e34b5187-4dd8-49a9-86b1-089eb8476174.jpg",
                video: "e34b5187-4dd8-49a9-86b1-097ec8476171.mp4",
                type: "serie"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context2.next = 4;
            return _tempVideo["default"].createVideoController(req, res);
          case 4:
            result = _context2.sent;
            (0, _chai.expect)(res.statusCode).to.equal(201);
          case 6:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    })));
    it("should return 503 status message if they is an error while saving the temp video", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var req, res, result;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            req = _nodeMocksHttp["default"].createRequest({
              headers: {
                cpid: "31978540-8bdf-41cc-81d7-26200b847c0a"
              },
              body: {
                portrait: {
                  item: "six teen"
                },
                tagname: "e34b5187-4dd9-49a9-86b1-087eb8476173.jpg",
                landScape: "e34b5127-4dd8-49a9-86b1-087eb8476174.jpg",
                video: "e34b5181-4dd8-49a9-86b1-097eb8476171.mp4",
                type: "movie"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context3.next = 4;
            return _tempVideo["default"].createVideoController(req, res);
          case 4:
            result = _context3.sent;
            (0, _chai.expect)(res.statusCode).to.equal(503);
          case 6:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    })));
    it("should return 401 if the video was not saved", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var stub, req, res, result;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            stub = _sinon["default"].stub(_tempVideoServices["default"], "createNewVideos").callsFake(function () {
              return null;
            });
            req = _nodeMocksHttp["default"].createRequest({
              headers: {
                cpid: "31978540-8bdf-41cc-81d7-26200b847c0a"
              },
              body: {
                portrait: "e34b5187-4dd8-49a9-86b1-077ef8476172.jpg",
                tagname: "e34b5187-4dd8-49a9-86b1-087eb8576173.jpg",
                landScape: "e34b5187-4dd8-40a9-86b1-08beb8476174.jpg",
                video: "e34b5087-4dd80-49a9-86b1-097eb8476171.mp4",
                type: "movie"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context4.next = 5;
            return _tempVideo["default"].createVideoController(req, res);
          case 5:
            result = _context4.sent;
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(401);
          case 8:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    })));
    it("should return 401 if the video(serie) was not saved", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var stub, req, res, result;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            stub = _sinon["default"].stub(_tempVideoServices["default"], "createNewVideos").callsFake(function () {
              return null;
            });
            req = _nodeMocksHttp["default"].createRequest({
              headers: {
                cpid: "31978540-8bdf-41cc-81d7-26200b847c0a"
              },
              body: {
                portrait: "e67b5187-4dd8-49a9-86b1-087eb8476172.jpg",
                tagname: "e34g5187-4dd8-49a9-86b1-087eb8476173.jpg",
                landScape: "e45b5187-4dd8-49a9-86b1-087eb8476174.jpg",
                video: "e345r187-4dd8-49a9-86b1-097eb8476171.mp4",
                type: "serie"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context5.next = 5;
            return _tempVideo["default"].createVideoController(req, res);
          case 5:
            result = _context5.sent;
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(401);
          case 8:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    })));
  });
  describe("CREATE VIDEO CONTROLLER TEST", function () {
    // it('should return all video from a cp', async () => {
    //     const req = httpMock.createRequest();
    //     const res = httpMock.createResponse();
    //     const result = await TempVideoController.getAllVideosController(req, res);
    //     expect(res.statusCode).to.equal(200);
    // })
    it("should return a 404 error if no video is found", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var stub, req, res, result;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            stub = _sinon["default"].stub(_tempVideoServices["default"], "getAllVideos").callsFake(function () {
              return [];
            });
            req = _nodeMocksHttp["default"].createRequest();
            res = _nodeMocksHttp["default"].createResponse();
            _context6.next = 5;
            return _tempVideo["default"].getAllVideosController(req, res);
          case 5:
            result = _context6.sent;
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(404);
          case 8:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    })));
    it("should return 503 if there is an error while getting all video", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var stub, req, res, result;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            stub = _sinon["default"].stub(_tempVideoServices["default"], "getAllVideos").throwsException();
            req = _nodeMocksHttp["default"].createRequest();
            res = _nodeMocksHttp["default"].createResponse();
            _context7.next = 5;
            return _tempVideo["default"].getAllVideosController(req, res);
          case 5:
            result = _context7.sent;
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(503);
          case 8:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    })));
  });
  describe("GET PARTICULAR VIDEOS CONTROLLER", function () {
    it("should return a 404 status code if the video is not found", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      var req, res;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                id: "2334gt"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context8.next = 4;
            return _tempVideo["default"].getParticularVideoController(req, res);
          case 4:
            (0, _chai.expect)(res.statusCode).to.equal(404);
          case 5:
          case "end":
            return _context8.stop();
        }
      }, _callee8);
    })));
    // it("should return a 200 status code if the video is found", async () => {
    //   const req = httpMock.createRequest({
    //     query: {
    //       id: 157,
    //     },
    //   });
    //   const res = httpMock.createResponse();
    //   await TempVideoController.getParticularVideoController(req, res);

    //   expect(res.statusCode).to.equal(200);
    // });
    // it("should return a 401 status code if the video uri is not found", async () => {
    //   const stub = sinon.stub(aws, "getObject").callsFake(() => {
    //     return null;
    //   });
    //   const req = httpMock.createRequest({
    //     query: {
    //       id: 156,
    //     },
    //   });
    //   const res = httpMock.createResponse();
    //   await TempVideoController.getParticularVideoController(req, res);
    //   stub.restore();
    //   expect(res.statusCode).to.equal(401);
    // });
    it("should return a 503 status code if there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            stub = _sinon["default"].stub(_jwt["default"], "jwtVerify").callsFake(function () {
              return null;
            });
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                id: 156
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context9.next = 5;
            return _tempVideo["default"].getParticularVideoController(req, res);
          case 5:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(503);
          case 7:
          case "end":
            return _context9.stop();
        }
      }, _callee9);
    })));
  });
  describe("DELETE PARTICULAR VIDEO", function () {
    it("should return 404 when the video is not found", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
      var req, res;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                id: 10000
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context10.next = 4;
            return _tempVideo["default"].deleteParticularVideoController(req, res);
          case 4:
            (0, _chai.expect)(res.statusCode).to.equal(401);
          case 5:
          case "end":
            return _context10.stop();
        }
      }, _callee10);
    })));
    // it("should return 200 when the video is found And delete", async () => {
    //   const req = httpMock.createRequest({
    //     query: {
    //       id: 158,
    //     },
    //   });
    //   const res = httpMock.createResponse();
    //   await TempVideoController.deleteParticularVideoController(req, res);

    //   expect(res.statusCode).to.equal(200);
    // });
    it("should return 503 when there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            stub = _sinon["default"].stub(_tempVideoServices["default"], "getParticularVideo")["throws"](new Error("Something went wrong"));
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                id: 3
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context11.next = 5;
            return _tempVideo["default"].deleteParticularVideoController(req, res);
          case 5:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(503);
          case 7:
          case "end":
            return _context11.stop();
        }
      }, _callee11);
    })));
  });
  describe("UPDATE VIDEO CONTROLLER", function () {
    it("should return 401 status when the video is not found", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
      var req, res;
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                id: 1000000
              },
              body: {
                videoName: "james"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context12.next = 4;
            return _tempVideo["default"].updateParticularVideoController(req, res);
          case 4:
            (0, _chai.expect)(res.statusCode).to.equal(401);
          case 5:
          case "end":
            return _context12.stop();
        }
      }, _callee12);
    })));
    it("should return 200 status when the video is found and update", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
      var req, res;
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                id: 156
              },
              body: {
                videoName: "james"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context13.next = 4;
            return _tempVideo["default"].updateParticularVideoController(req, res);
          case 4:
            (0, _chai.expect)(res.statusCode).to.equal(200);
          case 5:
          case "end":
            return _context13.stop();
        }
      }, _callee13);
    })));
    it("should return 501 when there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
          case 0:
            stub = _sinon["default"].stub(_tempVideoServices["default"], "updateVideos")["throws"](new Error("Something went wrong"));
            req = _nodeMocksHttp["default"].createRequest({
              query: {
                id: 156
              },
              body: {
                videoName: "james"
              }
            });
            res = _nodeMocksHttp["default"].createResponse();
            _context14.next = 5;
            return _tempVideo["default"].updateParticularVideoController(req, res);
          case 5:
            stub.restore();
            (0, _chai.expect)(res.statusCode).to.equal(503);
          case 7:
          case "end":
            return _context14.stop();
        }
      }, _callee14);
    })));
  });
  describe("GET SIGNED URL TEMP VIDEOS TEST", function () {
    // it("should return 200 status when the link are created", async () => {
    //   const req = httpMock.createRequest();
    //   const res = httpMock.createResponse();
    //   await TempVideoController.getSignedUrlTempVideos(req, res);
    //   expect(res.statusCode).to.equal(200);
    // });
    it("should return 500 status when the link aren't created", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
      var stub, req, res;
      return _regenerator["default"].wrap(function _callee15$(_context15) {
        while (1) switch (_context15.prev = _context15.next) {
          case 0:
            stub = _sinon["default"].stub(aws, "getSignedUrl")["throws"](new Error("Something went wrong"));
            req = _nodeMocksHttp["default"].createRequest();
            res = _nodeMocksHttp["default"].createResponse();
            _context15.next = 5;
            return _tempVideo["default"].getSignedUrlTempVideos(req, res);
          case 5:
            (0, _chai.expect)(res.statusCode).to.equal(500);
          case 6:
          case "end":
            return _context15.stop();
        }
      }, _callee15);
    })));
  });
});