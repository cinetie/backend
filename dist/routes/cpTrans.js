"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _cpTrans = _interopRequireDefault(require("../controllers/cpTrans"));
var _access = _interopRequireDefault(require("../middlewares/access"));
// Routes  for Content providers transactions

var router = new _express.Router();
router.get("/all", _access["default"].isAdmin, _cpTrans["default"].getAllTransactions);
router.get("/", _access["default"].isProducer, _cpTrans["default"].getAllTransById);
// router.get('/admin',access.isAdmin,controller.getAllTransById);
router.get("/stats", _cpTrans["default"].loadStats);
router.put("/checkout", _cpTrans["default"].checkout);
router.put("/approve", _access["default"].isAdmin, _cpTrans["default"].patchNonApprovedTrans);
var _default = exports["default"] = router;