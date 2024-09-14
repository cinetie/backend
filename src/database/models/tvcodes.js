'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TvCodes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    // TvCodes.User = TvCodes.belongsTo(models.User); 
    }
  }
  TvCodes.init({
    email: DataTypes.STRING,
    code: DataTypes.STRING,
    expires: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'TvCodes',
  });
  return TvCodes;
};


