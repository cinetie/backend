"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _sales = _interopRequireDefault(require("../controllers/sales"));
var _access = _interopRequireDefault(require("../middlewares/access"));
var router = (0, _express.Router)();
router.get('/all', _access["default"].isAdmin, _sales["default"].getSales);
var _default = exports["default"] = router;