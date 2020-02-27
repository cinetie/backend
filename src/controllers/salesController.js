import service from '../services/salesService';
import Util from '../helpers/utilities';
import response from '../helpers/response';

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
      let sum = 0;
      if (Object.values(sales).length > 0) {
        for (let i = 0; i < Object.values(sales).length; i++) {
          const date = new Date(Number(sales[i].creationTime));
          sales[i].creationTime = `${date.toDateString().slice(4, 7)}/${date.getFullYear()}`;
          sum += Number(sales[i].amount);
        }
        const formattedData = [];
        for (let i = 0; i < sales.length; i++) {
          let count = 0;
          for (let j = 0; j < sales.length; j++) {
            var { creationTime } = sales[i];
            if (sales[i].creationTime == sales[j].creationTime) {
              count += Number(sales[j].amount);
            }
          }
          const obj = {
            amount: Number(count.toFixed(2)),
            period: creationTime
          };
          formattedData.push(obj);
        }
        const uniqueValues = util.getUnique(formattedData, 'creationTime');
        return response.successResponse(res, 200, 'Earnings found ', {
          sum: Number(sum.toFixed(2)),
          data: uniqueValues
        });
      }
      return response.successResponse(res, 200, 'Data Not found', 0);
    } catch (error) {
      util.setErrorResponse(res, 'something went wrong', 503);
    }
  }
}

export default salesController;
