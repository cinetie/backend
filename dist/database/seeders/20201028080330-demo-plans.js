"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = exports["default"] = {
  up: function up(queryInterface) {
    return queryInterface.bulkInsert("plans", [{
      id: 245,
      type: "Promo",
      hasHd: true,
      hasUltraHd: true,
      numberOfScreens: 3,
      monthlyPrice: 3,
      serviceCode: "5525",
      yearlyPrice: 12,
      updatedAt: new Date(),
      createdAt: new Date()
    }, {
      id: 246,
      type: "setup",
      hasHd: true,
      hasUltraHd: true,
      numberOfScreens: 5,
      monthlyPrice: 5,
      serviceCode: "3854",
      yearlyPrice: 60,
      updatedAt: new Date(),
      createdAt: new Date()
    }, {
      id: 247,
      type: "Standard",
      hasHd: true,
      hasUltraHd: true,
      numberOfScreens: 10,
      monthlyPrice: 10,
      serviceCode: "3854",
      yearlyPrice: 120,
      updatedAt: new Date(),
      createdAt: new Date()
    }, {
      id: 248,
      type: "Premium",
      hasHd: true,
      hasUltraHd: true,
      numberOfScreens: 12,
      monthlyPrice: 12,
      serviceCode: "3854",
      yearlyPrice: 145,
      updatedAt: new Date(),
      createdAt: new Date()
    }, {
      id: 249,
      type: "Premium_discount",
      hasHd: true,
      hasUltraHd: true,
      numberOfScreens: 15,
      monthlyPrice: 15,
      serviceCode: "3854",
      yearlyPrice: 180,
      updatedAt: new Date(),
      createdAt: new Date()
    }]);
  },
  down: function down(queryInterface) {
    return queryInterface.bulkDelete("plans", null, {});
  }
};