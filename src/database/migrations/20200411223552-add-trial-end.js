module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('subscriptions', 'trialEnds', Sequelize.BIGINT)
    .then(() => queryInterface.addColumn('Users', 'isOnTrial', Sequelize.BOOLEAN))
    .then(() => queryInterface.removeColumn('Users', 'crNumber')),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('subscriptions', 'trialEnds')
    .then(() => queryInterface.removeColumn('Users', 'isOnTrial'))
};
