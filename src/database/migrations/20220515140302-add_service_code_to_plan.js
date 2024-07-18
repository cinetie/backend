module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("plans", "serviceCode", {
      type: Sequelize.STRING,
      defaultValue: false,
      allowNull: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("plans", "serviceCode");
  },
};
