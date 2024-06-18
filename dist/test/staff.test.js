"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _chai = _interopRequireWildcard(require("chai"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _mocha = require("mocha");
var _index = _interopRequireDefault(require("../index"));
var _jwt = _interopRequireDefault(require("../helpers/jwt"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
_chai["default"].use(_chaiHttp["default"]);
(0, _mocha.describe)("STAFF SIGN IN", function () {
  (0, _mocha.it)("should return error if staff gives invalid data", function (done) {
    _chai["default"].request(_index["default"]).post("/staff/login").send({
      password: "thisisapassword"
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(422);
      done();
    });
  });
  (0, _mocha.it)("should return error if staff doesn't exists", function (done) {
    _chai["default"].request(_index["default"]).post("/staff/login").send({
      email: "nostaff@example.com",
      password: "thisisapassword"
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(400);
      (0, _chai.expect)(res.body).to.have.property("message", "Invalid email or password!");
      done();
    });
  });
  (0, _mocha.it)("should return error if staff gives wrong password", function (done) {
    _chai["default"].request(_index["default"]).post("/staff/login").send({
      email: "staff@example.com",
      password: "wrongpassword"
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(400);
      (0, _chai.expect)(res.body).to.have.property("message", "Invalid email or password!");
      done();
    });
  });
  (0, _mocha.it)("should return the token if the staff member has given valid credentials", function (done) {
    _chai["default"].request(_index["default"]).post("/staff/login").send({
      email: "staff@example.com",
      password: "izzeddin"
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(res.body).to.have.property("message", "Logged in successfully!");
      done();
    });
  });
});
(0, _mocha.describe)("ADD NEW STAFF", function () {
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
  (0, _mocha.it)("should return an error if invalid data", function (done) {
    _chai["default"].request(_index["default"]).post("/staff/add").set("authorization", "bearer ".concat(adminToken)).send({
      email: "staff123@example.com",
      role: "president"
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(422);
      done();
    });
  });
  (0, _mocha.it)("should return an error if the staff already exist", function (done) {
    _chai["default"].request(_index["default"]).post("/staff/add").set("authorization", "bearer ".concat(adminToken)).send({
      email: "staff3@example.com",
      role: "marketing agent"
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(403);
      (0, _chai.expect)(res.body).to.have.property("message", "the staff already exists");
      done();
    });
  });
  (0, _mocha.it)("should return add a new user if all information are give", function (done) {
    _chai["default"].request(_index["default"]).post("/staff/add").set("authorization", "bearer ".concat(adminToken)).send({
      email: "staff3786@example.com",
      role: "admin"
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(201);
      (0, _chai.expect)(res.body).to.have.property("message", "Staff added successfully!");
      done();
    });
  });
});
(0, _mocha.describe)("CHANGE STAFF MEMBER PASSWORD", function () {
  var token = _jwt["default"].jwtSign({
    email: "staff4@example.com",
    role: "staff"
  }, process.env.SECRET);
  var expiredToken = _jwt["default"].jwtSign({
    email: "staff46898@example.com",
    role: "staff"
  }, process.env.SECRET);
  (0, _mocha.it)("should return an error if the staff doesn't exist exist", function (done) {
    _chai["default"].request(_index["default"]).put("/staff/password").set("authorization", "bearer ".concat(expiredToken)).send({
      newPassword: "wrongpassword"
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(404);
      (0, _chai.expect)(res.body).to.have.property("message", "Staff not found");
      done();
    });
  });
  (0, _mocha.it)("should return an error if the password is invalid", function (done) {
    _chai["default"].request(_index["default"]).put("/staff/password").set("authorization", "bearer ".concat(token)).send({
      newPassword: "newp"
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(422);
      done();
    });
  });
  (0, _mocha.it)("should change staff member password", function (done) {
    _chai["default"].request(_index["default"]).put("/staff/password").set("authorization", "bearer ".concat(token)).send({
      newPassword: "newpassword12"
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(res.body).to.have.property("message", "password changed successfully!");
      done();
    });
  });
});