"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addProfile = void 0;
var _addProfile = _interopRequireDefault(require("./schemas/profiles/addProfile"));
var _validator = _interopRequireDefault(require("../../helpers/validator"));
/* eslint-disable import/prefer-default-export */

var addProfile = exports.addProfile = function addProfile(req, res, next) {
  (0, _validator["default"])(_addProfile["default"], req.body, res, next);
};