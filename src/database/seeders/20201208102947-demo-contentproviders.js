export default {
  up: (queryInterface) => queryInterface.bulkInsert('contentProviders', [
    {
      clientId: '31978540-8bdf-41cc-81d7-26200b847c0a',
      name: 'user first',
      email: 'user1@example.com',
      password: '$2a$10$JUCGXOZMZUDUHXqRpbdoVuQ.0RuEEV26NKwnZUQJ2K1tE4FwW.nE.',
      nationality: 'Rwandan',
      cityOfResidence: 'Muhima',
      isVerified: true,
      phoneLine: '+240799887212',
      idLink: null,
      updatedAt: new Date(),
      createdAt: new Date(),
    },

  ]),
  down: (queryInterface) => queryInterface.bulkDelete('contentProviders', null, {}),
};