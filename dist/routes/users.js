"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _users = _interopRequireDefault(require("../controllers/users"));
var _access = _interopRequireDefault(require("../middlewares/access"));
var _billing = _interopRequireDefault(require("../middlewares/billing"));
var _isAdmin = _interopRequireDefault(require("../middlewares/isAdmin"));
var validation = _interopRequireWildcard(require("../middlewares/validation/user"));
var _checkCredentials = _interopRequireDefault(require("../middlewares/checkCredentials"));
var _updateSubscription = _interopRequireDefault(require("../middlewares/updateSubscription"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var router = new _express.Router();
router.post("/signup", validation.signup, _users["default"].signupUser);
router.get("/particular", _users["default"].getUserByEmail);
router.post("/login", _isAdmin["default"].verifyAdmin, validation.login, _checkCredentials["default"], _billing["default"].verifySpennTransactions, _billing["default"].renewPayment,
// screenValidator.validateNumberOfScreens,
_users["default"].loginUser);
router.put("/logout", _access["default"].isLoggedIn, _users["default"].logout);
router["delete"]("/my-account/delete", _access["default"].isNormalUser, _users["default"].deleteAccount);
router.get("/all", _access["default"].isAdmin, _users["default"].getAllAccounts);
router.post("/reset-password", _users["default"].resetPassword);
router.post("/forgot-password", _users["default"].forgotPassword);
router.get("/verify", _users["default"].verify);
router.get("/my-account", _users["default"].getUserProfile);
router.put("/signup/cont", _access["default"].isNormalUser, _users["default"].createSubcription);
router.put("/my-account/activate", _access["default"].isNormalUser, _users["default"].updateAccountAndSubscription);
router.patch("/change/plan", _access["default"].isNormalUser, _updateSubscription["default"], _users["default"].updateAccountAndSubscription);
router.put("/update", _access["default"].isNormalUser, _users["default"].updateAccount);
router.get("/users", _access["default"].isAdmin, _users["default"].getSubscribersInRange);
router.get("/users/live", _access["default"].isAdmin, _users["default"].getLiveUsers);
router.get("/serve-verify", _users["default"].serveVerifyPassword);
router.post("/otp-verify", _access["default"].isNormalUser, _users["default"].verifyOTP);
var _default = exports["default"] = router;