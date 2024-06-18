"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _watchedTime = _interopRequireDefault(require("./schemas/videos/watchedTime"));
var _validator = _interopRequireDefault(require("../../helpers/validator"));
var timeValidator = function timeValidator(req, res, next) {
  (0, _validator["default"])(_watchedTime["default"], req.body, res, next);
};
var _default = exports["default"] = timeValidator;