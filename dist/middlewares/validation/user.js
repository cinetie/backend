"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signupCont = exports.signup = exports.login = void 0;
var _signup = _interopRequireDefault(require("./schemas/users/signup"));
var _login = _interopRequireDefault(require("./schemas/users/login"));
var _signupCont = _interopRequireDefault(require("./schemas/users/signup-cont"));
var _validator = _interopRequireDefault(require("../../helpers/validator"));
var signup = exports.signup = function signup(req, res, next) {
  (0, _validator["default"])(_signup["default"], req.body, res, next);
};
var signupCont = exports.signupCont = function signupCont(req, res, next) {
  (0, _validator["default"])(_signupCont["default"], req.body, res, next);
};
var login = exports.login = function login(req, res, next) {
  (0, _validator["default"])(_login["default"], req.body, res, next);
};