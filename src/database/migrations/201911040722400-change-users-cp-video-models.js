/* eslint-disable no-unused-vars */


module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Users', 'nationality', Sequelize.STRING)
    .then(() => queryInterface.addColumn('Users', 'cityOfResidence', Sequelize.STRING))
    .then(() => queryInterface.addColumn('videos', 'videoSuspensionState', Sequelize.BOOLEAN)),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Users', 'nationality')
    .then(() => queryInterface.removeColumn('Users', 'cityOfResidence'))
    .then(() => queryInterface.removeColumn('videos', 'videoSuspensionState'))
};
