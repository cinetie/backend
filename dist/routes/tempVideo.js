"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _tempVideo = _interopRequireDefault(require("../controllers/tempVideo"));
var _access = _interopRequireDefault(require("../middlewares/access"));
var _video = require("../middlewares/validation/video");
var router = new _express.Router();
router.get("/all", _access["default"].isAdmin, _tempVideo["default"].getAllVideosController);
router.get("/", _access["default"].isAdmin, _tempVideo["default"].getParticularVideoController);
router.get("/signed-urls", _access["default"].isAdmin, _tempVideo["default"].getSignedUrlTempVideos);
router["delete"]("/", _access["default"].isAdmin, _tempVideo["default"].deleteParticularVideoController);
router.post("/new", _access["default"].isAdmin, _video.addVideo, _tempVideo["default"].createVideoController);
router.put("/update", _access["default"].isAdmin, _tempVideo["default"].updateParticularVideoController);
router.put("/update/temp", _access["default"].isAdmin, _tempVideo["default"].updateParticularTempVideoController);
var _default = exports["default"] = router;