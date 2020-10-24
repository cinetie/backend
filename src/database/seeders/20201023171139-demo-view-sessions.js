export default {
  up: (queryInterface) => queryInterface.bulkInsert('viewingSessions', [
    {
      id: 0,
      videoId: 'd0fe2561-2164-4eb0-8113-f1a7dd4cfa73',
      clientId: '1999',
      time: '10000',
      sessionState: 'InActive',
      userId: 0,
      location: 'Rwanda',
      ip: '127.0.0.1',
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    {
      id: 1,
      videoId: 'd0fe2561-2164-4eb0-8113-f1a7dd4cfa73',
      clientId: '0',
      time: '10000',
      sessionState: 'Active',
      userId: 0,
      location: 'Rwanda',
      ip: '127.0.0.1',
      updatedAt: new Date(),
      createdAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('viewingSessions', null, {}),
};
