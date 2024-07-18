module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Users", "isOnPromo", {
      type: Sequelize.BOOLEAN,
      defaultValues: false,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Users", "isOnPromo");
  },
};
