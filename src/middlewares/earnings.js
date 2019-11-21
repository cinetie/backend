import earningController from '../controllers/earningControlller';
import date from '../helpers/date';
import Util from '../helpers/utilities';
const util = new Util();
class earningsMiddleware {
    static async registerEarnings(req, res, next) {
       try {
        //    console.log("-------------------earnings---------")
            if (date.isEndOfMonth() == 1) {
                const results = await earningController.assignRateToEachVideo(req.body.email);
                if (results){
                    next();
                    // console.log("------------------- end earnings---------")
                }else{
                    util.setErrorResponse(res, "error occured assigning rate here", 500);
                }
            } else {
                next();
                // console.log("------------------- end earnings---------")
            }
        } catch (error) {
            util.setErrorResponse(res, "error occured assigning rate : " + error.message, 500);
        }
    }
}
export default earningsMiddleware;