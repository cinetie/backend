module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('videos', 'featureType', {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('videos', 'featureType')
};
