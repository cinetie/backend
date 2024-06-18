"use strict";

module.exports = function (sequelize, DataTypes) {
  var token = sequelize.define("token", {
    email: DataTypes.STRING,
    token: DataTypes.STRING,
    desc: DataTypes.STRING
  }, {});
  token.associate = function (models) {
    // associations can be defined here
  };
  return token;
};