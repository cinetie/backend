"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _series = _interopRequireDefault(require("../controllers/series"));
var _access = _interopRequireDefault(require("../middlewares/access"));
var _billing = _interopRequireDefault(require("../middlewares/billing"));
var router = new _express.Router();
router.post("/create", _access["default"].isAdmin, _series["default"].create);
router.get("/cp", _access["default"].isProducer, _series["default"].getVideosByClientId);
router.get("/ep", _access["default"].isNormalUser, _billing["default"].verifyPermissionLevel, _series["default"].getSingleEpisode);
router.get("/single/season", _access["default"].isLoggedIn, _series["default"].getSingleSeason);
router.get("/all/seasons", _access["default"].isLoggedIn, _series["default"].getAllSeasons);
router.put("/update", _access["default"].isProducer, _series["default"].updateSerie);
router["delete"]("/delete/:id", _access["default"].isAdmin, _series["default"]["delete"]);
router["delete"]("/delete/temp/:id", _access["default"].isAdmin, _series["default"].deleteTemp);
var _default = exports["default"] = router;