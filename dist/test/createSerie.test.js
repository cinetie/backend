"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _chai = _interopRequireWildcard(require("chai"));
var _dotenv = require("dotenv");
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _sinon = _interopRequireDefault(require("sinon"));
var _mocha = require("mocha");
var _jwt = _interopRequireDefault(require("../helpers/jwt"));
var _index = _interopRequireDefault(require("../index"));
var _tempSerieService = _interopRequireDefault(require("../services/tempSerieService"));
var aws = _interopRequireWildcard(require("../helpers/aws"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
(0, _dotenv.config)();
_chai["default"].use(_chaiHttp["default"]);
(0, _mocha.describe)("CREATE EPISODE TEST", function () {
  var adminToken;
  before( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var loginRes;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _chai["default"].request(_index["default"]).post("/staff/login").send({
            email: "staff@example.com",
            password: "izzeddin"
          });
        case 2:
          loginRes = _context.sent;
          adminToken = loginRes.body.data.token;
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  //     it('should add a new episode', async () => {
  //         const stub = sinon.stub(aws, 'copyObjects').callsFake(() => {
  //             return { status: 'success' }
  //         })
  //         const token = jwt.jwtSign({ user: process.env.ADMIN_USER, }, process.env.SECRET, '1d');
  //         const res = await chai
  //             .request(app)
  //             .post('/series/create')
  //             .set('authorization', `bearer ${token}`)
  //             .query({ id: 160 });
  //         stub.restore();
  //         expect(res.statusCode).to.equal(201)
  //         expect(res.body).to.have.property('message', 'Created successfully');
  //     });

  (0, _mocha.it)("should return 404 if the serie is not found", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var stub, res;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          stub = _sinon["default"].stub(aws, "copyObjects")["throws"](new Error("something went wrong"));
          _context2.next = 3;
          return _chai["default"].request(_index["default"]).post("/series/create").set("authorization", "bearer ".concat(adminToken)).query({
            id: 1610
          });
        case 3:
          res = _context2.sent;
          stub.restore();
          (0, _chai.expect)(res.statusCode).to.equal(404);
          (0, _chai.expect)(res.body).to.have.property("message", "Serie not found");
        case 7:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  (0, _mocha.it)("should return 500 if there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var stub, res;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          stub = _sinon["default"].stub(_jwt["default"], "jwtVerify")["throws"](new Error("something went wrong"));
          _context3.next = 3;
          return _chai["default"].request(_index["default"]).post("/series/create").set("authorization", "bearer ".concat(adminToken)).query({
            id: 162
          });
        case 3:
          res = _context3.sent;
          stub.restore();
          (0, _chai.expect)(res.statusCode).to.equal(500);
        case 6:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
});