module.exports = (sequelize, DataTypes) => {
  const Investment = sequelize.define(
    "Investment",
    {
      investorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'investors', // Name of the table
          key: 'id'
        }
      },
      shares: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      marketingFeeIncluded: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      paymentReference: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('pending', 'completed', 'failed', "canceled"),
        allowNull: false
      },
    },
    {}
  );

  Investment.associate = function (models) {
    Investment.belongsTo(models.investors, {
      foreignKey: "investorId",
    });
  };


  return Investment;
};