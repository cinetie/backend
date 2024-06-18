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
var _models = _interopRequireDefault(require("../database/models"));
/* eslint-disable no-useless-catch */
var tempVideoServices = /*#__PURE__*/function () {
  function tempVideoServices() {
    (0, _classCallCheck2["default"])(this, tempVideoServices);
  }
  (0, _createClass2["default"])(tempVideoServices, null, [{
    key: "createNewSeries",
    value: function () {
      var _createNewSeries = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(newSeries) {
        var newVideo;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _models["default"].tempSeries.create(newSeries);
            case 3:
              newVideo = _context.sent;
              if (!newVideo) {
                _context.next = 6;
                break;
              }
              return _context.abrupt("return", newVideo);
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
      function createNewSeries(_x) {
        return _createNewSeries.apply(this, arguments);
      }
      return createNewSeries;
    }()
  }, {
    key: "getParticularVideo",
    value: function () {
      var _getParticularVideo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
        var video;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _models["default"].tempSeries.findOne({
                where: {
                  id: id
                }
              });
            case 3:
              video = _context2.sent;
              if (!video) {
                _context2.next = 6;
                break;
              }
              return _context2.abrupt("return", video);
            case 6:
              return _context2.abrupt("return", null);
            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);
              throw _context2.t0;
            case 12:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 9]]);
      }));
      function getParticularVideo(_x2) {
        return _getParticularVideo.apply(this, arguments);
      }
      return getParticularVideo;
    }()
  }, {
    key: "getAllSeries",
    value: function () {
      var _getAllSeries = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var videos;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _models["default"].tempSeries.findAll({
                order: [["id", "DESC"]]
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
      function getAllSeries() {
        return _getAllSeries.apply(this, arguments);
      }
      return getAllSeries;
    }()
  }, {
    key: "deleteSeries",
    value: function () {
      var _deleteSeries = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id) {
        var result;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _models["default"].tempSeries.destroy({
                returning: true,
                where: {
                  id: id
                }
              });
            case 3:
              result = _context4.sent;
              if (!result) {
                _context4.next = 6;
                break;
              }
              return _context4.abrupt("return", result);
            case 6:
              return _context4.abrupt("return", null);
            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](0);
              throw _context4.t0;
            case 12:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 9]]);
      }));
      function deleteSeries(_x3) {
        return _deleteSeries.apply(this, arguments);
      }
      return deleteSeries;
    }()
  }, {
    key: "updateSeries",
    value: function () {
      var _updateSeries = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id, data) {
        var result;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _models["default"].tempSeries.update(data, {
                where: {
                  id: id
                }
              });
            case 3:
              result = _context5.sent;
              if (!result) {
                _context5.next = 6;
                break;
              }
              return _context5.abrupt("return", result);
            case 6:
              return _context5.abrupt("return", null);
            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](0);
              throw _context5.t0;
            case 12:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 9]]);
      }));
      function updateSeries(_x4, _x5) {
        return _updateSeries.apply(this, arguments);
      }
      return updateSeries;
    }()
  }]);
  return tempVideoServices;
}();
var _default = exports["default"] = tempVideoServices;