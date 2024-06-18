"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateSubscription = exports.getUserSubscriptions = exports.getSubscription = exports.getProduct = exports.getCustomer = exports.createSubscription = exports.createCustomer = exports.cancelSubscription = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _stripe = _interopRequireDefault(require("stripe"));
var stripe = new _stripe["default"](process.env.STRIPE_SECRET_KEY);
var createCustomer = exports.createCustomer = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(email) {
    var customer;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return stripe.customers.create({
            email: email
          });
        case 2:
          customer = _context.sent;
          console.log("INFO: STRIPE: CREATE: ".concat(customer.id));
          return _context.abrupt("return", customer);
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function createCustomer(_x) {
    return _ref.apply(this, arguments);
  };
}();
var getCustomer = exports.getCustomer = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
    var customer;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return stripe.customers.retrieve(id);
        case 2:
          customer = _context2.sent;
          console.log("INFO: STRIPE: GET: ".concat(customer.id));
          return _context2.abrupt("return", customer);
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function getCustomer(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var createSubscription = exports.createSubscription = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(customerId, priceId, useCoupon) {
    var subscription;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return stripe.subscriptions.create({
            customer: customerId,
            items: [{
              price: priceId
            }],
            payment_behavior: "default_incomplete",
            payment_settings: {
              save_default_payment_method: "on_subscription"
            },
            expand: ["latest_invoice.payment_intent"],
            coupon: useCoupon ? process.env.STRIPE_PREMIUM_COUPON : undefined
          });
        case 2:
          subscription = _context3.sent;
          return _context3.abrupt("return", subscription);
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function createSubscription(_x3, _x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();
var getSubscription = exports.getSubscription = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id) {
    var subscription;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return stripe.subscriptions.retrieve(id);
        case 2:
          subscription = _context4.sent;
          return _context4.abrupt("return", subscription);
        case 4:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function getSubscription(_x6) {
    return _ref4.apply(this, arguments);
  };
}();
var getProduct = exports.getProduct = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id) {
    var product;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return stripe.products.retrieve(id);
        case 2:
          product = _context5.sent;
          return _context5.abrupt("return", product);
        case 4:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function getProduct(_x7) {
    return _ref5.apply(this, arguments);
  };
}();
var updateSubscription = exports.updateSubscription = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(id, priceId) {
    var subscription;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return stripe.subscriptions.update(id, {
            items: [{
              price: priceId
            }]
          });
        case 2:
          subscription = _context6.sent;
          return _context6.abrupt("return", subscription);
        case 4:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function updateSubscription(_x8, _x9) {
    return _ref6.apply(this, arguments);
  };
}();
var getUserSubscriptions = exports.getUserSubscriptions = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(customerId) {
    var subscriptions;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return stripe.subscriptions.list({
            customer: customerId
          });
        case 2:
          subscriptions = _context7.sent;
          return _context7.abrupt("return", subscriptions);
        case 4:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function getUserSubscriptions(_x10) {
    return _ref7.apply(this, arguments);
  };
}();
var cancelSubscription = exports.cancelSubscription = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(id) {
    var subscription;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return stripe.subscriptions.del(id);
        case 2:
          subscription = _context8.sent;
          return _context8.abrupt("return", subscription);
        case 4:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function cancelSubscription(_x11) {
    return _ref8.apply(this, arguments);
  };
}();