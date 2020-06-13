module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('plans', {
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
      type: Sequelize.FLOAT
    },
    yearlyPrice: {
      type: Sequelize.FLOAT
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('plans')
};
