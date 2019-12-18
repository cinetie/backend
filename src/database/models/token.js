'use strict'
module.exports = (sequelize, DataTypes) => {
	const token = sequelize.define('token', {
		email: DataTypes.STRING,
		token: DataTypes.STRING
	}, {})
	token.associate = function(models) {
		// associations can be defined here
	}
	return token
}