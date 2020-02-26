import service from '../services/salesService';
import Util from '../helpers/utilities';

const util = new Util();

class salesController {
  static async getSalesByModeOfPayment(req, res) {
    try {
      const sales = await service.getSalesByModeOfPayment(req.query.mode);
      if (sales) util.setSuccessResponse(res, 'data found', 200, sales);
      util.setErrorResponse(res, 'data not found', 400);
    } catch (error) {
      util.setErrorResponse(res, 'something went wrong', 503);
    }
  }

  static async getSalesInTimeRange(req, res) {
    try {
      const { start, end } = req.body;
      const sales = await service.getSalesInTimeRange(start, end);
      if (sales) util.setSuccessResponse(res, 'data found', 200, sales);
      util.setErrorResponse(res, 'data not found', 400);
    } catch (error) {
      util.setErrorResponse(res, 'something went wrong', 503);
    }
  }

  static async getAllSales(req, res) {
    try {
      const sales = await service.getAllSaless();
      if (sales) util.setSuccessResponse(res, 'data found', 200, sales);
      util.setErrorResponse(res, 'data not found', 400);
    } catch (error) {
      util.setErrorResponse(res, 'something went wrong', 503);
    }
  }
}

export default salesController;
