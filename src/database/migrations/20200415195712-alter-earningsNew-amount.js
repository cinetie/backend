module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.removeColumn('earnings', 'monthYear')
    .then(() => queryInterface.addColumn('earnings', 'monthYear', { type: Sequelize.BIGINT }))
    .then(() => queryInterface.removeColumn('earnings', 'amount'))
    .then(() => queryInterface.addColumn('earnings', 'amount', { type: Sequelize.FLOAT })),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('earnings', 'monthYear')
    .then(() => queryInterface.addColumn('earnings', 'monthYear', { type: Sequelize.STRING }))
    .then(() => queryInterface.removeColumn('earnings', 'amount'))

};
