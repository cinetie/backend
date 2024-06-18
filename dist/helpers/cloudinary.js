"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _cloudinary = require("cloudinary");
/* eslint-disable quotes */

_cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
var upload = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(file, type) {
    var uploadedFile;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _cloudinary.v2.uploader.upload(file, {
            resource_type: type,
            overwrite: true
          }, function (err, result) {
            if (err) throw err;
          });
        case 2:
          uploadedFile = _context.sent;
          return _context.abrupt("return", uploadedFile);
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function upload(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// eslint-disable-next-line camelcase
var destroy = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(publicId, resource_type) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _cloudinary.v2.uploader.destroy(publicId, {
            resource_type: resource_type
          }, function (err, result) {
            if (err) throw err;
          });
        case 2:
          return _context2.abrupt("return", true);
        case 3:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function destroy(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var _default = exports["default"] = {
  upload: upload,
  destroy: destroy
};