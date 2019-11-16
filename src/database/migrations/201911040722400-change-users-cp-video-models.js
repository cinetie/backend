'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn('Users', 'nationality', Sequelize.STRING)
      .then(() => {
        return queryInterface.addColumn('Users', 'cityOfResidence', Sequelize.STRING)
      })
      .then(() => {
        return queryInterface.addColumn('videos', 'videoSuspensionState', Sequelize.BOOLEAN)
      })
     
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'nationality')
      .then(() => {
        return queryInterface.removeColumn('Users', 'cityOfResidence')
      })
      .then(() => {
        return queryInterface.removeColumn('videos', 'videoSuspensionState')
      })
     
  }
};