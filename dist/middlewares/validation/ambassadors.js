"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signup = void 0;
var _signup = _interopRequireDefault(require("./schemas/ambassadors/signup"));
var _validator = _interopRequireDefault(require("../../helpers/validator"));
var signup = exports.signup = function signup(req, res, next) {
  (0, _validator["default"])(_signup["default"], req.body, res, next);
};