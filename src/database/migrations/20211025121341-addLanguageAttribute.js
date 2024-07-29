module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("videos", "language", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("videos", "language");
  },
};
