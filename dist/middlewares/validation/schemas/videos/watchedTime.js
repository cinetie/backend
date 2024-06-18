"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _joi = _interopRequireDefault(require("@hapi/joi"));
var _default = exports["default"] = _joi["default"].object().keys({
  watchedTime: _joi["default"].number().min(1).max(100).required().error(function () {
    return "watchedTime is required and should be a number between 1 and 100";
  }),
  type: _joi["default"].string().trim().required().regex(/\b(movie|episode|serie)\b/).error(function () {
    return "video type is required and should be movie or episode in lowercases";
  }),
  episodeId: _joi["default"].string().trim().error(function () {
    return "episodeId should be a string";
  })
}).options({
  allowUnknown: false
});