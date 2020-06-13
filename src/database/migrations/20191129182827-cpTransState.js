module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('cpTransactions', 'state', {
    type: Sequelize.STRING,
    defaultValue: 'Not Approved'
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('cpTransactions', 'state')
};
