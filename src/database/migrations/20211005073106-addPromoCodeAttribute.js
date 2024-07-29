module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Users", "promoCode", {
      type: Sequelize.STRING,
      defaultValues: null,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Users", "promoCode");
  },
};
