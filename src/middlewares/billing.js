/* eslint-disable no-useless-catch */
/* eslint-disable quotes */
import billingService from '../services/billingServices'
import Util from '../helpers/utilities'
import paypalHelper from '../helpers/paypal'
import opay from '../helpers/opay'

//opay@123
const util = new Util()

//middlware to perfom actual payment and registering transactions
class billing {
	static async fetchCurrentSubscription(req, res) {
		try {
			const details = await billingService.getCurrentSubscription(req.body.email)
			return details
		} catch (error) {
			util.setErrorResponse(res, error, 500)
		}
	}

	static async payment(req, res, next) {
		try {
			const user = req.body
			const details = await billing.fetchCurrentSubscription(req, res)
			if (Number(details.paymentMethod) == 1) {
				const status = await opay.payment(details);
				(status === 1) ? next(): util.setErrorResponse(res, 'payment unsuccessfull', 522)
			} else if (Number(details.paymentMethod) == 2) {
				let frequency = 0
				if(user.isBilledAnnually == true){
					frequency = "YEAR"
				}else{
					frequency = "MONTH"
				}
				const data = {
					"plan": user.plan,
					"price": details.price,
					"frequency":frequency,
					"currency": "USD",
					"total": details.price,
					"urls": {
						"success": process.env.PAYPAL_SUCCESS,
						"failOrCancel": process.env.PAYPAL_FAIL_CANCEL
					}
				}
				console.log('----------hanging-------- payment')
				// await paypalHelper.createPayment(req,res,data)
				await paypalHelper.subscription(req, res,data)
				// await paypalHelper.createBillingPlanAndAggreement(data)
			}

		} catch (error) {
			util.setErrorResponse(res, error.message, 500)
		}
	}

}

export default billing