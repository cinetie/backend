"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _video = _interopRequireDefault(require("../controllers/video"));
var _access = _interopRequireDefault(require("../middlewares/access"));
var _earning = _interopRequireDefault(require("../controllers/earning"));
var _billing = _interopRequireDefault(require("../middlewares/billing"));
var _watchedTime = _interopRequireDefault(require("../middlewares/validation/watchedTime"));
var _video2 = require("../middlewares/validation/video");
// import imageValidation from '../middlewares/validators/imageValidator'
var router = new _express.Router();
router.post("/new", _access["default"].isAdmin, _video["default"].addVideo);
router.post("/watch-session", _access["default"].isNormalUser, _video["default"].createNewWatchCount);
router.get("/all/local", _access["default"].isAdmin, _video["default"].getAllVideosLocal);
router.get("/sort/pop", _video["default"].getVideosByPopularity);
router.get("/sort/category", _video["default"].getVideosByCategory);
router.get("/sort/trend", _video["default"].getVideosByTrend);
router.get("/search", _video["default"].search);

// router.get('/unique', access.isNormalUser, billing.trial,
// billing.verifyPermissionLevel, video.getVideoById); removed temporarily billing.trial
router.get("/unique", _access["default"].isNormalUser, _billing["default"].verifyPermissionLevel, _video["default"].getVideoById);
router.get("/cp/unique", _access["default"].isAdmin, _video["default"].getVideoById);
router.get("/arrivals", _video["default"].getAllNewVideos);
router.get("/earnings", _earning["default"].getAllEarningsPerVideo);
router.get("/main/ft", _video["default"].getMainFeaturedFilm);
router.get("/second/ft", _video["default"].getSecondFeaturedFilm);
router.get("/sort/type", _access["default"].isProducer, _video["default"].getAllVideosByType);
router.put("/", _access["default"].isAdmin, _video2.updateVideo, _video["default"].updateVideos);
router.put("/set-featured", _access["default"].isAdmin, _video["default"].featureVideo);
router["delete"]("/", _access["default"].isAdmin, _video["default"].deleteAvideo);
router.post("/time", _access["default"].isNormalUser, _watchedTime["default"], _video["default"].saveWatchedTime);
router.get("/time", _access["default"].isNormalUser, _video["default"].getWatchedTime);
router.get("/sharable/:id", _video["default"].SharableVideo);
var _default = exports["default"] = router;