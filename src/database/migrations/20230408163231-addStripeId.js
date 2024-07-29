module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Users", "stripeId", {
      type: Sequelize.STRING,
      defaultValues: false,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn("Users", "stripeId");
  },
};
