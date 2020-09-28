module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('paypalTransactions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    paymentId: {
      type: Sequelize.STRING
    },
    state: {
      type: Sequelize.STRING
    },
    intent: {
      type: Sequelize.STRING
    },
    payerEmail: {
      type: Sequelize.STRING
    },
    payerId: {
      type: Sequelize.STRING
    },
    transAmount: {
      type: Sequelize.STRING
    },
    transCurrency: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.BIGINT,
      allowNull: false
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('paypalTransactions')
};
