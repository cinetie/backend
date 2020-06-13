module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'viewingSessions',
    'location',
    Sequelize.STRING
  )
    .then(() => queryInterface.addColumn('viewingSessions', 'ip', Sequelize.STRING)),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('viewingSessions', 'location')
    .then(() => queryInterface.removeColumn('viewingSessions', 'ip'))
};
