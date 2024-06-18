"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable("sales", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      method: {
        type: Sequelize.STRING
      },
      transactionId: {
        type: Sequelize.STRING
      },
      plan: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.FLOAT
      },
      creationTime: {
        type: Sequelize.BIGINT
      },
      user: {
        type: Sequelize.STRING
      },
      monthYear: {
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
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable("sales");
  }
};