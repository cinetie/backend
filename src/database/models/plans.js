module.exports = (sequelize, DataTypes) => {
  const plans = sequelize.define(
    "plans",
    {
      type: DataTypes.STRING,
      hasHd: DataTypes.BOOLEAN,
      hasUltraHd: DataTypes.BOOLEAN,
      numberOfScreens: DataTypes.STRING,
      monthlyPrice: DataTypes.FLOAT,
      yearlyPrice: DataTypes.FLOAT,
      serviceCode: DataTypes.FLOAT,
      stripeId: DataTypes.STRING,
    },
    {}
  );
  plans.associate = function (models) {
    // associations can be defined here
  };
  return plans;
};
