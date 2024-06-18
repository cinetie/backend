"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _chai = _interopRequireWildcard(require("chai"));
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _mocha = require("mocha");
var _index = _interopRequireDefault(require("../index"));
var _sinon = _interopRequireDefault(require("sinon"));
var _ambassadorServices = _interopRequireDefault(require("../services/ambassadorServices"));
var _promoCodeServices = _interopRequireDefault(require("../services/promoCodeServices"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
_chai["default"].use(_chaiHttp["default"]);
(0, _mocha.describe)("AMBASSADORS SIGNUP", function () {
  var prefix = "/ambassadors/signup";
  (0, _mocha.it)("AMBASSADORS should get an error if they try to sign up with incomplete inputs", function (done) {
    _chai["default"].request(_index["default"]).post("".concat(prefix)).send({
      email: 'user@example.com'
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(422);
      done();
    });
  });
  (0, _mocha.it)("should signup AMBASSADORS with complete inputs", function (done) {
    _chai["default"].request(_index["default"]).post("".concat(prefix)).send({
      firstName: "user",
      lastName: "user",
      email: "user1@example.com",
      password: "user@123",
      phoneNumber: "250784556789",
      region: "Rwanda"
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(201);
      (0, _chai.expect)(res.body).to.have.property('message', 'Signed up successfully');
      done();
    });
  });
  (0, _mocha.it)("AMBASSADORS can't signup if the email is already taken", function (done) {
    _chai["default"].request(_index["default"]).post("".concat(prefix)).send({
      firstName: "user",
      lastName: "user",
      email: "user1@example.com",
      password: "user@123",
      phoneNumber: "250784556789",
      region: "Rwanda"
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(403);
      (0, _chai.expect)(res.body).to.have.property("message", "Email already exists");
      done();
    });
  });
  (0, _mocha.it)('return error message if something goes wrong', function (done) {
    var stub = _sinon["default"].stub(_ambassadorServices["default"], 'getAmbassadorByEmail')["throws"]('Something went wrong');
    _chai["default"].request(_index["default"]).post("".concat(prefix)).send({
      firstName: "user",
      lastName: "user",
      email: "user1@example.com",
      password: "user@123",
      phoneNumber: "250784556789",
      region: "Rwanda"
    }).end(function (err, res) {
      stub.restore();
      (0, _chai.expect)(res).to.have.status(500);
      done();
    });
  });
});
(0, _mocha.describe)("AMBASSADORS login", function () {
  var prefix = "/ambassadors/login";
  (0, _mocha.it)("should login AMBASSADORS with complete inputs", function (done) {
    _chai["default"].request(_index["default"]).post("".concat(prefix)).send({
      email: "user2@example.com",
      password: "user@123"
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(res.body).to.have.property('message', 'Logged in successfully!');
      done();
    });
  });
  (0, _mocha.it)("AMBASSADORS can't login if they are not verified yet", function (done) {
    _chai["default"].request(_index["default"]).post("".concat(prefix)).send({
      email: "user3@example.com",
      password: "user@123"
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(400);
      (0, _chai.expect)(res.body).to.have.property("message", "Ambassador not verified yet");
      done();
    });
  });
  (0, _mocha.it)('return error message if something goes wrong', function (done) {
    var stub = _sinon["default"].stub(_ambassadorServices["default"], 'getAmbassadorByEmail')["throws"]('Something went wrong');
    _chai["default"].request(_index["default"]).post("".concat(prefix)).send({
      email: "user3@example.com",
      password: "user@123"
    }).end(function (err, res) {
      stub.restore();
      (0, _chai.expect)(res).to.have.status(500);
      done();
    });
  });
});
(0, _mocha.describe)("ADMIN GET ALL PROMO CODE UTILIZATION", function () {
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
  (0, _mocha.it)('should return 404 if there is not promo code utilization', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var stub, res;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          stub = _sinon["default"].stub(_promoCodeServices["default"], "getAllPromoCodeUtizations").callsFake(function () {
            return [];
          });
          _context2.next = 3;
          return _chai["default"].request(_index["default"]).get('/admin/promo/all').set("Authorization", "Bearer ".concat(adminToken));
        case 3:
          res = _context2.sent;
          stub.restore();
          (0, _chai.expect)(res).to.have.status(404);
          (0, _chai.expect)(res.body).to.have.property('message', 'No promo code utilization found yet');
        case 7:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  (0, _mocha.it)('should return 500 if there is a server error', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var stub, res;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          stub = _sinon["default"].stub(_promoCodeServices["default"], "getAllPromoCodeUtizations")["throws"](new Error('something went wrong'));
          _context3.next = 3;
          return _chai["default"].request(_index["default"]).get('/admin/promo/all').set("Authorization", "Bearer ".concat(adminToken));
        case 3:
          res = _context3.sent;
          stub.restore();
          (0, _chai.expect)(res).to.have.status(500);
        case 6:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
  (0, _mocha.it)('should return promo code utilization', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    var res;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _chai["default"].request(_index["default"]).get('/admin/promo/all').set("Authorization", "Bearer ".concat(adminToken));
        case 2:
          res = _context4.sent;
          (0, _chai.expect)(res).to.have.status(200);
          (0, _chai.expect)(res.body).to.have.property('message', 'all promo code utilization  fetched successfully!');
        case 5:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  })));
});
(0, _mocha.describe)("AMBASSADOR'S PROMO CODE USAGE", function () {
  var token;
  before( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
    var loginRes;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return _chai["default"].request(_index["default"]).post("/ambassadors/login").send({
            email: "ambassador4@example.com",
            password: "user@123"
          });
        case 2:
          loginRes = _context5.sent;
          token = loginRes.body.data;
        case 4:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  })));
  (0, _mocha.it)('should return promo code utilization', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    var res;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return _chai["default"].request(_index["default"]).get('/ambassadors/promocode/utilization').set("Authorization", "Bearer ".concat(token));
        case 2:
          res = _context6.sent;
          (0, _chai.expect)(res).to.have.status(200);
          (0, _chai.expect)(res.body).to.have.property('message', 'all promo code utilization  fetched successfully!');
        case 5:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  })));
  (0, _mocha.it)('should return 404 if there is not promo code utilization', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
    var stub, res;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          stub = _sinon["default"].stub(_promoCodeServices["default"], "getAllPromoCodeUtizationsByAmbassador").callsFake(function () {
            return [];
          });
          _context7.next = 3;
          return _chai["default"].request(_index["default"]).get('/ambassadors/promocode/utilization').set("Authorization", "Bearer ".concat(token));
        case 3:
          res = _context7.sent;
          stub.restore();
          (0, _chai.expect)(res).to.have.status(404);
          (0, _chai.expect)(res.body).to.have.property('message', 'No promo code utilization found yet');
        case 7:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  })));
  (0, _mocha.it)('should return 500 if there is a server error', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
    var stub, res;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          stub = _sinon["default"].stub(_promoCodeServices["default"], "getAllPromoCodeUtizationsByAmbassador")["throws"](new Error('something went wrong'));
          _context8.next = 3;
          return _chai["default"].request(_index["default"]).get('/ambassadors/promocode/utilization').set("Authorization", "Bearer ".concat(token));
        case 3:
          res = _context8.sent;
          stub.restore();
          (0, _chai.expect)(res).to.have.status(500);
        case 6:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  })));
});

//////////////////

(0, _mocha.describe)("AMBASSADOR'S INFO", function () {
  var token;
  before( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
    var loginRes;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return _chai["default"].request(_index["default"]).post("/ambassadors/login").send({
            email: "ambassador4@example.com",
            password: "user@123"
          });
        case 2:
          loginRes = _context9.sent;
          token = loginRes.body.data;
        case 4:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  })));
  (0, _mocha.it)('should return ambassador\'s info', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
    var res;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return _chai["default"].request(_index["default"]).get('/ambassadors/info').set("Authorization", "Bearer ".concat(token));
        case 2:
          res = _context10.sent;
          (0, _chai.expect)(res).to.have.status(200);
          (0, _chai.expect)(res.body).to.have.property('message', 'Ambassadors information fetched successfully!');
        case 5:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  })));
  (0, _mocha.it)('should return 500 if there is a server error', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
    var stub, res;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          stub = _sinon["default"].stub(_promoCodeServices["default"], "getAllPromoCodeUtizationsByAmbassador")["throws"](new Error('something went wrong'));
          _context11.next = 3;
          return _chai["default"].request(_index["default"]).get('/ambassadors/info').set("Authorization", "Bearer ".concat(token));
        case 3:
          res = _context11.sent;
          stub.restore();
          (0, _chai.expect)(res).to.have.status(500);
        case 6:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  })));
});