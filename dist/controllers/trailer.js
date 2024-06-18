"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _dotenv = require("dotenv");
var _utilities = _interopRequireDefault(require("../helpers/utilities"));
var _aws = require("../helpers/aws");
var _trailerService = _interopRequireDefault(require("../services/trailerService"));
/* eslint-disable no-plusplus */
/* eslint-disable quotes */

(0, _dotenv.config)();
var util = new _utilities["default"]();
var Trailers = /*#__PURE__*/function () {
  function Trailers() {
    (0, _classCallCheck2["default"])(this, Trailers);
  }
  (0, _createClass2["default"])(Trailers, null, [{
    key: "createNewTrailer",
    value: function () {
      var _createNewTrailer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var data, uploadedTrailer;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              data = req.body;
              data.trailerLink = data.trailer;
              _context.next = 5;
              return _trailerService["default"].createNewTrailers(data);
            case 5:
              uploadedTrailer = _context.sent;
              if (!uploadedTrailer) util.setErrorResponse(res, "An error occured during file upload", 422);
              util.setSuccessResponse(res, "successfully saved the trailer", 201, uploadedTrailer);
              _context.next = 13;
              break;
            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](0);
              util.setErrorResponse(res, "Something wrong happened".concat(_context.t0.message), 500);
            case 13:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 10]]);
      }));
      function createNewTrailer(_x, _x2) {
        return _createNewTrailer.apply(this, arguments);
      }
      return createNewTrailer;
    }()
  }, {
    key: "getAllTrailersPerVideo",
    value: function () {
      var _getAllTrailersPerVideo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var id, trailers, i;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              id = req.query.id;
              _context2.next = 4;
              return _trailerService["default"].getAllTrailers(id);
            case 4:
              trailers = _context2.sent;
              for (i = 0; i < trailers.length; i++) {
                // eslint-disable-next-line no-await-in-loop
                trailers[i].trailerLink = Trailers.attachThumbnails(trailers[i].trailerLink, process.env.TRAILERS_BUCKET);
              }
              if (Object.values(trailers).length > 0) {
                util.setSuccessResponse(res, "Found", 200, trailers);
              } else {
                util.setErrorResponse(res, "No trailers found", 404);
              }
              _context2.next = 12;
              break;
            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);
              util.setErrorResponse(res, "Something wrong happened".concat(_context2.t0.message), 500);
            case 12:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 9]]);
      }));
      function getAllTrailersPerVideo(_x3, _x4) {
        return _getAllTrailersPerVideo.apply(this, arguments);
      }
      return getAllTrailersPerVideo;
    }()
  }, {
    key: "getAllTrailerController",
    value: function () {
      var _getAllTrailerController = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var trailers, i;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _trailerService["default"].getAllTrailers();
            case 3:
              trailers = _context3.sent;
              for (i = 0; i < trailers.length; i++) {
                trailers[i].trailerLink = Trailers.attachThumbnails(trailers[i].trailerLink, process.env.TRAILERS_BUCKET);
              }
              if (trailers) {
                util.setSuccessResponse(res, "Found", 200, trailers);
              } else {
                util.setErrorResponse(res, "No trailers available", 404);
              }
              _context3.next = 11;
              break;
            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](0);
              util.setErrorResponse(res, "something happened ".concat(_context3.t0.message), 500);
            case 11:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 8]]);
      }));
      function getAllTrailerController(_x5, _x6) {
        return _getAllTrailerController.apply(this, arguments);
      }
      return getAllTrailerController;
    }()
  }, {
    key: "getParticularTrailerController",
    value: function () {
      var _getParticularTrailerController = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var trailers, i;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _trailerService["default"].getAllTrailers(req.query.videoId);
            case 3:
              trailers = _context4.sent;
              for (i = 0; i < trailers.length; i++) {
                trailers[i].trailerLink = Trailers.attachThumbnails(trailers[i].trailerLink, process.env.TRAILERS_BUCKET);
              }
              if (trailers) {
                util.setSuccessResponse(res, "Found", 200, trailers);
              } else {
                util.setErrorResponse(res, "No trailer available", 401);
              }
              _context4.next = 11;
              break;
            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4["catch"](0);
              util.setErrorResponse(res, "something happened ".concat(_context4.t0.message), 500);
            case 11:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 8]]);
      }));
      function getParticularTrailerController(_x7, _x8) {
        return _getParticularTrailerController.apply(this, arguments);
      }
      return getParticularTrailerController;
    }()
  }, {
    key: "deleteParticularTrailerController",
    value: function () {
      var _deleteParticularTrailerController = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var trailer, deleteTrailer, trailers;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _trailerService["default"].getParticularTrailer(req.query.id);
            case 3:
              trailer = _context5.sent;
              _context5.next = 6;
              return (0, _aws.deleteObject)(process.env.TRAILERS_BUCKET, trailer.trailerLink);
            case 6:
              deleteTrailer = _context5.sent;
              _context5.next = 9;
              return _trailerService["default"].deleteTrailers(req.query.id);
            case 9:
              trailers = _context5.sent;
              if (trailers && !deleteTrailer.$response.error) {
                util.setSuccessResponse(res, "Trailer deleted", 200, trailers);
              } else {
                util.setErrorResponse(res, "No trailer found", 401);
              }
              _context5.next = 16;
              break;
            case 13:
              _context5.prev = 13;
              _context5.t0 = _context5["catch"](0);
              util.setErrorResponse(res, "something happened ".concat(_context5.t0.message), 500);
            case 16:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 13]]);
      }));
      function deleteParticularTrailerController(_x9, _x10) {
        return _deleteParticularTrailerController.apply(this, arguments);
      }
      return deleteParticularTrailerController;
    }()
  }, {
    key: "updateParticularTrailerController",
    value: function () {
      var _updateParticularTrailerController = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
        var trailers;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return _trailerService["default"].updateTrailers(req.query.id, req.body);
            case 3:
              trailers = _context6.sent;
              if (trailers) {
                util.setSuccessResponse(res, "Trailer updated", 201, trailers);
              } else {
                util.setErrorResponse(res, "No trailer found", 401);
              }
              _context6.next = 10;
              break;
            case 7:
              _context6.prev = 7;
              _context6.t0 = _context6["catch"](0);
              util.setErrorResponse(res, "something happened ".concat(_context6.t0.message), 500);
            case 10:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[0, 7]]);
      }));
      function updateParticularTrailerController(_x11, _x12) {
        return _updateParticularTrailerController.apply(this, arguments);
      }
      return updateParticularTrailerController;
    }()
  }, {
    key: "attachThumbnails",
    value: function attachThumbnails(key, bucket) {
      try {
        return "https://".concat(bucket, ".s3.amazonaws.com/").concat(key);
      } catch (error) {
        throw error;
      }
    }

    // eslint-disable-next-line consistent-return
  }, {
    key: "getTrailerUploadLink",
    value: function () {
      var _getTrailerUploadLink = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
        var url;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return (0, _aws.getSignedUrl)(process.env.TRAILERS_BUCKET, "video/*", req.query.extension);
            case 3:
              url = _context7.sent;
              if (!url) {
                util.setErrorResponse(res, "Something went wrong", 400);
              } else {
                util.setSuccessResponse(res, "Upload link created", 201, url);
              }
              _context7.next = 10;
              break;
            case 7:
              _context7.prev = 7;
              _context7.t0 = _context7["catch"](0);
              util.setErrorResponse(res, "something happened ".concat(_context7.t0.message), 500);
            case 10:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[0, 7]]);
      }));
      function getTrailerUploadLink(_x13, _x14) {
        return _getTrailerUploadLink.apply(this, arguments);
      }
      return getTrailerUploadLink;
    }()
  }]);
  return Trailers;
}();
var _default = exports["default"] = Trailers;