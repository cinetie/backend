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
var _cpTransServices = _interopRequireDefault(require("../services/cpTransServices"));
var _earningServices = _interopRequireDefault(require("../services/earningServices"));
var _utilities = _interopRequireDefault(require("../helpers/utilities"));
var _jwt = _interopRequireDefault(require("../helpers/jwt"));
var _cpServices = _interopRequireDefault(require("../services/cpServices"));
var helpers = new _utilities["default"]();
var cpTransController = /*#__PURE__*/function () {
  function cpTransController() {
    (0, _classCallCheck2["default"])(this, cpTransController);
  }
  (0, _createClass2["default"])(cpTransController, null, [{
    key: "getAllTransactions",
    value: function () {
      var _getAllTransactions = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var data, i, cp, date;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _cpTransServices["default"].getAllTrans();
            case 3:
              data = _context.sent;
              i = 0;
            case 5:
              if (!(i < Object.values(data).length)) {
                _context.next = 15;
                break;
              }
              _context.next = 8;
              return _cpServices["default"].getCpByClientId(data[i].clientId);
            case 8:
              cp = _context.sent;
              date = new Date(Number(data[i].date));
              data[i].clientId = cp.name;
              data[i].date = "".concat(date.toDateString(), "  ").concat(date.toLocaleTimeString());
            case 12:
              i++;
              _context.next = 5;
              break;
            case 15:
              if (data) {
                helpers.setSuccessResponse(res, "Success", 200, data);
              } else {
                helpers.setErrorResponse(res, "Error occured", 404);
              }
              _context.next = 21;
              break;
            case 18:
              _context.prev = 18;
              _context.t0 = _context["catch"](0);
              helpers.setErrorResponse(res, _context.t0.message, 500);
            case 21:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 18]]);
      }));
      function getAllTransactions(_x, _x2) {
        return _getAllTransactions.apply(this, arguments);
      }
      return getAllTransactions;
    }()
  }, {
    key: "getAllTransById",
    value: function () {
      var _getAllTransById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var token, decoded, data, i, date;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              token = req.headers.authorization.slice(7);
              decoded = _jwt["default"].jwtVerify(token, process.env.SECRET);
              _context2.next = 5;
              return _cpTransServices["default"].getTransById(decoded.clientId);
            case 5:
              data = _context2.sent;
              for (i = 0; i < Object.values(data).length; i++) {
                date = new Date(Number(data[i].date));
                data[i].date = "".concat(date.toDateString(), "  ").concat(date.toLocaleTimeString());
              }
              if (data) {
                helpers.setSuccessResponse(res, "Success", 200, data);
              } else {
                helpers.setErrorResponse(res, "Error occured", 404);
              }
              _context2.next = 13;
              break;
            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](0);
              helpers.setErrorResponse(res, _context2.t0.message, 500);
            case 13:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 10]]);
      }));
      function getAllTransById(_x3, _x4) {
        return _getAllTransById.apply(this, arguments);
      }
      return getAllTransById;
    }()
  }, {
    key: "loadStats",
    value: function () {
      var _loadStats = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var token, raw, data, sum, finalData;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              token = req.headers.authorization.slice(7);
              raw = _jwt["default"].jwtVerify(token, process.env.SECRET);
              _context3.next = 5;
              return _earningServices["default"].getAllFromThreeshold(raw.clientId, process.env.MIN_CASHOUT);
            case 5:
              data = _context3.sent;
              sum = 0;
              data.forEach(function (x) {
                sum += Number(x.amount);
              });
              finalData = {
                data: data,
                sum: sum
              };
              if (Object.values(data).length > 0) {
                helpers.setSuccessResponse(res, "Success", 200, finalData);
              } else {
                helpers.setErrorResponse(res, "Data unfound", 404);
              }
              _context3.next = 15;
              break;
            case 12:
              _context3.prev = 12;
              _context3.t0 = _context3["catch"](0);
              helpers.setErrorResponse(res, _context3.t0.message, 500);
            case 15:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 12]]);
      }));
      function loadStats(_x5, _x6) {
        return _loadStats.apply(this, arguments);
      }
      return loadStats;
    }()
  }, {
    key: "checkout",
    value: function () {
      var _checkout = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var token, raw, data, sum, i, transactInfo, status;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              token = req.headers.authorization.slice(7);
              raw = _jwt["default"].jwtVerify(token, process.env.SECRET);
              _context4.next = 5;
              return _earningServices["default"].getAllFromThreeshold(raw.clientId, Number(process.env.MIN_CASHOUT));
            case 5:
              data = _context4.sent;
              sum = 0;
              for (i = 0; i < Object.values(data).length; i++) {
                sum += Number(data[i].amount);
              }
              if (!(Object.values(data).length > 0)) {
                _context4.next = 18;
                break;
              }
              transactInfo = {
                clientId: raw.clientId,
                date: new Date().getTime(),
                amount: sum
              };
              _context4.next = 12;
              return _cpTransServices["default"].createTrans(transactInfo);
            case 12:
              _context4.next = 14;
              return _earningServices["default"].setEarningsToInactive(raw.clientId);
            case 14:
              status = _context4.sent;
              if (status) {
                _context4.next = 17;
                break;
              }
              return _context4.abrupt("return", helpers.setErrorResponse(res, "Can't cashout easily", 500));
            case 17:
              return _context4.abrupt("return", helpers.setSuccessResponse(res, "Successfully checkout", 200));
            case 18:
              return _context4.abrupt("return", helpers.setErrorResponse(res, "Can't Cash out", 400));
            case 21:
              _context4.prev = 21;
              _context4.t0 = _context4["catch"](0);
              helpers.setErrorResponse(res, _context4.t0.message, 500);
            case 24:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 21]]);
      }));
      function checkout(_x7, _x8) {
        return _checkout.apply(this, arguments);
      }
      return checkout;
    }()
  }, {
    key: "patchNonApprovedTrans",
    value: function () {
      var _patchNonApprovedTrans = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var id, data;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              id = req.query.id;
              _context5.next = 4;
              return _cpTransServices["default"].updateTrans(id, {
                state: "Approved"
              });
            case 4:
              data = _context5.sent;
              if (data) {
                helpers.setSuccessResponse(res, "Successfully Approved cashout", 200);
              } else {
                helpers.setErrorResponse(res, "can't approve cashout", 403);
              }
              _context5.next = 11;
              break;
            case 8:
              _context5.prev = 8;
              _context5.t0 = _context5["catch"](0);
              helpers.setErrorResponse(res, _context5.t0.message, 500);
            case 11:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 8]]);
      }));
      function patchNonApprovedTrans(_x9, _x10) {
        return _patchNonApprovedTrans.apply(this, arguments);
      }
      return patchNonApprovedTrans;
    }()
  }]);
  return cpTransController;
}();
var _default = exports["default"] = cpTransController;