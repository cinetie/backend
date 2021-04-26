"use strict";
module.exports = (sequelize, DataTypes) => {
  const TemplateMail = sequelize.define(
    "TemplateMail",
    {
      templateName: DataTypes.STRING,
      templateData: DataTypes.JSON,
    },
    {}
  );
  TemplateMail.associate = function(models) {
    // associations can be defined here
  };
  return TemplateMail;
};
