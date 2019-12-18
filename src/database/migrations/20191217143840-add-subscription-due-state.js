'use strict'

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addColumn('subscriptions','dueState',{
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: false
		})
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.removeColumn('subscriptions','dueState')
	}
}
