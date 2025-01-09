module.exports = (sequelize, DataTypes) => {
  const Investor = sequelize.define(
    "investors",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      referrerCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {}
  );

  Investor.associate = function (models) {
    Investor.hasMany(models.Investment, {
      foreignKey: "investorId",
      as: "investments",
    });
  };
  return Investor;
};