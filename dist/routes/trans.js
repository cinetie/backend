"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _transations = _interopRequireDefault(require("../controllers/transations"));
var _access = _interopRequireDefault(require("../middlewares/access"));
var route = new _express.Router();
route.post("/new", _access["default"].isNormalUser, _transations["default"].createNewTrans);
route.get("/get-session-id", _access["default"].isNormalUser, _transations["default"].getNewSessionId);
route.get("/rave-standard", _access["default"].isNormalUser, _transations["default"].getRaveStandardLink);
route.get("/rave-flutterwave", _access["default"].isNormalUser, _transations["default"].getFlutterwaveLink);
route.put("/cancel-subscription", _access["default"].isNormalUser, _transations["default"].cancelSubscription);
route.put("/reactivate-subscription", _access["default"].isNormalUser, _transations["default"].reactivateSubscription);
var _default = exports["default"] = route;