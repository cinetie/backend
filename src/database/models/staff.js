module.exports = (sequelize, DataTypes) => {
  const Staffs = sequelize.define(
    "Staffs",
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {}
  );
  Staffs.associate = function (models) {
    // associations can be defined here
  };
  return Staffs;
};
