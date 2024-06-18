"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _joi = _interopRequireDefault(require("@hapi/joi"));
var _default = exports["default"] = _joi["default"].object().keys({
  key: _joi["default"].string().min(2).required(),
  bucket: _joi["default"].string().required()
});