module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("transactions", "transToken", {
      type: Sequelize.STRING,
      defaultValue: false,
      allowNull: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("transactions", "transToken");
  },
};
