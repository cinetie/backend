"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _sequelize = _interopRequireDefault(require("sequelize"));
var _models = _interopRequireDefault(require("../database/models"));
var op = _sequelize["default"].Op;
var planServices = /*#__PURE__*/function () {
  function planServices() {
    (0, _classCallCheck2["default"])(this, planServices);
  }
  (0, _createClass2["default"])(planServices, null, [{
    key: "addPlan",
    value: function () {
      var _addPlan = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(newPlan) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _models["default"].plans.create(newPlan);
            case 3:
              return _context.abrupt("return", _context.sent);
            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](0);
              throw _context.t0;
            case 9:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 6]]);
      }));
      function addPlan(_x) {
        return _addPlan.apply(this, arguments);
      }
      return addPlan;
    }()
  }, {
    key: "deletePlan",
    value: function () {
      var _deletePlan = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _models["default"].plans.destroy({
                where: {
                  id: id
                }
              });
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
      function deletePlan(_x2) {
        return _deletePlan.apply(this, arguments);
      }
      return deletePlan;
    }()
  }, {
    key: "updatePlans",
    value: function () {
      var _updatePlans = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id, plan) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _models["default"].plans.update(plan, {
                returning: true,
                where: {
                  id: id
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
      function updatePlans(_x3, _x4) {
        return _updatePlans.apply(this, arguments);
      }
      return updatePlans;
    }()
  }, {
    key: "getParticalPlan",
    value: function () {
      var _getParticalPlan = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(type) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _models["default"].plans.findOne({
                where: {
                  type: type
                }
              });
            case 3:
              return _context4.abrupt("return", _context4.sent);
            case 6:
              _context4.prev = 6;
              _context4.t0 = _context4["catch"](0);
              throw _context4.t0;
            case 9:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 6]]);
      }));
      function getParticalPlan(_x5) {
        return _getParticalPlan.apply(this, arguments);
      }
      return getParticalPlan;
    }()
  }, {
    key: "getAllPlan",
    value: function () {
      var _getAllPlan = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _models["default"].plans.findAll({
                where: {
                  type: (0, _defineProperty2["default"])({}, op.not, "Setup")
                }
              });
            case 3:
              return _context5.abrupt("return", _context5.sent);
            case 6:
              _context5.prev = 6;
              _context5.t0 = _context5["catch"](0);
              throw _context5.t0;
            case 9:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 6]]);
      }));
      function getAllPlan() {
        return _getAllPlan.apply(this, arguments);
      }
      return getAllPlan;
    }()
  }]);
  return planServices;
}();
var _default = exports["default"] = planServices;