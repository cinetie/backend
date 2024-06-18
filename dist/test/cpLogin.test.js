"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _chai = _interopRequireWildcard(require("chai"));
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _sinon = _interopRequireDefault(require("sinon"));
var _mocha = require("mocha");
var mailer = _interopRequireWildcard(require("../helpers/mailer"));
var _index = _interopRequireDefault(require("../index"));
var _loginSessionServices = _interopRequireDefault(require("../services/loginSessionServices"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
_chai["default"].use(_chaiHttp["default"]);
(0, _mocha.describe)("CP LOGIN TEST", function () {
  (0, _mocha.it)("should return 400 status if the password or email is null", function (done) {
    _chai["default"].request(_index["default"]).post("/cp/login").send({
      password: "fewfwefwefewfw"
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(400);
      (0, _chai.expect)(res.body).to.have.property("message", "some fields are empty");
      done();
    });
  });
  (0, _mocha.it)("should return 400 status if the password or email is null", function (done) {
    _chai["default"].request(_index["default"]).post("/cp/login").send({
      password: "fewfwefwefewfw"
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(400);
      (0, _chai.expect)(res.body).to.have.property("message", "some fields are empty");
      done();
    });
  });
  (0, _mocha.it)("should return an error message if a short or long password is given", function (done) {
    _chai["default"].request(_index["default"]).post("/cp/login").send({
      email: "cp001@example.com",
      password: "f"
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(422);
      (0, _chai.expect)(res.body).to.have.property("message", "You have to enter a valid password");
      done();
    });
  });
  (0, _mocha.it)("should return an error message if the user is not found", function (done) {
    _chai["default"].request(_index["default"]).post("/cp/login").send({
      email: "cp001@example.com",
      password: "fewfwefwefewfw"
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(400);
      (0, _chai.expect)(res.body).to.have.property("message", "Invalid email or password!");
      done();
    });
  });
  (0, _mocha.it)("should return an error message if the password is incorrect", function (done) {
    _chai["default"].request(_index["default"]).post("/cp/login").send({
      email: "cp12@example.com",
      password: "fewfwefwefewfw"
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(400);
      (0, _chai.expect)(res.body).to.have.property("message", "Passwords don't match");
      done();
    });
  });
  (0, _mocha.it)("should return 200 when the cp successfully login", function (done) {
    _chai["default"].request(_index["default"]).post("/cp/login").send({
      email: "cp002@example.com",
      password: "izzeddin"
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(res.body).to.have.property("message", "Logged in successfully!");
      done();
    });
  });
  (0, _mocha.it)("should return an error message if a login session can't be added", function (done) {
    var stub = _sinon["default"].stub(_loginSessionServices["default"], "addSession").callsFake(function () {
      return null;
    });
    _chai["default"].request(_index["default"]).post("/cp/login").send({
      email: "cp002@example.com",
      password: "izzeddin"
    }).end(function (err, res) {
      stub.restore();
      (0, _chai.expect)(res).to.have.status(500);
      (0, _chai.expect)(res.body).to.have.property("message", "Can't register session");
      done();
    });
  });
  (0, _mocha.it)("should return an error message if there is a server error", function (done) {
    var stub = _sinon["default"].stub(_loginSessionServices["default"], "addSession")["throws"](new Error("something went wrong"));
    _chai["default"].request(_index["default"]).post("/cp/login").send({
      email: "cp002@example.com",
      password: "izzeddin"
    }).end(function (err, res) {
      stub.restore();
      (0, _chai.expect)(res).to.have.status(500);
      (0, _chai.expect)(res.body.message.includes("Something Went wrong logging in ")).to.be["true"];
      done();
    });
  });
});