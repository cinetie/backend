module.exports = (sequelize, DataTypes) => {
  const Ambassador = sequelize.define(
    "Ambassador",
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      email: DataTypes.STRING,
      region: DataTypes.STRING,
      isVerified: DataTypes.BOOLEAN,
      password: DataTypes.STRING,
      users: DataTypes.INTEGER,
      ambassadorId: DataTypes.STRING,
    },
    {}
  );
  Ambassador.associate = function (models) {
    // associations can be defined here
  };
  return Ambassador;
};
