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
var staffServices = /*#__PURE__*/function () {
  function staffServices() {
    (0, _classCallCheck2["default"])(this, staffServices);
  }
  (0, _createClass2["default"])(staffServices, null, [{
    key: "getStaffByMail",
    value: function () {
      var _getStaffByMail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(email) {
        var staff;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _models["default"].Staffs.findOne({
                attributes: {
                  exclude: ["createdAt", "updatedAt"]
                },
                where: {
                  email: email
                }
              });
            case 3:
              staff = _context.sent;
              if (!staff) {
                _context.next = 6;
                break;
              }
              return _context.abrupt("return", staff);
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
      function getStaffByMail(_x) {
        return _getStaffByMail.apply(this, arguments);
      }
      return getStaffByMail;
    }()
  }, {
    key: "addNewStaff",
    value: function () {
      var _addNewStaff = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _models["default"].Staffs.create(data);
            case 3:
              return _context2.abrupt("return", _context2.sent);
            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2["catch"](0);
              throw _context2.t0;
            case 9:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 6]]);
      }));
      function addNewStaff(_x2) {
        return _addNewStaff.apply(this, arguments);
      }
      return addNewStaff;
    }()
  }, {
    key: "updateStaff",
    value: function () {
      var _updateStaff = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(email, updates) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _models["default"].Staffs.update(updates, {
                returning: true,
                where: {
                  email: email
                }
              });
            case 3:
              return _context3.abrupt("return", _context3.sent);
            case 6:
              _context3.prev = 6;
              _context3.t0 = _context3["catch"](0);
              throw _context3.t0;
            case 9:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 6]]);
      }));
      function updateStaff(_x3, _x4) {
        return _updateStaff.apply(this, arguments);
      }
      return updateStaff;
    }()
  }]);
  return staffServices;
}();
var _default = exports["default"] = staffServices;