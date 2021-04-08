"use strict";
module.exports = (sequelize, DataTypes) => {
  const sendMail = sequelize.define(
    "sendMail",
    {
      from: DataTypes.STRING,
      to: DataTypes.STRING,
      subject: DataTypes.STRING,
      messageId: DataTypes.STRING,
      response: DataTypes.STRING,
    },
    {}
  );
  sendMail.associate = function(models) {
    // associations can be defined here
  };
  return sendMail;
};
