"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _chai = _interopRequireWildcard(require("chai"));
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _sinon = _interopRequireDefault(require("sinon"));
var _mocha = require("mocha");
var _index = _interopRequireDefault(require("../index"));
var _jwt = _interopRequireDefault(require("../helpers/jwt"));
var _crypto = _interopRequireDefault(require("../helpers/crypto"));
var aws = _interopRequireWildcard(require("../helpers/aws"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
_chai["default"].use(_chaiHttp["default"]);
(0, _mocha.describe)("GET CP DETAILS TEST", function () {
  (0, _mocha.it)("should return 403 if the cp is not found", function (done) {
    var token = _jwt["default"].jwtSign({
      key: _crypto["default"].crypto(),
      email: "cp005",
      clientId: "deferferg-123-rgrtgtr-fr4"
    }, process.env.SECRET, "1d");
    _chai["default"].request(_index["default"]).get("/cp/details").set("authorization", "bearer ".concat(token)).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(403);
      (0, _chai.expect)(res.body).to.have.property("message", "Access denied");
      done();
    });
  });
  //     it('should return the cp info when the user exist', async () => {

  //         const loginRes = await chai
  //             .request(app)
  //             .post('/cp/login')
  //             .send({
  //                 email: 'cp002@example.com',
  //                 password: 'izzeddin'
  //             });
  //         const res = await chai
  //             .request(app)
  //             .get('/cp/details')
  //             .set('authorization', `bearer ${loginRes.body.data}`)
  //         expect(res.statusCode).to.equal(200)
  //         expect(res.body).to.have.property('message', 'Data found');

  //     });
  (0, _mocha.it)("should return 500 status code if there is a server error", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var stub, loginRes, res;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          stub = _sinon["default"].stub(aws, "getObject")["throws"](new Error("something went wrong"));
          _context.next = 3;
          return _chai["default"].request(_index["default"]).post("/cp/login").send({
            email: "cp002@example.com",
            password: "izzeddin"
          });
        case 3:
          loginRes = _context.sent;
          _context.next = 6;
          return _chai["default"].request(_index["default"]).get("/cp/details").set("authorization", "bearer ".concat(loginRes.body.data));
        case 6:
          res = _context.sent;
          stub.restore();
          (0, _chai.expect)(res.statusCode).to.equal(500);
          (0, _chai.expect)(res.body).to.have.property("message", "Something went wrong");
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
});