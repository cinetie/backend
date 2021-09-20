module.exports = (sequelize, DataTypes) => {
  const paypalTransactions = sequelize.define(
    "paypalTransactions",
    {
      paymentId: DataTypes.STRING,
      state: DataTypes.STRING,
      intent: DataTypes.STRING,
      payerEmail: DataTypes.STRING,
      payerId: DataTypes.STRING,
      transAmount: DataTypes.STRING,
      transCurrency: DataTypes.STRING,
    },
    {}
  );
  paypalTransactions.associate = function (models) {
    // associations can be defined here
  };
  return paypalTransactions;
};
