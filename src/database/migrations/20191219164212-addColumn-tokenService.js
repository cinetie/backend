module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('tokens', 'desc', { type: Sequelize.STRING }),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('tokens', 'desc')
};
