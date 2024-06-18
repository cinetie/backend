"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _chai = _interopRequireWildcard(require("chai"));
var _sinon = _interopRequireDefault(require("sinon"));
var _sequelize = require("sequelize");
var _stopLoginSessions = _interopRequireDefault(require("../helpers/stopLoginSessions"));
var _models = _interopRequireDefault(require("../database/models"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var Op = _sequelize.Sequelize.Op;
describe("TEST CRON JOB", function () {
  it("should update the database", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var stub, start, date;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          stub = _sinon["default"].stub(_models["default"].loginSessions, "update");
          start = new Date();
          date = new Date(start.getTime());
          _context.next = 5;
          return (0, _stopLoginSessions["default"])();
        case 5:
          (0, _chai.expect)(stub.calledOnce).to.be["true"];
          _sinon["default"].assert.calledWith(stub, {
            state: "out",
            timeOut: _sinon["default"].match.string
          }, {
            where: {
              createdAt: (0, _defineProperty2["default"])({}, Op.lte, _sinon["default"].match.date)
            }
          });
          stub.restore();
        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
});