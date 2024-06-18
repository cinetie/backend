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
var _nodeFetch = _interopRequireDefault(require("node-fetch"));
var _dotenv = require("dotenv");
var _response = _interopRequireDefault(require("../helpers/response"));
var _utilities = _interopRequireDefault(require("../helpers/utilities"));
var _jwt = _interopRequireDefault(require("../helpers/jwt"));
var _trailerService = _interopRequireDefault(require("../services/trailerService"));
var _tempVideoServices = _interopRequireDefault(require("../services/tempVideoServices"));
var _watchedMovieServices = _interopRequireDefault(require("../services/watchedMovieServices"));
var _aws = require("../helpers/aws");
var _video = require("../helpers/video");
var _videoServices = _interopRequireDefault(require("../services/videoServices"));
var _serieServices = _interopRequireDefault(require("../services/serieServices"));
var _viewingSessionsServices = _interopRequireDefault(require("../services/viewingSessionsServices"));
var _userServices = _interopRequireDefault(require("../services/userServices"));
var _redis = require("../helpers/redis");
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */

(0, _dotenv.config)();
var util = new _utilities["default"]();
var Video = /*#__PURE__*/function () {
  function Video() {
    (0, _classCallCheck2["default"])(this, Video);
  }
  (0, _createClass2["default"])(Video, null, [{
    key: "addVideo",
    value: function () {
      var _addVideo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var tempVideo, decoded, data, copyFile, updatedVideo, deleted, deleteAWS, _deleted, _updatedVideo;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _tempVideoServices["default"].getParticularVideo(Number(req.query.id));
            case 3:
              tempVideo = _context.sent;
              decoded = _jwt["default"].jwtVerify(tempVideo.videoUri, process.env.SECRET);
              data = decoded;
              if (!(data.type === "movie")) {
                _context.next = 32;
                break;
              }
              data.videoClientId = decoded.clientId;
              data.videoSuspensionState = false;
              data.size = decoded.size;
              _context.next = 12;
              return (0, _aws.copyObjects)(process.env.TEMP_BUCKET_MOVIE, process.env.PERMANENT_BUCKET_MOVIE, decoded.videoUri);
            case 12:
              copyFile = _context.sent;
              if (copyFile) {
                _context.next = 17;
                break;
              }
              util.setErrorResponse(res, "something went wrong while uploading", 503);
              _context.next = 30;
              break;
            case 17:
              // copy back the same key from the temp bucket
              // delete the object in temp
              data.videoClientId = decoded.clientId;
              data.videoKey = decoded.videoUri;
              data.videoIdVimeo = "0000";
              _context.next = 22;
              return _videoServices["default"].updateVideo(decoded.videoId, data);
            case 22:
              updatedVideo = _context.sent;
              _context.next = 25;
              return _tempVideoServices["default"].deleteVideos(req.query.id);
            case 25:
              deleted = _context.sent;
              _context.next = 28;
              return (0, _aws.deleteObject)(process.env.TEMP_BUCKET_MOVIE, decoded.videoUri);
            case 28:
              deleteAWS = _context.sent;
              if (!updatedVideo[0] || !deleted || !deleteAWS) {
                util.setErrorResponse(res, "something went wrong while approving video", 503);
              } else {
                util.setSuccessResponse(res, "Video uploaded", 201, updatedVideo);
              }
            case 30:
              _context.next = 39;
              break;
            case 32:
              _context.next = 34;
              return _tempVideoServices["default"].deleteVideos(req.query.id);
            case 34:
              _deleted = _context.sent;
              _context.next = 37;
              return _videoServices["default"].updateVideo(decoded.videoId, {
                videoSuspensionState: false,
                videoClientId: decoded.clientId
              });
            case 37:
              _updatedVideo = _context.sent;
              if (!_updatedVideo[0] || !_deleted) {
                util.setErrorResponse(res, "Something went wrong approving video", 503);
              } else {
                util.setSuccessResponse(res, "Video approved", 201, _updatedVideo);
              }
            case 39:
              _context.next = 44;
              break;
            case 41:
              _context.prev = 41;
              _context.t0 = _context["catch"](0);
              util.setErrorResponse(res, "Something went wrong : ".concat(_context.t0.message), 500);
            case 44:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 41]]);
      }));
      function addVideo(_x, _x2) {
        return _addVideo.apply(this, arguments);
      }
      return addVideo;
    }()
  }, {
    key: "deleteAvideo",
    value: function () {
      var _deleteAvideo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var returned, deletedVideo, results;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _videoServices["default"].getVideoById(req.query.id);
            case 3:
              returned = _context2.sent;
              if (!returned) {
                _context2.next = 18;
                break;
              }
              _context2.next = 7;
              return _videoServices["default"].deleteVideo(req.query.id);
            case 7:
              deletedVideo = _context2.sent;
              if (!returned.videoLink) {
                _context2.next = 15;
                break;
              }
              _context2.next = 11;
              return (0, _aws.deleteObject)(process.env.PERMANENT_BUCKET_MOVIE, returned.videoLink);
            case 11:
              results = _context2.sent;
              if (!(deletedVideo || Object.values(results).length === 0)) {
                _context2.next = 14;
                break;
              }
              return _context2.abrupt("return", _response["default"].successResponse(res, 200, "Video successfully deleted!", deletedVideo));
            case 14:
              return _context2.abrupt("return", _response["default"].errorResponse(res, 500, "Video could not be deleted", "SERVER_ERROR"));
            case 15:
              if (!deletedVideo) {
                _context2.next = 17;
                break;
              }
              return _context2.abrupt("return", _response["default"].successResponse(res, 200, "Video successfully deleted!", deletedVideo));
            case 17:
              return _context2.abrupt("return", _response["default"].errorResponse(res, 500, "Video could not be deleted", "SERVER_ERROR"));
            case 18:
              return _context2.abrupt("return", _response["default"].errorResponse(res, 400, "Video was not found or access to it was denied", "BAD_REQUEST"));
            case 21:
              _context2.prev = 21;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", _response["default"].errorResponse(res, 500, "Something went wrong", _context2.t0.message));
            case 24:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 21]]);
      }));
      function deleteAvideo(_x3, _x4) {
        return _deleteAvideo.apply(this, arguments);
      }
      return deleteAvideo;
    }()
  }, {
    key: "getVideosByPopularity",
    value: function () {
      var _getVideosByPopularity = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var _req$query, type, offset, limit, country, cachedVideos, videos;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _req$query = req.query, type = _req$query.type, offset = _req$query.offset, limit = _req$query.limit;
              country = req.headers.country;
              console.log("pop-".concat(type, "-").concat(country, "-").concat(offset, "-").concat(limit));
              _context3.next = 6;
              return (0, _redis.get)("pop-".concat(type, "-").concat(country, "-").concat(offset, "-").concat(limit));
            case 6:
              cachedVideos = _context3.sent;
              if (!cachedVideos) {
                _context3.next = 9;
                break;
              }
              return _context3.abrupt("return", util.setSuccessResponse(res, "videos found", 200, cachedVideos));
            case 9:
              _context3.next = 11;
              return _videoServices["default"].getPopularVideos(offset, limit, type, country);
            case 11:
              videos = _context3.sent;
              (0, _video.getAttachedThumbsMultiple)(videos);
              if (!(Object.values(videos).length > 0)) {
                _context3.next = 17;
                break;
              }
              _context3.next = 16;
              return (0, _redis.set)("pop-".concat(type, "-").concat(country, "-").concat(offset, "-").concat(limit), videos);
            case 16:
              return _context3.abrupt("return", util.setSuccessResponse(res, "videos found", 200, videos));
            case 17:
              return _context3.abrupt("return", util.setErrorResponse(res, "Data not found", 404));
            case 20:
              _context3.prev = 20;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", util.setErrorResponse(res, _context3.t0.message, 500));
            case 23:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 20]]);
      }));
      function getVideosByPopularity(_x5, _x6) {
        return _getVideosByPopularity.apply(this, arguments);
      }
      return getVideosByPopularity;
    }()
  }, {
    key: "getVideosByTrend",
    value: function () {
      var _getVideosByTrend = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var _req$query2, type, offset, limit, country, cached, videos;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _req$query2 = req.query, type = _req$query2.type, offset = _req$query2.offset, limit = _req$query2.limit;
              country = req.headers.country;
              _context4.next = 5;
              return (0, _redis.get)("trend-".concat(type, "-").concat(country, "-").concat(offset, "-").concat(limit));
            case 5:
              cached = _context4.sent;
              if (!cached) {
                _context4.next = 8;
                break;
              }
              return _context4.abrupt("return", util.setSuccessResponse(res, "videos found", 200, cached));
            case 8:
              _context4.next = 10;
              return _videoServices["default"].getTrendingVideos(req.query.offset, req.query.limit, type, country);
            case 10:
              videos = _context4.sent;
              (0, _video.getAttachedThumbsMultiple)(videos);
              if (!(Object.values(videos).length > 0)) {
                _context4.next = 16;
                break;
              }
              _context4.next = 15;
              return (0, _redis.set)("trend-".concat(type, "-").concat(country, "-").concat(offset, "-").concat(limit), videos);
            case 15:
              return _context4.abrupt("return", util.setSuccessResponse(res, "videos found", 200, videos));
            case 16:
              return _context4.abrupt("return", util.setErrorResponse(res, "Data not found", 404));
            case 19:
              _context4.prev = 19;
              _context4.t0 = _context4["catch"](0);
              return _context4.abrupt("return", util.setErrorResponse(res, _context4.t0.message, 500));
            case 22:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 19]]);
      }));
      function getVideosByTrend(_x7, _x8) {
        return _getVideosByTrend.apply(this, arguments);
      }
      return getVideosByTrend;
    }()
  }, {
    key: "getVideosByCategory",
    value: function () {
      var _getVideosByCategory = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var country, q, cached, videos;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              country = req.headers.country;
              q = req.query.q;
              _context5.next = 5;
              return (0, _redis.get)("cat-".concat(q, "-").concat(country));
            case 5:
              cached = _context5.sent;
              if (!cached) {
                _context5.next = 8;
                break;
              }
              return _context5.abrupt("return", util.setSuccessResponse(res, "".concat(req.query.q, " videos found"), 200, cached));
            case 8:
              _context5.next = 10;
              return _videoServices["default"].getVideosByCategory(req.query.q, country);
            case 10:
              videos = _context5.sent;
              (0, _video.getAttachedThumbsMultiple)(videos);
              if (!(Object.values(videos).length > 0)) {
                _context5.next = 16;
                break;
              }
              _context5.next = 15;
              return (0, _redis.set)("cat-".concat(q, "-").concat(country));
            case 15:
              return _context5.abrupt("return", util.setSuccessResponse(res, "".concat(req.query.q, " videos found"), 200, videos));
            case 16:
              return _context5.abrupt("return", util.setErrorResponse(res, "Data not found", 404));
            case 19:
              _context5.prev = 19;
              _context5.t0 = _context5["catch"](0);
              return _context5.abrupt("return", util.setErrorResponse(res, _context5.t0.message, 500));
            case 22:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 19]]);
      }));
      function getVideosByCategory(_x9, _x10) {
        return _getVideosByCategory.apply(this, arguments);
      }
      return getVideosByCategory;
    }()
  }, {
    key: "search",
    value: function () {
      var _search = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
        var _req$query3, q, offset, country, cached, videos;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _req$query3 = req.query, q = _req$query3.q, offset = _req$query3.offset;
              country = req.headers.country;
              _context6.next = 5;
              return (0, _redis.get)("search-".concat(q, "-").concat(country, "-").concat(offset));
            case 5:
              cached = _context6.sent;
              if (cached) {
                util.setSuccessResponse(res, "Videos found", 200, cached);
              }
              _context6.next = 9;
              return _videoServices["default"].search(q, offset, country);
            case 9:
              videos = _context6.sent;
              (0, _video.getAttachedThumbsMultiple)(videos);
              console.log(videos);
              if (!(Object.values(videos).length > 0)) {
                _context6.next = 18;
                break;
              }
              _context6.next = 15;
              return (0, _redis.set)("search-".concat(q, "-").concat(country, "-").concat(offset));
            case 15:
              util.setSuccessResponse(res, "Videos found", 200, videos);
              _context6.next = 19;
              break;
            case 18:
              util.setErrorResponse(res, "Data not found", 404);
            case 19:
              _context6.next = 24;
              break;
            case 21:
              _context6.prev = 21;
              _context6.t0 = _context6["catch"](0);
              util.setErrorResponse(res, "somethin went wrong : ".concat(_context6.t0.message), 503);
            case 24:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[0, 21]]);
      }));
      function search(_x11, _x12) {
        return _search.apply(this, arguments);
      }
      return search;
    }()
  }, {
    key: "getAllVideosLocal",
    value: function () {
      var _getAllVideosLocal = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
        var videos;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return _videoServices["default"].getAllVideosForAdmin();
            case 2:
              videos = _context7.sent;
              (0, _video.getAttachedThumbsMultiple)(videos);
              if (Object.values(videos).length > 0) {
                util.setSuccessResponse(res, "Data found", 200, videos);
              } else {
                util.setErrorResponse(res, "Data not found", 404);
              }
            case 5:
            case "end":
              return _context7.stop();
          }
        }, _callee7);
      }));
      function getAllVideosLocal(_x13, _x14) {
        return _getAllVideosLocal.apply(this, arguments);
      }
      return getAllVideosLocal;
    }()
  }, {
    key: "getAttachedThumbsMultiple",
    value: function getAttachedThumbsMultiple(videos) {
      for (var i = 0; i < videos.length; i++) {
        videos[i].videoThumbnailLink = Video.attachThumbnails(videos[i].videoThumbnailLink, process.env.THUMBNAIL_BUCKET);
        videos[i].tallThumbNailLink = Video.attachThumbnails(videos[i].tallThumbNailLink, process.env.THUMBNAIL_BUCKET);
        videos[i].nameTagThumbNailLink = Video.attachThumbnails(videos[i].nameTagThumbNailLink, process.env.THUMBNAIL_BUCKET);
      }
    }
  }, {
    key: "getMainFeaturedFilm",
    value: function () {
      var _getMainFeaturedFilm = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
        var type, video, trailer, data;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              type = req.query.type;
              _context8.next = 4;
              return _videoServices["default"].getMainFeaturedVideo(type);
            case 4:
              video = _context8.sent;
              if (video.length) {
                _context8.next = 7;
                break;
              }
              return _context8.abrupt("return", util.setErrorResponse(res, "Video can't be found", 404));
            case 7:
              (0, _video.getAttachedThumbsMultiple)(video);
              _context8.next = 10;
              return _trailerService["default"].getAllTrailers(video[0].videoId);
            case 10:
              trailer = _context8.sent;
              if (trailer.length > 0) {
                data = {
                  video: video,
                  trailer: Video.attachThumbnails(trailer[0].trailerLink, process.env.TRAILERS_BUCKET)
                };
                util.setSuccessResponse(res, "Video Found", 200, data);
              } else {
                util.setErrorResponse(res, "Video can't be found", 404);
              }
              _context8.next = 17;
              break;
            case 14:
              _context8.prev = 14;
              _context8.t0 = _context8["catch"](0);
              util.setErrorResponse(res, "something went wrong ".concat(_context8.t0.message), 503);
            case 17:
            case "end":
              return _context8.stop();
          }
        }, _callee8, null, [[0, 14]]);
      }));
      function getMainFeaturedFilm(_x15, _x16) {
        return _getMainFeaturedFilm.apply(this, arguments);
      }
      return getMainFeaturedFilm;
    }()
  }, {
    key: "getSecondFeaturedFilm",
    value: function () {
      var _getSecondFeaturedFilm = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
        var type, video, trailer, data;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              type = req.query.type;
              _context9.next = 4;
              return _videoServices["default"].getSecondFeaturedVideo(type);
            case 4:
              video = _context9.sent;
              if (video.length) {
                _context9.next = 7;
                break;
              }
              return _context9.abrupt("return", util.setErrorResponse(res, "Video can't be found", 404));
            case 7:
              (0, _video.getAttachedThumbsMultiple)(video);
              _context9.next = 10;
              return _trailerService["default"].getAllTrailers(video[0].videoId);
            case 10:
              trailer = _context9.sent;
              if (trailer[0]) {
                _context9.next = 13;
                break;
              }
              return _context9.abrupt("return", util.setErrorResponse(res, "Video can't be found", 404));
            case 13:
              data = {
                video: video,
                trailer: Video.attachThumbnails(trailer[0].trailerLink, process.env.TRAILERS_BUCKET)
              };
              if (data) {
                util.setSuccessResponse(res, "videos Found", 200, data);
              } else {
                util.setErrorResponse(res, "Video can't be found", 404);
              }
              _context9.next = 20;
              break;
            case 17:
              _context9.prev = 17;
              _context9.t0 = _context9["catch"](0);
              util.setErrorResponse(res, "something went wrong ".concat(_context9.t0.message), 503);
            case 20:
            case "end":
              return _context9.stop();
          }
        }, _callee9, null, [[0, 17]]);
      }));
      function getSecondFeaturedFilm(_x17, _x18) {
        return _getSecondFeaturedFilm.apply(this, arguments);
      }
      return getSecondFeaturedFilm;
    }()
  }, {
    key: "getAllNewVideos",
    value: function () {
      var _getAllNewVideos = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
        var videos;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              _context10.next = 3;
              return _videoServices["default"].getNewVideos(req.query.limit, req.query.offset, req.query.type);
            case 3:
              videos = _context10.sent;
              (0, _video.getAttachedThumbsMultiple)(videos);
              if (Object.values(videos).length >= 1) {
                util.setSuccessResponse(res, "videos Found", 200, videos);
              } else {
                util.setErrorResponse(res, "Video can't be found", 404);
              }
              _context10.next = 11;
              break;
            case 8:
              _context10.prev = 8;
              _context10.t0 = _context10["catch"](0);
              util.setErrorResponse(res, "something went wrong ".concat(_context10.t0.message), 503);
            case 11:
            case "end":
              return _context10.stop();
          }
        }, _callee10, null, [[0, 8]]);
      }));
      function getAllNewVideos(_x19, _x20) {
        return _getAllNewVideos.apply(this, arguments);
      }
      return getAllNewVideos;
    }()
  }, {
    key: "getAllVideosByType",
    value: function () {
      var _getAllVideosByType = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
        var token, type, _jwt$jwtVerify, clientId, videos;
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _context11.prev = 0;
              token = req.headers.authorization.slice(7);
              type = req.query.type;
              _jwt$jwtVerify = _jwt["default"].jwtVerify(token, process.env.SECRET), clientId = _jwt$jwtVerify.clientId;
              _context11.next = 6;
              return _videoServices["default"].getVideosByType(clientId, type);
            case 6:
              videos = _context11.sent;
              (0, _video.getAttachedThumbsMultiple)(videos);
              if (Object.values(videos).length > 0) {
                util.setSuccessResponse(res, "Videos Found", 200, videos);
              } else {
                util.setErrorResponse(res, "videos can't be found", 404);
              }
              _context11.next = 14;
              break;
            case 11:
              _context11.prev = 11;
              _context11.t0 = _context11["catch"](0);
              util.setErrorResponse(res, "something went wrong ".concat(_context11.t0.message), 503);
            case 14:
            case "end":
              return _context11.stop();
          }
        }, _callee11, null, [[0, 11]]);
      }));
      function getAllVideosByType(_x21, _x22) {
        return _getAllVideosByType.apply(this, arguments);
      }
      return getAllVideosByType;
    }()
  }, {
    key: "getVideoById",
    value: function () {
      var _getVideoById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res) {
        var video;
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              _context12.prev = 0;
              _context12.next = 3;
              return _videoServices["default"].getVideoById(req.query.id);
            case 3:
              video = _context12.sent;
              if (!video) {
                _context12.next = 16;
                break;
              }
              if (!video.EnSubt) {
                _context12.next = 9;
                break;
              }
              _context12.next = 8;
              return (0, _aws.getObject)(process.env.SUBTITLE_BUCKET, video.EnSubt, 20);
            case 8:
              video.EnSubt = _context12.sent;
            case 9:
              if (!video.FrSubt) {
                _context12.next = 13;
                break;
              }
              _context12.next = 12;
              return (0, _aws.getObject)(process.env.SUBTITLE_BUCKET, video.FrSubt, 20);
            case 12:
              video.FrSubt = _context12.sent;
            case 13:
              util.setSuccessResponse(res, "videos Found", 200, video);
              _context12.next = 17;
              break;
            case 16:
              util.setErrorResponse(res, "Video can't be found", 404);
            case 17:
              _context12.next = 22;
              break;
            case 19:
              _context12.prev = 19;
              _context12.t0 = _context12["catch"](0);
              util.setErrorResponse(res, "something went wrong ".concat(_context12.t0.message), 503);
            case 22:
            case "end":
              return _context12.stop();
          }
        }, _callee12, null, [[0, 19]]);
      }));
      function getVideoById(_x23, _x24) {
        return _getVideoById.apply(this, arguments);
      }
      return getVideoById;
    }()
  }, {
    key: "SharableVideo",
    value: function () {
      var _SharableVideo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
        var video;
        return _regenerator["default"].wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              _context13.prev = 0;
              _context13.next = 3;
              return _videoServices["default"].getVideoById(req.params.id);
            case 3:
              video = _context13.sent;
              if (video) {
                video.videoLink = "";
                video.videoKey = "";
                util.setSuccessResponse(res, "videos Found", 200, video);
              } else {
                util.setErrorResponse(res, "Video can't be found", 404);
              }
              _context13.next = 10;
              break;
            case 7:
              _context13.prev = 7;
              _context13.t0 = _context13["catch"](0);
              util.setErrorResponse(res, "something went wrong ".concat(_context13.t0.message), 503);
            case 10:
            case "end":
              return _context13.stop();
          }
        }, _callee13, null, [[0, 7]]);
      }));
      function SharableVideo(_x25, _x26) {
        return _SharableVideo.apply(this, arguments);
      }
      return SharableVideo;
    }() // eslint-disable-next-line consistent-return
  }, {
    key: "updateVideos",
    value: function () {
      var _updateVideos = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req, res) {
        var returned, toUpdate, updated;
        return _regenerator["default"].wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              _context14.prev = 0;
              _context14.next = 3;
              return _videoServices["default"].getVideoById(req.query.id);
            case 3:
              returned = _context14.sent;
              if (returned) {
                _context14.next = 6;
                break;
              }
              return _context14.abrupt("return", _response["default"].errorResponse(res, 404, "Video not updated"));
            case 6:
              toUpdate = req.body;
              _context14.next = 9;
              return _videoServices["default"].updateVideo(req.query.id, toUpdate);
            case 9:
              updated = _context14.sent;
              return _context14.abrupt("return", _response["default"].successResponse(res, 200, "Video successfully updated!", updated));
            case 13:
              _context14.prev = 13;
              _context14.t0 = _context14["catch"](0);
              _response["default"].errorResponse(res, 500, "Something went wrong", _context14.t0.message);
            case 16:
            case "end":
              return _context14.stop();
          }
        }, _callee14, null, [[0, 13]]);
      }));
      function updateVideos(_x27, _x28) {
        return _updateVideos.apply(this, arguments);
      }
      return updateVideos;
    }() // eslint-disable-next-line consistent-return
  }, {
    key: "featureVideo",
    value: function () {
      var _featureVideo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(req, res) {
        var _req$body, featureType, isFeatured, type, returned, resetFeatured, updated;
        return _regenerator["default"].wrap(function _callee15$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              _context15.prev = 0;
              _req$body = req.body, featureType = _req$body.featureType, isFeatured = _req$body.isFeatured, type = _req$body.type;
              _context15.next = 4;
              return _videoServices["default"].getVideoById(req.query.id);
            case 4:
              returned = _context15.sent;
              if (returned) {
                _context15.next = 7;
                break;
              }
              return _context15.abrupt("return", _response["default"].errorResponse(res, 404, "Video not updated"));
            case 7:
              _context15.next = 9;
              return _videoServices["default"].resetFeaturedVideo(featureType, isFeatured, type);
            case 9:
              resetFeatured = _context15.sent;
              if (!(resetFeatured[0] === 0)) {
                _context15.next = 12;
                break;
              }
              return _context15.abrupt("return", _response["default"].errorResponse(res, 500, "Something went wrong resetting featured ", undefined));
            case 12:
              _context15.next = 14;
              return _videoServices["default"].updateVideo(req.query.id, req.body);
            case 14:
              updated = _context15.sent;
              return _context15.abrupt("return", _response["default"].successResponse(res, 200, "Video successfully updated!", updated));
            case 18:
              _context15.prev = 18;
              _context15.t0 = _context15["catch"](0);
              _response["default"].errorResponse(res, 500, "Something went wrong", _context15.t0.message);
            case 21:
            case "end":
              return _context15.stop();
          }
        }, _callee15, null, [[0, 18]]);
      }));
      function featureVideo(_x29, _x30) {
        return _featureVideo.apply(this, arguments);
      }
      return featureVideo;
    }()
  }, {
    key: "attachThumbnails",
    value: function attachThumbnails(key, bucket) {
      try {
        return "https://".concat(bucket, ".s3.amazonaws.com/").concat(key);
      } catch (error) {
        throw error;
      }
    }

    // eslint-disable-next-line consistent-return
  }, {
    key: "createNewWatchCount",
    value: function () {
      var _createNewWatchCount = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(req, res) {
        var ip, id, videoId, videoData, token, decoded, data, locationServiceData, JsonlocationData, sessions, user, results, updates;
        return _regenerator["default"].wrap(function _callee16$(_context16) {
          while (1) switch (_context16.prev = _context16.next) {
            case 0:
              _context16.prev = 0;
              ip = req.headers.ip;
              id = req.query.id;
              videoId = id;
              _context16.next = 6;
              return _videoServices["default"].getVideoById(videoId);
            case 6:
              videoData = _context16.sent;
              token = req.headers.authorization.slice(7);
              if (!(!ip || !videoId === null)) {
                _context16.next = 10;
                break;
              }
              return _context16.abrupt("return", _response["default"].errorResponse(res, 400, "Something went wrong", "missingParameterError"));
            case 10:
              if (videoData) {
                _context16.next = 12;
                break;
              }
              return _context16.abrupt("return", _response["default"].errorResponse(res, 404, "Can't find the video you're looking for", "NotFoundError"));
            case 12:
              decoded = _jwt["default"].jwtVerify(token, process.env.SECRET);
              data = req.body;
              data.sessionState = "Active";
              data.userId = decoded.email;
              data.time = new Date().getTime();
              _context16.next = 19;
              return (0, _nodeFetch["default"])("http://api.ipstack.com/".concat(ip, "?access_key=").concat(process.env.IP_STACK_ACCESS_TOKEN));
            case 19:
              locationServiceData = _context16.sent;
              _context16.next = 22;
              return locationServiceData.json();
            case 22:
              JsonlocationData = _context16.sent;
              _context16.next = 25;
              return _viewingSessionsServices["default"].getSesssionPerVideoUser(decoded.email, videoId);
            case 25:
              sessions = _context16.sent;
              _context16.next = 28;
              return _userServices["default"].getUserByMail(decoded.email);
            case 28:
              user = _context16.sent;
              if (!(Object.values(sessions).length >= 1 || user.isOnTrial === true)) {
                _context16.next = 33;
                break;
              }
              util.setErrorResponse(res, "user already watched video or trial is still active", 400);
              _context16.next = 44;
              break;
            case 33:
              _context16.next = 35;
              return _viewingSessionsServices["default"].registerViewingSessions({
                sessionState: "Active",
                userId: decoded.email,
                time: new Date().getTime(),
                location: JsonlocationData.country_name,
                ip: ip,
                clientId: videoData.videoClientId,
                videoId: videoId
              });
            case 35:
              results = _context16.sent;
              _context16.next = 38;
              return _videoServices["default"].incrementWatchCountService(videoId);
            case 38:
              updates = _context16.sent;
              if (!(results && updates)) {
                _context16.next = 43;
                break;
              }
              util.setSuccessResponse(res, "Registered the watch session", 201, {
                status: "done"
              });
              _context16.next = 44;
              break;
            case 43:
              return _context16.abrupt("return", _response["default"].errorResponse(res, 400, "something went wrong", "Can't get location"));
            case 44:
              _context16.next = 49;
              break;
            case 46:
              _context16.prev = 46;
              _context16.t0 = _context16["catch"](0);
              return _context16.abrupt("return", _response["default"].errorResponse(res, 500, "Something went wrong", _context16.t0.message));
            case 49:
            case "end":
              return _context16.stop();
          }
        }, _callee16, null, [[0, 46]]);
      }));
      function createNewWatchCount(_x31, _x32) {
        return _createNewWatchCount.apply(this, arguments);
      }
      return createNewWatchCount;
    }()
  }, {
    key: "saveWatchedTime",
    value: function () {
      var _saveWatchedTime = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(req, res) {
        var _req$body2, type, watchedTime, episodeId, id, videoId, episode, video, watchedTimeEntry, episodeWatchedTimeEntry, result;
        return _regenerator["default"].wrap(function _callee17$(_context17) {
          while (1) switch (_context17.prev = _context17.next) {
            case 0:
              _context17.prev = 0;
              _req$body2 = req.body, type = _req$body2.type, watchedTime = _req$body2.watchedTime, episodeId = _req$body2.episodeId;
              id = req.fullUser.id;
              videoId = req.query.videoId;
              if (!(!episodeId && type === "serie")) {
                _context17.next = 6;
                break;
              }
              return _context17.abrupt("return", util.setErrorResponse(res, "episodeId is required to save an episode", 400));
            case 6:
              if (!(episodeId && type === "serie")) {
                _context17.next = 12;
                break;
              }
              _context17.next = 9;
              return _serieServices["default"].getSingleEpisode(episodeId);
            case 9:
              episode = _context17.sent;
              if (episode) {
                _context17.next = 12;
                break;
              }
              return _context17.abrupt("return", util.setErrorResponse(res, "episode not found", 404));
            case 12:
              _context17.next = 14;
              return _videoServices["default"].getVideoById(videoId);
            case 14:
              video = _context17.sent;
              if (video) {
                _context17.next = 17;
                break;
              }
              return _context17.abrupt("return", util.setErrorResponse(res, "video not found", 404));
            case 17:
              _context17.next = 19;
              return _watchedMovieServices["default"].findWatchedTime(videoId, id);
            case 19:
              watchedTimeEntry = _context17.sent;
              if (!(type === "serie")) {
                _context17.next = 24;
                break;
              }
              _context17.next = 23;
              return _watchedMovieServices["default"].findWatchedTime(episodeId, id);
            case 23:
              episodeWatchedTimeEntry = _context17.sent;
            case 24:
              if (watchedTimeEntry) {
                _context17.next = 33;
                break;
              }
              _context17.next = 27;
              return _watchedMovieServices["default"].add({
                videoId: videoId,
                type: type,
                watchedTime: watchedTime,
                userId: id
              });
            case 27:
              result = _context17.sent;
              if (!(type === "serie")) {
                _context17.next = 31;
                break;
              }
              _context17.next = 31;
              return _watchedMovieServices["default"].add({
                videoId: episodeId,
                type: "episode",
                watchedTime: watchedTime,
                userId: id
              });
            case 31:
              _context17.next = 43;
              break;
            case 33:
              _context17.next = 35;
              return _watchedMovieServices["default"].update(watchedTime, watchedTimeEntry.id);
            case 35:
              result = _context17.sent;
              if (!(episodeWatchedTimeEntry && type === "serie")) {
                _context17.next = 41;
                break;
              }
              _context17.next = 39;
              return _watchedMovieServices["default"].update(watchedTime, episodeWatchedTimeEntry.id);
            case 39:
              _context17.next = 43;
              break;
            case 41:
              _context17.next = 43;
              return _watchedMovieServices["default"].add({
                videoId: episodeId,
                type: "episode",
                watchedTime: watchedTime,
                userId: id
              });
            case 43:
              util.setSuccessResponse(res, "time saved successfully", 201, {
                status: "done"
              });
              _context17.next = 49;
              break;
            case 46:
              _context17.prev = 46;
              _context17.t0 = _context17["catch"](0);
              return _context17.abrupt("return", _response["default"].errorResponse(res, 500, "Something went wrong", _context17.t0.message));
            case 49:
            case "end":
              return _context17.stop();
          }
        }, _callee17, null, [[0, 46]]);
      }));
      function saveWatchedTime(_x33, _x34) {
        return _saveWatchedTime.apply(this, arguments);
      }
      return saveWatchedTime;
    }()
  }, {
    key: "getWatchedTime",
    value: function () {
      var _getWatchedTime = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18(req, res) {
        var id, videoId, result;
        return _regenerator["default"].wrap(function _callee18$(_context18) {
          while (1) switch (_context18.prev = _context18.next) {
            case 0:
              _context18.prev = 0;
              id = req.fullUser.id;
              videoId = req.query.videoId;
              _context18.next = 5;
              return _watchedMovieServices["default"].findWatchedTime(videoId, id);
            case 5:
              result = _context18.sent;
              if (result) {
                _context18.next = 8;
                break;
              }
              return _context18.abrupt("return", util.setErrorResponse(res, "The video has not been watched yet", 404));
            case 8:
              util.setSuccessResponse(res, "watch session retrieved successfully", 200, result);
              _context18.next = 14;
              break;
            case 11:
              _context18.prev = 11;
              _context18.t0 = _context18["catch"](0);
              return _context18.abrupt("return", _response["default"].errorResponse(res, 500, "Something went wrong", _context18.t0.message));
            case 14:
            case "end":
              return _context18.stop();
          }
        }, _callee18, null, [[0, 11]]);
      }));
      function getWatchedTime(_x35, _x36) {
        return _getWatchedTime.apply(this, arguments);
      }
      return getWatchedTime;
    }()
  }]);
  return Video;
}();
var _default = exports["default"] = Video;