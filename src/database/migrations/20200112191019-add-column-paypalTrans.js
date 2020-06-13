module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn('paypalSubscriptions', 'date', {
    type: Sequelize.BIGINT,
    allowNull: false
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('paypalSubscriptions', 'date')
};
