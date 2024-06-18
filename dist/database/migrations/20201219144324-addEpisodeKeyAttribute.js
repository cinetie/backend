"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addColumn("series", "episodeKey", {
      type: Sequelize.STRING,
      defaultValues: ""
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("series", "episodeKey");
  }
};