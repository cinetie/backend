"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _nodeMocksHttp = _interopRequireDefault(require("node-mocks-http"));
var response = _nodeMocksHttp["default"].createResponse();
var emptyMock = {
  response: response,
  request: {}
};
var _default = exports["default"] = emptyMock;