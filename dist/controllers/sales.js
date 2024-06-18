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
var _salesService = _interopRequireDefault(require("../services/salesService"));
var _utilities = _interopRequireDefault(require("../helpers/utilities"));
var _response = _interopRequireDefault(require("../helpers/response"));
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var util = new _utilities["default"]();
var salesController = /*#__PURE__*/function () {
  function salesController() {
    (0, _classCallCheck2["default"])(this, salesController);
  }
  (0, _createClass2["default"])(salesController, null, [{
    key: "getSalesByModeOfPayment",
    value: function () {
      var _getSalesByModeOfPayment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var sales;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _salesService["default"].getSalesByModeOfPayment(req.query.mode);
            case 3:
              sales = _context.sent;
              if (!sales) {
                _context.next = 6;
                break;
              }
              return _context.abrupt("return", util.setSuccessResponse(res, "data found", 200, sales));
            case 6:
              util.setErrorResponse(res, "data not found", 400);
              _context.next = 12;
              break;
            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              util.setErrorResponse(res, "something went wrong", 503);
            case 12:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 9]]);
      }));
      function getSalesByModeOfPayment(_x, _x2) {
        return _getSalesByModeOfPayment.apply(this, arguments);
      }
      return getSalesByModeOfPayment;
    }()
  }, {
    key: "getSalesInTimeRange",
    value: function () {
      var _getSalesInTimeRange = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var _req$body, start, end, startDate, endDate, sales;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _req$body = req.body, start = _req$body.start, end = _req$body.end;
              startDate = new Date(start).getTime();
              endDate = new Date(end).getTime();
              _context2.next = 6;
              return _salesService["default"].getSalesInTimeRange(startDate, endDate);
            case 6:
              sales = _context2.sent;
              if (!sales) {
                _context2.next = 9;
                break;
              }
              return _context2.abrupt("return", util.setSuccessResponse(res, "data found", 200, sales));
            case 9:
              util.setErrorResponse(res, "data not found", 400);
              _context2.next = 15;
              break;
            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](0);
              util.setErrorResponse(res, "something went wrong", 503);
            case 15:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 12]]);
      }));
      function getSalesInTimeRange(_x3, _x4) {
        return _getSalesInTimeRange.apply(this, arguments);
      }
      return getSalesInTimeRange;
    }()
  }, {
    key: "getAllSales",
    value: function () {
      var _getAllSales = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var salesUpdate, sales, sum, i, date, dateFormat, resp, fn, _iterator, _step, creationTime, _creationTime$match, _creationTime$match2, month, day, year, key, key1, _i;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              salesUpdate = [];
              _context3.next = 4;
              return _salesService["default"].getAllSaless();
            case 4:
              sales = _context3.sent;
              sum = 0;
              if (!(Object.values(sales).length > 0)) {
                _context3.next = 17;
                break;
              }
              // For Grouping sales by moths and year they created from

              for (i = 0; i < sales.length; i++) {
                date = new Date(sales[i].dataValues.creationTime);
                dateFormat = new Intl.DateTimeFormat("nl-BE", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric"
                });
                if (sales[i].dataValues.creationTime) {
                  sales[i].dataValues.creationTime = dateFormat.format(date);
                  salesUpdate.push(sales[i].dataValues);
                }
              }
              resp = {};
              fn = function fn(year, month) {
                var o = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : resp;
                var array = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : salesUpdate;
                o[year][month] = (0, _defineProperty2["default"])({}, month, array.filter(function (_ref) {
                  var d = _ref.creationTime;
                  return "".concat(month, "/").concat(year) === "".concat(d.slice(0, 2), "/").concat(d.slice(6, 10));
                }));
              };
              _iterator = _createForOfIteratorHelper(salesUpdate);
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  creationTime = _step.value.creationTime;
                  _creationTime$match = creationTime.match(/\d+/g), _creationTime$match2 = (0, _slicedToArray2["default"])(_creationTime$match, 3), month = _creationTime$match2[0], day = _creationTime$match2[1], year = _creationTime$match2[2];
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
                      resp[key][key1].sum += resp[key][key1][key1][_i].amount;
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
              return _context3.abrupt("return", _response["default"].successResponse(res, 200, "Sales found ", {
                data: resp
              }));
            case 17:
              return _context3.abrupt("return", _response["default"].successResponse(res, 400, "Data Not found", 0));
            case 20:
              _context3.prev = 20;
              _context3.t0 = _context3["catch"](0);
              util.setErrorResponse(res, "something went wrong ".concat(_context3.t0), 503);
            case 23:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 20]]);
      }));
      function getAllSales(_x5, _x6) {
        return _getAllSales.apply(this, arguments);
      }
      return getAllSales;
    }()
  }, {
    key: "getSales",
    value: function () {
      var _getSales = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var sales;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _salesService["default"].getAllSaless();
            case 3:
              sales = _context4.sent;
              if (!(Object.values(sales).length < 1)) {
                _context4.next = 6;
                break;
              }
              return _context4.abrupt("return", _response["default"].successResponse(res, 400, 'sales Not found', []));
            case 6:
              return _context4.abrupt("return", _response["default"].successResponse(res, 200, 'sales retrieved successfully', sales));
            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](0);
              console.log(_context4.t0);
              util.setErrorResponse(res, "something went wrong ".concat(_context4.t0), 503);
            case 13:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 9]]);
      }));
      function getSales(_x7, _x8) {
        return _getSales.apply(this, arguments);
      }
      return getSales;
    }()
  }]);
  return salesController;
}();
var _default = exports["default"] = salesController;