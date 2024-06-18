"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addTrailer = void 0;
var _addTrailer = _interopRequireDefault(require("./schemas/trailers/addTrailer"));
var _validator = _interopRequireDefault(require("../../helpers/validator"));
/* eslint-disable import/prefer-default-export */

var addTrailer = exports.addTrailer = function addTrailer(req, res, next) {
  (0, _validator["default"])(_addTrailer["default"], req.body, res, next);
};