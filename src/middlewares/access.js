import jwt from '../helpers/jwt';
import userService from '../services/userServices';
import Util from '../helpers/utilities';
import cpService from '../services/cpServices';

const util = new Util();
class Access {

    //0 normal user ( view own account and profiles,watch movies)
    //1 producer user ( view views of each of their videos,upload videos in test area)
    //2 admin user ( manage all profiles,manage all accounts,metrics on each video,approve n reject videos,view sales metrics,manage plans )


    // level 2 permission checkpoint
    static async isAdmin(req, res, next) {
        try {
            const decoded = jwt.jwtVerify(req.query.authToken, process.env.SECRET);
            const user = decoded.user
            if (!user) util.setErrorResponse(res, "Invalid access token", 400);
            (user != process.env.ADMIN_USER) ? util.setErrorResponse(res, "Access denied  ", 403): next();
        } catch (error) {
            util.setErrorResponse(res,error.message,500);
        }

    }
    //level 1 permission checkpoint
    static async isProducer(req, res, next) {
        try {
            const decoded = jwt.jwtVerify(req.query.authToken, process.env.SECRET);
            const email = decoded.email
            const user = await cpService.getCpByMail(email);
            (!user) ? util.setErrorResponse(res, "Access denied", 403): next();
        } catch (error) {
            util.setErrorResponse(res,error.message,500);
        }
    }
    //level 0 permission checkpoint
    static async isNormalUser(req, res, next) {
        try {
            const decoded = jwt.jwtVerify(req.query.auth_token, process.env.SECRET);
            const email = decoded.email
            const user = await userService.getUserByMail(email)
                (user.permissionLevel == 0) ? util.setErrorResponse(res, "Access denied ", 403) : next();
        } catch (error) {
            util.setErrorResponse(res,error.message,500);
        }
    }

}
export default Access;