module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('transactions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    email: {
      type: Sequelize.STRING
    },
    statusDesc: {
      type: Sequelize.STRING
    },
    spTransactionId: {
      type: Sequelize.STRING
    },
    walletTransactionId: {
      type: Sequelize.STRING
    },
    chargedCommission: {
      type: Sequelize.FLOAT
    },
    currency: {
      type: Sequelize.STRING
    },
    paidAmount: {
      type: Sequelize.STRING
    },
    transactionId: {
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('transactions')
};
