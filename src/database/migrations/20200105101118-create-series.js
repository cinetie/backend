module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("series", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      episode: {
        type: Sequelize.STRING,
      },
      season: {
        type: Sequelize.INTEGER,
      },
      episodeName: {
        type: Sequelize.STRING,
      },
      episodeNumber: {
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      videoId: {
        type: Sequelize.STRING,
      },
      clientId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      synopsis: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      thumbNailUrl: {
        type: Sequelize.STRING,
      },
      suspensionState: {
        defaultValue: true,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable("series"),
};
