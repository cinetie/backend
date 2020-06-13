module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('series', 'synopsis', {
    type: Sequelize.TEXT,
    allowNull: true
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('series', 'synopsis')
};
