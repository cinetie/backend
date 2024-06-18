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
var _sequelize = _interopRequireDefault(require("sequelize"));
var _models = _interopRequireDefault(require("../database/models"));
/* eslint-disable no-useless-catch */
var WatchedMovieservices = /*#__PURE__*/function () {
  function WatchedMovieservices() {
    (0, _classCallCheck2["default"])(this, WatchedMovieservices);
  }
  (0, _createClass2["default"])(WatchedMovieservices, null, [{
    key: "add",
    value: function () {
      var _add = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
        var added;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _models["default"].WatchedVideo.create(data);
            case 3:
              added = _context.sent;
              if (!added) {
                _context.next = 6;
                break;
              }
              return _context.abrupt("return", added);
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
      function add(_x) {
        return _add.apply(this, arguments);
      }
      return add;
    }()
  }, {
    key: "findWatchedTime",
    value: function () {
      var _findWatchedTime = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(videoId, userId) {
        var added;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _models["default"].WatchedVideo.findOne({
                attributes: {
                  exclude: ["createdAt", "updatedAt"]
                },
                where: {
                  videoId: videoId,
                  userId: userId
                }
              });
            case 3:
              added = _context2.sent;
              if (!added) {
                _context2.next = 6;
                break;
              }
              return _context2.abrupt("return", added);
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
      function findWatchedTime(_x2, _x3) {
        return _findWatchedTime.apply(this, arguments);
      }
      return findWatchedTime;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(watchedTime, id) {
        var updated;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _models["default"].WatchedVideo.update({
                watchedTime: watchedTime
              }, {
                returning: true,
                where: {
                  id: id
                }
              });
            case 3:
              updated = _context3.sent;
              if (!updated[1]) {
                _context3.next = 6;
                break;
              }
              return _context3.abrupt("return", updated);
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
      function update(_x4, _x5) {
        return _update.apply(this, arguments);
      }
      return update;
    }()
  }]);
  return WatchedMovieservices;
}();
var _default = exports["default"] = WatchedMovieservices;