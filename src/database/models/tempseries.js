'use strict'
module.exports = (sequelize, DataTypes) => {
	const tempSeries = sequelize.define('tempSeries', {
		videoId: DataTypes.STRING,
		uri: DataTypes.STRING,
		size: DataTypes.INTEGER
	}, {})
	tempSeries.associate = function(models) {
		// associations can be defined here
	}
	return tempSeries
};