"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _axios = _interopRequireDefault(require("axios"));
var _aws = require("./aws");
var videoUploader = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(video, landScape, portrait, nameTag, type, extension) {
    var urls, files, key, file;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          urls = {};
          files = {
            video: video,
            landScape: landScape,
            portrait: portrait,
            nameTag: nameTag
          };
          _context.next = 4;
          return (0, _aws.getSignedUrl)("cinetie-thumbnails", "image/*", "jpg");
        case 4:
          urls.portraitUrl = _context.sent;
          _context.next = 7;
          return (0, _aws.getSignedUrl)("cinetie-thumbnails", "image/*", "jpg");
        case 7:
          urls.landscapeUrl = _context.sent;
          _context.next = 10;
          return (0, _aws.getSignedUrl)("cinetie-thumbnails", "image/*", "png");
        case 10:
          urls.nameTagUrl = _context.sent;
          if (!(type === "movie")) {
            _context.next = 17;
            break;
          }
          _context.next = 14;
          return (0, _aws.getSignedUrl)("cinetie-temp-movies", "video/*", extension);
        case 14:
          _context.t0 = _context.sent;
          _context.next = 18;
          break;
        case 17:
          _context.t0 = null;
        case 18:
          urls.videoUrl = _context.t0;
          _context.t1 = _regenerator["default"].keys(urls);
        case 20:
          if ((_context.t2 = _context.t1()).done) {
            _context.next = 28;
            break;
          }
          key = _context.t2.value;
          file = files[key.slice(0, -4)];
          if (!urls[key]) {
            _context.next = 26;
            break;
          }
          _context.next = 26;
          return _axios["default"].put(urls[key].url, file, {
            headers: {
              "Content-Type": type
            },
            onUploadProgress: function onUploadProgress(progressEvent) {
              var progress = Math.round(progressEvent.loaded * 100 / progressEvent.total);
            }
          });
        case 26:
          _context.next = 20;
          break;
        case 28:
          return _context.abrupt("return", urls);
        case 29:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function videoUploader(_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();
var _default = exports["default"] = videoUploader;