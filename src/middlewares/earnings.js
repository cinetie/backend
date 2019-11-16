import earningController from '../controllers/earningControlller';
import date from '../helpers/date';
import Util from '../helpers/utilities';
const util = new Util();
class earningsMiddleware {
    static async registerEarnings(req, res, next) {
       try {
            if (date.isEndOfMonth() == 1) {
                const results = await earningController.assignRateToEachVideo(req.body.email);
                if (results){
                    next();
                }else{
                    util.setErrorResponse(res, "error occured assigning rate here", 500);
                }
                
            } else {
                next();
            }
        } catch (error) {
            util.setErrorResponse(res, "error occured assigning rate : " + error.message, 500);
        }
    }
}
export default earningsMiddleware;