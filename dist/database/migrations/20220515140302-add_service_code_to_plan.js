"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addColumn("plans", "serviceCode", {
      type: Sequelize.STRING,
      defaultValue: false,
      allowNull: true
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("plans", "serviceCode");
  }
};