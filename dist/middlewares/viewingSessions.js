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
var _viewingSessionsServices = _interopRequireDefault(require("../services/viewingSessionsServices"));
var _videoServices = _interopRequireDefault(require("../services/videoServices"));
var _response = _interopRequireDefault(require("../helpers/response"));
var _jwt = _interopRequireDefault(require("../helpers/jwt"));
/* eslint-disable consistent-return */
/* eslint-disable no-useless-catch */
var viewingSession = /*#__PURE__*/function () {
  function viewingSession() {
    (0, _classCallCheck2["default"])(this, viewingSession);
  }
  (0, _createClass2["default"])(viewingSession, null, [{
    key: "createNewWatchCount",
    value: function () {
      var _createNewWatchCount = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
        var ip, id, videoId, videoData, token, decoded, data, locationServiceData, JsonlocationData, sessions, results, updates;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              ip = req.headers.ip;
              id = req.query.id;
              videoId = id;
              _context.next = 6;
              return _videoServices["default"].getVideoById(videoId);
            case 6:
              videoData = _context.sent;
              token = req.headers.authorization.slice(7);
              if (!(!ip || !videoId === null)) {
                _context.next = 10;
                break;
              }
              return _context.abrupt("return", _response["default"].errorResponse(res, 400, "Something went wrong", "missingParameterError"));
            case 10:
              if (videoData) {
                _context.next = 12;
                break;
              }
              return _context.abrupt("return", _response["default"].errorResponse(res, 404, "Can't find the video you're looking for", "NotFoundError"));
            case 12:
              decoded = _jwt["default"].jwtVerify(token, process.env.SECRET);
              data = req.body;
              data.sessionState = "Active";
              data.userId = decoded.email;
              data.time = new Date().getTime();
              _context.next = 19;
              return (0, _nodeFetch["default"])("http://api.ipstack.com/".concat(ip, "?access_key=").concat(process.env.IP_STACK_ACCESS_TOKEN));
            case 19:
              locationServiceData = _context.sent;
              _context.next = 22;
              return locationServiceData.json();
            case 22:
              JsonlocationData = _context.sent;
              _context.next = 25;
              return _viewingSessionsServices["default"].getSesssionPerVideoUser(decoded.email, videoId);
            case 25:
              sessions = _context.sent;
              if (!(Object.values(sessions).length >= 1)) {
                _context.next = 30;
                break;
              }
              next();
              _context.next = 41;
              break;
            case 30:
              _context.next = 32;
              return _viewingSessionsServices["default"].registerViewingSessions({
                sessionState: "Active",
                userId: decoded.email,
                time: new Date().getTime(),
                location: JsonlocationData.country_name,
                ip: ip,
                clientId: videoData.videoClientId,
                videoId: videoId
              });
            case 32:
              results = _context.sent;
              _context.next = 35;
              return _videoServices["default"].incrementWatchCountService(videoId);
            case 35:
              updates = _context.sent;
              if (!(results && updates)) {
                _context.next = 40;
                break;
              }
              next();
              _context.next = 41;
              break;
            case 40:
              return _context.abrupt("return", _response["default"].errorResponse(res, 400, "something went wrong", "Can't get location"));
            case 41:
              _context.next = 46;
              break;
            case 43:
              _context.prev = 43;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", _response["default"].errorResponse(res, 500, "Something went wrong", _context.t0.message));
            case 46:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 43]]);
      }));
      function createNewWatchCount(_x, _x2, _x3) {
        return _createNewWatchCount.apply(this, arguments);
      }
      return createNewWatchCount;
    }()
  }]);
  return viewingSession;
}();
var _default = exports["default"] = viewingSession;