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
var _response = _interopRequireDefault(require("../helpers/response"));
var _planServices = _interopRequireDefault(require("../services/planServices"));
var _utilities = _interopRequireDefault(require("../helpers/utilities"));
var util = new _utilities["default"]();
var planController = /*#__PURE__*/function () {
  function planController() {
    (0, _classCallCheck2["default"])(this, planController);
  }
  (0, _createClass2["default"])(planController, null, [{
    key: "addPlan",
    value: function () {
      var _addPlan = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var getPlan, addedPlan;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _planServices["default"].getParticalPlan(req.body.type);
            case 3:
              getPlan = _context.sent;
              if (!getPlan) {
                _context.next = 8;
                break;
              }
              util.setErrorResponse(res, "Plan exists already should you consider updating it instead", 422);
              _context.next = 12;
              break;
            case 8:
              _context.next = 10;
              return _planServices["default"].addPlan(req.body);
            case 10:
              addedPlan = _context.sent;
              util.setSuccessResponse(res, "Plan successfully added!", 201, addedPlan);
            case 12:
              _context.next = 17;
              break;
            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](0);
              util.setErrorResponse(res, "Something went wrong : ".concat(_context.t0), 503);
            case 17:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 14]]);
      }));
      function addPlan(_x, _x2) {
        return _addPlan.apply(this, arguments);
      }
      return addPlan;
    }()
  }, {
    key: "deleteAplan",
    value: function () {
      var _deleteAplan = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var deletedPlan;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _planServices["default"].deletePlan(req.params.id);
            case 3:
              deletedPlan = _context2.sent;
              util.setSuccessResponse(res, "Plan successfully deleted!", 200, deletedPlan);
              _context2.next = 10;
              break;
            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              util.setErrorResponse(res, "Something went wrong : ".concat(_context2.t0), 503);
            case 10:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 7]]);
      }));
      function deleteAplan(_x3, _x4) {
        return _deleteAplan.apply(this, arguments);
      }
      return deleteAplan;
    }()
  }, {
    key: "getParticularPlan",
    value: function () {
      var _getParticularPlan = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var returned;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _planServices["default"].getParticalPlan(req.params.id);
            case 3:
              returned = _context3.sent;
              if (!returned) _response["default"].errorResponse(res, 404, "Plan not found");
              util.setSuccessResponse(res, "Plan successfully retrieved!", 200, returned);
              _context3.next = 11;
              break;
            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](0);
              util.setErrorResponse(res, "Something went wrong : ".concat(_context3.t0), 503);
            case 11:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 8]]);
      }));
      function getParticularPlan(_x5, _x6) {
        return _getParticularPlan.apply(this, arguments);
      }
      return getParticularPlan;
    }()
  }, {
    key: "getAllPlans",
    value: function () {
      var _getAllPlans = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var returned;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _planServices["default"].getAllPlan();
            case 3:
              returned = _context4.sent;
              util.setSuccessResponse(res, "Plans successfully retrieved!", 200, returned);
              _context4.next = 10;
              break;
            case 7:
              _context4.prev = 7;
              _context4.t0 = _context4["catch"](0);
              util.setErrorResponse(res, "Something went wrong : ".concat(_context4.t0), 503);
            case 10:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 7]]);
      }));
      function getAllPlans(_x7, _x8) {
        return _getAllPlans.apply(this, arguments);
      }
      return getAllPlans;
    }()
  }, {
    key: "updatePlan",
    value: function () {
      var _updatePlan = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var toUpdate, updated;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              toUpdate = req.body;
              _context5.next = 4;
              return _planServices["default"].updatePlans(req.params.id, toUpdate);
            case 4:
              updated = _context5.sent;
              util.setSuccessResponse(res, "Plan successfully updated!", 200, updated[1][0]);
              _context5.next = 11;
              break;
            case 8:
              _context5.prev = 8;
              _context5.t0 = _context5["catch"](0);
              util.setErrorResponse(res, "Something went wrong : ".concat(_context5.t0), 503);
            case 11:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 8]]);
      }));
      function updatePlan(_x9, _x10) {
        return _updatePlan.apply(this, arguments);
      }
      return updatePlan;
    }()
  }]);
  return planController;
}();
var _default = exports["default"] = planController;