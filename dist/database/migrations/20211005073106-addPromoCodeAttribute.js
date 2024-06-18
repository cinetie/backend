"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addColumn("Users", "promoCode", {
      type: Sequelize.STRING,
      defaultValues: null
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Users", "promoCode");
  }
};