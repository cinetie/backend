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
		try {
			const user = await userServices.getUserByMail(req.body.email)
			const data = await subscriptions.getCurrentSubscription(req.body.email)
			console.log(JSON.stringify(data))
			if (user) {
				if ((date.isEndOfMonth() == 0 && user.isBilledAnnually == false) || (date.isEndOfyear() == 1 && user.isBilledAnnually == true)) {

					const updates = await subscriptions.updateSubscription(req.body.email, {
						dueState: true
					})
					const results = await earningController.assignRateToEachVideo(req.body.email)
					if (results && updates > 0) {
						const renewal = await subscriptions.registerSubscription(data)
						if (user) {
							console.log(`opay calling`)
							console.log(JSON.stringify(data))
							const opayDetails = await opay.payment({
							// eslint-disable-next-line quotes
								phoneNumber: user.phoneNumber.toString(),
								price: data.price.toString()
							})
							console.log(JSON.stringify(opayDetails))
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
		} catch (error) {
			util.setErrorResponse(res, 'error occured assigning rate : ' + error.message, 500)
		}
	}
}
export default earningsMiddleware