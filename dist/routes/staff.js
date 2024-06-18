"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _staff = _interopRequireDefault(require("../controllers/staff"));
var _staff2 = require("../middlewares/validation/staff");
var _access = _interopRequireDefault(require("../middlewares/access"));
var router = new _express.Router();
router.post("/login", _staff2.login, _staff["default"].login);
router.post("/add", _access["default"].isAdmin, _staff2.addStaff, _staff["default"].addNewStaff);
router.put("/password", _access["default"].isLoggedIn, _staff2.changePassword, _staff["default"].changePassword);
var _default = exports["default"] = router;