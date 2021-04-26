'use strict';
module.exports = (sequelize, DataTypes) => {
  const WatchedVideo = sequelize.define('WatchedVideo', {
    videoId: DataTypes.STRING,
    userId: DataTypes.STRING,
    type: DataTypes.STRING,
    watchedTime: DataTypes.INTEGER
  }, {});
  WatchedVideo.associate = function(models) {
    // associations can be defined here
  };
  return WatchedVideo;
};
