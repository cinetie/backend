/* eslint-disable no-unused-vars */
'use strict'

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addColumn('videos','creationTime',{
			type: Sequelize.BIGINT
		})
			.then(() => queryInterface.addColumn('videos','category',{ type: Sequelize.BIGINT }))
		
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.removeColumn('videos','creationTime')
		
			.then(() => queryInterface.removeColumn('videos','category'))
	}
}
