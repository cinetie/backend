// This middleware checks that the user credentials provided collide with the
// sysadmin's crendentials
import cry from '../helpers/crypto';
import jwt from '../helpers/jwt';
import Util from '../helpers/utilities';

const util = new Util();
class authenticator {
    static async verifyAdmin (req, res, next)  {

        try {
            if (req.body.email == null  || req.body.password == null) util.setErrorResponse(res, "some fields are empty", 400);
            const payload = cry.crypto();
            const token = jwt.jwtSign({payload:payload,user:process.env.ADMIN_USER},process.env.SECRET);
            (req.body.password == process.env.ADMIN_PASS && req.body.email == process.env.ADMIN_USER) ? util.setSuccessResponse(res,"Access granted",200,token) :util.setErrorResponse(res, "Access denied", 403);
        } catch (error) {
            util.setErrorResponse(res,error.message,500);
        }
    }
}

export default authenticator;