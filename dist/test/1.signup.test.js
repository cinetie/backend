"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _chai = _interopRequireWildcard(require("chai"));
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _mocha = require("mocha");
var _index = _interopRequireDefault(require("../index"));
var _usersUp = require("./mock/users.up.mock");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
_chai["default"].use(_chaiHttp["default"]);
var prefix = "/auth/signup";
(0, _mocha.describe)("SIGNUP", function () {
  (0, _mocha.it)("users should provide error signup with no email", function (done) {
    _chai["default"].request(_index["default"]).post("".concat(prefix)).send(_usersUp.UserUpNoEmail).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(422);
      (0, _chai.expect)(res.body).to.have.property("message", "You have to enter a valid email. Example: yourname@domain.com");
      done();
    });
  });
  (0, _mocha.it)("users should provide error signup with no password", function (done) {
    _chai["default"].request(_index["default"]).post("".concat(prefix)).send(_usersUp.UserUpNoPassword).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(422);
      (0, _chai.expect)(res.body).to.have.property("message", "You have to enter a valid password with more than 6 characters. Example: qqw12@#!23#frf_e3_@");
      done();
    });
  });
  (0, _mocha.it)("users should not be able to create a user with the same email", function (done) {
    _chai["default"].request(_index["default"]).post("".concat(prefix)).send(_usersUp.UserUpExist).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(403);
      (0, _chai.expect)(res.body).to.have.property("message", "user already exists");
      done();
    });
  });

  // it('users should be able to create account', (done) => {
  //   chai
  //     .request(app)
  //     .post(`${prefix}`)
  //     .send(UserUpFine)
  //     .end((err, res) => {
  //       expect(res).to.have.status(201);
  //       expect(res.body).to.have.property('message', 'Signed up successfully');
  //       done();
  //     });
  // });
});