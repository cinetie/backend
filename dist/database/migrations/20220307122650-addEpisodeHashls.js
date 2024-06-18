"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addColumn("series", "hashls", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: true
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("series", "hashls");
  }
};