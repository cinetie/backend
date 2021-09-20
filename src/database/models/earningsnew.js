module.exports = (sequelize, DataTypes) => {
  const earningsNew = sequelize.define(
    "earningsNew",
    {
      videoId: DataTypes.STRING,
      clientId: DataTypes.STRING,
      amount: DataTypes.FLOAT,
      monthYear: DataTypes.STRING,
      state: DataTypes.STRING,
    },
    {}
  );
  earningsNew.associate = function (models) {
    // associations can be defined here
  };
  return earningsNew;
};
