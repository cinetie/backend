"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _viewingSessionsServices = _interopRequireDefault(require("../services/viewingSessionsServices"));
var _response = _interopRequireDefault(require("../helpers/response"));
var _utilities = _interopRequireDefault(require("../helpers/utilities"));
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; } /* eslint-disable block-scoped-var */ /* eslint-disable vars-on-top */
var util = new _utilities["default"]();
var viewingSessionController = /*#__PURE__*/function () {
  function viewingSessionController() {
    (0, _classCallCheck2["default"])(this, viewingSessionController);
  }
  (0, _createClass2["default"])(viewingSessionController, null, [{
    key: "getSpecificSessions",
    value: function () {
      var _getSpecificSessions = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var viewsUpdate, videoId, views, i, date, dateFormat, resp, fn, _iterator, _step, time, _time$match, _time$match2, month, day, year, key, key1, _i, cities, _i2, count, j, location, obj, byCity;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              viewsUpdate = [];
              videoId = req.query.videoId;
              _context.next = 5;
              return _viewingSessionsServices["default"].getSessionsPerVideo(videoId);
            case 5:
              views = _context.sent;
              if (!(Object.values(views).length > 0)) {
                _context.next = 20;
                break;
              }
              // For Grouping Views by moths and year they created from

              for (i = 0; i < views.length; i++) {
                date = new Date(Number(views[i].dataValues.time));
                dateFormat = new Intl.DateTimeFormat("nl-BE", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric"
                });
                if (Number(views[i].dataValues.time)) {
                  views[i].dataValues.time = dateFormat.format(date);
                  viewsUpdate.push(views[i].dataValues);
                }
              }
              resp = {};
              fn = function fn(year, month) {
                var o = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : resp;
                var array = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : viewsUpdate;
                o[year][month] = (0, _defineProperty2["default"])({}, month, array.filter(function (_ref) {
                  var d = _ref.time;
                  return "".concat(month, "/").concat(year) === "".concat(d.slice(0, 2), "/").concat(d.slice(6, 10));
                }));
              };
              _iterator = _createForOfIteratorHelper(viewsUpdate);
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  time = _step.value.time;
                  _time$match = time.match(/\d+/g), _time$match2 = (0, _slicedToArray2["default"])(_time$match, 3), month = _time$match2[0], day = _time$match2[1], year = _time$match2[2];
                  if (!resp[year]) resp[year] = {};
                  fn(year, month);
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
              for (key in resp) {
                if (resp.hasOwnProperty(key)) {
                  for (key1 in resp[key]) {
                    resp[key][key1].sum = 0;
                    for (_i = 0; _i < resp[key][key1][key1].length; _i++) {
                      resp[key][key1].sum++;
                    }
                  }
                }
              }
              for (key in resp) {
                if (resp.hasOwnProperty(key)) {
                  for (key1 in resp[key]) {
                    if (!resp[key].sumYear) {
                      resp[key].sumYear = 0;
                    }
                    resp[key].sumYear += resp[key][key1].sum;
                  }
                }
              }
              for (key in resp) {
                if (!resp.sumTotal) {
                  resp.sumTotal = 0;
                }
                if (resp.hasOwnProperty(key)) {
                  resp.sumTotal += resp[key].sumYear;
                }
              }
              for (key in resp) {
                if (resp.hasOwnProperty(key)) {
                  for (key1 in resp[key]) {
                    delete resp[key][key1][key1];
                  }
                }
              }
              cities = [];
              for (_i2 = 0; _i2 < views.length; _i2++) {
                count = 0;
                for (j = 0; j < views.length; j++) {
                  location = views[_i2].location;
                  if (views[_i2].location == views[j].location) {
                    count += 1;
                  }
                }
                obj = {
                  city: location,
                  views: count
                };
                cities.push(obj);
              }
              byCity = util.getUnique(cities, "city");
              return _context.abrupt("return", res.status(200).json({
                status: 200,
                message: "Found details",
                data: resp,
                city: byCity
              }));
            case 20:
              return _context.abrupt("return", _response["default"].errorResponse(res, 404, "something went wrong", "NotFoundError "));
            case 23:
              _context.prev = 23;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", _response["default"].errorResponse(res, 503, "something went wrong", "ServerError"));
            case 26:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 23]]);
      }));
      function getSpecificSessions(_x, _x2) {
        return _getSpecificSessions.apply(this, arguments);
      }
      return getSpecificSessions;
    }()
  }, {
    key: "getAllSessionsPerUser",
    value: function () {
      var _getAllSessionsPerUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var userId, data;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              userId = req.query.userId;
              _context2.next = 4;
              return _viewingSessionsServices["default"].getSessionsPerUser(userId);
            case 4:
              data = _context2.sent;
              if (!data) {
                _context2.next = 7;
                break;
              }
              return _context2.abrupt("return", _response["default"].successResponse(res, 200, "Found Data", data));
            case 7:
              return _context2.abrupt("return", _response["default"].errorResponse(res, 404, "Data was not found", "NotFoundError"));
            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", _response["default"].errorResponse(res, 404, "Data was not found", "NotFoundError"));
            case 13:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 10]]);
      }));
      function getAllSessionsPerUser(_x3, _x4) {
        return _getAllSessionsPerUser.apply(this, arguments);
      }
      return getAllSessionsPerUser;
    }()
  }]);
  return viewingSessionController;
}();
var _default = exports["default"] = viewingSessionController;