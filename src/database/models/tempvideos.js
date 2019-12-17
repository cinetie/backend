'use strict'
module.exports = (sequelize, DataTypes) => {
	const tempVideos = sequelize.define('tempVideos', {
		videoName: DataTypes.STRING,
		clientId: DataTypes.STRING,
		videoUri: DataTypes.STRING
	}, {})
	tempVideos.associate = function(models) {
		// associations can be defined here
	}
	return tempVideos
};