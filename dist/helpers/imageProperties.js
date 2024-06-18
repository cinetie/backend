"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _imageSize = _interopRequireDefault(require("image-size"));
/* eslint-disable no-useless-catch */

var properties = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(file, dimensions) {
    var dim, aspectRatio;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          dim = (0, _imageSize["default"])(file);
          aspectRatio = (dim.width / dim.height).toFixed(1);
          if (!(Number(aspectRatio) === Number(dimensions.aspectRatio))) {
            _context.next = 7;
            break;
          }
          if (!(dim.width === dimensions.resolution.width && dim.height === dimensions.resolution.height)) {
            _context.next = 6;
            break;
          }
          return _context.abrupt("return", 1);
        case 6:
          return _context.abrupt("return", 2);
        case 7:
          return _context.abrupt("return", 3);
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          throw _context.t0;
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 10]]);
  }));
  return function properties(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var _default = exports["default"] = properties;