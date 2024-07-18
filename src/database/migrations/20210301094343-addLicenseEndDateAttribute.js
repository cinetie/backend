module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("videos", "licenseEndDate", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("videos", "licenseEndDate");
  },
};
