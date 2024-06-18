"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _chai = _interopRequireWildcard(require("chai"));
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _sinon = _interopRequireDefault(require("sinon"));
var _mocha = require("mocha");
var _fs = _interopRequireDefault(require("fs"));
var mailer = _interopRequireWildcard(require("../helpers/mailer"));
var _index = _interopRequireDefault(require("../index"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
_chai["default"].use(_chaiHttp["default"]);
(0, _mocha.describe)("SIGNUP", function () {
  (0, _mocha.it)("should return a 404 status code if the user doesn't provide all thhe necessary information", function (done) {
    _chai["default"].request(_index["default"]).post("/cp/signup").send({
      name: "james"
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(422);
      (0, _chai.expect)(res.body).to.have.property("message", "Enter a valid email address Ex: nowhere@pictures.com");
      done();
    });
  });
  (0, _mocha.it)("should return a 200 if the user is successfully signup", function (done) {
    _chai["default"].request(_index["default"]).post("/cp/signup").field("name", "serenas").field("email", "cp345@example.com").field("password", "password123").field("nationality", "Rwandan").field("cityOfResidence", "Rwanda").field("phoneLine", "0123456789").end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(201);
      (0, _chai.expect)(res.body).to.have.property("message", "Signed up successfully");
      (0, _chai.expect)(res.body.data).to.be.an("object");
      done();
    });
  });
  (0, _mocha.it)("should return a 422 if the user is already sign up", function (done) {
    _chai["default"].request(_index["default"]).post("/cp/signup").attach("image", "src/test/mock/profile.jpg", "profile.jpg").field("name", "serenas").field("email", "cp12@example.com").field("password", "password123").field("nationality", "Rwandan").field("cityOfResidence", "Rwanda").field("phoneLine", "0123456789").end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(422);
      (0, _chai.expect)(res.body).to.have.property("message", "cp already exists");
      done();
    });
  });
  (0, _mocha.it)("should return a 500 if the email wasn't sent", function (done) {
    var stub = _sinon["default"].stub(mailer, "default").resolves({
      status: 500,
      message: "email was't sent"
    });
    _chai["default"].request(_index["default"]).post("/cp/signup").attach("image", "src/test/mock/profile.jpg", "profile.jpg").field("name", "serenas").field("email", "cp1256@example.com").field("password", "password123").field("nationality", "Rwandan").field("cityOfResidence", "Rwanda").field("phoneLine", "0123456789").end(function (err, res) {
      stub.restore();
      (0, _chai.expect)(res).to.have.status(500);
      (0, _chai.expect)(res.body).to.have.property("message", "can't send email");
      done();
    });
  });
  (0, _mocha.it)("should return a 500 if there is a server error", function (done) {
    var stub = _sinon["default"].stub(mailer, "default")["throws"]("something went wrong");
    _chai["default"].request(_index["default"]).post("/cp/signup").attach("image", "src/test/mock/profile.jpg", "profile.jpg").field("name", "serenas").field("email", "cp125645@example.com").field("password", "password123").field("nationality", "Rwandan").field("cityOfResidence", "Rwanda").field("phoneLine", "0123456789").end(function (err, res) {
      stub.restore();
      (0, _chai.expect)(res).to.have.status(500);
      done();
    });
  });
});