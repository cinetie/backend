'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('videos','type',{
      type: Sequelize.STRING,
      defaultValue:'movie'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('videos','type')
  }
};
