module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("plans", "stripeId", {
      type: Sequelize.STRING,
      defaultValues: false,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn("plans", "stripeId");
  },
};
