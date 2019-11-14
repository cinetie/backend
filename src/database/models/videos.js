'use strict';
module.exports = (sequelize, DataTypes) => {
  const videos = sequelize.define('videos', {
    videoLink: DataTypes.STRING,
    videoId: DataTypes.STRING,
    videoName: DataTypes.STRING,
    videoCast: DataTypes.TEXT,
    videoSynopsis: DataTypes.TEXT,
    videoWatchCount: DataTypes.INTEGER,
    videoThumbnailLink: DataTypes.STRING,
    videoIdVimeo: DataTypes.STRING,
    videoClientId: DataTypes.STRING,
    videoSuspensionState: DataTypes.STRING
  }, {});
  videos.associate = function(models) {
    // associations can be defined here
  };
  return videos;
};