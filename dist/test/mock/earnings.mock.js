"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _nodeMocksHttp = _interopRequireDefault(require("node-mocks-http"));
var _jwt = _interopRequireDefault(require("../../helpers/jwt"));
var _crypto = _interopRequireDefault(require("../../helpers/crypto"));
var response = _nodeMocksHttp["default"].createResponse();
var email = "blaise1@gmail.com";
var clientId = "10201";
var token = _jwt["default"].jwtSign({
  email: email,
  clientId: clientId
}, process.env.SECRET, "1d");
// const authorization = authHeaderValue.replace('Bearer ', token)

var earningsMock = {
  response: response,
  request: {
    query: {
      videoId: "17e63e02-3b95-46bc-9db7-c1cc0b3369cb"
    },
    headers: {
      authorization: "Bearer ".concat(token)
    }
  }
};
var _default = exports["default"] = earningsMock;