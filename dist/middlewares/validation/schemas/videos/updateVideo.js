"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _joi = _interopRequireDefault(require("@hapi/joi"));
var _default = exports["default"] = _joi["default"].object().keys({
  videoName: _joi["default"].string().error(function () {
    return "You have to enter a valid name like 'Faster'";
  }),
  videoCast: _joi["default"].string().error(function () {
    return "You have to enter a cast";
  }),
  videoSynopsis: _joi["default"].string().max(250).error(function () {
    return "You have to provide a synopsis less than 250 characters";
  }),
  category: _joi["default"].string().error(function () {
    return "You have to provide a valid category";
  }),
  type: _joi["default"].string().valid("serie", "movie").error(function () {
    return "You have to provide a type Ex: serie or movie";
  }),
  tallThumbNailLink: _joi["default"].string().error(function () {
    return "You did not upload a portrait cover";
  }),
  nameTagThumbNailLink: _joi["default"].string().error(function () {
    return "You did not upload a name tag cover";
  }),
  videoThumbnailLink: _joi["default"].string().error(function () {
    return "You did not provide landscape cover";
  }),
  video: _joi["default"].string().error(function () {
    return "You did not provide  video";
  }),
  rate: _joi["default"].string().error(function () {
    return "You have to enter age rating";
  }),
  licenseEndDate: _joi["default"].string().max(10).regex(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/).error(function () {
    return "You have to provide invalid date, make sure the date is in the yyy-mm-dd format";
  }),
  videoClientId: _joi["default"].string(),
  resCountries: _joi["default"].string(),
  EnSubt: _joi["default"].string(),
  FrSubt: _joi["default"].string()
}).options({
  allowUnknown: false
});