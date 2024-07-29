module.exports = (sequelize, DataTypes) => {
  const transactions = sequelize.define(
    "transactions",
    {
      email: DataTypes.STRING,
      statusDesc: DataTypes.STRING,
      spTransactionId: DataTypes.STRING,
      walletTransactionId: DataTypes.STRING,
      chargedCommission: DataTypes.FLOAT,
      currency: DataTypes.STRING,
      paidAmount: DataTypes.STRING,
      transactionId: DataTypes.STRING,
      transToken: DataTypes.STRING,
    },
    {}
  );
  transactions.associate = function (models) {
    // associations can be defined here
  };
  return transactions;
};
