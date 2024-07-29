module.exports = (sequelize, DataTypes) => {
  const loginSessions = sequelize.define(
    "loginSessions",
    {
      email: DataTypes.STRING,
      date: DataTypes.DATE,
      timeIn: DataTypes.STRING,
      timeOut: DataTypes.STRING,
      state: DataTypes.STRING,
    },
    {}
  );
  loginSessions.associate = function (models) {
    // associations can be defined here
  };
  return loginSessions;
};
