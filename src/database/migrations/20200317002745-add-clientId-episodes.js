'use_strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('series', 'clientId',
    {
      type: Sequelize.STRING,
      allowNull: false
    }),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('series', 'clientId')
};
