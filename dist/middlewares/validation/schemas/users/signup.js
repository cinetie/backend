"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _joi = _interopRequireDefault(require("@hapi/joi"));
var _default = exports["default"] = _joi["default"].object().keys({
  email: _joi["default"].string().email({
    minDomainSegments: 2
  }).required().error(function () {
    return "You have to enter a valid email. Example: yourname@domain.com";
  }),
  password: _joi["default"].string().min(6).required().error(function () {
    return "You have to enter a valid password with more than 6 characters. Example: qqw12@#!23#frf_e3_@";
  }),
  promoCode: _joi["default"].string().min(3).error(function () {
    return "you have to enter a promo code  bigger than 3 character";
  })
}).options({
  allowUnknown: false
});