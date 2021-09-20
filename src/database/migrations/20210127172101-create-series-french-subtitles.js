module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("series", "FrSubt", {
      type: Sequelize.STRING,
      defaultValues: "",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("series", "FrSubt");
  },
};
