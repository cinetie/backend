module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("videos", "resCountries", {
      type: Sequelize.STRING,
      defaultValues: "",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("videos", "resCountries");
  },
};
