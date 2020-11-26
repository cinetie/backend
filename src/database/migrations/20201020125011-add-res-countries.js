module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('videos', 'resCountries', { type: Sequelize.STRING, defaultValues: '' }),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('videos', 'resCountries')
};
