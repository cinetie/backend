module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("videos", "assetId", {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("videos", "assetId");
  },
};

