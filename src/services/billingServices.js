/* eslint-disable no-useless-catch */
import database from '../database/models'
import sequelize from 'sequelize'
const op = sequelize.Op
//services for implementing the billing service

class billingServices {

	static async registerSubscription(newSubscription) {
		// eslint-disable-next-line no-useless-catch
		try {
			const added = await database.subscriptions.create(newSubscription)
			if (added) {
				return added
			} else {
				return null
			}
		} catch (error) {
			throw error
		}
	}
	static async getEndingSubscription(email) {
		try {
			const date = new Date()
			const currentSubs = await database.subscriptions.findOne({
				where: {
					[op.and]: [{
						email: email
					},
					{
						state: 'current'
					},
					{
						endDate: date.toDateString().toString()
					}
					]
				}
			})
			if (currentSubs) {
				return currentSubs
			} else {
				return null
			}
		} catch (error) {
			throw error
		}
	}
	static async getCurrentSubscription(email) {

		try {

			const currentSubs = await database.subscriptions.findOne({
				where: {
					[op.and]: [{
						email: email
					},
					{
						state: 'current'
					},

					]
				}
			})
			if (currentSubs) {
				return currentSubs
			} else {
				return null
			}
		} catch (error) {
			throw error
		}

	}
	static async getMonthlySubscribers(start, end) {
		//gte start and lte end in  milliseconds
		try {
			const data = await database.subscriptions.findAll({
				where: {
					[op.and]: [{
						start: {
							[op.gte]: start
						}

					},
					{
						start: {
							[op.lte]: end
						}
					}

					]
				}
			})
			if (data) {
				return data
			} else {
				return null
			}
		} catch (error) {
			throw error
		}
	}
	static async updateSubscription(email, updated) {
		try {
			const status = await database.subscriptions.update(updated, {
				where: { email }
			})
			if (status) {
				return status
			} else {
				return null
			}
		} catch (error) {
			throw error 
		}
	}
	static async setSubscriptionToSettled(email, updated) {
		try {
			const status = await database.subscriptions.update(updated, {
				where: {
					[op.and]:[
						{email},
						{state:'current'}
					]
				}
			})
			if (status) {
				return status
			} else {
				return null
			}
		} catch (error) {
			throw error 
		}
	}
}
export default billingServices