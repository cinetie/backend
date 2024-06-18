"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _crypto = _interopRequireDefault(require("crypto"));
var crypto = function crypto() {
  try {
    var payload = "";
    _crypto["default"].randomBytes(20, function (err, buffer) {
      payload = buffer.toString("hex");
    });
    return payload;
  } catch (error) {
    throw error;
  }
};
var _default = exports["default"] = {
  crypto: crypto
};