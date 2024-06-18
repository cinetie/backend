"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var Util = exports["default"] = /*#__PURE__*/function () {
  function Util() {
    (0, _classCallCheck2["default"])(this, Util);
    this.statusCode = null;
    this.type = null;
    this.message = null;
    this.data = null;
  }
  (0, _createClass2["default"])(Util, [{
    key: "setSuccess",
    value: function setSuccess(message, statusCode, data) {
      this.statusCode = statusCode;
      this.message = message;
      this.data = data;
      this.type = "success";
    }
  }, {
    key: "setSuccessPost",
    value: function setSuccessPost(message, statusCode) {
      this.statusCode = statusCode;
      this.message = message;
      this.type = "success";
    }
  }, {
    key: "setError",
    value: function setError(statusCode, message) {
      this.statusCode = statusCode;
      this.message = message;
      this.type = "Error";
    }
  }, {
    key: "encrypt",
    value: function encrypt(plainPassword) {
      var newPass = _bcrypt["default"].hashSync(plainPassword, _bcrypt["default"].genSaltSync(10), null);
      return newPass;
    }
  }, {
    key: "compare",
    value: function compare(plainPassword, encrypted) {
      if (plainPassword == null || plainPassword == undefined || encrypted == null || encrypted == undefined) {
        return "password is null";
      }
      var status = _bcrypt["default"].compareSync(plainPassword, encrypted);
      if (status) {
        return status;
      }
      return status;
    }
  }, {
    key: "send",
    value: function send(res) {
      var result = {
        statusCode: this.statusCode,
        status: this.type,
        message: this.message,
        data: this.data
      };
      if (this.type === "success") {
        return res.status(this.statusCode).json(result);
      }
      return res.status(this.statusCode).json({
        statusCode: this.statusCode,
        status: this.type,
        message: this.message
      });
    }
  }, {
    key: "sendPost",
    value: function sendPost(res) {
      var result = {
        statusCode: this.statusCode,
        status: this.type,
        message: this.message
      };
      if (this.type === "success") {
        return res.status(this.statusCode).json(result);
      }
      return res.status(this.statusCode).json({
        statusCode: this.statusCode,
        status: this.type,
        message: this.message
      });
    }
  }, {
    key: "setSuccessResponse",
    value: function setSuccessResponse(res, message, statusCode, data) {
      this.setSuccess(message, statusCode, data);
      return this.send(res);
    }
  }, {
    key: "setErrorResponse",
    value: function setErrorResponse(res, message, statusCode) {
      this.setError(statusCode, message);
      return this.send(res);
    }
  }, {
    key: "getUnique",
    value: function getUnique(arr, comp) {
      var unique = arr.map(function (e) {
        return e[comp];
      })

      // store the keys of the unique objects
      .map(function (e, i, _final) {
        return _final.indexOf(e) === i && i;
      })

      // eliminate the dead keys & store unique objects
      .filter(function (e) {
        return arr[e];
      }).map(function (e) {
        return arr[e];
      });
      return unique;
    }
  }]);
  return Util;
}();