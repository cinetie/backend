"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable("viewingSessions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      videoId: {
        type: Sequelize.STRING
      },
      clientId: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.STRING
      },
      sessionState: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      ip: {
        type: Sequelize.STRING
      },
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
  // eslint-disable-next-line no-unused-vars
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable("viewingSessions");
  }
};