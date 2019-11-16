'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('contentProviders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      isVerified:{
        type:Sequelize.BOOLEAN
      },
      clientId:{
        type:Sequelize.STRING
      },
      phoneLine: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      nationality: {
        type: Sequelize.STRING
      },
      cityOfResidence: {
        type: Sequelize.STRING
      },
      idLink: {
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
    return queryInterface.dropTable('contentProviders');
  }
};