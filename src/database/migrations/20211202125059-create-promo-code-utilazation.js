module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PromoCodeUtilizations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userEmail: {
        type: Sequelize.STRING
      },
      ambassadorEmail: {
        type: Sequelize.STRING
      },
      plan: {
        type: Sequelize.STRING
      },
      status: {
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
    return queryInterface.dropTable('PromoCodeUtilizations');
  }
};