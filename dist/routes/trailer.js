"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _trailer = _interopRequireDefault(require("../controllers/trailer"));
var _access = _interopRequireDefault(require("../middlewares/access"));
var validation = _interopRequireWildcard(require("../middlewares/validation/trailer"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var router = new _express.Router();
router.post("/new", _access["default"].isAdmin, validation.addTrailer, _trailer["default"].createNewTrailer);
router.get("/sort/video", _access["default"].isLoggedIn, _trailer["default"].getAllTrailersPerVideo);
router.get("/particular", _trailer["default"].getParticularTrailerController);
router.get("/all", _access["default"].isAdmin, _trailer["default"].getAllTrailerController);
router.get("/upload-link", _access["default"].isAdmin, _trailer["default"].getTrailerUploadLink);
router.put("/update", _access["default"].isAdmin, _trailer["default"].updateParticularTrailerController);
router["delete"]("/delete", _access["default"].isAdmin, _trailer["default"].deleteParticularTrailerController);
var _default = exports["default"] = router;