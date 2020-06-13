module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('subscriptions', 'dueState', {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('subscriptions', 'dueState')
};
