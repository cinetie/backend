module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('videos', 'isFeatured', {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('videos', 'isFeatured')
};
