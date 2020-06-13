module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('earnings', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    videoId: {
      type: Sequelize.STRING
    },
    clientId: {
      type: Sequelize.STRING
    },
    amount: {
      type: Sequelize.STRING
    },
    monthYear: {
      type: Sequelize.STRING
    },
    state: {
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('earnings')
};
