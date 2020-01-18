/* eslint-disable no-useless-catch */
import earningService from '../services/earningServices'
import subscriptionService from '../services/billingServices'
import viewSessionService from '../services/viewingSessionsServices'
import response from '../helpers/response'
import jwt from '../helpers/jwt'
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
		const rate = (Number(subscriptionDetails.price)*0.7) / Object.values(sessionDetails).length
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
			let updatedSessions = []
			const sessions = await this.getCurrentViewingSessions(email)
			const rate = await this.calculateRatePerVideo(email)
			const date = new Date()
			sessions.forEach(async data=> {
				const updates = {sessionState:'inActive'}
				updatedSessions = await viewSessionService.updateViewingSessions(data.id,updates)
			})
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
			// const updates = await subscriptionService.setSubscriptionToSettled(email,{state:"settled"})
			if(results){
				return true
			}else{
				return false
			}

		} catch (error) {
			throw error
		}
	}
	//get earnings per video
	static async getAllEarningsPerVideo(req,res){
		try {
			let sum  = 0
			const data = await earningService.getEarningsByVideo(req.query.videoId)
			if(Object.values(data).length >0){
				for(let i=0; i<=Object.values.length ; i ++){
					sum += Number(data[i].amount)
				}
				return response.successResponse(res,200,'Earnings found ',sum)
			}else{
				return response.errorResponse(res,404,'can not find earnings at this time','NotFoundError')
			}
		} catch (error) {
			return response.errorResponse(res,500,'Something happened','Server Error')
		}
	}
	static async getActiveEarningsPerVideo(req,res){
		try {
			let sum  = 0
			const data = await earningService.getActiveEarningsByVideo(req.query.videoId)
			if(Object.values(data).length >0){
				for(let i=0; i<=Object.values.length ; i ++){
					sum += Number(data[i].amount)
				}
				return response.successResponse(res,200,'Earnings found ',sum)
			}else{
				return response.errorResponse(res,404,'can not find earnings at this time','NotFoundError')
			}
		} catch (error) {
			return response.errorResponse(res,500,'Something happened',error.message)
		}
	}
	static async getActiveEarningsPerClient(req,res){
		try {
			let sum  = 0
			const { clientId } = jwt.jwtVerify(req.headers.authorization.slice(7),process.env.SECRET)
			const data = await earningService.getActiveEarningsByClientId(clientId)
			if(Object.values(data).length >0){
				for(let i=0; i<=Object.values.length ; i ++){
					sum += Number(data[i].amount)
				}
				return response.successResponse(res,200,'Earnings found ',sum)
			}else{
				return response.errorResponse(res,404,'can not find earnings at this time','NotFoundError')
			}
		} catch (error) {
			return response.errorResponse(res,500,'Something happened',error.message)
		}
	}
	static async getEarningsPerClient(req,res){
		try {
			let sum  = 0
			const { clientId } = jwt.jwtVerify(req.headers.authorization.slice(7),process.env.SECRET)
			const data = await earningService.getEarningsByClientId(clientId)
			if(Object.values(data).length >0){
				for(let i=0; i<=Object.values.length ; i ++){
					sum += Number(data[i].amount)
				}
				return response.successResponse(res,200,'Earnings found ',sum)
			}else{
				return response.errorResponse(res,404,'can not find earnings at this time','NotFoundError')
			}
		} catch (error) {
			return response.errorResponse(res,500,'Something happened',error.message)
		}
	}
}
export default earningController