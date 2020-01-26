'use strict'

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addColumn('series','thumbNailUrl',{
			type: Sequelize.STRING
		})
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.removeColumn('series','thumbNailUrl')
	}
}
