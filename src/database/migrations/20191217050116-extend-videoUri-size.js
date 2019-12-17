'use strict'

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.changeColumn('tempVideos','videoUri',{
			type : Sequelize.TEXT,
			allowNull:false,
		})
			.then(()=> queryInterface.changeColumn('videos','videoWatchCount',{
				type: Sequelize.INTEGER,
				allowNull :false,
				defaultValue:0
			}))
	},
}
