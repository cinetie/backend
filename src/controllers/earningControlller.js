/* eslint-disable no-useless-catch */
import earningService from '../services/earningServices'
import subscriptionService from '../services/billingServices'
import viewSessionService from '../services/viewingSessionsServices'
// IMPORTANT  when pulling earnings make sure to map a new 
//understandable date format not just milliseconds
class earningController {
	//obtains details about the current users subscription
	static async getCurrentSubscriptionDetails(email) {
		const details = await subscriptionService.getCurrentSubscription(email)
		if(details){
			return details
		}else{
			return null
		}
	}
	//obtains details about the current user viewing sessions
	static async getCurrentViewingSessions(email) {
		const details = await viewSessionService.getActiveSessionsPerUser(email)
		if(details){
			return details
		}else{
			return null
		}
	}
	//obtain amount to attribute to each distinct view based on their subscription
	static async calculateRatePerVideo(email) {
		const sessionDetails = await this.getCurrentViewingSessions(email)
		const subscriptionDetails = await this.getCurrentSubscriptionDetails(email)
		const rate = (subscriptionDetails.price)*0.7 / Object.values(sessionDetails).length
		if(rate){
			return rate
		}else{
			return null
		}
	}
	//assign the obtained rate to each video.
	//upon failure of this method maping the numerous elements of session's array and then doing a bulk create
	//would solve the issue.
	static async assignRateToEachVideo(email) {
		try {
			let results = [ ]
			const sessions = await this.getCurrentViewingSessions(email)
			const rate = await this.calculateRatePerVideo(email)
			const date = new Date()
			sessions.forEach(async data => {
				const earnings = {
					videoId: data.videoId,
					clientId: data.clientId,
					amount: rate.toPrecision(4),
					state:'Active',
					monthYear: date.getTime()
				}
				results =  await earningService.createNewEarnings(earnings)
			})
			updates = await subscriptionService.setSubscriptionToSettled(email,{state:"settled"})
			if(results){
				return true
			}else{
				return false
			}

		} catch (error) {
			throw error
		}
	}
}
export default earningController