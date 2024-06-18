"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signedUrls = void 0;
var _getSignedUrl = _interopRequireDefault(require("./schemas/signedUrl/getSignedUrl"));
var _validator = _interopRequireDefault(require("../../helpers/validator"));
/* eslint-disable import/prefer-default-export */

var signedUrls = exports.signedUrls = function signedUrls(req, res, next) {
  (0, _validator["default"])(_getSignedUrl["default"], req.body, res, next);
};