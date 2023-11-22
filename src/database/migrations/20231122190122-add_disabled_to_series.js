module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("series", "disabled", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn("series", "disabled");
  },
};
