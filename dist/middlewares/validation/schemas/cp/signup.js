"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _joi = _interopRequireDefault(require("@hapi/joi"));
var _default = exports["default"] = _joi["default"].object().keys({
  name: _joi["default"].string().min(3).required().error(function () {
    return "Enter a valid a name Ex: Nowhere Pictures";
  }),
  email: _joi["default"].string().email({
    minDomainSegments: 2
  }).required().error(function () {
    return "Enter a valid email address Ex: nowhere@pictures.com";
  }),
  password: _joi["default"].string().min(6).max(16).required().error(function () {
    return "Enter a valid password less than greater than 6 characters and less than 16 characters";
  }),
  nationality: _joi["default"].string().min(3).required().error(function () {
    return "Enter a valid nationality Ex: Rwandan ";
  }),
  cityOfResidence: _joi["default"].string().min(3).required().error(function () {
    return "Enter a valid city of residence Ex: Kigali";
  }),
  phoneLine: _joi["default"].string().trim().min(10).max(15).required().error(function () {
    return "Enter a valid phone number";
  })
}).options({
  allowUnknown: false
});