import services from '../services/cpTransServices';
import earningService from '../services/earningServices';
import Util from '../helpers/utilities';
import jwt from '../helpers/jwt';
import cpService from '../services/cpServices';

const helpers = new Util();
class cpTransController {
  static async getAllTransactions(req, res) {
    try {
      const data = await services.getAllTrans();

      for (let i = 0; i < Object.values(data).length; i++) {
        const cp = await cpService.getCpByClientId(data[i].clientId);
        const date = new Date(Number(data[i].date));
        data[i].clientId = cp.name;
        data[i].date = `${date.toDateString()}  ${date.toLocaleTimeString()}`;
      }
      if (data) {
        helpers.setSuccessResponse(res, 'Success', 200, data);
      } else {
        helpers.setErrorResponse(res, 'Error occured', 404);
      }
    } catch (error) {
      helpers.setErrorResponse(res, error.message, 500);
    }
  }

  static async getAllTransById(req, res) {
    try {
      const token = req.headers.authorization.slice(7);
      const decoded = jwt.jwtVerify(token, process.env.SECRET);
      const data = await services.getTransById(decoded.clientId);
      for (let i = 0; i < Object.values(data).length; i++) {
        const date = new Date(Number(data[i].date));
        data[i].date = `${date.toDateString()}  ${date.toLocaleTimeString()}`;
      }
      if (data) {
        helpers.setSuccessResponse(res, 'Success', 200, data);
      } else {
        helpers.setErrorResponse(res, 'Error occured', 404);
      }
    } catch (error) {
      helpers.setErrorResponse(res, error.message, 500);
    }
  }

  static async loadStats(req, res) {
    try {
      const token = req.headers.authorization.slice(7);
      const raw = jwt.jwtVerify(token, process.env.SECRET);
      const data = await earningService.getAllFromThreeshold(raw.clientId, process.env.MIN_CASHOUT);
      let sum = 0;
      data.forEach((x) => {
        sum += Number(x.amount);
      });
      const finalData = {
        data,
        sum
      };
      if (Object.values(data).length > 0) {
        helpers.setSuccessResponse(res, 'Success', 200, finalData);
      } else {
        helpers.setErrorResponse(res, 'Data unfound', 404);
      }
    } catch (error) {
      helpers.setErrorResponse(res, error.message, 500);
    }
  }

  static async checkout(req, res) {
    try {
      const token = req.headers.authorization.slice(7);
      const raw = jwt.jwtVerify(token, process.env.SECRET);
      const data = await earningService.getAllFromThreeshold(
        raw.clientId, Number(process.env.MIN_CASHOUT)
      );
      let sum = 0;
      for (let i = 0; i < Object.values(data).length; i++) {
        sum += Number(data[i].amount);
      }

      if (Object.values(data).length > 0) {
        const transactInfo = {
          clientId: raw.clientId,
          date: new Date().getTime(),
          amount: sum
        };

        await services.createTrans(transactInfo);
        const status = await earningService.setEarningsToInactive(raw.clientId);
        if (!status) return helpers.setErrorResponse(res, 'Can\'t cashout easily', 500);
        return helpers.setSuccessResponse(res, 'Successfully checkout', 200);
      }
      return helpers.setErrorResponse(res, 'Can\'t Cash out', 400);
    } catch (error) {
      helpers.setErrorResponse(res, error.message, 500);
    }
  }

  static async patchNonApprovedTrans(req, res) {
    try {
      const { id } = req.query;
      const data = await services.updateTrans(id, { state: 'Approved' });
      if (data) {
        helpers.setSuccessResponse(res, 'Successfully Approved cashout', 200);
      } else {
        helpers.setErrorResponse(res, 'can\'t approve cashout', 403);
      }
    } catch (error) {
      helpers.setErrorResponse(res, error.message, 500);
    }
  }
}
export default cpTransController;
