module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("videos", "disabled", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn("videos", "disabled");
  },
};
