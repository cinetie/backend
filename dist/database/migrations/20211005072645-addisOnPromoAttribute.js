"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addColumn("Users", "isOnPromo", {
      type: Sequelize.BOOLEAN,
      defaultValues: false
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Users", "isOnPromo");
  }
};