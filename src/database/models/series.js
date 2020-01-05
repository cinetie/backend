'use strict';
module.exports = (sequelize, DataTypes) => {
  const series = sequelize.define('series', {
    episode: DataTypes.STRING,
    season: DataTypes.STRING,
    episodeName: DataTypes.STRING,
    videoId: DataTypes.STRING
  }, {});
  series.associate = function(models) {
    // associations can be defined here
  };
  return series;
};