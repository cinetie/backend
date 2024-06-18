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
var _imageProperties = _interopRequireDefault(require("../../helpers/imageProperties"));
var _utilities = _interopRequireDefault(require("../../helpers/utilities"));
var util = new _utilities["default"]();
var validatePictures = /*#__PURE__*/function () {
  function validatePictures() {
    (0, _classCallCheck2["default"])(this, validatePictures);
  }
  (0, _createClass2["default"])(validatePictures, null, [{
    key: "validateSmall",
    value: function () {
      var _validateSmall = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
        var results;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _imageProperties["default"])(req.files.small.tempFilePath, {
                resolution: {
                  width: 1920,
                  height: 1080
                },
                aspectRatio: 1.8
              });
            case 2:
              results = _context.sent;
              if (results === 2) {
                util.setErrorResponse(res, "Wrong dimensions for small image", 409);
              } else if (results === 3) {
                util.setErrorResponse(res, "Wrong aspect ratio for small image", 409);
              } else {
                next();
              }
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function validateSmall(_x, _x2, _x3) {
        return _validateSmall.apply(this, arguments);
      }
      return validateSmall;
    }()
  }, {
    key: "validateTall",
    value: function () {
      var _validateTall = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
        var results;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _imageProperties["default"])(req.files.tall.tempFilePath, {
                resolution: {
                  width: 1080,
                  height: 1620
                },
                aspectRatio: 0.7
              });
            case 2:
              results = _context2.sent;
              if (results === 2) {
                util.setErrorResponse(res, "Wrong dimensions for tall image", 409);
              } else if (results === 3) {
                util.setErrorResponse(res, "Wrong aspect ratio for tall image", 409);
              } else {
                next();
              }
            case 4:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function validateTall(_x4, _x5, _x6) {
        return _validateTall.apply(this, arguments);
      }
      return validateTall;
    }()
  }, {
    key: "validateNameTag",
    value: function () {
      var _validateNameTag = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
        var results;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return (0, _imageProperties["default"])(req.files.name.tempFilePath, {
                resolution: {
                  width: 360,
                  height: 360
                },
                aspectRatio: 1
              });
            case 2:
              results = _context3.sent;
              if (results === 2) {
                util.setErrorResponse(res, "Wrong dimensions for nametag image", 409);
              } else if (results === 3) {
                util.setErrorResponse(res, "Wrong aspect ratio for name tag image", 409);
              } else {
                next();
              }
            case 4:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function validateNameTag(_x7, _x8, _x9) {
        return _validateNameTag.apply(this, arguments);
      }
      return validateNameTag;
    }()
  }]);
  return validatePictures;
}();
var _default = exports["default"] = validatePictures;