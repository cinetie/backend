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
var _mailchimp_marketing = _interopRequireDefault(require("@mailchimp/mailchimp_marketing"));
var _fetch = _interopRequireDefault(require("../helpers/fetch"));
_mailchimp_marketing["default"].setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX
});
var MailingServices = /*#__PURE__*/function () {
  function MailingServices() {
    (0, _classCallCheck2["default"])(this, MailingServices);
  }
  (0, _createClass2["default"])(MailingServices, null, [{
    key: "addToMailingList",
    value: function () {
      var _addToMailingList = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(email) {
        var response;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _mailchimp_marketing["default"].lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
                email_address: email,
                status: "subscribed"
              });
            case 2:
              response = _context.sent;
              return _context.abrupt("return", response);
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function addToMailingList(_x) {
        return _addToMailingList.apply(this, arguments);
      }
      return addToMailingList;
    }()
  }]);
  return MailingServices;
}();
var _default = exports["default"] = MailingServices;