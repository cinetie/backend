"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _chai = _interopRequireWildcard(require("chai"));
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _mocha = require("mocha");
var _jwt = _interopRequireDefault(require("../helpers/jwt"));
var _index = _interopRequireDefault(require("../index"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
_chai["default"].use(_chaiHttp["default"]);
var prefix = "/auth/verify?token=".concat(_jwt["default"].jwtSign("blaise1@gmail.com", process.env.SECRET));
(0, _mocha.describe)("VERIFY EMAIL", function () {
  (0, _mocha.it)("should be able to verify email", function (done) {
    _chai["default"].request(_index["default"]).get("".concat(prefix)).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
      done();
    });
  });
  (0, _mocha.it)("should be able to provide an error with malformed token", function (done) {
    _chai["default"].request(_index["default"]).get("/auth/verify/?token=eyJhbGciOiJIUzI1NiJ9.").end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(500);
      (0, _chai.expect)(res.body).to.have.property("message", "Something went wrong jwt malformed");
      done();
    });
  });

  //   it("should be able to provide an error with fake token", (done) => {
  //     chai
  //       .request(app)
  //       .get(
  //         "/auth/verify/?token=eyJhbGciOiJIUzI1NiJ9.ZmFrZUBnbWFpbC5jb20.Fm0mt8gdnR2hLBB_c16JhDBhyJuJR7iBYF1TIlqeOKo"
  //       )
  //       .end((err, res) => {
  //         expect(res).to.have.status(404);
  //         expect(res.body).to.have.property("message", "User not found");
  //         done();
  //       });
  //   });
});