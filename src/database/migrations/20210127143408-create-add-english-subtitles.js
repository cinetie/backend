module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("videos", "EnSubt", {
      type: Sequelize.STRING,
      defaultValues: "",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("videos", "EnSubt");
  },
};
