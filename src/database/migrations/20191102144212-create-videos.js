/* eslint-disable no-unused-vars */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('videos', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    videoLink: {
      type: Sequelize.STRING
    },
    videoId: {
      type: Sequelize.STRING
    },
    videoName: {
      type: Sequelize.STRING
    },
    videoCast: {
      type: Sequelize.TEXT
    },
    videoSynopsis: {
      type: Sequelize.TEXT
    },
    videoWatchCount: {
      type: Sequelize.INTEGER
    },
    videoThumbnailLink: {
      type: Sequelize.STRING
    },
    videoIdVimeo: {
      type: Sequelize.STRING
    },
    videoClientId: {
      type: Sequelize.STRING
    },
    rate: {
      type: Sequelize.STRING
    },
    tallThumbNailLink: {
      type: Sequelize.STRING,
      null: true
    },
    nameTagThumbNailLink: {
      type: Sequelize.STRING,
      null: true
    },
    videoSuspensionState: {
      type: Sequelize.BOOLEAN
    },
    featureType: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    isFeatured: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    type: {
      type: Sequelize.STRING,
      defaultValue: 'movie'
    },
    category: {
      type: Sequelize.STRING
    },
    creationTime: {
      type: Sequelize.BIGINT
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('videos')
};
