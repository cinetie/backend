"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _chai = _interopRequireWildcard(require("chai"));
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _sinon = _interopRequireDefault(require("sinon"));
var _sinonStubPromise = _interopRequireDefault(require("sinon-stub-promise"));
var _nodeMocksHttp = _interopRequireDefault(require("node-mocks-http"));
var _viewingSessions = _interopRequireDefault(require("../middlewares/viewingSessions"));
var _viewingSessionsServices = _interopRequireDefault(require("../services/viewingSessionsServices"));
var _videoServices = _interopRequireDefault(require("../services/videoServices"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// chai.use(chaiAsPromised);
_chai["default"].use(_chaiHttp["default"]);
_chai["default"].should();
(0, _sinonStubPromise["default"])(_sinon["default"]);
describe("VIEWING SESSION MIDDLEWARE", function (req, res, status) {
  it("Test createNewWatchCount wihout IP,  videoId should return 400 status", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var nextSpy, req, res, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          nextSpy = _sinon["default"].spy();
          req = _nodeMocksHttp["default"].createRequest({
            query: {
              id: null
            },
            headers: {
              authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlzMTk5OTk5OTk5NzhAZ21haWwuY29tIiwiaWF0IjoxNjA3NTA5ODk3fQ.xZwna-9ZwmzoeMnR9sF9fUluxct237eRcqrmmHxLB8w",
              ip: null
            },
            body: {
              email: "blaise1200@gmail.com",
              password: "nAdia123"
            }
          });
          res = _nodeMocksHttp["default"].createResponse();
          _context.next = 5;
          return _viewingSessions["default"].createNewWatchCount(req, res, nextSpy);
        case 5:
          data = _context.sent;
          (0, _chai.expect)(data.statusCode).to.equal(400);
          (0, _chai.expect)(nextSpy.calledOnce).to.be["false"];
        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  it("Test createNewWatchCount with invalid VideoId should restun 404 status", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var nextSpy, req, res, data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          nextSpy = _sinon["default"].spy();
          req = _nodeMocksHttp["default"].createRequest({
            query: {
              id: "b467da83-4f0d-4421-8818-c0f364ca9109"
            },
            headers: {
              authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlzMTk5OTk5OTk5NzhAZ21haWwuY29tIiwiaWF0IjoxNjA3NTA5ODk3fQ.xZwna-9ZwmzoeMnR9sF9fUluxct237eRcqrmmHxLB8w",
              ip: "197.243.52.82"
            },
            body: {
              email: "blaise1200@gmail.com",
              password: "nAdia123"
            }
          });
          res = _nodeMocksHttp["default"].createResponse();
          _context2.next = 5;
          return _viewingSessions["default"].createNewWatchCount(req, res, nextSpy);
        case 5:
          data = _context2.sent;
          (0, _chai.expect)(data.statusCode).to.equal(404);
          (0, _chai.expect)(nextSpy.calledOnce).to.be["false"];
        case 8:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));

  //     it('Test createNewWatchCount to check if there is an exact session before same like the provided one should be 200', async () => {
  //         var nextSpy = sinon.spy();
  //         var req = httpMocks.createRequest({
  //             query: {
  //                 id: 'b467da83-4f0d-4421-8818-c0f364ca9de1'
  //             },
  //             headers: {
  //                 authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlzMTk5OTk5OTk5NzhAZ21haWwuY29tIiwiaWF0IjoxNjA3NTA5ODk3fQ.xZwna-9ZwmzoeMnR9sF9fUluxct237eRcqrmmHxLB8w`,
  //                 ip: `197.243.52.82`
  //             },
  //             body: {
  //                 "email": "blaise1200@gmail.com",
  //                 "password": "nAdia123"
  //             }
  //         });
  //         var res = httpMocks.createResponse();
  //         await viewingSession.createNewWatchCount(req, res, nextSpy);
  //         expect(res.statusCode).to.equal(200)
  //         expect(nextSpy.calledOnce).to.be.true;
  //     });

  //     it(`Test createNewWatchCount to create session when there isn't `, async () => {
  //         const stub = sinon.stub(viewingSessions, 'getSesssionPerVideoUser').callsFake(() =>  [])

  //         var nextSpy = sinon.spy();
  //         var req = httpMocks.createRequest({
  //             query: {
  //                 id: `b467da83-4f0d-4421-8818-c0f364ca9de1`
  //             },
  //             headers: {
  //                 authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlzMTk5OTk5OTk5NzhAZ21haWwuY29tIiwiaWF0IjoxNjA3NTA5ODk3fQ.xZwna-9ZwmzoeMnR9sF9fUluxct237eRcqrmmHxLB8w`,
  //                 ip: `197.243.52.82`
  //             },
  //             body: {
  //                 "email": "blaise1200@gmail.com",
  //                 "password": "nAdia123"
  //             }
  //         });
  //         var res = httpMocks.createResponse();
  //         await viewingSession.createNewWatchCount(req, res, nextSpy);
  //         stub.restore()
  //         expect(res.statusCode).to.equal(200)
  //         expect(nextSpy.calledOnce).to.be.true;
  //     });

  //     it(`Test createNewWatchCount to create session when there isn't throw error because Can't get location`, async () => {
  //         const stub = sinon.stub(viewingSessions, 'registerViewingSessions').callsFake(() =>  null)

  //         var nextSpy = sinon.spy();
  //         var req = httpMocks.createRequest({
  //             query: {
  //                 id: `b467da83-4f0d-4421-8818-c0f364ca9de1`
  //             },
  //             headers: {
  //                 authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlzZTEyNjk5MTA3Nzg3ODc4QGdtYWlsLmNvbSIsImlhdCI6MTYwNzUwODA3NH0.OHqK11xqdhIm2Y6GpJ0mdIVsQ0sXNyAjwIqux1c3DnI`,
  //                 ip: `197.243.52.82`
  //             },
  //             body: {
  //                 "email": "blaise1200@gmail.com",
  //                 "password": "nAdia123"
  //             }
  //         });
  //         var res = httpMocks.createResponse();
  //         await viewingSession.createNewWatchCount(req, res, nextSpy);
  //         stub.restore()
  //         expect(res.statusCode).to.equal(400)
  //         expect(nextSpy.calledOnce).to.be.false;
  //     });

  it("Test createNewWatchCount", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var stub, nextSpy, req, res;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          stub = _sinon["default"].stub(_videoServices["default"], "getVideoById")["throws"](new Error());
          nextSpy = _sinon["default"].spy();
          req = _nodeMocksHttp["default"].createRequest({
            query: {
              id: "b467da83-4f0d-4421-8818-c0f364ca9de1"
            },
            headers: {
              authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlzZTEyNjk5MTA3Nzg3ODc4QGdtYWlsLmNvbSIsImlhdCI6MTYwNzUwODA3NH0.OHqK11xqdhIm2Y6GpJ0mdIVsQ0sXNyAjwIqux1c3DnI",
              ip: "197.243.52.82"
            },
            body: {
              email: "blaise1200@gmail.com",
              password: "nAdia123"
            }
          });
          res = _nodeMocksHttp["default"].createResponse();
          _context3.next = 6;
          return _viewingSessions["default"].createNewWatchCount(req, res, nextSpy);
        case 6:
          stub.restore();
          (0, _chai.expect)(res.statusCode).to.equal(500);
        case 8:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
});