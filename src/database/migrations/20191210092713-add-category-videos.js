/* eslint-disable no-unused-vars */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('videos', 'category', { type: Sequelize.STRING }),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('videos', 'category')
};
