/* eslint-disable no-useless-catch */
import billingService from '../services/billingServices'
import planService from '../services/planServices'
import date from '../helpers/date'
class payment {
	static async registerNewSubscription(details) {
		try {
			let data = {}
			const plan = await planService.getParticalPlan(details.plan);
			(details.isBilledAnnually) ? data.price = plan.yearlyPrice : data.price = plan.monthlyPrice
			data.email = details.email
			data.plan = details.plan
			data.state = 'current'
			data.phoneNumber = details.phoneNumber
			if (details.isBilledAnnually === true) {
				data.endDate = date.addMoreDays(365).toDateString()
			} else {
				data.endDate = date.addMoreDays(31).toDateString()
			}
			data.paymentMethod = details.paymentMethod
			const bill = await billingService.registerSubscription(data);
			console.log(JSON.stringify(bill));
			if(bill){
				return bill
			}else{
				return null
			}


		} catch (error) {
			throw error
		}
	}
}
export default payment
