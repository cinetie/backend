"use strict";

module.exports = function (sequelize, DataTypes) {
  var Staffs = sequelize.define("Staffs", {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {});
  Staffs.associate = function (models) {
    // associations can be defined here
  };
  return Staffs;
};