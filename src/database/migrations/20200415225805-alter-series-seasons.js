module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.removeColumn('series', 'season')
    .then(() => queryInterface.addColumn('series', 'season', { type: Sequelize.INTEGER })),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('series', 'season')
    .then(() => queryInterface.addColumn('series', 'season', { type: Sequelize.STRING }))
};
