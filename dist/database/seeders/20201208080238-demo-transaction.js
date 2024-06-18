"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = exports["default"] = {
  up: function up(queryInterface) {
    return queryInterface.bulkInsert("transactions", [{
      id: 10,
      email: "blaise127@gmail.com",
      statusDesc: "pending",
      spTransactionId: null,
      walletTransactionId: null,
      chargedCommission: null,
      currency: "USD",
      paidAmount: 3,
      transactionId: "1115a95e-973d-4abe-9b80-bde4acf74610",
      updatedAt: new Date(),
      createdAt: new Date()
    }, {
      id: 11,
      email: "blaise1269910@gmail.com",
      statusDesc: "pending",
      spTransactionId: null,
      walletTransactionId: null,
      chargedCommission: null,
      currency: "USD",
      paidAmount: 3,
      transactionId: "1115a95e-973d-4abe-9b80-bde4acf74619",
      updatedAt: new Date(),
      createdAt: new Date()
    }, {
      id: 12,
      email: "blaise1@gmail.com",
      statusDesc: "approved",
      spTransactionId: null,
      walletTransactionId: null,
      chargedCommission: null,
      currency: "USD",
      paidAmount: 3,
      transactionId: "1115a95e-973d-4abe-9b80-bde4acf74619",
      updatedAt: new Date(),
      createdAt: new Date()
    }]);
  },
  down: function down(queryInterface) {
    return queryInterface.bulkDelete("transactions", null, {});
  }
};