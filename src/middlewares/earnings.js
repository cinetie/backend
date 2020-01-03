import earningController from '../controllers/earningControlller'
import subscriptions from '../services/billingServices'
import userServices from '../services/userServices'
import date from '../helpers/date'
import Util from '../helpers/utilities'
import opay from '../helpers/opay'
const util = new Util()

//middleware for registering earnings/shares based on the amount of videos watched and subscription plan
class earningsMiddleware {
	static async registerEarnings(req, res, next) {
		// try {
		const user = await userServices.getUserByMail(req.body.email)
		if (user) {
			if ((date.isEndOfMonth() == 0 && user.isBilledAnnually == false) || (date.isEndOfyear() == 1 && user.isBilledAnnually == true)) {
				const data = await subscriptions.getCurrentSubscription(req.body.email)
				const updates = await subscriptions.updateSubscription(req.body.email, {
					dueState: true
				})
				const results = await earningController.assignRateToEachVideo(req.body.email)
				if (results && updates > 0) {
					const renewal = await subscriptions.registerSubscription(data)
					console.log(JSON.stringify(user))
					if (user) {
						console.log(`opay calling`)
						const opayDetails = await opay.payment({
							phoneNumber: user.phoneNumber,
							price: "100"
						})
						console.log(`opay called`)
						if (renewal && opayDetails) {
							next()
						}

					}
				} else {
					console.log('----------hanging-------- register earnings')
					next()
				}
			} else {

				next()
			}

		} else {
			next()
		}
		// } catch (error) {
		// 	util.setErrorResponse(res, 'error occured assigning rate : ' + error.message, 500)
		// }
	}
}
export default earningsMiddleware