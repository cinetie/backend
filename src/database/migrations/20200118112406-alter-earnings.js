'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('earnings','monthYear')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('earnings','monthYear',{
      type: Sequelize.STRING
    })
  }
};
