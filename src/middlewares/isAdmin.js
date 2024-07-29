// This middleware checks that the user provied credentials  collide with the
// sysadmin's crendentials
import cry from "../helpers/crypto";
import jwt from "../helpers/jwt";
import Util from "../helpers/utilities";

const util = new Util();
class authenticator {
  static async verifyAdmin(req, res, next) {
    try {
      if (req.body.email == null || req.body.password == null)
        util.setErrorResponse(res, "some fields are empty", 400);

      const payload = cry.crypto();
      const token = jwt.jwtSign(
        { payload, user: process.env.ADMIN_USER },
        process.env.SECRET
      );
      if (
        req.body.password === process.env.ADMIN_PASS &&
        req.body.email === process.env.ADMIN_USER
      ) {
        util.setSuccessResponse(res, "Access granted", 200, token);
      } else {
        next();
      }
    } catch (error) {
      util.setErrorResponse(res, error.message, 500);
    }
  }
}

export default authenticator;
