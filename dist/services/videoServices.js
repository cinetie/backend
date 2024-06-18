"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _sequelize = _interopRequireWildcard(require("sequelize"));
var _models = _interopRequireDefault(require("../database/models"));
var _date = _interopRequireDefault(require("../helpers/date"));
var _resCountry = _interopRequireDefault(require("../helpers/resCountry"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var op = _sequelize["default"].Op;

// will be changed to adapt a very good search algorithm
// videos are also called movies
var videoService = /*#__PURE__*/function () {
  function videoService() {
    (0, _classCallCheck2["default"])(this, videoService);
  }
  (0, _createClass2["default"])(videoService, null, [{
    key: "getVideoById",
    value: function () {
      var _getVideoById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(videoId) {
        var video;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _models["default"].videos.findOne({
                attributes: {
                  exclude: ["createdAt", "updatedAt"]
                },
                where: {
                  videoId: videoId
                }
              });
            case 3:
              video = _context.sent;
              if (!video) {
                _context.next = 6;
                break;
              }
              return _context.abrupt("return", video);
            case 6:
              return _context.abrupt("return", null);
            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              throw _context.t0;
            case 12:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 9]]);
      }));
      function getVideoById(_x) {
        return _getVideoById.apply(this, arguments);
      }
      return getVideoById;
    }()
  }, {
    key: "getNewVideos",
    value: function () {
      var _getNewVideos = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(limitValue, offsetValue, type, country) {
        var videos, results;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _models["default"].videos.findAll({
                offset: Number(offsetValue),
                limit: Number(limitValue),
                where: (0, _defineProperty2["default"])({}, op.and, [{
                  type: type,
                  videoSuspensionState: "0"
                }]),
                order: [["creationTime", "DESC"]]
              });
            case 3:
              videos = _context2.sent;
              if (!videos) {
                _context2.next = 7;
                break;
              }
              results = (0, _resCountry["default"])(videos, country);
              return _context2.abrupt("return", results);
            case 7:
              return _context2.abrupt("return", null);
            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](0);
              throw _context2.t0;
            case 13:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 10]]);
      }));
      function getNewVideos(_x2, _x3, _x4, _x5) {
        return _getNewVideos.apply(this, arguments);
      }
      return getNewVideos;
    }()
  }, {
    key: "getVideosByType",
    value: function () {
      var _getVideosByType = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(clientId, type) {
        var videos;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _models["default"].videos.findAll({
                where: (0, _defineProperty2["default"])({}, op.and, [{
                  type: type,
                  videoClientId: clientId
                }])
              });
            case 3:
              videos = _context3.sent;
              if (!videos) {
                _context3.next = 6;
                break;
              }
              return _context3.abrupt("return", videos);
            case 6:
              return _context3.abrupt("return", null);
            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](0);
              throw _context3.t0;
            case 12:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 9]]);
      }));
      function getVideosByType(_x6, _x7) {
        return _getVideosByType.apply(this, arguments);
      }
      return getVideosByType;
    }()
  }, {
    key: "getTrendingVideos",
    value: function () {
      var _getTrendingVideos = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(offsetValue, limit, type, country) {
        var videos, results;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _models["default"].videos.findAll({
                offset: Number(offsetValue),
                limit: Number(limit),
                where: (0, _defineProperty2["default"])({}, op.and, [{
                  videoWatchCount: (0, _defineProperty2["default"])({}, op.gte, process.env.TRENDING_WATCH_COUNT),
                  creationTime: (0, _defineProperty2["default"])({}, op.gte, _date["default"].removeDays(365)),
                  type: type,
                  videoSuspensionState: "0"
                }])
              });
            case 3:
              videos = _context4.sent;
              if (!videos) {
                _context4.next = 7;
                break;
              }
              results = (0, _resCountry["default"])(videos, country);
              return _context4.abrupt("return", results);
            case 7:
              return _context4.abrupt("return", null);
            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4["catch"](0);
              throw _context4.t0;
            case 13:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 10]]);
      }));
      function getTrendingVideos(_x8, _x9, _x10, _x11) {
        return _getTrendingVideos.apply(this, arguments);
      }
      return getTrendingVideos;
    }()
  }, {
    key: "search",
    value: function () {
      var _search = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(query, offset, country) {
        var _ref, data, results;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _models["default"].videos.findAll({
                order: [["id", "DESC"]],
                offset: Number(offset),
                limit: 20,
                where: (0, _defineProperty2["default"])({}, op.and, [(_ref = {}, (0, _defineProperty2["default"])(_ref, op.col, _sequelize.Sequelize.where(_sequelize.Sequelize.fn("lower", _sequelize.Sequelize.col("videoName")), (0, _defineProperty2["default"])({}, op.like, "%".concat(query, "%")))), (0, _defineProperty2["default"])(_ref, "videoSuspensionState", "0"), _ref)])
              });
            case 3:
              data = _context5.sent;
              if (!data) {
                _context5.next = 7;
                break;
              }
              results = (0, _resCountry["default"])(data, country);
              return _context5.abrupt("return", results);
            case 7:
              return _context5.abrupt("return", null);
            case 10:
              _context5.prev = 10;
              _context5.t0 = _context5["catch"](0);
              throw _context5.t0;
            case 13:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 10]]);
      }));
      function search(_x12, _x13, _x14) {
        return _search.apply(this, arguments);
      }
      return search;
    }()
  }, {
    key: "incrementWatchCountService",
    value: function () {
      var _incrementWatchCountService = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(videoId) {
        var data;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return _models["default"].videos.increment("videoWatchCount", {
                where: {
                  videoId: videoId
                }
              });
            case 3:
              data = _context6.sent;
              if (!data) {
                _context6.next = 6;
                break;
              }
              return _context6.abrupt("return", data);
            case 6:
              return _context6.abrupt("return", null);
            case 9:
              _context6.prev = 9;
              _context6.t0 = _context6["catch"](0);
              throw _context6.t0;
            case 12:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[0, 9]]);
      }));
      function incrementWatchCountService(_x15) {
        return _incrementWatchCountService.apply(this, arguments);
      }
      return incrementWatchCountService;
    }()
  }, {
    key: "getPopularVideos",
    value: function () {
      var _getPopularVideos = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(offSetValue, limitValue, type, country) {
        var data, results;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return _models["default"].videos.findAll({
                offset: Number(offSetValue),
                limit: Number(limitValue),
                where: (0, _defineProperty2["default"])({}, op.and, [{
                  videoWatchCount: (0, _defineProperty2["default"])({}, op.gte, process.env.TRENDING_WATCH_COUNT),
                  type: type,
                  videoSuspensionState: "0"
                }])
              });
            case 3:
              data = _context7.sent;
              if (!data) {
                _context7.next = 7;
                break;
              }
              results = (0, _resCountry["default"])(data, country);
              return _context7.abrupt("return", results);
            case 7:
              return _context7.abrupt("return", null);
            case 10:
              _context7.prev = 10;
              _context7.t0 = _context7["catch"](0);
              throw _context7.t0;
            case 13:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[0, 10]]);
      }));
      function getPopularVideos(_x16, _x17, _x18, _x19) {
        return _getPopularVideos.apply(this, arguments);
      }
      return getPopularVideos;
    }()
  }, {
    key: "getVideosByCategory",
    value: function () {
      var _getVideosByCategory = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(category, country) {
        var data, results;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _context8.next = 3;
              return _models["default"].videos.findAll({
                where: {
                  category: category
                }
              });
            case 3:
              data = _context8.sent;
              if (!data) {
                _context8.next = 7;
                break;
              }
              results = (0, _resCountry["default"])(data, country);
              return _context8.abrupt("return", results);
            case 7:
              return _context8.abrupt("return", null);
            case 10:
              _context8.prev = 10;
              _context8.t0 = _context8["catch"](0);
              throw _context8.t0;
            case 13:
            case "end":
              return _context8.stop();
          }
        }, _callee8, null, [[0, 10]]);
      }));
      function getVideosByCategory(_x20, _x21) {
        return _getVideosByCategory.apply(this, arguments);
      }
      return getVideosByCategory;
    }()
  }, {
    key: "createNewVideo",
    value: function () {
      var _createNewVideo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(video) {
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              _context9.next = 3;
              return _models["default"].videos.create(video);
            case 3:
              return _context9.abrupt("return", _context9.sent);
            case 6:
              _context9.prev = 6;
              _context9.t0 = _context9["catch"](0);
              throw _context9.t0;
            case 9:
            case "end":
              return _context9.stop();
          }
        }, _callee9, null, [[0, 6]]);
      }));
      function createNewVideo(_x22) {
        return _createNewVideo.apply(this, arguments);
      }
      return createNewVideo;
    }()
  }, {
    key: "updateVideo",
    value: function () {
      var _updateVideo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(videoId, newVideo) {
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              _context10.next = 3;
              return _models["default"].videos.update(newVideo, {
                where: {
                  videoId: videoId
                }
              });
            case 3:
              return _context10.abrupt("return", _context10.sent);
            case 6:
              _context10.prev = 6;
              _context10.t0 = _context10["catch"](0);
              throw _context10.t0;
            case 9:
            case "end":
              return _context10.stop();
          }
        }, _callee10, null, [[0, 6]]);
      }));
      function updateVideo(_x23, _x24) {
        return _updateVideo.apply(this, arguments);
      }
      return updateVideo;
    }()
  }, {
    key: "resetFeaturedVideo",
    value: function () {
      var _resetFeaturedVideo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(featureType, isFeatured, type) {
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _context11.prev = 0;
              _context11.next = 3;
              return _models["default"].videos.update({
                isFeatured: false
              }, {
                returning: true,
                where: (0, _defineProperty2["default"])({}, op.and, [{
                  featureType: featureType
                }, {
                  isFeatured: isFeatured
                }, {
                  type: type
                }])
              });
            case 3:
              return _context11.abrupt("return", _context11.sent);
            case 6:
              _context11.prev = 6;
              _context11.t0 = _context11["catch"](0);
              throw _context11.t0;
            case 9:
            case "end":
              return _context11.stop();
          }
        }, _callee11, null, [[0, 6]]);
      }));
      function resetFeaturedVideo(_x25, _x26, _x27) {
        return _resetFeaturedVideo.apply(this, arguments);
      }
      return resetFeaturedVideo;
    }()
  }, {
    key: "deleteVideo",
    value: function () {
      var _deleteVideo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(videoId) {
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              _context12.prev = 0;
              _context12.next = 3;
              return _models["default"].videos.destroy({
                returning: true,
                where: {
                  videoId: videoId
                }
              });
            case 3:
              return _context12.abrupt("return", _context12.sent);
            case 6:
              _context12.prev = 6;
              _context12.t0 = _context12["catch"](0);
              throw _context12.t0;
            case 9:
            case "end":
              return _context12.stop();
          }
        }, _callee12, null, [[0, 6]]);
      }));
      function deleteVideo(_x28) {
        return _deleteVideo.apply(this, arguments);
      }
      return deleteVideo;
    }()
  }, {
    key: "getAllVideos",
    value: function () {
      var _getAllVideos = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(videoClientId) {
        return _regenerator["default"].wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              _context13.prev = 0;
              _context13.next = 3;
              return _models["default"].videos.findAll({
                attributes: {
                  exclude: ["videoLink", "createdAt", "updatedAt", "videoCast", "videoSynopsis", "isFeatured", "videoIdVimeo", "videoClientId", "featureType", "category", "rate"]
                },
                where: {
                  videoClientId: videoClientId
                },
                order: [["id", "DESC"]]
              });
            case 3:
              return _context13.abrupt("return", _context13.sent);
            case 6:
              _context13.prev = 6;
              _context13.t0 = _context13["catch"](0);
              throw _context13.t0;
            case 9:
            case "end":
              return _context13.stop();
          }
        }, _callee13, null, [[0, 6]]);
      }));
      function getAllVideos(_x29) {
        return _getAllVideos.apply(this, arguments);
      }
      return getAllVideos;
    }()
  }, {
    key: "getAllVideosByType",
    value: function () {
      var _getAllVideosByType = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(videoClientId, type) {
        return _regenerator["default"].wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              _context14.prev = 0;
              _context14.next = 3;
              return _models["default"].videos.findAll({
                attributes: {
                  exclude: ["videoLink", "createdAt", "updatedAt", "videoCast", "videoSynopsis", "isFeatured", "videoIdVimeo", "videoClientId", "featureType", "category"]
                },
                where: (0, _defineProperty2["default"])({}, op.and, [{
                  videoClientId: videoClientId
                }, {
                  type: type
                }]),
                order: [["id", "DESC"]]
              });
            case 3:
              return _context14.abrupt("return", _context14.sent);
            case 6:
              _context14.prev = 6;
              _context14.t0 = _context14["catch"](0);
              throw _context14.t0;
            case 9:
            case "end":
              return _context14.stop();
          }
        }, _callee14, null, [[0, 6]]);
      }));
      function getAllVideosByType(_x30, _x31) {
        return _getAllVideosByType.apply(this, arguments);
      }
      return getAllVideosByType;
    }()
  }, {
    key: "getAllVideosForAdmin",
    value: function () {
      var _getAllVideosForAdmin = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
        return _regenerator["default"].wrap(function _callee15$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              _context15.prev = 0;
              _context15.next = 3;
              return _models["default"].videos.findAll({
                attributes: {
                  exclude: ["videoLink", "createdAt", "updatedAt", "videoCast", "videoSynopsis", "isFeatured", "videoIdVimeo", "videoClientId", "featureType", "category"]
                },
                order: [["id", "DESC"]]
              });
            case 3:
              return _context15.abrupt("return", _context15.sent);
            case 6:
              _context15.prev = 6;
              _context15.t0 = _context15["catch"](0);
              throw _context15.t0;
            case 9:
            case "end":
              return _context15.stop();
          }
        }, _callee15, null, [[0, 6]]);
      }));
      function getAllVideosForAdmin() {
        return _getAllVideosForAdmin.apply(this, arguments);
      }
      return getAllVideosForAdmin;
    }()
  }, {
    key: "getMainFeaturedVideo",
    value: function () {
      var _getMainFeaturedVideo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(type, country) {
        var videos, results;
        return _regenerator["default"].wrap(function _callee16$(_context16) {
          while (1) switch (_context16.prev = _context16.next) {
            case 0:
              _context16.prev = 0;
              _context16.next = 3;
              return _models["default"].videos.findAll({
                order: [["id", "DESC"]],
                limit: 1,
                attributes: {
                  exclude: ["creationTime", "videoWatchCount", "videoSuspensionState", "createdAt", "updatedAt", "isFeatured", "videoIdVimeo", "videoClientId", "featureType"]
                },
                where: (0, _defineProperty2["default"])({}, op.and, [{
                  isFeatured: true,
                  type: type,
                  featureType: 1,
                  videoSuspensionState: "0"
                }])
              });
            case 3:
              videos = _context16.sent;
              if (!videos) {
                _context16.next = 7;
                break;
              }
              results = (0, _resCountry["default"])(videos, country);
              return _context16.abrupt("return", results);
            case 7:
              return _context16.abrupt("return", null);
            case 10:
              _context16.prev = 10;
              _context16.t0 = _context16["catch"](0);
              throw _context16.t0;
            case 13:
            case "end":
              return _context16.stop();
          }
        }, _callee16, null, [[0, 10]]);
      }));
      function getMainFeaturedVideo(_x32, _x33) {
        return _getMainFeaturedVideo.apply(this, arguments);
      }
      return getMainFeaturedVideo;
    }()
  }, {
    key: "getSecondFeaturedVideo",
    value: function () {
      var _getSecondFeaturedVideo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(type, country) {
        var videos, results;
        return _regenerator["default"].wrap(function _callee17$(_context17) {
          while (1) switch (_context17.prev = _context17.next) {
            case 0:
              _context17.prev = 0;
              _context17.next = 3;
              return _models["default"].videos.findAll({
                order: [["id", "DESC"]],
                limit: 1,
                attributes: {
                  exclude: ["creationTime", "videoWatchCount", "videoSuspensionState", "createdAt", "updatedAt", "isFeatured", "videoIdVimeo", "videoClientId", "featureType"]
                },
                where: (0, _defineProperty2["default"])({}, op.and, [{
                  isFeatured: true,
                  type: type,
                  featureType: 2,
                  videoSuspensionState: "0"
                }])
              });
            case 3:
              videos = _context17.sent;
              if (!videos) {
                _context17.next = 7;
                break;
              }
              results = (0, _resCountry["default"])(videos, country);
              return _context17.abrupt("return", results);
            case 7:
              return _context17.abrupt("return", null);
            case 10:
              _context17.prev = 10;
              _context17.t0 = _context17["catch"](0);
              throw _context17.t0;
            case 13:
            case "end":
              return _context17.stop();
          }
        }, _callee17, null, [[0, 10]]);
      }));
      function getSecondFeaturedVideo(_x34, _x35) {
        return _getSecondFeaturedVideo.apply(this, arguments);
      }
      return getSecondFeaturedVideo;
    }()
  }]);
  return videoService;
}();
var _default = exports["default"] = videoService;