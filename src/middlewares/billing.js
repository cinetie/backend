import billingService from '../services/billingServices'
import userService from '../services/userServices'
import planService from '../services/planServices'
import Util from '../helpers/utilities'
import date from '../helpers/date'
import opay  from '../helpers/opay'
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
			const user = await userService.getUserByMail(req.body.email)
			const details = await billing.fetchCurrentSubscription(req, res)
			if(Number(details.paymentMethod) == 1){
				const status = await opay.payment(details);
				(status === 1) ? next() : util.setErrorResponse(res,'payment unsuccessfull',522)
			}else if(user.paymentMethod == 2){
				this.paypal()
			}
		} catch (error) {
			util.setErrorResponse(res, error.message, 500)
		}
	}
	static async registerSubscription(req, res, next) {
		try {

			let data = {}
			const plan = await planService.getParticalPlan(req.body.plan);
			(req.body.isBilledAnnually) ? data.price = plan.yearlyPrice: data.price = plan.monthlyPrice
			data.email = req.body.email
			data.plan = req.body.plan
			data.state = 'current'
			data.phoneNumber = req.body.phoneNumber
			if(req.body.isBilledAnnually === true ){
				data.endDate = date.addMoreDays(365).toDateString()
			}else{
				data.endDate = date.addMoreDays(31).toDateString()
			}
			data.paymentMethod = req.body.paymentMethod
			const checkUser = await userService.getUserByMail(req.body.email)
			if(checkUser){
				util.setErrorResponse(res,'User already exist',422)
			}else{
				const bill = await billingService.registerSubscription(data);
				(!bill) ? util.setErrorResponse(res, 'Subscription unsuccessfull', 500): next()
			}
	
		} catch (error) {
			util.setErrorResponse(res, error.message, 500)
		}
	}
}

export default billing