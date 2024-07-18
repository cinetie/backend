export default {
  up: (queryInterface) =>
    queryInterface.bulkInsert("viewingSessions", [
      {
        id: 9920420,
        videoId: "d0fe2561-2164-4eb0-8113-f1a7dd4cfa73",
        clientId: "1999",
        time: "10000",
        sessionState: "InActive",
        userId: 0,
        location: "Rwanda",
        ip: "127.0.0.1",
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        id: 82498,
        videoId: "d0fe2561-2164-4eb0-8113-f1a7dd4cfa73",
        clientId: "0",
        time: "10000",
        sessionState: "Active",
        userId: 0,
        location: "Rwanda",
        ip: "127.0.0.1",
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        id: 82499,
        videoId: "b467da83-4f0d-4421-8818-c0f364ca9de1",
        clientId: "1111",
        time: "10000",
        sessionState: "Active",
        userId: "blais19999999978@gmail.com",
        location: "Rwanda",
        ip: "197.243.52.82",
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    ]),
  down: (queryInterface) =>
    queryInterface.bulkDelete("viewingSessions", null, {}),
};
