"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addColumn("plans", "stripeId", {
      type: Sequelize.STRING,
      defaultValues: false
    });
  },
  down: function down(queryInterface) {
    return queryInterface.removeColumn("plans", "stripeId");
  }
};