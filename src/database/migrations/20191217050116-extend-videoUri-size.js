module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn('tempVideos', 'videoUri', {
    type: Sequelize.TEXT,
    allowNull: false,
  })
    .then(() => queryInterface.changeColumn('videos', 'videoWatchCount', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
    })),
  down: (queryInterface, Sequelize) => queryInterface.removeColumn('tempVideos', 'videoUri')
};
