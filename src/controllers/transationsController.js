/* eslint-disable quotes */
import service from '../services/transactionService'
import paypal from '../helpers/paypal'
import Util from '../helpers/utilities'
import tokenService from '../services/tokenService'
import billingService from '../services/billingServices'
const util = new Util()
class transactionsController {
	static async createNewTrans(req, res) {
		try {
			const data = req.body
			delete data.statusCode
			delete data.status
			const createdTrans = await service.createTransaction(data);
			(createdTrans) ? util.setSuccessResponse(res, 'Payment Done', 200, createdTrans): util.setErrorResponse(res, 'Oops something went wrong', 500)
		} catch (error) {
			util.setErrorResponse(res, error, 500)
		}
	}
	static async paypalSuccess(req, res) {
		try {
			const token = await tokenService.getToken(req.query.paymentId)
			const billInfo = await billingService.getCurrentSubscription(token.email)
			const details = {
				paymentId: req.query.paymentId,
				data: {
					"payer_id": req.query.PayerID,
					"transactions": [{
						"amount": {
							"currency": "USD",
							"total": billInfo.price
						}
					}]
				}
			}
			await paypal.executePayment(details)
		} catch (error) {
			util.setErrorResponse(res, error.message, 503)
		}
	}
	static async paypalSubscriptionSuccess(req,res){
		await paypal.executeAggreement(req,res)
	}
	static async paypalCancelOrFail(req, res) {
		util.setErrorResponse(res, "Message something happened transaction unsuccessful", 422)
	}
	static async paypalCancelSubscription(req,res){
		await paypal.cancelAggreement({
			token : req.headers.authorization
		})
	}
}
export default transactionsController