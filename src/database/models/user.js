
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    plan: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN,
    isBilledAnnually: DataTypes.BOOLEAN,
    permissionLevel: DataTypes.INTEGER,
    nationality: DataTypes.STRING,
    cityOfResidence: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    crNumber: DataTypes.STRING,
    crCVC: DataTypes.STRING,
    cardFirstName: DataTypes.STRING,
    cardLastName: DataTypes.STRING,
    expMonth: DataTypes.STRING,
    expYear: DataTypes.STRING

  }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.profiles, {
      foreignKey: 'email',
      as: 'profile'
    });
  };
  return User;
};
