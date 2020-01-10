'use strict';
module.exports = (sequelize, DataTypes) => {
  const paypalSubscription = sequelize.define('paypalSubscription', {
    date: DataTypes.INTEGER,
    email: DataTypes.STRING,
    aggreementId: DataTypes.STRING,
    state: DataTypes.STRING
  }, {});
  paypalSubscription.associate = function(models) {
    // associations can be defined here
  };
  return paypalSubscription;
};