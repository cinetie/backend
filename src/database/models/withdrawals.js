module.exports = (sequelize, DataTypes) => {
  const Withdrawals = sequelize.define(
    "Withdrawals",
    {
      investorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'investors',
          key: 'id'
        }
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      withdrawReference: {
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

  Withdrawals.associate = function (models) {
    Withdrawals.belongsTo(models.investors, {
      foreignKey: "investorId",
    });
  };


  return Withdrawals;
};

