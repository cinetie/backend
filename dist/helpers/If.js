"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var checker = function checker(success, error) {
  if (success) {
    return success;
  }
  return error;
};
var _default = exports["default"] = {
  checker: checker
};