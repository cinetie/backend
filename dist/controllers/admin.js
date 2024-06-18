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
var _earningServices = _interopRequireDefault(require("../services/earningServices"));
var _videoServices = _interopRequireDefault(require("../services/videoServices"));
var _utilities = _interopRequireDefault(require("../helpers/utilities"));
var _jwt = _interopRequireDefault(require("../helpers/jwt"));
var _crypto = _interopRequireDefault(require("../helpers/crypto"));
var _video = require("../helpers/video");
/* eslint-disable eqeqeq */
/* eslint-disable vars-on-top */
/* eslint-disable no-plusplus */
/* eslint-disable no-var */

var util = new _utilities["default"]();
var adminController = /*#__PURE__*/function () {
  function adminController() {
    (0, _classCallCheck2["default"])(this, adminController);
  }
  (0, _createClass2["default"])(adminController, null, [{
    key: "getEarningsPerClient",
    value: function () {
      var _getEarningsPerClient = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var sum, clientId, data, i, date, formattedData, _i, count, j, monthYear, obj, uniqueValues;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              sum = 0;
              clientId = req.query.clientId;
              _context.next = 5;
              return _earningServices["default"].getEarningsByClientId(clientId);
            case 5:
              data = _context.sent;
              if (!(Object.values(data).length > 0)) {
                _context.next = 12;
                break;
              }
              for (i = 0; i < Object.values(data).length; i++) {
                date = new Date(Number(data[i].monthYear));
                data[i].monthYear = "".concat(date.toDateString().slice(4, 7), "/").concat(date.getFullYear());
                sum += Number(data[i].amount);
              }
              formattedData = [];
              for (_i = 0; _i < data.length; _i++) {
                count = 0;
                for (j = 0; j < data.length; j++) {
                  monthYear = data[_i].monthYear;
                  if (data[_i].monthYear == data[j].monthYear) {
                    count += Number(data[j].amount);
                  }
                }
                obj = {
                  amount: Number(count.toFixed(2)),
                  period: monthYear
                };
                formattedData.push(obj);
              }
              // remove duplicates
              uniqueValues = util.getUnique(formattedData, "monthYear");
              return _context.abrupt("return", util.setSuccessResponse(res, "Earnings found ", 200, {
                sum: Number(sum.toFixed(2)),
                data: uniqueValues
              }));
            case 12:
              util.setErrorResponse(res, "Data not found", 404);
              _context.next = 18;
              break;
            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](0);
              util.setErrorResponse(res, "Something Went wrong logging in ".concat(_context.t0), 500);
            case 18:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 15]]);
      }));
      function getEarningsPerClient(_x, _x2) {
        return _getEarningsPerClient.apply(this, arguments);
      }
      return getEarningsPerClient;
    }()
  }, {
    key: "getVideosPerCp",
    value: function () {
      var _getVideosPerCp = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var clientId, videos, i, date;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              clientId = req.query.clientId;
              _context2.next = 3;
              return _videoServices["default"].getAllVideos(clientId);
            case 3:
              videos = _context2.sent;
              if (videos) {
                _context2.next = 6;
                break;
              }
              return _context2.abrupt("return", util.setErrorResponse(res, "videos not found", 400));
            case 6:
              for (i = 0; i < Object.values(videos).length; i++) {
                date = new Date(Number(videos[i].creationTime));
                videos[i].creationTime = "".concat(date.toDateString());
              }
              (0, _video.getAttachedThumbsMultiple)(videos);
              util.setSuccessResponse(res, "videos found", 200, videos);
            case 9:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function getVideosPerCp(_x3, _x4) {
        return _getVideosPerCp.apply(this, arguments);
      }
      return getVideosPerCp;
    }()
  }, {
    key: "getAllVideos",
    value: function () {
      var _getAllVideos = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var videos, i, date;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _videoServices["default"].getAllVideosForAdmin();
            case 2:
              videos = _context3.sent;
              if (videos) {
                _context3.next = 5;
                break;
              }
              return _context3.abrupt("return", util.setErrorResponse(res, "videos not found", 400));
            case 5:
              for (i = 0; i < Object.values(videos).length; i++) {
                date = new Date(Number(videos[i].creationTime));
                videos[i].creationTime = "".concat(date.toDateString());
              }
              return _context3.abrupt("return", util.setSuccessResponse(res, "videos found", 200, videos));
            case 7:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function getAllVideos(_x5, _x6) {
        return _getAllVideos.apply(this, arguments);
      }
      return getAllVideos;
    }()
  }, {
    key: "getAllEarningsPerVideo",
    value: function () {
      var _getAllEarningsPerVideo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var sum, data, i, date, formattedData, _i2, count, j, monthYear, obj, uniqueValues;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              sum = 0;
              _context4.next = 4;
              return _earningServices["default"].getEarningsByVideo(req.query.videoId);
            case 4:
              data = _context4.sent;
              if (!(Object.values(data).length > 0)) {
                _context4.next = 11;
                break;
              }
              for (i = 0; i < Object.values(data).length; i++) {
                date = new Date(Number(data[i].monthYear));
                data[i].monthYear = "".concat(date.toDateString().slice(4, 7), "/").concat(date.getFullYear());
                sum += Number(data[i].amount);
              }
              formattedData = [];
              for (_i2 = 0; _i2 < data.length; _i2++) {
                count = 0;
                for (j = 0; j < data.length; j++) {
                  monthYear = data[_i2].monthYear;
                  if (data[_i2].monthYear == data[j].monthYear) {
                    count += Number(data[j].amount);
                  }
                }
                obj = {
                  amount: Number(count.toFixed(2)),
                  period: monthYear
                };
                formattedData.push(obj);
              }
              // remove duplicates
              uniqueValues = util.getUnique(formattedData, "monthYear");
              return _context4.abrupt("return", util.setSuccessResponse(res, "Earnings found ", 200, {
                sum: Number(sum.toFixed(2)),
                data: uniqueValues
              }));
            case 11:
              util.setErrorResponse(res, "Data not found", 404);
              _context4.next = 17;
              break;
            case 14:
              _context4.prev = 14;
              _context4.t0 = _context4["catch"](0);
              util.setErrorResponse(res, "Something Went wrong logging in ".concat(_context4.t0), 500);
            case 17:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 14]]);
      }));
      function getAllEarningsPerVideo(_x7, _x8) {
        return _getAllEarningsPerVideo.apply(this, arguments);
      }
      return getAllEarningsPerVideo;
    }()
  }, {
    key: "gainAccess",
    value: function () {
      var _gainAccess = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var _req$body, email, clientId, token;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _req$body = req.body, email = _req$body.email, clientId = _req$body.clientId;
              token = _jwt["default"].jwtSign({
                key: _crypto["default"].crypto(),
                email: email,
                clientId: clientId
              }, process.env.SECRET, "1d");
              if (token) {
                _context5.next = 5;
                break;
              }
              return _context5.abrupt("return", util.setErrorResponse(res, "something went wrong", 400));
            case 5:
              util.setSuccessResponse(res, "Token generated", 200, token);
              _context5.next = 11;
              break;
            case 8:
              _context5.prev = 8;
              _context5.t0 = _context5["catch"](0);
              util.setErrorResponse(res, "Something Went wrong logging in ".concat(_context5.t0), 500);
            case 11:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 8]]);
      }));
      function gainAccess(_x9, _x10) {
        return _gainAccess.apply(this, arguments);
      }
      return gainAccess;
    }()
  }]);
  return adminController;
}();
var _default = exports["default"] = adminController;