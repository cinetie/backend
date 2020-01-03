'use strict';
module.exports = (sequelize, DataTypes) => {
  const trailers = sequelize.define('trailers', {
    videoId: DataTypes.TEXT,
    trailerLink: DataTypes.TEXT
  }, {});
  trailers.associate = function(models) {
    // associations can be defined here
  };
  return trailers;
};