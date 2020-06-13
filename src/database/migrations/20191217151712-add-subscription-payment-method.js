module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('subscriptions', 'paymentMethod', {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('subscriptions', 'paymentMethod')
};
