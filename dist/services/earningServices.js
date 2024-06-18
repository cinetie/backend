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
var _date = _interopRequireDefault(require("../helpers/date"));
/* eslint-disable no-useless-catch */

var op = _sequelize["default"].Op;
var earningsService = /*#__PURE__*/function () {
  function earningsService() {
    (0, _classCallCheck2["default"])(this, earningsService);
  }
  (0, _createClass2["default"])(earningsService, null, [{
    key: "getEarningsByVideo",
    value: function () {
      var _getEarningsByVideo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(videoId) {
        var user;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _models["default"].earnings.findAll({
                attributes: {
                  exclude: ["createdAt", "updatedAt"]
                },
                where: {
                  videoId: videoId
                }
              });
            case 3:
              user = _context.sent;
              if (!user) {
                _context.next = 6;
                break;
              }
              return _context.abrupt("return", user);
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
      function getEarningsByVideo(_x) {
        return _getEarningsByVideo.apply(this, arguments);
      }
      return getEarningsByVideo;
    }()
  }, {
    key: "getEarningsByClientId",
    value: function () {
      var _getEarningsByClientId = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(clientId) {
        var user;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _models["default"].earnings.findAll({
                attributes: {
                  exclude: ["createdAt", "updatedAt"]
                },
                where: {
                  clientId: clientId
                }
              });
            case 3:
              user = _context2.sent;
              if (!user) {
                _context2.next = 6;
                break;
              }
              return _context2.abrupt("return", user);
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
      function getEarningsByClientId(_x2) {
        return _getEarningsByClientId.apply(this, arguments);
      }
      return getEarningsByClientId;
    }()
  }, {
    key: "getInactiveEarningsByClientId",
    value: function () {
      var _getInactiveEarningsByClientId = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(clientId) {
        var user;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _models["default"].earnings.findAll({
                attributes: {
                  exclude: ["createdAt", "updatedAt"]
                },
                where: (0, _defineProperty2["default"])({}, op.and, [{
                  clientId: clientId
                }, {
                  state: "inActive"
                }])
              });
            case 3:
              user = _context3.sent;
              if (!user) {
                _context3.next = 6;
                break;
              }
              return _context3.abrupt("return", user);
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
      function getInactiveEarningsByClientId(_x3) {
        return _getInactiveEarningsByClientId.apply(this, arguments);
      }
      return getInactiveEarningsByClientId;
    }()
  }, {
    key: "getActiveEarningsByClientId",
    value: function () {
      var _getActiveEarningsByClientId = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(clientId) {
        var user;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _models["default"].earnings.findAll({
                attributes: {
                  exclude: ["createdAt", "updatedAt"]
                },
                where: (0, _defineProperty2["default"])({}, op.and, [{
                  clientId: clientId
                }, {
                  state: "Active"
                }])
              });
            case 3:
              user = _context4.sent;
              if (!user) {
                _context4.next = 6;
                break;
              }
              return _context4.abrupt("return", user);
            case 6:
              return _context4.abrupt("return", null);
            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](0);
              throw _context4.t0;
            case 12:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 9]]);
      }));
      function getActiveEarningsByClientId(_x4) {
        return _getActiveEarningsByClientId.apply(this, arguments);
      }
      return getActiveEarningsByClientId;
    }()
  }, {
    key: "getActiveEarningsByVideo",
    value: function () {
      var _getActiveEarningsByVideo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(videoId, clientId) {
        var user;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _models["default"].earnings.findAll({
                attributes: {
                  exclude: ["createdAt", "updatedAt"]
                },
                where: (0, _defineProperty2["default"])({}, op.and, [{
                  videoId: videoId
                }, {
                  clientId: clientId
                }, {
                  state: "Active"
                }])
              });
            case 3:
              user = _context5.sent;
              if (!user) {
                _context5.next = 6;
                break;
              }
              return _context5.abrupt("return", user);
            case 6:
              return _context5.abrupt("return", null);
            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](0);
              throw _context5.t0;
            case 12:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 9]]);
      }));
      function getActiveEarningsByVideo(_x5, _x6) {
        return _getActiveEarningsByVideo.apply(this, arguments);
      }
      return getActiveEarningsByVideo;
    }()
  }, {
    key: "getEarningsById",
    value: function () {
      var _getEarningsById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(id) {
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return _models["default"].earnings.findOne({
                attributes: {
                  exclude: ["createdAt", "updatedAt"]
                },
                where: {
                  id: id
                }
              });
            case 3:
              return _context6.abrupt("return", _context6.sent);
            case 6:
              _context6.prev = 6;
              _context6.t0 = _context6["catch"](0);
              throw _context6.t0;
            case 9:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[0, 6]]);
      }));
      function getEarningsById(_x7) {
        return _getEarningsById.apply(this, arguments);
      }
      return getEarningsById;
    }()
  }, {
    key: "createNewEarnings",
    value: function () {
      var _createNewEarnings = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(newEarnings) {
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return _models["default"].earnings.create(newEarnings);
            case 3:
              return _context7.abrupt("return", _context7.sent);
            case 6:
              _context7.prev = 6;
              _context7.t0 = _context7["catch"](0);
              throw _context7.t0;
            case 9:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[0, 6]]);
      }));
      function createNewEarnings(_x8) {
        return _createNewEarnings.apply(this, arguments);
      }
      return createNewEarnings;
    }()
  }, {
    key: "setEarningsToInactive",
    value: function () {
      var _setEarningsToInactive = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(clientId) {
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _context8.next = 3;
              return _models["default"].earnings.update({
                state: "inActive"
              }, {
                returning: true,
                where: (0, _defineProperty2["default"])({}, op.and, [{
                  clientId: clientId
                }, {
                  state: "Active"
                }])
              });
            case 3:
              return _context8.abrupt("return", _context8.sent);
            case 6:
              _context8.prev = 6;
              _context8.t0 = _context8["catch"](0);
              throw _context8.t0;
            case 9:
            case "end":
              return _context8.stop();
          }
        }, _callee8, null, [[0, 6]]);
      }));
      function setEarningsToInactive(_x9) {
        return _setEarningsToInactive.apply(this, arguments);
      }
      return setEarningsToInactive;
    }()
  }, {
    key: "deleteEarnings",
    value: function () {
      var _deleteEarnings = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(id) {
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              _context9.next = 3;
              return _models["default"].earnings.destroy({
                returning: true,
                where: {
                  id: id
                }
              });
            case 3:
              return _context9.abrupt("return", _context9.sent);
            case 6:
              _context9.prev = 6;
              _context9.t0 = _context9["catch"](0);
              throw _context9.t0;
            case 9:
            case "end":
              return _context9.stop();
          }
        }, _callee9, null, [[0, 6]]);
      }));
      function deleteEarnings(_x10) {
        return _deleteEarnings.apply(this, arguments);
      }
      return deleteEarnings;
    }()
  }, {
    key: "getAllEarningss",
    value: function () {
      var _getAllEarningss = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              _context10.next = 3;
              return _models["default"].earnings.findAll();
            case 3:
              return _context10.abrupt("return", _context10.sent);
            case 6:
              _context10.prev = 6;
              _context10.t0 = _context10["catch"](0);
              throw _context10.t0;
            case 9:
            case "end":
              return _context10.stop();
          }
        }, _callee10, null, [[0, 6]]);
      }));
      function getAllEarningss() {
        return _getAllEarningss.apply(this, arguments);
      }
      return getAllEarningss;
    }()
  }, {
    key: "getAllActiveEarnings",
    value: function () {
      var _getAllActiveEarnings = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _context11.prev = 0;
              _context11.next = 3;
              return _models["default"].earnings.findAll({
                where: {
                  state: "Active"
                }
              });
            case 3:
              return _context11.abrupt("return", _context11.sent);
            case 6:
              _context11.prev = 6;
              _context11.t0 = _context11["catch"](0);
              throw _context11.t0;
            case 9:
            case "end":
              return _context11.stop();
          }
        }, _callee11, null, [[0, 6]]);
      }));
      function getAllActiveEarnings() {
        return _getAllActiveEarnings.apply(this, arguments);
      }
      return getAllActiveEarnings;
    }() // get All active earnings from the last 6 months
  }, {
    key: "getAllFromThreeshold",
    value: function () {
      var _getAllFromThreeshold = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(clientId, min) {
        var origin, data;
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              _context12.prev = 0;
              origin = _date["default"].removeDays(180);
              _context12.next = 4;
              return _models["default"].earnings.findAll({
                where: (0, _defineProperty2["default"])({}, op.and, [{
                  monthYear: (0, _defineProperty2["default"])({}, op.gte, origin),
                  state: "Active",
                  amount: (0, _defineProperty2["default"])({}, op.gte, min),
                  clientId: clientId
                }])
              });
            case 4:
              data = _context12.sent;
              if (!data) {
                _context12.next = 7;
                break;
              }
              return _context12.abrupt("return", data);
            case 7:
              return _context12.abrupt("return", null);
            case 10:
              _context12.prev = 10;
              _context12.t0 = _context12["catch"](0);
              throw _context12.t0;
            case 13:
            case "end":
              return _context12.stop();
          }
        }, _callee12, null, [[0, 10]]);
      }));
      function getAllFromThreeshold(_x11, _x12) {
        return _getAllFromThreeshold.apply(this, arguments);
      }
      return getAllFromThreeshold;
    }()
  }]);
  return earningsService;
}();
var _default = exports["default"] = earningsService;