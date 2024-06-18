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
var _date6 = _interopRequireDefault(require("../helpers/date"));
var _jwt = _interopRequireDefault(require("../helpers/jwt"));
var _response = _interopRequireDefault(require("../helpers/response"));
var _utilities = _interopRequireDefault(require("../helpers/utilities"));
var _billingServices = _interopRequireDefault(require("../services/billingServices"));
var _transactionService = _interopRequireDefault(require("../services/transactionService"));
var _earningServices = _interopRequireDefault(require("../services/earningServices"));
var _userServices = _interopRequireDefault(require("../services/userServices"));
var _viewingSessionsServices = _interopRequireDefault(require("../services/viewingSessionsServices"));
var _webhooks = _interopRequireDefault(require("./webhooks"));
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; } /* eslint-disable no-plusplus */ /* eslint-disable vars-on-top */ /* eslint-disable no-var */ /* eslint-disable no-useless-catch */
var util = new _utilities["default"]();
// IMPORTANT  when pulling earnings make sure to map a new
// understandable date format not just milliseconds
var earningController = /*#__PURE__*/function () {
  function earningController() {
    (0, _classCallCheck2["default"])(this, earningController);
  }
  (0, _createClass2["default"])(earningController, null, [{
    key: "getCurrentSubscriptionDetails",
    value: // obtains details about the current users subscription
    function () {
      var _getCurrentSubscriptionDetails = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(email) {
        var details;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _billingServices["default"].getCurrentSubscription(email);
            case 2:
              details = _context.sent;
              if (!details) {
                _context.next = 5;
                break;
              }
              return _context.abrupt("return", details);
            case 5:
              return _context.abrupt("return", null);
            case 6:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function getCurrentSubscriptionDetails(_x) {
        return _getCurrentSubscriptionDetails.apply(this, arguments);
      }
      return getCurrentSubscriptionDetails;
    }() // obtains details about the current user viewing sessions
  }, {
    key: "getCurrentViewingSessions",
    value: function () {
      var _getCurrentViewingSessions = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(email) {
        var details;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _viewingSessionsServices["default"].getActiveAndSuspendedSessionsPerUser(email);
            case 2:
              details = _context2.sent;
              if (!details) {
                _context2.next = 5;
                break;
              }
              return _context2.abrupt("return", details);
            case 5:
              return _context2.abrupt("return", null);
            case 6:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function getCurrentViewingSessions(_x2) {
        return _getCurrentViewingSessions.apply(this, arguments);
      }
      return getCurrentViewingSessions;
    }() // obtain amount to attribute to each distinct view based on their subscription
  }, {
    key: "calculateRatePerVideo",
    value: function () {
      var _calculateRatePerVideo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(email) {
        var sessionDetails, subscriptionDetails, rate;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.getCurrentViewingSessions(email);
            case 2:
              sessionDetails = _context3.sent;
              _context3.next = 5;
              return this.getCurrentSubscriptionDetails(email);
            case 5:
              subscriptionDetails = _context3.sent;
              rate = Number(subscriptionDetails.price) * 0.7 / Object.values(sessionDetails).length;
              if (!rate) {
                _context3.next = 9;
                break;
              }
              return _context3.abrupt("return", rate);
            case 9:
              return _context3.abrupt("return", null);
            case 10:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function calculateRatePerVideo(_x3) {
        return _calculateRatePerVideo.apply(this, arguments);
      }
      return calculateRatePerVideo;
    }() // assign the obtained rate to each video.
    // upon failure of this method maping the numerous elements of session's array and
    // then doing a bulk create
    // would solve the issue.
  }, {
    key: "assignRateToEachVideo",
    value: function () {
      var _assignRateToEachVideo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(email) {
        var results, updatedSessions, sessions, rate, _date;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              results = []; // eslint-disable-next-line no-unused-vars
              updatedSessions = [];
              _context6.next = 5;
              return this.getCurrentViewingSessions(email);
            case 5:
              sessions = _context6.sent;
              _context6.next = 8;
              return this.calculateRatePerVideo(email);
            case 8:
              rate = _context6.sent;
              _date = new Date();
              sessions.forEach( /*#__PURE__*/function () {
                var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(data) {
                  var updates;
                  return _regenerator["default"].wrap(function _callee4$(_context4) {
                    while (1) switch (_context4.prev = _context4.next) {
                      case 0:
                        updates = {
                          sessionState: "inActive"
                        };
                        _context4.next = 3;
                        return _viewingSessionsServices["default"].updateViewingSessions(data.id, updates);
                      case 3:
                        updatedSessions = _context4.sent;
                      case 4:
                      case "end":
                        return _context4.stop();
                    }
                  }, _callee4);
                }));
                return function (_x5) {
                  return _ref.apply(this, arguments);
                };
              }());
              sessions.forEach( /*#__PURE__*/function () {
                var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(data) {
                  var earnings;
                  return _regenerator["default"].wrap(function _callee5$(_context5) {
                    while (1) switch (_context5.prev = _context5.next) {
                      case 0:
                        earnings = {
                          videoId: data.videoId,
                          clientId: data.clientId,
                          amount: rate.toPrecision(4),
                          state: "Active",
                          monthYear: _date.getTime()
                        };
                        _context5.next = 3;
                        return _earningServices["default"].createNewEarnings(earnings);
                      case 3:
                        results = _context5.sent;
                      case 4:
                      case "end":
                        return _context5.stop();
                    }
                  }, _callee5);
                }));
                return function (_x6) {
                  return _ref2.apply(this, arguments);
                };
              }());
              // const updates = await subscriptionService.setSubscriptionToSettled(email, { state: 'settled' });
              if (!results) {
                _context6.next = 14;
                break;
              }
              return _context6.abrupt("return", true);
            case 14:
              return _context6.abrupt("return", false);
            case 17:
              _context6.prev = 17;
              _context6.t0 = _context6["catch"](0);
              throw _context6.t0;
            case 20:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this, [[0, 17]]);
      }));
      function assignRateToEachVideo(_x4) {
        return _assignRateToEachVideo.apply(this, arguments);
      }
      return assignRateToEachVideo;
    }()
  }, {
    key: "getAllEarnings",
    value: function () {
      var _getAllEarnings = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
        var sum, data, i, _date2, formattedData, _i, count, j, monthYear, obj, uniqueValues;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              sum = 0;
              _context7.next = 4;
              return _earningServices["default"].getAllEarningss();
            case 4:
              data = _context7.sent;
              if (!(Object.values(data).length > 0)) {
                _context7.next = 11;
                break;
              }
              for (i = 0; i < Object.values(data).length; i++) {
                _date2 = new Date(Number(data[i].monthYear));
                data[i].monthYear = "".concat(_date2.toDateString().slice(4, 7), "/").concat(_date2.getFullYear());
                sum += Number(data[i].amount);
              }
              formattedData = [];
              for (_i = 0; _i < data.length; _i++) {
                count = 0;
                for (j = 0; j < data.length; j++) {
                  monthYear = data[_i].monthYear;
                  if (data[_i].monthYear === data[j].monthYear) {
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
              return _context7.abrupt("return", _response["default"].successResponse(res, 200, "Earnings found ", {
                sum: Number(sum.toFixed(2)),
                data: uniqueValues
              }));
            case 11:
              return _context7.abrupt("return", _response["default"].successResponse(res, 404, "Data Not found", 0));
            case 14:
              _context7.prev = 14;
              _context7.t0 = _context7["catch"](0);
              return _context7.abrupt("return", _response["default"].errorResponse(res, 500, "Something happened", _context7.t0.message));
            case 17:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[0, 14]]);
      }));
      function getAllEarnings(_x7, _x8) {
        return _getAllEarnings.apply(this, arguments);
      }
      return getAllEarnings;
    }()
  }, {
    key: "getAllActiveEarnings",
    value: function () {
      var _getAllActiveEarnings = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
        var sum, data, i, _date3, formattedData, _i2, count, j, monthYear, obj, uniqueValues;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              sum = 0;
              _context8.next = 4;
              return _earningServices["default"].getAllActiveEarnings();
            case 4:
              data = _context8.sent;
              if (!(Object.values(data).length > 0)) {
                _context8.next = 11;
                break;
              }
              for (i = 0; i < Object.values(data).length; i++) {
                _date3 = new Date(Number(data[i].monthYear));
                data[i].monthYear = "".concat(_date3.toDateString().slice(4, 7), "/").concat(_date3.getFullYear());
                sum += Number(data[i].amount);
              }
              formattedData = [];
              for (_i2 = 0; _i2 < data.length; _i2++) {
                count = 0;
                for (j = 0; j < data.length; j++) {
                  monthYear = data[_i2].monthYear;
                  if (data[_i2].monthYear === data[j].monthYear) {
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
              return _context8.abrupt("return", _response["default"].successResponse(res, 200, "Earnings found ", {
                sum: Number(sum.toFixed(2)),
                data: uniqueValues
              }));
            case 11:
              return _context8.abrupt("return", _response["default"].successResponse(res, 404, "Data Not found", 0));
            case 14:
              _context8.prev = 14;
              _context8.t0 = _context8["catch"](0);
              return _context8.abrupt("return", _response["default"].errorResponse(res, 500, "Something happened", _context8.t0.message));
            case 17:
            case "end":
              return _context8.stop();
          }
        }, _callee8, null, [[0, 14]]);
      }));
      function getAllActiveEarnings(_x9, _x10) {
        return _getAllActiveEarnings.apply(this, arguments);
      }
      return getAllActiveEarnings;
    }() // get earnings per video
  }, {
    key: "getAllEarningsPerVideo",
    value: function () {
      var _getAllEarningsPerVideo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
        var dataUpdate, sum, data, i, _date4, dateFormat, resp, fn, _iterator, _step, _monthYear, _monthYear$match, _monthYear$match2, month, day, year, key, key1, _i3, _i4, count, j, monthYear;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              dataUpdate = [];
              sum = 0;
              _context9.next = 5;
              return _earningServices["default"].getEarningsByVideo(req.query.videoId);
            case 5:
              data = _context9.sent;
              if (!(data.length > 0)) {
                _context9.next = 17;
                break;
              }
              // convert earning date to a day, month and year format
              for (i = 0; i < data.length; i++) {
                _date4 = new Date(data[i].dataValues.monthYear);
                dateFormat = new Intl.DateTimeFormat("nl-BE", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric"
                });
                if (data[i].dataValues.monthYear) {
                  data[i].dataValues.monthYear = dateFormat.format(_date4);
                  dataUpdate.push(data[i].dataValues);
                }
              }
              resp = {}; // add month earnings(in an array) to the month property
              fn = function fn(year, month) {
                var o = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : resp;
                var array = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : dataUpdate;
                o[year][month] = (0, _defineProperty2["default"])({}, month, array.filter(function (_ref3) {
                  var d = _ref3.monthYear;
                  return "".concat(month, "/").concat(year) === "".concat(d.slice(0, 2), "/").concat(d.slice(6, 10));
                }));
              }; // add nested month property and year property
              _iterator = _createForOfIteratorHelper(dataUpdate);
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  _monthYear = _step.value.monthYear;
                  _monthYear$match = _monthYear.match(/\d+/g), _monthYear$match2 = (0, _slicedToArray2["default"])(_monthYear$match, 3), month = _monthYear$match2[0], day = _monthYear$match2[1], year = _monthYear$match2[2];
                  if (!resp[year]) resp[year] = {};
                  fn(year, month);
                }
                // calculate monthly total earnings
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
              for (key in resp) {
                if (resp.hasOwnProperty(key)) {
                  for (key1 in resp[key]) {
                    resp[key][key1].sum = 0;
                    for (_i3 = 0; _i3 < resp[key][key1][key1].length; _i3++) {
                      resp[key][key1].sum += resp[key][key1][key1][_i3].amount;
                    }
                  }
                }
              }
              // calculate annual total earnings
              for (key in resp) {
                for (_i4 = 0; _i4 < data.length; _i4++) {
                  count = 0;
                  if (resp.hasOwnProperty(key)) {
                    for (j = 0; j < data.length; j++) {
                      monthYear = data[_i4].monthYear;
                      for (key1 in resp[key]) {
                        if (data[_i4].monthYear == data[j].monthYear) {
                          if (!resp[key].sumYear) {
                            count += Number(data[j].amount);
                            resp[key].sumYear = 0;
                          }
                          resp[key].sumYear += resp[key][key1].sum;
                        }
                      }
                    }
                  }
                }
              }
              // calculate the video total earning
              for (key in resp) {
                if (!resp.sumTotal) {
                  resp.sumTotal = 0;
                }
                if (resp.hasOwnProperty(key)) {
                  resp.sumTotal += resp[key].sumYear;
                }
              }
              // remove the earning arrays
              for (key in resp) {
                if (resp.hasOwnProperty(key)) {
                  for (key1 in resp[key]) {
                    delete resp[key][key1][key1];
                  }
                }
              }
              return _context9.abrupt("return", _response["default"].successResponse(res, 200, "earnings found", resp));
            case 17:
              return _context9.abrupt("return", _response["default"].successResponse(res, 404, "Data Not found", 0));
            case 20:
              _context9.prev = 20;
              _context9.t0 = _context9["catch"](0);
              return _context9.abrupt("return", _response["default"].errorResponse(res, 500, "Something happened", _context9.t0.message));
            case 23:
            case "end":
              return _context9.stop();
          }
        }, _callee9, null, [[0, 20]]);
      }));
      function getAllEarningsPerVideo(_x11, _x12) {
        return _getAllEarningsPerVideo.apply(this, arguments);
      }
      return getAllEarningsPerVideo;
    }()
  }, {
    key: "getActiveEarningsPerVideo",
    value: function () {
      var _getActiveEarningsPerVideo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
        var sum, data, i;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              sum = 0;
              _context10.next = 4;
              return _earningServices["default"].getActiveEarningsByVideo(req.query.videoId, req.user);
            case 4:
              data = _context10.sent;
              if (!(Object.values(data).length > 0)) {
                _context10.next = 8;
                break;
              }
              for (i = 0; i < Object.values(data).length; i++) {
                sum += Number(data[i].amount);
              }
              return _context10.abrupt("return", _response["default"].successResponse(res, 200, "Earnings found ", sum));
            case 8:
              return _context10.abrupt("return", _response["default"].successResponse(res, 404, "Data Not found", 0));
            case 11:
              _context10.prev = 11;
              _context10.t0 = _context10["catch"](0);
              return _context10.abrupt("return", _response["default"].errorResponse(res, 500, "Something happened", _context10.t0.message));
            case 14:
            case "end":
              return _context10.stop();
          }
        }, _callee10, null, [[0, 11]]);
      }));
      function getActiveEarningsPerVideo(_x13, _x14) {
        return _getActiveEarningsPerVideo.apply(this, arguments);
      }
      return getActiveEarningsPerVideo;
    }()
  }, {
    key: "getActiveEarningsPerClient",
    value: function () {
      var _getActiveEarningsPerClient = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
        var sum, _jwt$jwtVerify, clientId, data, i;
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _context11.prev = 0;
              sum = 0;
              _jwt$jwtVerify = _jwt["default"].jwtVerify(req.headers.authorization.slice(7), process.env.SECRET), clientId = _jwt$jwtVerify.clientId;
              _context11.next = 5;
              return _earningServices["default"].getActiveEarningsByClientId(clientId);
            case 5:
              data = _context11.sent;
              if (!(Object.values(data).length > 0)) {
                _context11.next = 9;
                break;
              }
              for (i = 0; i < Object.values(data).length; i++) {
                sum += Number(data[i].amount);
              }
              return _context11.abrupt("return", _response["default"].successResponse(res, 200, "Earnings found ", sum));
            case 9:
              return _context11.abrupt("return", _response["default"].successResponse(res, 404, "Data Not found", 0));
            case 12:
              _context11.prev = 12;
              _context11.t0 = _context11["catch"](0);
              return _context11.abrupt("return", _response["default"].errorResponse(res, 500, "Something happened", _context11.t0.message));
            case 15:
            case "end":
              return _context11.stop();
          }
        }, _callee11, null, [[0, 12]]);
      }));
      function getActiveEarningsPerClient(_x15, _x16) {
        return _getActiveEarningsPerClient.apply(this, arguments);
      }
      return getActiveEarningsPerClient;
    }()
  }, {
    key: "getEarningsPerClient",
    value: function () {
      var _getEarningsPerClient = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res) {
        var sum, _jwt$jwtVerify2, clientId, data, i, _date5, formattedData, _i5, count, j, monthYear, obj, uniqueValues;
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              _context12.prev = 0;
              sum = 0;
              _jwt$jwtVerify2 = _jwt["default"].jwtVerify(req.headers.authorization.slice(7), process.env.SECRET), clientId = _jwt$jwtVerify2.clientId;
              _context12.next = 5;
              return _earningServices["default"].getEarningsByClientId(clientId);
            case 5:
              data = _context12.sent;
              if (!(Object.values(data).length > 0)) {
                _context12.next = 12;
                break;
              }
              for (i = 0; i < Object.values(data).length; i++) {
                _date5 = new Date(Number(data[i].monthYear));
                data[i].monthYear = "".concat(_date5.toDateString().slice(4, 7), "/").concat(_date5.getFullYear());
                sum += Number(data[i].amount);
              }
              formattedData = [];
              for (_i5 = 0; _i5 < data.length; _i5++) {
                count = 0;
                for (j = 0; j < data.length; j++) {
                  monthYear = data[_i5].monthYear;
                  if (data[_i5].monthYear === data[j].monthYear) {
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
              return _context12.abrupt("return", _response["default"].successResponse(res, 200, "Earnings found ", {
                sum: Number(sum.toFixed(2)),
                data: uniqueValues
              }));
            case 12:
              return _context12.abrupt("return", _response["default"].successResponse(res, 404, "Data Not found", 0));
            case 15:
              _context12.prev = 15;
              _context12.t0 = _context12["catch"](0);
              return _context12.abrupt("return", _response["default"].errorResponse(res, 500, "Something happened", _context12.t0.message));
            case 18:
            case "end":
              return _context12.stop();
          }
        }, _callee12, null, [[0, 15]]);
      }));
      function getEarningsPerClient(_x17, _x18) {
        return _getEarningsPerClient.apply(this, arguments);
      }
      return getEarningsPerClient;
    }()
  }, {
    key: "calculateEarningsPerUser",
    value: function () {
      var _calculateEarningsPerUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
        var updates, currentSubscription, status, updateSubscription;
        return _regenerator["default"].wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              _context13.prev = 0;
              _context13.next = 3;
              return _userServices["default"].updateUser(req.user, {
                permissionLevel: 1
              });
            case 3:
              updates = _context13.sent;
              _context13.next = 6;
              return _billingServices["default"].getCurrentSubscription(req.user);
            case 6:
              currentSubscription = _context13.sent;
              if (!(updates[1] === 1)) {
                _context13.next = 26;
                break;
              }
              _context13.next = 10;
              return _webhooks["default"].registerSales({
                payment_type: req.body.paymentMethod,
                amount: currentSubscription.price
              }, currentSubscription, req, res);
            case 10:
              status = _context13.sent;
              if (!(status === true)) {
                _context13.next = 25;
                break;
              }
              if (!(updates.isBilledAnnually === true)) {
                _context13.next = 18;
                break;
              }
              _context13.next = 15;
              return _billingServices["default"].updateSubscription(req.user, {
                endDate: _date6["default"].addMoreDays(365).toDateString(),
                state: "current",
                dueState: false
              });
            case 15:
              _context13.t0 = _context13.sent;
              _context13.next = 21;
              break;
            case 18:
              _context13.next = 20;
              return _billingServices["default"].updateSubscription(req.user, {
                endDate: _date6["default"].addMoreDays(30).toDateString(),
                state: "current",
                dueState: false
              });
            case 20:
              _context13.t0 = _context13.sent;
            case 21:
              updateSubscription = _context13.t0;
              if (!(updateSubscription[1] !== 0)) {
                _context13.next = 24;
                break;
              }
              return _context13.abrupt("return", _response["default"].successResponse(res, 200, "Success transaction finished", status));
            case 24:
              return _context13.abrupt("return", _response["default"].errorResponse(res, 400, "something went wrong updating subscription", "BAD_REQUEST"));
            case 25:
              return _context13.abrupt("return", _response["default"].errorResponse(res, 400, "something went wrong registering earnings", "BAD_REQUEST"));
            case 26:
              return _context13.abrupt("return", _response["default"].errorResponse(res, 400, "user updates are not running", "BAD_REQUEST"));
            case 29:
              _context13.prev = 29;
              _context13.t1 = _context13["catch"](0);
              return _context13.abrupt("return", _response["default"].errorResponse(res, 500, "Something happened", "SERVER_ERROR"));
            case 32:
            case "end":
              return _context13.stop();
          }
        }, _callee13, null, [[0, 29]]);
      }));
      function calculateEarningsPerUser(_x19, _x20) {
        return _calculateEarningsPerUser.apply(this, arguments);
      }
      return calculateEarningsPerUser;
    }()
  }]);
  return earningController;
}();
var _default = exports["default"] = earningController;