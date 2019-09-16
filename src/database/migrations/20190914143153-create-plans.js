'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('plans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      hasHd: {
        type: Sequelize.STRING
      },
      hasUltraHd: {
        type: Sequelize.STRING
      },
      numberOfScreens: {
        type: Sequelize.STRING
      },
      monthlyPrice: {
        type: Sequelize.STRING
      },
      yearlyPrice: {
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('plans');
  }
};