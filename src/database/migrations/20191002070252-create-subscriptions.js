module.exports = {
  up: (queryInterface, Sequelize) => {
    const now = Date.now();
    return queryInterface.createTable("subscriptions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
      },
      plan: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.FLOAT,
      },
      endDate: {
        type: Sequelize.STRING,
      },
      dueState: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      paymentMethod: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      state: {
        type: Sequelize.STRING,
      },
      phoneNumber: {
        type: Sequelize.STRING,
      },
      trialEnds: {
        type: Sequelize.BIGINT,
      },
      start: {
        type: Sequelize.BIGINT,
        defaultValue: Date.now(),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) =>
    queryInterface.dropTable("subscriptions"),
};
