"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _utilities = _interopRequireDefault(require("./utilities"));
require("@hapi/joi");
var util = new _utilities["default"]();
var _default = exports["default"] = function _default(schema, toValidate, res, next) {
  var _schema$validate = schema.validate(toValidate),
    error = _schema$validate.error;
  return error ? util.setErrorResponse(res, error.details[0].message, 422) : next();
};