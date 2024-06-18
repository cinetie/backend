"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addPlan = void 0;
var _addPlan = _interopRequireDefault(require("./schemas/plans/addPlan"));
var _validator = _interopRequireDefault(require("../../helpers/validator"));
/* eslint-disable import/prefer-default-export */

var addPlan = exports.addPlan = function addPlan(req, res, next) {
  (0, _validator["default"])(_addPlan["default"], req.body, res, next);
};