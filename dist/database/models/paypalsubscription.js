"use strict";

module.exports = function (sequelize, DataTypes) {
  var paypalSubscription = sequelize.define("paypalSubscription", {
    date: DataTypes.BIGINT,
    email: DataTypes.STRING,
    aggreementId: DataTypes.STRING,
    state: DataTypes.STRING
  }, {});
  paypalSubscription.associate = function (models) {
    // associations can be defined here
  };
  return paypalSubscription;
};