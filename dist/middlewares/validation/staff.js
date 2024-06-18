"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = exports.changePassword = exports.addStaff = void 0;
var _login = _interopRequireDefault(require("./schemas/staff/login"));
var _newStaff = _interopRequireDefault(require("./schemas/staff/newStaff"));
var _changePassword = _interopRequireDefault(require("./schemas/staff/changePassword"));
var _validator = _interopRequireDefault(require("../../helpers/validator"));
var login = exports.login = function login(req, res, next) {
  (0, _validator["default"])(_login["default"], req.body, res, next);
};
var addStaff = exports.addStaff = function addStaff(req, res, next) {
  (0, _validator["default"])(_newStaff["default"], req.body, res, next);
};
var changePassword = exports.changePassword = function changePassword(req, res, next) {
  (0, _validator["default"])(_changePassword["default"], req.body, res, next);
};