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
var _serieServices = _interopRequireDefault(require("../services/serieServices"));
var _utilities = _interopRequireDefault(require("../helpers/utilities"));
var _tempSerieService = _interopRequireDefault(require("../services/tempSerieService"));
var _jwt = _interopRequireDefault(require("../helpers/jwt"));
var _aws = require("../helpers/aws");
/* eslint-disable no-plusplus */

(0, _dotenv.config)();
var util = new _utilities["default"]();
var Episodes = /*#__PURE__*/function () {
  function Episodes() {
    (0, _classCallCheck2["default"])(this, Episodes);
  }
  (0, _createClass2["default"])(Episodes, null, [{
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var id, tempVideo, decoded, createdSerie, deleted, deletionStatus;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              id = req.query.id;
              _context.next = 4;
              return _tempSerieService["default"].getParticularVideo(id);
            case 4:
              tempVideo = _context.sent;
              if (tempVideo) {
                _context.next = 7;
                break;
              }
              return _context.abrupt("return", util.setErrorResponse(res, "Serie not found", 404));
            case 7:
              decoded = _jwt["default"].jwtVerify(tempVideo.uri, process.env.SECRET);
              _context.next = 10;
              return (0, _aws.copyObjects)(process.env.TEMP_BUCKET_SERIES, process.env.PERMANENT_BUCKET_SERIES, decoded.uri);
            case 10:
              _context.next = 12;
              return _serieServices["default"].update(decoded.id, {
                suspensionState: false,
                episodeKey: decoded.uri
              });
            case 12:
              createdSerie = _context.sent;
              _context.next = 15;
              return _tempSerieService["default"].deleteSeries(id);
            case 15:
              deleted = _context.sent;
              _context.next = 18;
              return (0, _aws.deleteObject)(process.env.TEMP_BUCKET_SERIES, decoded.uri);
            case 18:
              deletionStatus = _context.sent;
              if (!(createdSerie && deleted && deletionStatus)) {
                _context.next = 21;
                break;
              }
              return _context.abrupt("return", util.setSuccessResponse(res, "Created successfully", 201));
            case 21:
              return _context.abrupt("return", util.setErrorResponse(res, "Can't upload", 400));
            case 24:
              _context.prev = 24;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", util.setErrorResponse(res, "Something happened ".concat(_context.t0.message), 500));
            case 27:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 24]]);
      }));
      function create(_x, _x2) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
  }, {
    key: "getSingleEpisode",
    value: function () {
      var _getSingleEpisode = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var episode;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _serieServices["default"].getSingleEpisode(req.query.ep);
            case 3:
              episode = _context2.sent;
              if (episode) {
                _context2.next = 6;
                break;
              }
              return _context2.abrupt("return", util.setErrorResponse(res, "Can't find what you requested", 400));
            case 6:
              return _context2.abrupt("return", util.setSuccessResponse(res, "Retrieved successfully", 200, episode));
            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", util.setErrorResponse(res, "Something happened ".concat(_context2.t0.message), 500));
            case 12:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 9]]);
      }));
      function getSingleEpisode(_x3, _x4) {
        return _getSingleEpisode.apply(this, arguments);
      }
      return getSingleEpisode;
    }()
  }, {
    key: "getSingleSeason",
    value: function () {
      var _getSingleSeason = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var _req$query, id, s, limit, offset, episodes, i;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _req$query = req.query, id = _req$query.id, s = _req$query.s, limit = _req$query.limit, offset = _req$query.offset;
              _context3.next = 4;
              return _serieServices["default"].getSingleSeason(id, s, limit, offset);
            case 4:
              episodes = _context3.sent;
              if (!episodes) {
                util.setErrorResponse(res, "Can't find what you requested", 400);
              } else {
                for (i = 0; i < episodes.length; i++) {
                  episodes[i].thumbNailUrl = Episodes.attachThumbnails(episodes[i].thumbNailUrl, process.env.THUMBNAIL_BUCKET);
                }
                util.setSuccessResponse(res, "Retrieved successfully", 200, episodes);
              }
              _context3.next = 11;
              break;
            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](0);
              util.setErrorResponse(res, "Something happened ".concat(_context3.t0.message), 500);
            case 11:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 8]]);
      }));
      function getSingleSeason(_x5, _x6) {
        return _getSingleSeason.apply(this, arguments);
      }
      return getSingleSeason;
    }()
  }, {
    key: "getAllSeasons",
    value: function () {
      var _getAllSeasons = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var seasons;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _serieServices["default"].getAllSeasons(req.query.videoId);
            case 3:
              seasons = _context4.sent;
              if (!seasons) {
                util.setErrorResponse(res, "Can't find what you requested", 400);
              } else {
                util.setSuccessResponse(res, "Retrieved successfully", 200, seasons[0]);
              }
              _context4.next = 10;
              break;
            case 7:
              _context4.prev = 7;
              _context4.t0 = _context4["catch"](0);
              util.setErrorResponse(res, "Something happened ".concat(_context4.t0.message), 500);
            case 10:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 7]]);
      }));
      function getAllSeasons(_x7, _x8) {
        return _getAllSeasons.apply(this, arguments);
      }
      return getAllSeasons;
    }()
  }, {
    key: "updateSerie",
    value: function () {
      var _updateSerie = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var updated;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _serieServices["default"].update(req.body.id, req.body);
            case 3:
              updated = _context5.sent;
              if (updated[0]) {
                _context5.next = 6;
                break;
              }
              return _context5.abrupt("return", util.setErrorResponse(res, "Can't updated what you requested", 400));
            case 6:
              return _context5.abrupt("return", util.setSuccessResponse(res, "Updated easily", 201, updated));
            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](0);
              return _context5.abrupt("return", util.setErrorResponse(res, "Something happened ".concat(_context5.t0.message), 500));
            case 12:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 9]]);
      }));
      function updateSerie(_x9, _x10) {
        return _updateSerie.apply(this, arguments);
      }
      return updateSerie;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
        var videoFile, results, deleted;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return _serieServices["default"].getSingleEpisode(req.params.id);
            case 3:
              videoFile = _context6.sent;
              if (videoFile) {
                _context6.next = 6;
                break;
              }
              return _context6.abrupt("return", util.setErrorResponse(res, "Can't find what you requested", 400));
            case 6:
              if (!(videoFile.episode !== null)) {
                _context6.next = 12;
                break;
              }
              _context6.next = 9;
              return (0, _aws.deleteObject)(process.env.TEMP_BUCKET_SERIES, videoFile.episode);
            case 9:
              _context6.t0 = _context6.sent;
              _context6.next = 15;
              break;
            case 12:
              _context6.next = 14;
              return (0, _aws.deleteObject)(process.env.TEMP_BUCKET_SERIES, videoFile.episodeKey);
            case 14:
              _context6.t0 = _context6.sent;
            case 15:
              results = _context6.t0;
              _context6.next = 18;
              return _serieServices["default"].deleteEpisode(req.params.id);
            case 18:
              deleted = _context6.sent;
              if (!(deleted && Object.values(results).length === 0)) {
                _context6.next = 21;
                break;
              }
              return _context6.abrupt("return", util.setSuccessResponse(res, "deleted easily", 200, deleted));
            case 21:
              return _context6.abrupt("return", util.setErrorResponse(res, "Can't find what you requested", 400));
            case 24:
              _context6.prev = 24;
              _context6.t1 = _context6["catch"](0);
              return _context6.abrupt("return", util.setErrorResponse(res, "Something happened ".concat(_context6.t1.message), 500));
            case 27:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[0, 24]]);
      }));
      function _delete(_x11, _x12) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
  }, {
    key: "deleteTemp",
    value: function () {
      var _deleteTemp = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
        var tempEpisode, decodeUri, videoFile, results, deleted, tempDelete;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return _tempSerieService["default"].getParticularVideo(req.params.id);
            case 3:
              tempEpisode = _context7.sent;
              if (tempEpisode) {
                _context7.next = 6;
                break;
              }
              return _context7.abrupt("return", util.setErrorResponse(res, "Can't find what you requested", 400));
            case 6:
              decodeUri = _jwt["default"].jwtVerify(tempEpisode.uri, process.env.SECRET);
              _context7.next = 9;
              return _serieServices["default"].getSingleEpisode(decodeUri.id);
            case 9:
              videoFile = _context7.sent;
              if (videoFile) {
                _context7.next = 12;
                break;
              }
              return _context7.abrupt("return", util.setErrorResponse(res, "Can't find what you requested", 400));
            case 12:
              if (!(videoFile.episode !== null)) {
                _context7.next = 18;
                break;
              }
              _context7.next = 15;
              return (0, _aws.deleteObject)(process.env.TEMP_BUCKET_SERIES, decodeUri.uri);
            case 15:
              _context7.t0 = _context7.sent;
              _context7.next = 21;
              break;
            case 18:
              _context7.next = 20;
              return (0, _aws.deleteObject)(process.env.TEMP_BUCKET_SERIES, decodeUri.uri);
            case 20:
              _context7.t0 = _context7.sent;
            case 21:
              results = _context7.t0;
              _context7.next = 24;
              return _serieServices["default"].deleteEpisode(decodeUri.id);
            case 24:
              deleted = _context7.sent;
              _context7.next = 27;
              return _tempSerieService["default"].deleteSeries(req.params.id);
            case 27:
              tempDelete = _context7.sent;
              if (!(deleted && tempDelete && Object.values(results).length === 0)) {
                _context7.next = 30;
                break;
              }
              return _context7.abrupt("return", util.setSuccessResponse(res, "deleted easily", 200, deleted));
            case 30:
              return _context7.abrupt("return", util.setErrorResponse(res, "Can't find what you requested", 400));
            case 33:
              _context7.prev = 33;
              _context7.t1 = _context7["catch"](0);
              console.log(_context7.t1);
              return _context7.abrupt("return", util.setErrorResponse(res, "Something happened ".concat(_context7.t1.message), 500));
            case 37:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[0, 33]]);
      }));
      function deleteTemp(_x13, _x14) {
        return _deleteTemp.apply(this, arguments);
      }
      return deleteTemp;
    }()
  }, {
    key: "getVideosByClientId",
    value: function () {
      var _getVideosByClientId = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
        var token, _jwt$jwtVerify, clientId, episodes, i;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              token = req.headers.authorization.slice(7);
              _jwt$jwtVerify = _jwt["default"].jwtVerify(token, process.env.SECRET), clientId = _jwt$jwtVerify.clientId;
              _context8.next = 5;
              return _serieServices["default"].getEpisodesByClientId(clientId);
            case 5:
              episodes = _context8.sent;
              if (episodes.length > 0) {
                _context8.next = 8;
                break;
              }
              return _context8.abrupt("return", util.setErrorResponse(res, "can't find matching episodes", 400));
            case 8:
              for (i = 0; i < episodes.length; i++) {
                episodes[i].thumbNailUrl = Episodes.attachThumbnails(episodes[i].thumbNailUrl, process.env.THUMBNAIL_BUCKET);
              }
              return _context8.abrupt("return", util.setSuccessResponse(res, "Sucess", 200, episodes));
            case 12:
              _context8.prev = 12;
              _context8.t0 = _context8["catch"](0);
              return _context8.abrupt("return", util.setErrorResponse(res, "Something happened ".concat(_context8.t0.message), 500));
            case 15:
            case "end":
              return _context8.stop();
          }
        }, _callee8, null, [[0, 12]]);
      }));
      function getVideosByClientId(_x15, _x16) {
        return _getVideosByClientId.apply(this, arguments);
      }
      return getVideosByClientId;
    }()
  }, {
    key: "attachThumbnails",
    value: function attachThumbnails(key, bucket) {
      return "https://".concat(bucket, ".s3.eu-west-1.amazonaws.com/").concat(key);
    }
  }]);
  return Episodes;
}();
var _default = exports["default"] = Episodes;