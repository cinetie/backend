module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("series", "assetId", {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("series", "assetId");
  },
};
