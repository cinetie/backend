"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addEpisode = void 0;
var _addEpisodes = _interopRequireDefault(require("./schemas/episodes/addEpisodes"));
var _validator = _interopRequireDefault(require("../../helpers/validator"));
/* eslint-disable import/prefer-default-export */

var addEpisode = exports.addEpisode = function addEpisode(req, res, next) {
  (0, _validator["default"])(_addEpisodes["default"], req.body, res, next);
};