module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('videos', 'type', {
    type: Sequelize.STRING,
    defaultValue: 'movie'
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('videos', 'type')
};
