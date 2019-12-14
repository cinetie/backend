/* eslint-disable no-unused-vars */
'use strict'

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addColumn('videos','category',{ type: Sequelize.STRING })
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.removeColumn('videos','category')
	}
}
