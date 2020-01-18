'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('earnings','monthYear',{
      type:Sequelize.BIGINT
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('earnings','monthYear')
  }
};
