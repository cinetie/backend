module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Ambassadors", "ambassadorId", {
      type: Sequelize.STRING,
      defaultValues: "",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Ambassadors", "ambassadorId");
  },
};
