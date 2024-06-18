"use strict";

module.exports = function (sequelize, DataTypes) {
  var contentProviders = sequelize.define("contentProviders", {
    name: DataTypes.STRING,
    phoneLine: DataTypes.STRING,
    email: DataTypes.STRING,
    nationality: DataTypes.STRING,
    cityOfResidence: DataTypes.STRING,
    clientId: DataTypes.STRING,
    password: DataTypes.STRING,
    isVerified: DataTypes.STRING
  }, {});
  contentProviders.associate = function (models) {
    // associations can be defined here
  };
  return contentProviders;
};