"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _nodeMocksHttp = _interopRequireDefault(require("node-mocks-http"));
var _jwt = _interopRequireDefault(require("../../helpers/jwt"));
var response = _nodeMocksHttp["default"].createResponse();
var email = "blaise1@gmail.com";
var clientId = "0";
var token = _jwt["default"].jwtSign({
  email: email,
  clientId: clientId
}, process.env.SECRET, "1d");
// const authorization = authHeaderValue.replace('Bearer ', token)

var videoMock = {
  response: response,
  request: {
    query: {
      videoId: "17e63e02-3b95-46bc-9db7-c1cc0b3369cb"
    },
    user: "0",
    headers: {
      authorization: "Bearer ".concat(token)
    }
  }
};
var _default = exports["default"] = videoMock;