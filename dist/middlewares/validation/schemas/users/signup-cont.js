"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _joi = _interopRequireDefault(require("@hapi/joi"));
var _default = exports["default"] = _joi["default"].object().keys({
  nonce: _joi["default"].string().min(3).max(50).error(function () {
    return "You have to provide a valid credit card";
  }),
  paymentMethod: _joi["default"].number().min(1).max(3).required().error(function () {
    return "You have to select a payment method";
  })
}).options({
  allowUnknown: false
});