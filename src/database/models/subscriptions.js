module.exports = (sequelize, DataTypes) => {
  const subscriptions = sequelize.define(
    "subscriptions",
    {
      email: DataTypes.STRING,
      plan: DataTypes.STRING,
      price: DataTypes.FLOAT,
      endDate: DataTypes.STRING,
      dueState: DataTypes.BOOLEAN,
      paymentMethod: DataTypes.INTEGER,
      state: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      trialEnds: DataTypes.BIGINT,
      serviceCode: DataTypes.FLOAT,
    },
    {}
  );
  subscriptions.associate = function (models) {
    // associations can be defined here
  };
  return subscriptions;
};
