'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    const now =  Date.now();
    return queryInterface.createTable('subscriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      plan: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT
      },
      endDate: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      phoneNumber:{
        type: Sequelize.STRING
    },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('subscriptions');
  }
};