/* eslint-disable no-console */
import service from '../services/transactionService';
import Util from '../helpers/utilities';
import Fetch from '../helpers/fetch';
import jwt from '../helpers/jwt';

const util = new Util();
class transactionsController {
  static async createNewTrans(req, res) {
    try {
      const data = req.body;
      delete data.statusCode;
      delete data.status;
      const createdTrans = await service.createTransaction(data);
      if (createdTrans) {
        util.setSuccessResponse(res, 'Payment Done', 200, createdTrans);
      } else {
        util.setErrorResponse(res, 'Oops something went wrong', 500);
      }
    } catch (error) {
      util.setErrorResponse(res, error, 500);
    }
  }

  static async getNewSessionId(req, res) {
    try {
      const token = jwt.jwtSign({ role: 'main-api' }, process.env.SECRET, 1000);
      const raw = await Fetch(undefined,
        {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }, `${process.env.PAY_HOST}/charge/get-session-id`, 'GET');
      if (raw.status === 201) {
        util.setSuccessResponse(res, 'Session id found', 200, raw);
      } else {
        util.setErrorResponse(res, 'Something went wrong', 400);
      }
    } catch (error) {
      console.log(error);
      util.setErrorResponse(res, error, 500);
    }
  }
}
export default transactionsController;
