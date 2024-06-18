"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addColumn("Ambassadors", "ambassadorId", {
      type: Sequelize.STRING,
      defaultValues: ""
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Ambassadors", "ambassadorId");
  }
};