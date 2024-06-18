"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _uuid = require("uuid");
var generator = function generator() {
  return (0, _uuid.v4)();
};
var _default = exports["default"] = {
  generator: generator
};