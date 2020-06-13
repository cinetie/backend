module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('series', 'thumbNailUrl', {
    type: Sequelize.STRING
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('series', 'thumbNailUrl')
};
