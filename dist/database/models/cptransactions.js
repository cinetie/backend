"use strict";

module.exports = function (sequelize, DataTypes) {
  var cpTransactions = sequelize.define("cpTransactions", {
    clientId: DataTypes.STRING,
    date: DataTypes.BIGINT,
    amount: DataTypes.FLOAT,
    cashableBalance: DataTypes.FLOAT,
    state: DataTypes.STRING
  }, {});
  cpTransactions.associate = function (models) {
    // associations can be defined here
  };
  return cpTransactions;
};