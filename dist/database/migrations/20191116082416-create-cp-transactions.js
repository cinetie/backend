"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable("cpTransactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clientId: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.BIGINT,
        defaultValue: new Date().getTime()
      },
      amount: {
        type: Sequelize.FLOAT
      },
      cashableBalance: {
        type: Sequelize.FLOAT
      },
      state: {
        type: Sequelize.STRING,
        defaultValue: "Not Approved"
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
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable("cpTransactions");
  }
};