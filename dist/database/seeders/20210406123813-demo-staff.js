"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = exports["default"] = {
  up: function up(queryInterface) {
    return queryInterface.bulkInsert("Staffs", [{
      id: 500,
      email: "staff@example.com",
      role: "admin",
      password: "$2b$10$z8KWe2xbLDM.pIsswGUhY.myyXumHMO1pTw3JutMiLq9deOZpZIH6",
      updatedAt: new Date(),
      createdAt: new Date()
    }, {
      id: 501,
      email: "staff1@example.com",
      role: "admin",
      password: "$2b$10$z8KWe2xbLDM.pIsswGUhY.myyXumHMO1pTw3JutMiLq9deOZpZIH6",
      updatedAt: new Date(),
      createdAt: new Date()
    }, {
      id: 502,
      email: "staff2@example.com",
      role: "admin",
      password: "$2b$10$z8KWe2xbLDM.pIsswGUhY.myyXumHMO1pTw3JutMiLq9deOZpZIH6",
      updatedAt: new Date(),
      createdAt: new Date()
    }, {
      id: 503,
      email: "staff3@example.com",
      role: "admin",
      password: "$2b$10$z8KWe2xbLDM.pIsswGUhY.myyXumHMO1pTw3JutMiLq9deOZpZIH6",
      updatedAt: new Date(),
      createdAt: new Date()
    }, {
      id: 504,
      email: "staff4@example.com",
      role: "admin",
      password: "$2b$10$z8KWe2xbLDM.pIsswGUhY.myyXumHMO1pTw3JutMiLq9deOZpZIH6",
      updatedAt: new Date(),
      createdAt: new Date()
    }, {
      id: 505,
      email: "staff4000@example.com",
      role: "admin",
      password: "$2b$10$XCCEIBq8tdcefxoHvzUwne7HDH6WAuI.ACv7UeBWUGaCOAiMOApae",
      updatedAt: new Date(),
      createdAt: new Date()
    }]);
  },
  down: function down(queryInterface) {
    return queryInterface.bulkDelete("Staffs", null, {});
  }
};