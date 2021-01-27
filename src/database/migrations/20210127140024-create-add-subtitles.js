'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.addColumn('videos', 'FrSubt',  { type: Sequelize.STRING, defaultValues: '' })
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.removeColumn('videos', 'FrSubt')
  }
};
