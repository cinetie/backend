'use strict';
module.exports = (sequelize, DataTypes) => {
  const subscriptions = sequelize.define('subscriptions', {
    email: DataTypes.STRING,
    plan: DataTypes.STRING,
    price: DataTypes.FLOAT,
    endDate: DataTypes.STRING,
    state: DataTypes.STRING,
    phoneNumber:DataTypes.STRING
  }, {});
  subscriptions.associate = function(models) {
    // associations can be defined here
  };
  return subscriptions;
};