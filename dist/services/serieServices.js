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
/* eslint-disable quotes */

var op = _sequelize["default"].Op;
var serieServices = /*#__PURE__*/function () {
  function serieServices() {
    (0, _classCallCheck2["default"])(this, serieServices);
  }
  (0, _createClass2["default"])(serieServices, null, [{
    key: "createNewEpisode",
    value: function () {
      var _createNewEpisode = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(newSerie) {
        var createdSerie;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _models["default"].series.create(newSerie);
            case 3:
              createdSerie = _context.sent;
              if (!createdSerie) {
                _context.next = 6;
                break;
              }
              return _context.abrupt("return", createdSerie);
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
      function createNewEpisode(_x) {
        return _createNewEpisode.apply(this, arguments);
      }
      return createNewEpisode;
    }()
  }, {
    key: "getSingleEpisode",
    value: function () {
      var _getSingleEpisode = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
        var episode;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _models["default"].series.findOne({
                where: {
                  id: id
                }
              });
            case 3:
              episode = _context2.sent;
              if (!episode) {
                _context2.next = 6;
                break;
              }
              return _context2.abrupt("return", episode);
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
      function getSingleEpisode(_x2) {
        return _getSingleEpisode.apply(this, arguments);
      }
      return getSingleEpisode;
    }()
  }, {
    key: "getEpisodesByClientId",
    value: function () {
      var _getEpisodesByClientId = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(clientId) {
        var episode;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _models["default"].series.findAll({
                where: {
                  clientId: clientId
                }
              });
            case 2:
              episode = _context3.sent;
              if (!episode) {
                _context3.next = 5;
                break;
              }
              return _context3.abrupt("return", episode);
            case 5:
              return _context3.abrupt("return", null);
            case 6:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function getEpisodesByClientId(_x3) {
        return _getEpisodesByClientId.apply(this, arguments);
      }
      return getEpisodesByClientId;
    }()
  }, {
    key: "getSingleSeason",
    value: function () {
      var _getSingleSeason = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(videoId, season, limit, offset) {
        var data;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _models["default"].series.findAll({
                limit: Number(limit),
                offset: Number(offset),
                where: (0, _defineProperty2["default"])({}, op.and, [{
                  videoId: videoId
                }, {
                  season: Number(season)
                }, {
                  suspensionState: false
                }]),
                order: [['episodeNumber', 'ASC']]
              });
            case 3:
              data = _context4.sent;
              if (!(Object.values(data).length > 0)) {
                _context4.next = 6;
                break;
              }
              return _context4.abrupt("return", data);
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
      function getSingleSeason(_x4, _x5, _x6, _x7) {
        return _getSingleSeason.apply(this, arguments);
      }
      return getSingleSeason;
    }()
  }, {
    key: "getAllSeasons",
    value: function () {
      var _getAllSeasons = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(videoId) {
        var data;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _models["default"].series.findAll({
                attributes: [[_sequelize["default"].fn("max", _sequelize["default"].col("season")), "seasons"]],
                where: (0, _defineProperty2["default"])({}, op.and, [{
                  videoId: videoId
                }, {
                  suspensionState: false
                }]),
                order: [["id", "DESC"]],
                group: ["id", "season"]
              });
            case 3:
              data = _context5.sent;
              if (!(Object.values(data).length > 0)) {
                _context5.next = 6;
                break;
              }
              return _context5.abrupt("return", data);
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
      function getAllSeasons(_x8) {
        return _getAllSeasons.apply(this, arguments);
      }
      return getAllSeasons;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(id, updates) {
        var updated;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return _models["default"].series.update(updates, {
                where: {
                  id: id
                }
              });
            case 3:
              updated = _context6.sent;
              if (!updated) {
                _context6.next = 6;
                break;
              }
              return _context6.abrupt("return", updated);
            case 6:
              return _context6.abrupt("return", null);
            case 9:
              _context6.prev = 9;
              _context6.t0 = _context6["catch"](0);
              throw _context6.t0;
            case 12:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[0, 9]]);
      }));
      function update(_x9, _x10) {
        return _update.apply(this, arguments);
      }
      return update;
    }()
  }, {
    key: "deleteEpisode",
    value: function () {
      var _deleteEpisode = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(id) {
        var deleted;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return _models["default"].series.destroy({
                returning: true,
                where: {
                  id: id
                }
              });
            case 3:
              deleted = _context7.sent;
              if (!deleted) {
                _context7.next = 6;
                break;
              }
              return _context7.abrupt("return", deleted);
            case 6:
              return _context7.abrupt("return", null);
            case 9:
              _context7.prev = 9;
              _context7.t0 = _context7["catch"](0);
              throw _context7.t0;
            case 12:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[0, 9]]);
      }));
      function deleteEpisode(_x11) {
        return _deleteEpisode.apply(this, arguments);
      }
      return deleteEpisode;
    }()
  }]);
  return serieServices;
}();
var _default = exports["default"] = serieServices;