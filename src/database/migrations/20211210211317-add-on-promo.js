"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("plans", "onPromo", {
      type: Sequelize.STRING,
      defaultValues: "null",
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn("plans", "onPromo");
  },
};
