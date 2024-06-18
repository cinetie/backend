"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _earning = _interopRequireDefault(require("../controllers/earning"));
var _admin = _interopRequireDefault(require("../controllers/admin"));
var _sales = _interopRequireDefault(require("../controllers/sales"));
var _access = _interopRequireDefault(require("../middlewares/access"));
var _calculateEarning = _interopRequireDefault(require("../helpers/calculateEarning"));
var _promoCode = _interopRequireDefault(require("../controllers/promoCode"));
var router = (0, _express.Router)();
router.get("/earnings", _access["default"].isAdmin, _earning["default"].getAllEarnings);
router.get("/earnings/active", _access["default"].isAdmin, _earning["default"].getAllActiveEarnings);
router.get("/earnings/cp", _access["default"].isAdmin, _admin["default"].getEarningsPerClient);
router.get("/earnings/video", _access["default"].isAdmin, _admin["default"].getAllEarningsPerVideo);
router.get("/videos/cp", _access["default"].isAdmin, _admin["default"].getVideosPerCp);
router.get("/videos", _access["default"].isAdmin, _admin["default"].getAllVideos);
router.get("/sales/all", _access["default"].isAdmin, _sales["default"].getAllSales);
router.get("/sales/range", _access["default"].isAdmin, _sales["default"].getSalesInTimeRange);
router.post("/gain-access", _access["default"].isAdmin, _admin["default"].gainAccess);
router.get("/promo/all", _access["default"].isAdmin, _promoCode["default"].getAllPromoCodeUtilizations);
var _default = exports["default"] = router;