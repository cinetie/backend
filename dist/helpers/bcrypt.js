"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var encrypt = function encrypt(plainPassword) {
  try {
    return _bcrypt["default"].hashSync(plainPassword, _bcrypt["default"].genSaltSync(10), null);
  } catch (error) {
    throw error;
  }
};
var compare = function compare(plainPassword, encrypted) {
  try {
    return _bcrypt["default"].compareSync(plainPassword, encrypted);
  } catch (error) {
    throw error;
  }
};
var _default = exports["default"] = {
  encrypt: encrypt,
  compare: compare
};