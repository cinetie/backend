'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.addColumn('series', 'episodeKey', {type: Sequelize.STRING,defaultValues: ''})
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.removeColumn('series', 'episodeKey')
  }
};
