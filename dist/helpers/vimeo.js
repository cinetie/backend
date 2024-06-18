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
var _nodeFetch = _interopRequireDefault(require("node-fetch"));
/* eslint-disable no-useless-catch */
var vimeo = /*#__PURE__*/function () {
  function vimeo() {
    (0, _classCallCheck2["default"])(this, vimeo);
  }
  (0, _createClass2["default"])(vimeo, null, [{
    key: "viemoUpload",
    value: function () {
      var _viemoUpload = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
        var raw, videoData, videoDataJson;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              raw = {
                upload: {
                  approach: "pull",
                  size: String(data.size),
                  link: String(data.videoUrl)
                }
              };
              _context.next = 4;
              return (0, _nodeFetch["default"])("https://api.vimeo.com/me/videos", {
                headers: {
                  Authorization: "bearer ".concat(process.env.VIMEO_ACCESS_TOKEN),
                  "Content-Type": "application/json",
                  Accept: "application/vnd.vimeo.*+json;version=3.4"
                },
                method: "POST",
                body: JSON.stringify(raw)
              });
            case 4:
              videoData = _context.sent;
              _context.next = 7;
              return videoData.json();
            case 7:
              videoDataJson = _context.sent;
              if (!videoDataJson) {
                _context.next = 10;
                break;
              }
              return _context.abrupt("return", videoDataJson.uri.slice(8));
            case 10:
              _context.next = 15;
              break;
            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](0);
              throw _context.t0;
            case 15:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 12]]);
      }));
      function viemoUpload(_x) {
        return _viemoUpload.apply(this, arguments);
      }
      return viemoUpload;
    }()
  }]);
  return vimeo;
}();
var _default = exports["default"] = vimeo;