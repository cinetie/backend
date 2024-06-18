"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _tempSerie = _interopRequireDefault(require("../controllers/tempSerie"));
var _access = _interopRequireDefault(require("../middlewares/access"));
var _episode = require("../middlewares/validation/episode");
var router = new _express.Router();
router.post("/new", _access["default"].isAdmin, _episode.addEpisode, _tempSerie["default"].createSerie);
router.get("/all", _access["default"].isAdmin, _tempSerie["default"].getAllSeries);
router.get("/signed-url", _access["default"].isAdmin, _tempSerie["default"].getSignedUrlTempSeries);
router.get("/", _access["default"].isAdmin, _tempSerie["default"].generateSignedUrl);
var _default = exports["default"] = router;