import service from '../services/salesService';
import Util from '../helpers/utilities';
import response from '../helpers/response';

const util = new Util();

class salesController {
  static async getSalesByModeOfPayment(req, res) {
    try {
      const sales = await service.getSalesByModeOfPayment(req.query.mode);
      if (sales) return util.setSuccessResponse(res, 'data found', 200, sales);
      util.setErrorResponse(res, 'data not found', 400);
    } catch (error) {
      util.setErrorResponse(res, 'something went wrong', 503);
    }
  }

  static async getSalesInTimeRange(req, res) {
    try {
      const { start, end } = req.body;

      const startDate = new Date(start).getTime()
      const endDate =  new Date(end).getTime()

      const sales = await service.getSalesInTimeRange(startDate, endDate);

      if (sales) return util.setSuccessResponse(res, 'data found', 200, sales);
      util.setErrorResponse(res, 'data not found', 400);
    } catch (error) {
      util.setErrorResponse(res, 'something went wrong', 503);
    }
  }

  static async getAllSales(req, res) {
    try {
      let salesUpdate = []
      const sales = await service.getAllSaless();
      let sum = 0;
      if (Object.values(sales).length > 0) {
        //For Grouping sales by moths and year they created from

        for(let i = 0; i < sales.length; i++) {
  
          const date = new Date(sales[i].dataValues.creationTime)
          const dateFormat = new Intl.DateTimeFormat('nl-BE', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
          });
          if(sales[i].dataValues.creationTime) {
            sales[i].dataValues.creationTime = dateFormat.format(date)
            salesUpdate.push(sales[i].dataValues)
          }
        }

        let resp = {};

        let fn = (year, month, o = resp, array = salesUpdate) => {
          o[year][month] = {
            [month]: array.filter(({creationTime: d}) => {
              return `${month}/${year}` === (`${d.slice(0, 2)}/${d.slice(6, 10)}`)})
          };
        }

        for (let {creationTime} of salesUpdate) {
          let [month, day, year] = creationTime.match(/\d+/g);
          if (!resp[year]) resp[year] = {};
          
          fn(year, month)
        }

        for (var key in resp) {
          if (resp.hasOwnProperty(key)) {
            for(var key1 in resp[key]) {
              resp[key][key1]['sum'] = 0;
              for(let i = 0; i < resp[key][key1][key1].length; i++) {
                resp[key][key1]['sum'] += resp[key][key1][key1][i].amount
              }
            }
          }
        }
        for (var key in resp) {
          
          if (resp.hasOwnProperty(key)) {
            
            for(var key1 in resp[key]) {
              if(!resp[key]['sumYear']){
                 resp[key]['sumYear'] = 0 
              }
              resp[key]['sumYear'] += resp[key][key1]['sum'];
            }
          }
          
        }
        for(var key in resp){
          if(!resp['sumTotal']){
              resp['sumTotal'] = 0 
           }
          if (resp.hasOwnProperty(key)) {
            resp['sumTotal'] += resp[key]['sumYear']
          }
        }
        for (var key in resp) {
          if (resp.hasOwnProperty(key)) {
            for(var key1 in resp[key]) {
              delete resp[key][key1][key1]
            }
          }
        }
        return response.successResponse(res, 200, 'Earnings found ', {
          data: resp
        });
      }
      return response.successResponse(res, 400, 'Data Not found', 0);
    } catch (error) {
      util.setErrorResponse(res, `something went wrong ${error}`, 503);
    }
  }
}

export default salesController;
