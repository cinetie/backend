'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
    return queryInterface.addColumn(
      'subscriptions',
      'phoneNumber',
      Sequelize.STRING
    );
  },

  down: (queryInterface, Sequelize) => {
   
    return queryInterface.removeColumn(
      'subscriptions',
      'phoneNumber'
    );
  }
};