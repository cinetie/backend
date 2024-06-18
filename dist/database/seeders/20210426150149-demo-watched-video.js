"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = exports["default"] = {
  up: function up(queryInterface) {
    return queryInterface.bulkInsert("WatchedVideos", [{
      id: 100,
      videoId: "101",
      userId: "202457",
      watchedTime: 70,
      updatedAt: new Date(),
      createdAt: new Date()
    }, {
      id: 1022,
      videoId: "100",
      userId: "202457",
      watchedTime: 35,
      updatedAt: new Date(),
      createdAt: new Date()
    }]);
  },
  down: function down(queryInterface) {
    return queryInterface.bulkDelete("WatchedVideos", null, {});
  }
};