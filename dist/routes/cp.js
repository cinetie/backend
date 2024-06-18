"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _cp = _interopRequireDefault(require("../controllers/cp"));
var _access = _interopRequireDefault(require("../middlewares/access"));
var _isAdmin = _interopRequireDefault(require("../middlewares/isAdmin"));
var validation = _interopRequireWildcard(require("../middlewares/validation/cp"));
var _earning = _interopRequireDefault(require("../controllers/earning"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var router = new _express.Router();
router.post("/signup", validation.signup, _cp["default"].signupCp);
router.get("/details", _access["default"].isProducer, _cp["default"].getCpDetails);
router.post("/login", _isAdmin["default"].verifyAdmin, validation.login, _cp["default"].loginUser);
// router.delete('/delete_acc', access.isProducer, auth.deleteAccount);
router.get("/all", _access["default"].isAdmin, _cp["default"].getAllAccounts);
router.post("/reset-password/", _cp["default"].resetPassword);
router.post("/forgot-password", _cp["default"].forgotPassword);
router.get("/verify/", _cp["default"].verify);
router.get("/earnings/active/video", _access["default"].isProducer, _earning["default"].getActiveEarningsPerVideo);
router.get("/earnings/active", _access["default"].isProducer, _earning["default"].getActiveEarningsPerClient);
router.get("/earnings", _access["default"].isProducer, _earning["default"].getEarningsPerClient);
router.get("/videos", _access["default"].isProducer, _cp["default"].getAllVideosLocal);
router.put("/update", _access["default"].isProducer, _cp["default"].updateAccount);
router.get("/serve-verify", _cp["default"].serveVerifyPassword);
router.get("/upload-tokens", _access["default"].isProducer, _cp["default"].getS3Tokens);
var _default = exports["default"] = router;