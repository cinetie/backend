"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var jwtSign = function jwtSign(string, secret, exp) {
  try {
    // add an expiration option to the token
    return _jsonwebtoken["default"].sign(string, secret);
  } catch (error) {
    throw error;
  }
};
var jwtVerify = function jwtVerify(token, secret) {
  try {
    return _jsonwebtoken["default"].verify(token, secret);
  } catch (error) {
    throw error;
  }
};
var _default = exports["default"] = {
  jwtSign: jwtSign,
  jwtVerify: jwtVerify
};