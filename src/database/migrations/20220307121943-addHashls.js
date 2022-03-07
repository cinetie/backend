module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("videos", "hashls", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("videos", "hashls");
  },
};
