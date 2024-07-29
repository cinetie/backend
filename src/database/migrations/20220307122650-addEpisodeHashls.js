module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("series", "hashls", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("series", "hashls");
  },
};
