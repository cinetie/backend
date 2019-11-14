'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn('subscriptions', 'start', {
      type: Sequelize.BIGINT,
      defaultValue: Date.now()
    })
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.removeColumn('subscriptions', 'start')
  }
};