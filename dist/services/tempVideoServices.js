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
    key: "createNewVideos",
    value: function () {
      var _createNewVideos = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(newVideos) {
        var newVideo;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _models["default"].tempVideos.create(newVideos);
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
      function createNewVideos(_x) {
        return _createNewVideos.apply(this, arguments);
      }
      return createNewVideos;
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
              return _models["default"].tempVideos.findOne({
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
    key: "getAllVideos",
    value: function () {
      var _getAllVideos = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var videos;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _models["default"].tempVideos.findAll({
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
      function getAllVideos() {
        return _getAllVideos.apply(this, arguments);
      }
      return getAllVideos;
    }()
  }, {
    key: "deleteVideos",
    value: function () {
      var _deleteVideos = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id) {
        var result;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _models["default"].tempVideos.destroy({
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
      function deleteVideos(_x3) {
        return _deleteVideos.apply(this, arguments);
      }
      return deleteVideos;
    }()
  }, {
    key: "updateVideos",
    value: function () {
      var _updateVideos = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id, data) {
        var result;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _models["default"].tempVideos.update(data, {
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
      function updateVideos(_x4, _x5) {
        return _updateVideos.apply(this, arguments);
      }
      return updateVideos;
    }()
  }]);
  return tempVideoServices;
}();
var _default = exports["default"] = tempVideoServices;