
module.exports = (sequelize, DataTypes) => {
  const earnings = sequelize.define('earnings', {
    videoId: DataTypes.STRING,
    clientId: DataTypes.STRING,
    amount: DataTypes.STRING,
    monthYear: DataTypes.STRING,
    state: DataTypes.STRING
  }, {});
  earnings.associate = function (models) {
    // associations can be defined here
  };
  return earnings;
};
