'use strict';

module.exports = function (sequelize, DataTypes) {
  var PromoCodeUtilization = sequelize.define('PromoCodeUtilization', {
    userEmail: DataTypes.STRING,
    plan: DataTypes.STRING,
    status: DataTypes.STRING,
    ambassadorEmail: DataTypes.STRING
  }, {});
  PromoCodeUtilization.associate = function (models) {
    // associations can be defined here
  };
  return PromoCodeUtilization;
};