module.exports = (sequelize, DataTypes) => {
  const viewingSessions = sequelize.define(
    "viewingSessions",
    {
      videoId: DataTypes.STRING,
      clientId: DataTypes.STRING,
      time: DataTypes.STRING,
      sessionState: DataTypes.STRING,
      userId: DataTypes.STRING,
      location: DataTypes.STRING,
      ip: DataTypes.STRING,
    },
    {}
  );
  viewingSessions.associate = function (models) {
    // associations can be defined here
  };
  return viewingSessions;
};
