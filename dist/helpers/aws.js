"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSignedUrl = exports.getObject = exports.deleteObject = exports.copyObjects = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _awsSdk = _interopRequireDefault(require("aws-sdk"));
var _uuid = require("uuid");
var _redis = require("./redis");
var _process$env = process.env,
  AWS_ID = _process$env.AWS_ID,
  AWS_SECRET = _process$env.AWS_SECRET,
  AWS_REGION = _process$env.AWS_REGION;
function config(credentials) {
  _awsSdk["default"].config.update({
    region: AWS_REGION,
    signatureVersion: "v4",
    credentials: {
      accessKeyId: credentials.AWS_ID,
      secretAccessKey: credentials.AWS_SECRET
    }
  });
}
config({
  AWS_ID: AWS_ID,
  AWS_SECRET: AWS_SECRET
});
var S3 = new _awsSdk["default"].S3({
  apiVersion: "2006-03-01"
});
var getObject = exports.getObject = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(Bucket, Key, Expires, Region) {
    var cachedUri, uri;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _redis.get)(Key, Expires);
        case 2:
          cachedUri = _context.sent;
          if (!cachedUri) {
            _context.next = 5;
            break;
          }
          return _context.abrupt("return", cachedUri);
        case 5:
          uri = S3.getSignedUrl("getObject", {
            Bucket: Bucket,
            Key: Key,
            Expires: Expires
          });
          _context.next = 8;
          return (0, _redis.set)(Key, uri);
        case 8:
          return _context.abrupt("return", uri);
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getObject(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();
var deleteObject = exports.deleteObject = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(Bucket, Key) {
    var S3Delete, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          config({
            AWS_SECRET: process.env.AWS_UPLOAD_ACCESS_KEY,
            AWS_ID: process.env.AWS_UPLOAD_ID
          });
          S3Delete = new _awsSdk["default"].S3({
            apiVersion: "2006-03-01"
          });
          _context2.next = 4;
          return S3Delete.deleteObject({
            Bucket: Bucket,
            Key: Key
          }).promise();
        case 4:
          result = _context2.sent;
          return _context2.abrupt("return", result);
        case 6:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function deleteObject(_x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var copyObjects = exports.copyObjects = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(source, destination, Key) {
    var params, S3Copy, copy;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          config({
            AWS_SECRET: process.env.AWS_UPLOAD_ACCESS_KEY,
            AWS_ID: process.env.AWS_UPLOAD_ID
          });
          params = {
            Bucket: destination,
            CopySource: "https://".concat(source, ".s3.").concat(AWS_REGION, ".amazonaws.com/").concat(Key),
            Key: Key
          };
          S3Copy = new _awsSdk["default"].S3({
            apiVersion: "2006-03-01"
          });
          _context3.next = 5;
          return S3Copy.copyObject(params).promise();
        case 5:
          copy = _context3.sent;
          return _context3.abrupt("return", copy);
        case 7:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function copyObjects(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var getSignedUrl = exports.getSignedUrl = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(Bucket, ContentType, extension) {
    var Key, params, options, S3SignedUrls, signedUrl;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          config({
            AWS_SECRET: process.env.AWS_UPLOAD_ACCESS_KEY,
            AWS_ID: process.env.AWS_UPLOAD_ID
          });
          Key = "".concat((0, _uuid.v4)(), ".").concat(extension);
          params = {
            Bucket: Bucket,
            Key: Key,
            ContentType: ContentType,
            Expires: 21600
          };
          options = {
            signatureVersion: "v4",
            region: 'us-east-1',
            endpoint: new _awsSdk["default"].Endpoint("".concat(Bucket, ".s3-accelerate.amazonaws.com")),
            useAccelerateEndpoint: true,
            apiVersion: "2006-03-01"
          };
          S3SignedUrls = new _awsSdk["default"].S3(options);
          _context4.next = 7;
          return S3SignedUrls.getSignedUrlPromise("putObject", params);
        case 7:
          signedUrl = _context4.sent;
          return _context4.abrupt("return", {
            url: signedUrl,
            Key: Key
          });
        case 9:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function getSignedUrl(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();