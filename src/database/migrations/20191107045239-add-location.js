'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn(
        'viewingSessions',
        'location',
        Sequelize.STRING
      )
      .then(() => {
        return queryInterface.addColumn('viewingSessions', 'ip', Sequelize.STRING)
      })
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.removeColumn('viewingSessions', 'location')
      .then(() => {
        return queryInterface.removeColumn('viewingSessions', 'ip')
      })
  }
};