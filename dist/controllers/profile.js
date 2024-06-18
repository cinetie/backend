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
var _profileService = _interopRequireDefault(require("../services/profileService"));
var _utilities = _interopRequireDefault(require("../helpers/utilities"));
var util = new _utilities["default"]();
var profileController = /*#__PURE__*/function () {
  function profileController() {
    (0, _classCallCheck2["default"])(this, profileController);
  }
  (0, _createClass2["default"])(profileController, null, [{
    key: "addProfile",
    value: function () {
      var _addProfile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var getProfile, addedProfile;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _profileService["default"].searchProfile(req.body.name, req.body.email);
            case 3:
              getProfile = _context.sent;
              if (!getProfile) {
                _context.next = 8;
                break;
              }
              util.setErrorResponse(res, "Profile with that name exists already", 422);
              _context.next = 12;
              break;
            case 8:
              _context.next = 10;
              return _profileService["default"].addProfile(req.body);
            case 10:
              addedProfile = _context.sent;
              util.setSuccessResponse(res, "Profile successfully added!", 201, addedProfile);
            case 12:
              _context.next = 17;
              break;
            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](0);
              util.setErrorResponse(res, "Something went wrong", 500, _context.t0);
            case 17:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 14]]);
      }));
      function addProfile(_x, _x2) {
        return _addProfile.apply(this, arguments);
      }
      return addProfile;
    }()
  }, {
    key: "getProfile",
    value: function () {
      var _getProfile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var returned;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _profileService["default"].getParticalProfile(req.params.id);
            case 3:
              returned = _context2.sent;
              if (!returned) util.setErrorResponse(res, "Profile not found", 404);
              util.setSuccessResponse(res, "Profile successfully retrieved!", 200, returned);
              _context2.next = 11;
              break;
            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](0);
              util.setErrorResponse(res, "Something went wrong :   ".concat(_context2.t0), 500);
            case 11:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 8]]);
      }));
      function getProfile(_x3, _x4) {
        return _getProfile.apply(this, arguments);
      }
      return getProfile;
    }()
  }, {
    key: "deleteProfile",
    value: function () {
      var _deleteProfile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var returned, deletedProfile;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _profileService["default"].getParticalProfile(req.params.id);
            case 3:
              returned = _context3.sent;
              if (!returned) _response["default"].errorResponse(res, 404, "Profile not found");
              _context3.next = 7;
              return _profileService["default"].deleteProfile(req.params.id);
            case 7:
              deletedProfile = _context3.sent;
              _response["default"].successResponse(res, 200, "Profile successfully deleted!", deletedProfile);
              _context3.next = 14;
              break;
            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3["catch"](0);
              _response["default"].errorResponse(res, 500, "Something went wrong", _context3.t0);
            case 14:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 11]]);
      }));
      function deleteProfile(_x5, _x6) {
        return _deleteProfile.apply(this, arguments);
      }
      return deleteProfile;
    }()
  }, {
    key: "getAllProfiles",
    value: function () {
      var _getAllProfiles = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var returned;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _profileService["default"].getAllProfiles();
            case 3:
              returned = _context4.sent;
              _response["default"].successResponse(res, 200, "Profiles successfully retrieved!", returned);
              _context4.next = 10;
              break;
            case 7:
              _context4.prev = 7;
              _context4.t0 = _context4["catch"](0);
              _response["default"].errorResponse(res, 500, "Something went wrong", _context4.t0);
            case 10:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 7]]);
      }));
      function getAllProfiles(_x7, _x8) {
        return _getAllProfiles.apply(this, arguments);
      }
      return getAllProfiles;
    }()
  }, {
    key: "updateProfile",
    value: function () {
      var _updateProfile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var toUpdate, updated;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              toUpdate = req.body;
              _context5.next = 4;
              return _profileService["default"].updateProfile(req.params.id, toUpdate);
            case 4:
              updated = _context5.sent;
              if (updated) util.setSuccessResponse(res, "Profile updated successfully", 200, updated[1][0]);
              util.setErrorResponse(res, "Profile successfully updated!", 200);
              _context5.next = 12;
              break;
            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](0);
              util.setErrorResponse(res, "things went south ", 500);
            case 12:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 9]]);
      }));
      function updateProfile(_x9, _x10) {
        return _updateProfile.apply(this, arguments);
      }
      return updateProfile;
    }()
  }]);
  return profileController;
}();
var _default = exports["default"] = profileController;