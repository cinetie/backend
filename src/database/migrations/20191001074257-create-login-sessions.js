module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("loginSessions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATE,
      },
      timeIn: {
        type: Sequelize.STRING,
      },
      timeOut: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
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
  down: (queryInterface, Sequelize) =>
    queryInterface.dropTable("loginSessions"),
};
