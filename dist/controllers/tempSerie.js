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
var _utilities = _interopRequireDefault(require("../helpers/utilities"));
var _tempSerieService = _interopRequireDefault(require("../services/tempSerieService"));
var _jwt = _interopRequireDefault(require("../helpers/jwt"));
var _aws = require("../helpers/aws");
var _serieServices = _interopRequireDefault(require("../services/serieServices"));
var _videoServices = _interopRequireDefault(require("../services/videoServices"));
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */

(0, _dotenv.config)();
var util = new _utilities["default"]();
var tempSerieController = /*#__PURE__*/function () {
  function tempSerieController() {
    (0, _classCallCheck2["default"])(this, tempSerieController);
  }
  (0, _createClass2["default"])(tempSerieController, null, [{
    key: "createSerie",
    value: function () {
      var _createSerie = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var data, newserie, tempVideo;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              data = req.body;
              data.clientId = req.headers.cpid;
              // data.size = req.files.video.size;
              data.thumbNailUrl = req.body.thumb;
              if (req.body.EnSubt !== undefined) data.EnSubt = req.body.EnSubt;
              if (req.body.FrSubt !== undefined) data.FrSubt = req.body.FrSubt;
              _context.next = 8;
              return _serieServices["default"].createNewEpisode(data);
            case 8:
              newserie = _context.sent;
              data.uri = _jwt["default"].jwtSign({
                uri: data.video,
                id: newserie.id
              }, process.env.SECRET);
              _context.next = 12;
              return _tempSerieService["default"].createNewSeries(data);
            case 12:
              tempVideo = _context.sent;
              if (!tempVideo || !newserie) {
                util.setErrorResponse(res, "Can't upload tv serie", 422);
              } else {
                util.setSuccessResponse(res, "Successfully uploaded", 201, tempVideo);
              }
              _context.next = 19;
              break;
            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](0);
              util.setErrorResponse(res, "Something wrong happened ".concat(_context.t0.message), 500);
            case 19:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 16]]);
      }));
      function createSerie(_x, _x2) {
        return _createSerie.apply(this, arguments);
      }
      return createSerie;
    }()
  }, {
    key: "getAllSeries",
    value: function () {
      var _getAllSeries = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var episodes, i, video, decoded, episode;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _tempSerieService["default"].getAllSeries();
            case 3:
              episodes = _context2.sent;
              if (!(Object.values(episodes).length > 0)) {
                _context2.next = 22;
                break;
              }
              i = 0;
            case 6:
              if (!(i < Object.values(episodes).length)) {
                _context2.next = 19;
                break;
              }
              _context2.next = 9;
              return _videoServices["default"].getVideoById(episodes[i].videoId);
            case 9:
              video = _context2.sent;
              decoded = _jwt["default"].jwtVerify(episodes[i].uri, process.env.SECRET);
              _context2.next = 13;
              return _serieServices["default"].getSingleEpisode(decoded.id);
            case 13:
              episode = _context2.sent;
              if (video) {
                episodes[i].videoId = "".concat(video.videoName, " S").concat(episode.season, "E").concat(episode.episodeNumber);
                episodes[i].videoClientId = video.videoClientId;
              } else {
                episodes[i].videoName = "default";
              }
              episodes[i].uri = decoded.uri;
            case 16:
              i++;
              _context2.next = 6;
              break;
            case 19:
              util.setSuccessResponse(res, "Data found", 200, episodes);
              _context2.next = 23;
              break;
            case 22:
              util.setErrorResponse(res, "Data Not Found", 404);
            case 23:
              _context2.next = 28;
              break;
            case 25:
              _context2.prev = 25;
              _context2.t0 = _context2["catch"](0);
              util.setErrorResponse(res, "Someting went wrong ".concat(_context2.t0.message), 500);
            case 28:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 25]]);
      }));
      function getAllSeries(_x3, _x4) {
        return _getAllSeries.apply(this, arguments);
      }
      return getAllSeries;
    }()
  }, {
    key: "getSignedUrlTempSeries",
    value: function () {
      var _getSignedUrlTempSeries = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var extension, thumb, video, EnSubt, FrSubt;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              extension = req.query.extension;
              _context3.next = 4;
              return (0, _aws.getSignedUrl)(process.env.THUMBNAIL_BUCKET, "image/*", "jpg");
            case 4:
              thumb = _context3.sent;
              _context3.next = 7;
              return (0, _aws.getSignedUrl)(process.env.TEMP_BUCKET_SERIES, "video/*", extension);
            case 7:
              video = _context3.sent;
              _context3.next = 10;
              return (0, _aws.getSignedUrl)(process.env.SUBTITLE_BUCKET, "text/plain", "srt");
            case 10:
              EnSubt = _context3.sent;
              _context3.next = 13;
              return (0, _aws.getSignedUrl)(process.env.SUBTITLE_BUCKET, "text/plain", "srt");
            case 13:
              FrSubt = _context3.sent;
              util.setSuccessResponse(res, "Temporary urls", 200, {
                thumb: thumb,
                video: video,
                EnSubt: EnSubt,
                FrSubt: FrSubt
              });
              _context3.next = 20;
              break;
            case 17:
              _context3.prev = 17;
              _context3.t0 = _context3["catch"](0);
              util.setErrorResponse(res, "something happened ".concat(_context3.t0.message), 500);
            case 20:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 17]]);
      }));
      function getSignedUrlTempSeries(_x5, _x6) {
        return _getSignedUrlTempSeries.apply(this, arguments);
      }
      return getSignedUrlTempSeries;
    }()
  }, {
    key: "generateSignedUrl",
    value: function () {
      var _generateSignedUrl = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var episode, decoded;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _tempSerieService["default"].getParticularVideo(req.query.id);
            case 3:
              episode = _context4.sent;
              if (!episode) {
                _context4.next = 12;
                break;
              }
              decoded = _jwt["default"].jwtVerify(episode.uri, process.env.SECRET);
              _context4.next = 8;
              return (0, _aws.getObject)(process.env.TEMP_BUCKET_SERIES, decoded.uri, 6000);
            case 8:
              episode.uri = _context4.sent;
              util.setSuccessResponse(res, "Episode found", 200, episode);
              _context4.next = 13;
              break;
            case 12:
              util.setErrorResponse(res, "Can not find that episode", 404);
            case 13:
              _context4.next = 18;
              break;
            case 15:
              _context4.prev = 15;
              _context4.t0 = _context4["catch"](0);
              util.setErrorResponse(res, "something happened ".concat(_context4.t0.message), 500);
            case 18:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 15]]);
      }));
      function generateSignedUrl(_x7, _x8) {
        return _generateSignedUrl.apply(this, arguments);
      }
      return generateSignedUrl;
    }()
  }]);
  return tempSerieController;
}();
var _default = exports["default"] = tempSerieController;