'use strict'

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addColumn('tokens','desc',{type: Sequelize.STRING})
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.removeColumn('tokens','desc')
	}
}
