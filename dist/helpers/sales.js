"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _salesService = _interopRequireDefault(require("../services/salesService"));
var _uuid = _interopRequireDefault(require("./uuid"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var addRecord = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(details) {
    var dates, data, status;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          dates = new Date();
          data = _objectSpread(_objectSpread({}, details), {}, {
            transactionId: _uuid["default"].generator(),
            creationTime: dates.getTime()
          });
          _context.next = 5;
          return _salesService["default"].createNewSales(data);
        case 5:
          status = _context.sent;
          if (!status) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return", 1);
        case 8:
          return _context.abrupt("return", 0);
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          throw _context.t0;
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 11]]);
  }));
  return function addRecord(_x) {
    return _ref.apply(this, arguments);
  };
}();
var _default = exports["default"] = {
  addRecord: addRecord
};