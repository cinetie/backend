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
var profileServices = /*#__PURE__*/function () {
  function profileServices() {
    (0, _classCallCheck2["default"])(this, profileServices);
  }
  (0, _createClass2["default"])(profileServices, null, [{
    key: "addProfile",
    value: function () {
      var _addProfile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(newProfile) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _models["default"].profiles.create(newProfile);
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
      function addProfile(_x) {
        return _addProfile.apply(this, arguments);
      }
      return addProfile;
    }()
  }, {
    key: "deleteProfile",
    value: function () {
      var _deleteProfile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _models["default"].profiles.destroy({
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
      function deleteProfile(_x2) {
        return _deleteProfile.apply(this, arguments);
      }
      return deleteProfile;
    }()
  }, {
    key: "searchProfile",
    value: function () {
      var _searchProfile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(name, email) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _models["default"].profiles.findOne({
                where: (0, _defineProperty2["default"])({}, op.and, [{
                  name: name
                }, {
                  email: email
                }])
              });
            case 3:
              return _context3.abrupt("return", _context3.sent);
            case 6:
              _context3.prev = 6;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", _context3.t0);
            case 9:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 6]]);
      }));
      function searchProfile(_x3, _x4) {
        return _searchProfile.apply(this, arguments);
      }
      return searchProfile;
    }()
  }, {
    key: "updateProfile",
    value: function () {
      var _updateProfile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id, profile) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _models["default"].profiles.update(profile, {
                returning: true,
                where: {
                  id: id
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
      function updateProfile(_x5, _x6) {
        return _updateProfile.apply(this, arguments);
      }
      return updateProfile;
    }()
  }, {
    key: "getParticalProfile",
    value: function () {
      var _getParticalProfile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id) {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _models["default"].profiles.findOne({
                where: {
                  id: id
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
      function getParticalProfile(_x7) {
        return _getParticalProfile.apply(this, arguments);
      }
      return getParticalProfile;
    }()
  }, {
    key: "getProfileCount",
    value: function () {
      var _getProfileCount = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(id) {
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return _models["default"].profiles.findAndCountAll({
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
      function getProfileCount(_x8) {
        return _getProfileCount.apply(this, arguments);
      }
      return getProfileCount;
    }()
  }, {
    key: "getAllProfiles",
    value: function () {
      var _getAllProfiles = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return _models["default"].profiles.findAll();
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
      function getAllProfiles() {
        return _getAllProfiles.apply(this, arguments);
      }
      return getAllProfiles;
    }()
  }]);
  return profileServices;
}();
var _default = exports["default"] = profileServices;