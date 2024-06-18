"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addColumn("transactions", "transToken", {
      type: Sequelize.STRING,
      defaultValue: false,
      allowNull: true
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("transactions", "transToken");
  }
};