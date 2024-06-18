"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _dotenv = _interopRequireDefault(require("dotenv"));
var NODE_ENV = process.env.NODE_ENV;
var envFile = ".env";
if (NODE_ENV === "production") {
  envFile = ".env.production";
} else if (NODE_ENV === "staging") {
  envFile = ".env.staging";
} else if (NODE_ENV === "development") {
  envFile = ".env.dev";
}
_dotenv["default"].config(process.cwd(), envFile);