"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addColumn("series", "assetId", {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: true
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("series", "assetId");
  }
};