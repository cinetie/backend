module.exports = (sequelize, DataTypes) => {
  const sales = sequelize.define(
    "sales",
    {
      method: DataTypes.STRING,
      transactionId: DataTypes.STRING,
      plan: DataTypes.STRING,
      amount: DataTypes.FLOAT,
      creationTime: DataTypes.BIGINT,
      user: DataTypes.STRING,
      monthYear: DataTypes.STRING,
    },
    {}
  );
  sales.associate = function (models) {
    // associations can be defined here
  };
  return sales;
};
