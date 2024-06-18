"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addColumn("videos", "hashls", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: true
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("videos", "hashls");
  }
};