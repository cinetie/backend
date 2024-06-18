"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _joi = _interopRequireDefault(require("@hapi/joi"));
var _default = exports["default"] = _joi["default"].object().keys({
  email: _joi["default"].string().required().error(function () {
    return "You have to enter email Ex: XXXXX@XXX.com";
  }),
  role: _joi["default"].string().regex(/\b(admin|marketing agent)\b/).required().error(function () {
    return "Invalid role entered";
  })
});