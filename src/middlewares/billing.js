/* eslint-disable no-useless-catch */
/* eslint-disable quotes */
import billingService from '../services/billingServices'
import Util from '../helpers/utilities'
import paypalHelper from '../helpers/paypal'
import service from '../services/salesService'
import { mailer } from '../helpers/mailer'
import uuid from '../helpers/uuid'
import userService from '../services/userServices'
import dax from '../helpers/dax-payment-handler'


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
	static async verifyStatus(req,res,status,next){
		if(status === 1) {
			// change user state from onhold to active
			const updates = await billingService.updateSubscription(req.body.email,{dueState:"active"})
			if(updates) util.setErrorResponse(res,'can\'t grant access to user',503)
			next()
		} else {
			const emailToSend = {
				to:req.body.email,
				from: 'billing@cinetie.com',
				subject: 'Payment details',
				text: 'We would like you to know that your account has been put onhold. \n since your opay payment didn\'t work out'
			}
			await mailer(emailToSend)
		} 
	}
	static async registerSales(details){
		try {
			const dates = new Date()
			const data = {
				"modeOfPayment": details.modeOfPayment,
				"transactionId": uuid.generator(),
				"plan":details.plan,
				"amount":details.amount,
				"creationTime":dates.getTime()
			}
			const status = await service.createNewSales(data)
			if(status) return 1
			return 0
		} catch (error) {
			return -1 
		}

	}
	static async renewPayment(req, res, next) {
		try {
			const details = await billing.fetchCurrentSubscription(req, res)
			const user = await userService.getUserByMail(details.email)
			if (Number(details.paymentMethod) == 1) {
				const salesData = {
					modeOfPayment: 'Momo',
					plan:details.plan,
					transaction:{
						amount:details.price,
					},					
					user:{
						phoneNumber:details.phoneNumber,
						firstName:user.firstName,
						lastName:user.lastName,
						email:user.email
					}
				}
				const sales = this.registerSales(salesData)
				if(!sales) util.setErrorResponse(res,'sales can\'t run ',500)
				const momoStatus = await dax.momo({
					transaction:{
						amount:details.price,
					},
					user:{
						email:user.email,
						phoneNumber:details.phoneNumber,
						firstName:user.firstName,
						lastName:user.lastName
					}
				})
				this.verifyStatus(req,res,momoStatus,next)
				// service.get
			} else if (Number(details.paymentMethod) == 2) {
				const salesData = {
					modeOfPayment: 'Paypal',
					plan:details.plan,
					amount:details.price,
					user:{
						phoneNumber:details.phoneNumber,
						firstName:user.firstName,
						lastName:user.lastName,
						email:user.email
					}
				}
				const sales = this.registerSales(salesData)
				if(!sales) util.setErrorResponse(res,'sales can\'t run ',500)
				const status = await paypalHelper.getSubscriptionDetails(req.body.email)
				this.verifyStatus(req,res,status,next)
				
			}
			else if (Number(details.paymentMethod) == 3) {
				const salesData = {
					modeOfPayment: 'Credit Cards',
					plan:details.plan,
					amount:details.price,
					user:{
						phoneNumber:details.phoneNumber,
						firstName:user.firstName,
						lastName:user.lastName,
						email:user.email
					}
				}
				const sales = this.registerSales(salesData)
				if(!sales) util.setErrorResponse(res,'sales can\'t run ',500)
				const status = await dax.creditCards({
					card:{
						crNumber:user.crNumber,
						crCVC:user.crCVC,
						expMonth:user.expMonth,
						expYear:user.expYear
					},
					transaction:{
						amount:details.price
					},
					user:{
						phoneNumber:details.phoneNumber,
						firstName:user.cardFirstName,
						lastName:user.cardLastName
					}
				})
				this.verifyStatus(req,res,status,next)
			}

		} catch (error) {
			util.setErrorResponse(res, error.message, 500)
		}
	}

}

export default billing