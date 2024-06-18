"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _joi = _interopRequireDefault(require("@hapi/joi"));
var _default = exports["default"] = _joi["default"].object().keys({
  type: _joi["default"].string().min(3).required(),
  numberOfScreens: _joi["default"].number().min(1).required(),
  monthlyPrice: _joi["default"].number().required(),
  yearlyPrice: _joi["default"].number().required()
});