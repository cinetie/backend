'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('paypalSubscriptions','date',{
      type: Sequelize.BIGINT,
      allowNull:false
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('paypalSubscriptions','date')
  }
};
