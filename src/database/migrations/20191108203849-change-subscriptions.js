module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('subscriptions', 'start', {
    type: Sequelize.BIGINT,
    defaultValue: Date.now()
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('subscriptions', 'start')
};
