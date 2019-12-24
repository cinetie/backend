import earningController from '../controllers/earningControlller'
import subscriptions from '../services/billingServices'
import userServices from '../services/userServices'
import date from '../helpers/date'
import Util from '../helpers/utilities'
const util = new Util()

//middleware for registering earnings/shares based on the amount of videos watched and subscription plan
class earningsMiddleware {
	static async registerEarnings(req, res, next) {
		try {
			const user = await userServices.getUserByMail(req.body.email)
			if(user){
				if (date.isEndOfMonth() == 1) {
					const updates = await subscriptions.updateSubscription(req.body.email,{dueState: true})
					const results = await earningController.assignRateToEachVideo(req.body.email)
					if (results && updates >0){
						next()
						
					}else{
						util.setErrorResponse(res, 'error occured assigning rate here', 500)
					}
				} else {
					console.log('----------hanging-------- register earnings')
					next()
				}
			}else{
				util.setErrorResponse(res, 'incorrect email or password ', 403)
			}
			
		} catch (error) {
			util.setErrorResponse(res, 'error occured assigning rate : ' + error.message, 500)
		}
	}
}
export default earningsMiddleware