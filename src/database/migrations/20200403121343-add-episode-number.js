'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('series', 'episodeNumber', { defaultValue: 0, type: Sequelize.INTEGER }),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('series', 'episodeNumber')
};
