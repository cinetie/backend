module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('series', 'suspensionState', {
    defaultValue: true,
    type: Sequelize.BOOLEAN
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('series', 'suspensionState')
};
