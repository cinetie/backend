"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _viewingSessions = _interopRequireDefault(require("../controllers/viewingSessions"));
var router = new _express.Router();
router.get("/", _viewingSessions["default"].getSpecificSessions);
router.get("/user", _viewingSessions["default"].getAllSessionsPerUser);
var _default = exports["default"] = router;