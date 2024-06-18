"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _webhooks = _interopRequireDefault(require("../controllers/webhooks"));
var _access = _interopRequireDefault(require("../middlewares/access"));
var app = (0, _express.Router)();
app.post("/rave", _access["default"].isRave, _webhooks["default"].flutterWave);
app.post("/dpo", _webhooks["default"].DPOwebhook);
var _default = exports["default"] = app;