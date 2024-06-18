"use strict";

module.exports = function (sequelize, DataTypes) {
  var profiles = sequelize.define("profiles", {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  profiles.associate = function (models) {
    // associations can be defined here
  };
  return profiles;
};