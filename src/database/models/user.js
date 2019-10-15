'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    plan: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN,
    isBilledAnnually:DataTypes.BOOLEAN,
    permissionLevel:DataTypes.INTEGER,
    phoneNumber:DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.profiles,{
      foreignKey:'email',
      as:'profile'
    });
  };
  return User;
};