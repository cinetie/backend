"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _dotenv = require("dotenv");
var _tempVideoServices = _interopRequireDefault(require("../services/tempVideoServices"));
var _videoServices = _interopRequireDefault(require("../services/videoServices"));
var _cpServices = _interopRequireDefault(require("../services/cpServices"));
var _utilities = _interopRequireDefault(require("../helpers/utilities"));
var _uuid = _interopRequireDefault(require("../helpers/uuid"));
var _jwt = _interopRequireDefault(require("../helpers/jwt"));
var _aws = require("../helpers/aws");
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */

(0, _dotenv.config)();
var util = new _utilities["default"]();
var tempVideoController = /*#__PURE__*/function () {
  function tempVideoController() {
    (0, _classCallCheck2["default"])(this, tempVideoController);
  }
  (0, _createClass2["default"])(tempVideoController, null, [{
    key: "createVideoController",
    value: function () {
      var _createVideoController = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var data, uploadedVideo, newVideo, _uploadedVideo, _newVideo;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              // get token
              data = req.body;
              data.tallThumbNailLink = data.portrait;
              data.nameTagThumbNailLink = data.nameTag;
              data.videoThumbnailLink = data.landscape;
              // suspend video for verification
              data.videoSuspensionState = true;
              // generate video parameters
              data.creationTime = new Date().getTime();
              data.videoId = _uuid["default"].generator();
              data.clientId = req.headers.cpid;
              data.type = req.body.type;
              data.EnSubt = req.body.EnSubt;
              data.FrSubt = req.body.FrSubt;
              data.licenseEndDate = req.body.licenseEndDate;
              if (!(data.type === "movie")) {
                _context.next = 27;
                break;
              }
              data.videoUri = _jwt["default"].jwtSign({
                videoUri: data.video,
                size: data.size,
                clientId: req.headers.cpid,
                videoId: data.videoId,
                type: "movie"
              }, process.env.SECRET);
              // register to both temp server and real server
              data.videoUrl = data.videoUri;
              _context.next = 18;
              return _tempVideoServices["default"].createNewVideos(data);
            case 18:
              uploadedVideo = _context.sent;
              _context.next = 21;
              return _videoServices["default"].createNewVideo(data);
            case 21:
              newVideo = _context.sent;
              if (uploadedVideo && newVideo) {
                _context.next = 24;
                break;
              }
              return _context.abrupt("return", util.setErrorResponse(res, "Video can't be saved", 401));
            case 24:
              util.setSuccessResponse(res, "video uploaded successfully", 201, {
                status: "upload success"
              });
              _context.next = 37;
              break;
            case 27:
              // set to serie since this video represents an entire serie
              data.videoUri = _jwt["default"].jwtSign({
                videoUri: null,
                type: "serie",
                videoId: data.videoId,
                clientId: req.headers.cpid
              }, process.env.SECRET);
              _context.next = 30;
              return _tempVideoServices["default"].createNewVideos(data);
            case 30:
              _uploadedVideo = _context.sent;
              _context.next = 33;
              return _videoServices["default"].createNewVideo(data);
            case 33:
              _newVideo = _context.sent;
              if (_newVideo && _uploadedVideo) {
                _context.next = 36;
                break;
              }
              return _context.abrupt("return", util.setErrorResponse(res, "Video can't be saved", 401));
            case 36:
              util.setSuccessResponse(res, "video uploaded successfully", 201, {
                status: "upload success"
              });
            case 37:
              _context.next = 42;
              break;
            case 39:
              _context.prev = 39;
              _context.t0 = _context["catch"](0);
              util.setErrorResponse(res, "something happened ".concat(_context.t0.message), 503);
            case 42:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 39]]);
      }));
      function createVideoController(_x, _x2) {
        return _createVideoController.apply(this, arguments);
      }
      return createVideoController;
    }()
  }, {
    key: "getAllVideosController",
    value: function () {
      var _getAllVideosController = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var videos, i, cp, decoded;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _tempVideoServices["default"].getAllVideos();
            case 3:
              videos = _context2.sent;
              i = 0;
            case 5:
              if (!(i < Object.values(videos).length)) {
                _context2.next = 17;
                break;
              }
              _context2.next = 8;
              return _cpServices["default"].getCpByClientId(videos[i].clientId);
            case 8:
              cp = _context2.sent;
              if (cp) {
                videos[i].clientId = cp.name;
              } else {
                videos[i].clientId = "default";
              }
              decoded = _jwt["default"].jwtVerify(videos[i].videoUri, process.env.SECRET);
              videos[i].videoUri = decoded.videoUri;
              videos[i] = videos[i].toJSON();
              videos[i].videoId = decoded.videoId;
            case 14:
              i++;
              _context2.next = 5;
              break;
            case 17:
              if (!(Object.values(videos).length > 0)) {
                _context2.next = 19;
                break;
              }
              return _context2.abrupt("return", util.setSuccessResponse(res, "Videos found", 200, videos));
            case 19:
              util.setErrorResponse(res, "No videos available", 404);
              _context2.next = 25;
              break;
            case 22:
              _context2.prev = 22;
              _context2.t0 = _context2["catch"](0);
              util.setErrorResponse(res, "something happened ".concat(_context2.t0.message), 503);
            case 25:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 22]]);
      }));
      function getAllVideosController(_x3, _x4) {
        return _getAllVideosController.apply(this, arguments);
      }
      return getAllVideosController;
    }()
  }, {
    key: "getParticularVideoController",
    value: function () {
      var _getParticularVideoController = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var videos, decoded, uri;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _tempVideoServices["default"].getParticularVideo(req.query.id);
            case 3:
              videos = _context3.sent;
              if (videos) {
                _context3.next = 8;
                break;
              }
              util.setErrorResponse(res, "No video available", 404);
              _context3.next = 14;
              break;
            case 8:
              decoded = _jwt["default"].jwtVerify(videos.videoUri, process.env.SECRET);
              _context3.next = 11;
              return (0, _aws.getObject)(process.env.TEMP_BUCKET_MOVIE, decoded.videoUri, 60000);
            case 11:
              uri = _context3.sent;
              videos.videoUri = uri;
              if (uri) {
                util.setSuccessResponse(res, "Video found", 200, videos);
              } else {
                util.setErrorResponse(res, "No video available", 401);
              }
            case 14:
              _context3.next = 19;
              break;
            case 16:
              _context3.prev = 16;
              _context3.t0 = _context3["catch"](0);
              util.setErrorResponse(res, "something happened ".concat(_context3.t0.message), 503);
            case 19:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 16]]);
      }));
      function getParticularVideoController(_x5, _x6) {
        return _getParticularVideoController.apply(this, arguments);
      }
      return getParticularVideoController;
    }()
  }, {
    key: "deleteParticularVideoController",
    value: function () {
      var _deleteParticularVideoController = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var video, videos, decoded, deleteTitle;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _tempVideoServices["default"].getParticularVideo(req.query.id);
            case 3:
              video = _context4.sent;
              if (video) {
                _context4.next = 6;
                break;
              }
              return _context4.abrupt("return", util.setErrorResponse(res, "No video found", 401));
            case 6:
              _context4.next = 8;
              return _tempVideoServices["default"].deleteVideos(req.query.id);
            case 8:
              videos = _context4.sent;
              decoded = _jwt["default"].jwtVerify(video.videoUri, process.env.SECRET);
              _context4.next = 12;
              return _videoServices["default"].deleteVideo(decoded.videoId);
            case 12:
              deleteTitle = _context4.sent;
              if (videos && deleteTitle) {
                util.setSuccessResponse(res, "Video deleted", 200, {
                  videos: videos,
                  deleteTitle: deleteTitle
                });
              } else {
                util.setErrorResponse(res, "No video found", 401);
              }
              _context4.next = 19;
              break;
            case 16:
              _context4.prev = 16;
              _context4.t0 = _context4["catch"](0);
              util.setErrorResponse(res, "something happened ".concat(_context4.t0.message), 503);
            case 19:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 16]]);
      }));
      function deleteParticularVideoController(_x7, _x8) {
        return _deleteParticularVideoController.apply(this, arguments);
      }
      return deleteParticularVideoController;
    }()
  }, {
    key: "updateParticularVideoController",
    value: function () {
      var _updateParticularVideoController = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var videos;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _tempVideoServices["default"].updateVideos(req.query.id, req.body);
            case 3:
              videos = _context5.sent;
              if (videos[0]) {
                util.setSuccessResponse(res, "Video updated", 200, videos);
              } else {
                util.setErrorResponse(res, "No video found", 401);
              }
              _context5.next = 10;
              break;
            case 7:
              _context5.prev = 7;
              _context5.t0 = _context5["catch"](0);
              util.setErrorResponse(res, "something happened ".concat(_context5.t0.message), 503);
            case 10:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 7]]);
      }));
      function updateParticularVideoController(_x9, _x10) {
        return _updateParticularVideoController.apply(this, arguments);
      }
      return updateParticularVideoController;
    }()
  }, {
    key: "updateParticularTempVideoController",
    value: function () {
      var _updateParticularTempVideoController = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
        var tempVideo, tempData, newUri, jwtBody, data, tempUpdate, updated;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return _tempVideoServices["default"].getParticularVideo(req.query.id);
            case 3:
              tempVideo = _context6.sent;
              if (tempVideo) {
                _context6.next = 6;
                break;
              }
              return _context6.abrupt("return", util.setErrorResponse(res, "No video available", 404));
            case 6:
              tempData = _jwt["default"].jwtVerify(tempVideo.videoUri, process.env.SECRET);
              if (!(req.body.videoKey || req.body.contentProvider || req.body.videoName)) {
                _context6.next = 20;
                break;
              }
              jwtBody = {
                videoId: tempData.videoId,
                size: null,
                videoUri: tempData.videoUri,
                clientId: tempVideo.clientId,
                type: "movie"
              };
              if (req.body.videoKey) jwtBody.videoUri = req.body.videoKey;
              if (req.body.contentProvider) jwtBody.clientId = req.body.contentProvider;
              if (tempData.type === "serie") jwtBody.type = "serie";
              newUri = _jwt["default"].jwtSign(jwtBody, process.env.SECRET);
              data = {
                videoName: tempVideo.videoName,
                videoUri: tempVideo.videoUri,
                clientId: tempVideo.clientId
              };
              if (req.body.videoName) data.videoName = req.body.videoName;
              if (req.body.contentProvider) data.clientId = req.body.contentProvider;
              if (req.body.videoKey || req.body.contentProvider) data.videoUri = newUri;
              _context6.next = 19;
              return _tempVideoServices["default"].updateVideos(req.query.id, data);
            case 19:
              tempUpdate = _context6.sent;
            case 20:
              _context6.next = 22;
              return _videoServices["default"].updateVideo(tempData.videoId, req.body);
            case 22:
              updated = _context6.sent;
              return _context6.abrupt("return", util.setSuccessResponse(res, "Video successfully updated!", 200, updated));
            case 26:
              _context6.prev = 26;
              _context6.t0 = _context6["catch"](0);
              return _context6.abrupt("return", util.setErrorResponse(res, "something happened ".concat(_context6.t0.message), 503));
            case 29:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[0, 26]]);
      }));
      function updateParticularTempVideoController(_x11, _x12) {
        return _updateParticularTempVideoController.apply(this, arguments);
      }
      return updateParticularTempVideoController;
    }()
  }, {
    key: "getSignedUrlTempVideos",
    value: function () {
      var _getSignedUrlTempVideos = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
        var _req$query, type, extension, portrait, landscape, nameTag, EnSubt, FrSubt, video;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _req$query = req.query, type = _req$query.type, extension = _req$query.extension;
              _context7.next = 4;
              return (0, _aws.getSignedUrl)(process.env.THUMBNAIL_BUCKET, "image/*", "jpg");
            case 4:
              portrait = _context7.sent;
              _context7.next = 7;
              return (0, _aws.getSignedUrl)(process.env.THUMBNAIL_BUCKET, "image/*", "jpg");
            case 7:
              landscape = _context7.sent;
              _context7.next = 10;
              return (0, _aws.getSignedUrl)(process.env.THUMBNAIL_BUCKET, "image/*", "png");
            case 10:
              nameTag = _context7.sent;
              _context7.next = 13;
              return (0, _aws.getSignedUrl)(process.env.SUBTITLE_BUCKET, "text/plain", "srt");
            case 13:
              EnSubt = _context7.sent;
              _context7.next = 16;
              return (0, _aws.getSignedUrl)(process.env.SUBTITLE_BUCKET, "text/plain", "srt");
            case 16:
              FrSubt = _context7.sent;
              if (!(type === "movie")) {
                _context7.next = 23;
                break;
              }
              _context7.next = 20;
              return (0, _aws.getSignedUrl)(process.env.TEMP_BUCKET_MOVIE, "video/*", extension);
            case 20:
              _context7.t0 = _context7.sent;
              _context7.next = 24;
              break;
            case 23:
              _context7.t0 = null;
            case 24:
              video = _context7.t0;
              util.setSuccessResponse(res, "Temporary urls", 200, {
                portrait: portrait,
                landscape: landscape,
                nameTag: nameTag,
                video: video,
                EnSubt: EnSubt,
                FrSubt: FrSubt
              });
              _context7.next = 31;
              break;
            case 28:
              _context7.prev = 28;
              _context7.t1 = _context7["catch"](0);
              util.setErrorResponse(res, "something happened ".concat(_context7.t1.message), 500);
            case 31:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[0, 28]]);
      }));
      function getSignedUrlTempVideos(_x13, _x14) {
        return _getSignedUrlTempVideos.apply(this, arguments);
      }
      return getSignedUrlTempVideos;
    }()
  }]);
  return tempVideoController;
}();
var _default = exports["default"] = tempVideoController;