"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _joi = _interopRequireDefault(require("@hapi/joi"));
var _default = exports["default"] = _joi["default"].object().keys({
  episodeName: _joi["default"].string().min(3).required().error(function () {
    return "You have to enter a valid episode name Ex: pilot";
  }),
  videoId: _joi["default"].string().required().error(function () {
    return "You have to provide a video Id";
  }),
  season: _joi["default"].number().required().error(function () {
    return "You have to provide season number Ex: 1";
  }),
  synopsis: _joi["default"].string().required().error(function () {
    return 'You have to provide a synopsis Ex: "It all starts at night" ';
  }),
  episodeNumber: _joi["default"].number().required().error(function () {
    return "You have to provide a number";
  }),
  thumb: _joi["default"].string().required().error(function () {
    return "You have to provide a thumbnail";
  }),
  video: _joi["default"].string().required().error(function () {
    return "You have to provide a video";
  }),
  EnSubt: _joi["default"].string().error(function () {
    return "you english subtitle file has a problem";
  }),
  FrSubt: _joi["default"].string().error(function () {
    return "you english subtitle file has a problem";
  })
}).options({
  allowUnknown: false
});