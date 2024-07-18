module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      plan: {
        type: Sequelize.STRING,
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
      },
      isBilledAnnually: {
        type: Sequelize.BOOLEAN,
      },
      permissionLevel: {
        type: Sequelize.INTEGER,
      },
      nationality: {
        type: Sequelize.STRING,
      },
      cityOfResidence: {
        type: Sequelize.STRING,
      },
      phoneNumber: {
        type: Sequelize.STRING,
      },
      card_nonce: {
        type: Sequelize.STRING,
      },
      card_brand: {
        type: Sequelize.STRING,
      },
      customerId: {
        type: Sequelize.STRING,
      },
      isOnTrial: {
        type: Sequelize.BOOLEAN,
      },
      isOnExtension: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable("Users"),
};
