import services from '../services/cpTransServices'; 
import earningService from '../services/earningServices';
import Util from '../helpers/utilities';
import jwt from '../helpers/jwt';
const helpers = new Util();
class cpTransController {
    static async getAllTransactions(req, res) {
        try {
            const data = await services.getAllTrans();
            if (data) {
                helpers.setSuccessResponse(res, "Success", 200, data);
            } else {
                helpers.setErrorResponse(res, "Error occured", 404);
            }
        } catch (error) {
            helpers.setErrorResponse(res, error.message, 500)
        }
    }
    static async getAllTransById(req, res) {
        try {
            const id = req.query.clientId
            const data = await services.getTransById(id);
            if (data) {
                helpers.setSuccessResponse(res, "Success", 200, data);
            } else {
                helpers.setErrorResponse(res, "Error occured", 404)
            }
        } catch (error) {
            helpers.setErrorResponse(res, error.message, 500)
        }
    }
    static async loadStats(req, res) {
        try {
            const token = req.headers['x-access-token'];
            const raw = jwt.jwtVerify(token, process.env.SECRET);
            const data = await earningService.getAllFromThreeshold(raw.clientId);
            if (data) {
                helpers.setSuccessResponse(res, "Success", 200, data)
            } else {
                helpers.setErrorResponse(res, "Data unfound", 404);
            }
        } catch (error) {
            helpers.setErrorResponse(res,error.message,500)
        }

    }

}
export default cpTransController;