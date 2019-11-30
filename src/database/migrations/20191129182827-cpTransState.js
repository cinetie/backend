'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('cpTransactions','state',{
      type: Sequelize.STRING,
      defaultValue: "Not Approved"
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('cpTransactions','state')
  }
};
