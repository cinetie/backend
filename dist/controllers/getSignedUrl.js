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
var _aws = require("../helpers/aws");
var _dotenv = require("dotenv");
var _utilities = _interopRequireDefault(require("../helpers/utilities"));
(0, _dotenv.config)();
var util = new _utilities["default"]();
var signedUrls = /*#__PURE__*/function () {
  function signedUrls() {
    (0, _classCallCheck2["default"])(this, signedUrls);
  }
  (0, _createClass2["default"])(signedUrls, null, [{
    key: "getSignedUrl",
    value: function () {
      var _getSignedUrl = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _req$body, key, bucket, signed;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$body = req.body, key = _req$body.key, bucket = _req$body.bucket;
              _context.next = 4;
              return (0, _aws.getObject)(bucket, key, 6000);
            case 4:
              signed = _context.sent;
              if (signed) {
                util.setSuccessResponse(res, "Signed url created", 200, signed);
              }
              _context.next = 11;
              break;
            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              util.setErrorResponse(res, "something happened ".concat(_context.t0.message), 500);
            case 11:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 8]]);
      }));
      function getSignedUrl(_x, _x2) {
        return _getSignedUrl.apply(this, arguments);
      }
      return getSignedUrl;
    }()
  }]);
  return signedUrls;
}();
var _default = exports["default"] = signedUrls;