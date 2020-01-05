'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addColumn('videos','isFeatured',{
			type:Sequelize.BOOLEAN,
			defaultValue: false
		})
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.removeColumn('videos','isFeatured')
	}
};
