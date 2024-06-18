"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _earning = _interopRequireDefault(require("../controllers/earning"));
var _access = _interopRequireDefault(require("../middlewares/access"));
var app = (0, _express.Router)();
app.post("/calculate-per-user", _access["default"].isNormalUser, _earning["default"].calculateEarningsPerUser);
var _default = exports["default"] = app;