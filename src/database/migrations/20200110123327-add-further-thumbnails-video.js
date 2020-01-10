'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addColumn('videos','tallThumbNailLink',{
			type:Sequelize.STRING,
			null:true
		}).then(()=> queryInterface.addColumn('videos','nameTagThumbNailLink',{
			type:Sequelize.STRING,
			null:true
		}))
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.removeColumn('videos','tallThumbNailLink')
			.then(()=> queryInterface.removeColumn('videos','nameTagThumbNailLink'))
	}
};
