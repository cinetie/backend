module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("series", "EnSubt", {
      type: Sequelize.STRING,
      defaultValues: "",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("series", "EnSubt");
  },
};
