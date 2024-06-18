"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable("tempVideos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      videoName: {
        type: Sequelize.STRING
      },
      clientId: {
        type: Sequelize.STRING
      },
      videoUri: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      // videoWatchCount: {
      //   type: Sequelize.INTEGER,
      //   allowNull: true,
      //   defaultValue: 0
      // },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable("tempVideos");
  }
};