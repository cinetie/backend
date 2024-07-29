export default {
  up: (queryInterface) =>
    queryInterface.bulkInsert("WatchedVideos", [
      {
        id: 100,
        videoId: "101",
        userId: "202457",
        watchedTime: 70,
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        id: 1022,
        videoId: "100",
        userId: "202457",
        watchedTime: 35,
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    ]),
  down: (queryInterface) =>
    queryInterface.bulkDelete("WatchedVideos", null, {}),
};
