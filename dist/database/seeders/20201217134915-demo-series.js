"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = exports["default"] = {
  up: function up(queryInterface) {
    return queryInterface.bulkInsert("series", [{
      id: 100,
      episode: "14acd40f-54e6-4d41fg-88a1-2efbdf49dfgcac59.mp4",
      season: "1",
      episodeNumber: 2,
      synopsis: "episode",
      videoId: "b467da83-4f0d-4421-7765-c0f364ca93ws",
      episodeName: "episode 2",
      clientId: "67b6c3a8-884f-48af-8e8f-1a60b15824de",
      suspensionState: true,
      thumbNailUrl: "6bbdb89d-2455-4440-b9ea-7ba412f9c914.png",
      updatedAt: new Date(),
      createdAt: new Date()
    }, {
      id: 101,
      episode: "14acd40f-54e6-4d41fg-88a1-2efbdf49dfgcac59.mp4",
      season: "1",
      episodeNumber: 20,
      synopsis: "episode",
      videoId: "b467da83-4f0d-4421-7765-c0f364ca93ws",
      episodeName: "episode 2",
      clientId: "67b6c3a8-884f-48af-8e8f-1a60b15824de",
      suspensionState: true,
      thumbNailUrl: "6bbdb89d-2455-4440-b9ea-7ba412f9c914.png",
      updatedAt: new Date(),
      createdAt: new Date()
    }]);
  },
  down: function down(queryInterface) {
    return queryInterface.bulkDelete("series", null, {});
  }
};