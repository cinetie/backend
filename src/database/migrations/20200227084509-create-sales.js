module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('sales', {
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
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('sales')
};
