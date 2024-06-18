"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _ambassadors = _interopRequireDefault(require("../controllers/ambassadors"));
var userValidation = _interopRequireWildcard(require("../middlewares/validation/user"));
var validation = _interopRequireWildcard(require("../middlewares/validation/ambassadors"));
var _promoCode = _interopRequireDefault(require("../controllers/promoCode"));
var _access = _interopRequireDefault(require("../middlewares/access"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var router = (0, _express.Router)();
router.post("/signup", validation.signup, _ambassadors["default"].signup);
router.post("/login", userValidation.login, _ambassadors["default"].login);
router.post("/verify/:id", _access["default"].isAdmin, _ambassadors["default"].verify);
router.get("/", _access["default"].isAdmin, _ambassadors["default"].getAmbassadors);
router.get("/promocode/utilization", _access["default"].isAmbassador, _promoCode["default"].getAmbassadorPromoCodeUtilizations);
router.get("/info", _access["default"].isAmbassador, _ambassadors["default"].getAmbassadorDetails);
router.get("/stats/:id", _access["default"].isAdmin, _ambassadors["default"].getAmbassadorStats);
var _default = exports["default"] = router;