"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _joi = _interopRequireDefault(require("@hapi/joi"));
var _default = exports["default"] = _joi["default"].object().keys({
  firstName: _joi["default"].string().min(2).required().error(function () {
    return "Enter first name ex: Mike";
  }),
  lastName: _joi["default"].string().min(2).required().error(function () {
    return "Enter Last name ex: Mike";
  }),
  email: _joi["default"].string().email({
    minDomainSegments: 2
  }).required().error(function () {
    return "You have to enter a valid email. Example: yourname@domain.com";
  }),
  password: _joi["default"].string().min(6).required().error(function () {
    return "You have to enter a valid password with more than 6 characters with capital letters,\n           small letters, numbers and special characters like !@#$.\n           Example: qqw12 @#!23#frf_e3_@";
  }),
  phoneNumber: _joi["default"].string().trim().min(10).max(15).required().error(function () {
    return "Enter a valid phone number";
  }),
  region: _joi["default"].string().min(3).required().error(function () {
    return "Enter a valid region Ex: Kigali";
  })
}).options({
  allowUnknown: false
});