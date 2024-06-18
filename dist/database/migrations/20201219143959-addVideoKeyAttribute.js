"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addColumn("videos", "videoKey", {
      type: Sequelize.STRING,
      defaultValues: ""
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("videos", "videoKey");
  }
};