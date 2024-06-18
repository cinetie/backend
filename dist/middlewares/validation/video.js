"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateVideo = exports.approveVideo = exports.addVideo = void 0;
var _addMovie = _interopRequireDefault(require("./schemas/videos/addMovie"));
var _addSerie = _interopRequireDefault(require("./schemas/videos/addSerie"));
var _approveVideo = _interopRequireDefault(require("./schemas/videos/approveVideo"));
var _updateVideo = _interopRequireDefault(require("./schemas/videos/updateVideo"));
var _validator = _interopRequireDefault(require("../../helpers/validator"));
/* eslint-disable import/prefer-default-export */

var addVideo = exports.addVideo = function addVideo(req, res, next) {
  if (req.body.type === "serie") {
    delete req.body.video;
    delete req.body.EnSubt;
    delete req.body.FrSubt;
    (0, _validator["default"])(_addSerie["default"], req.body, res, next);
  } else {
    (0, _validator["default"])(_addMovie["default"], req.body, res, next);
  }
};
var approveVideo = exports.approveVideo = function approveVideo(req, res, next) {
  (0, _validator["default"])(_approveVideo["default"], req.body, res, next);
};
var updateVideo = exports.updateVideo = function updateVideo(req, res, next) {
  (0, _validator["default"])(_updateVideo["default"], req.body, res, next);
};