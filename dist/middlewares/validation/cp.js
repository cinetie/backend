"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signup = exports.login = void 0;
var _signup = _interopRequireDefault(require("./schemas/cp/signup"));
var _login = _interopRequireDefault(require("./schemas/cp/login"));
var _validator = _interopRequireDefault(require("../../helpers/validator"));
/* eslint-disable import/prefer-default-export */

var signup = exports.signup = function signup(req, res, next) {
  (0, _validator["default"])(_signup["default"], req.body, res, next);
};
var login = exports.login = function login(req, res, next) {
  (0, _validator["default"])(_login["default"], req.body, res, next);
};