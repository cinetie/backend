"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var successResponse = function successResponse(res, status) {
  var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  return res.status(status).json({
    status: status,
    message: message,
    data: data
  });
};
var errorResponse = function errorResponse(res, status) {
  var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var error = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  return res.status(status).json({
    status: status,
    message: message,
    error: error
  });
};
var _default = exports["default"] = {
  successResponse: successResponse,
  errorResponse: errorResponse
};