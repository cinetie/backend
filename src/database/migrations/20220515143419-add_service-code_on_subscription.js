module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("subscriptions", "serviceCode", {
      type: Sequelize.STRING,
      defaultValue: false,
      allowNull: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("subscriptions", "serviceCode");
  },
};
