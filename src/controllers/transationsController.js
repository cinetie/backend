import service from '../services/transactionService'
import Util from '../helpers/utilities'
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
}
export default transactionsController