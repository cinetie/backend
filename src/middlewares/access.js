import jwt from '../helpers/jwt';
import userService from '../services/userServices';
import Util from '../helpers/utilities';
import cpService from '../services/cpServices';

const util = new Util();
class Access {
  // 0 normal user ( view own account and profiles,watch movies)
  // 1 producer user ( view views of each of their videos,upload videos in test area)
  // 2 admin user ( manage all profiles,manage all accounts,metrics on each video,
  // approve n reject videos,view sales metrics,manage plans )

  // level 2 permission checkpoint
  static async isAdmin(req, res, next) {
    try {
      const token = req.headers.authorization.slice(7);
      const decoded = jwt.jwtVerify(token, process.env.SECRET);
      const { user } = decoded;
      if (!user) util.setErrorResponse(res, 'Invalid access token', 400);
      if (user !== process.env.ADMIN_USER) {
        util.setErrorResponse(res, 'Access denied  ', 403);
      } else {
        next();
      }
    } catch (error) {
      util.setErrorResponse(res, error.message, 500);
    }
  }

  // level 1 permission checkpoint
  static async isProducer(req, res, next) {
    try {
      const token = req.headers.authorization.slice(7);
      const decoded = jwt.jwtVerify(token, process.env.SECRET);
      const { email, clientId } = decoded;
      const user = await cpService.getCpByMail(email);
      if (!user) {
        util.setErrorResponse(res, 'Access denied', 403);
      } else {
        req.user = clientId;
        next();
      }
    } catch (error) {
      util.setErrorResponse(res, error.message, 500);
    }
  }

  // level 0 permission checkpoint
  static async isNormalUser(req, res, next) {
    try {
      const token = req.headers.authorization.slice(7);
      const decoded = jwt.jwtVerify(token, process.env.SECRET);
      const { email } = decoded;
      const user = await userService.getUserByMail(email);
      if (user.permissionLevel === 0) {
        util.setErrorResponse(res, 'Access denied ', 403);
      } else {
        next();
      }
    } catch (error) {
      util.setErrorResponse(res, error.message, 500);
    }
  }

  static async isLoggedIn(req, res, next) {
    try {
      const token = req.headers.authorization.slice(7);
      const decoded = jwt.jwtVerify(token, process.env.SECRET);
      const { email } = decoded;
      if (email) {
        next();
      } else {
        util.setErrorResponse(res, 'Access denied', 403);
      }
    } catch (error) {
      util.setErrorResponse(res, error.message, 500);
    }
  }

  static async isRave(req, res, next) {
    try {
      const hash = req.headers['verify-hash'];
      console.log(req.headers);
      if (1 !== 0) {
        util.setErrorResponse(res, 'Access denied', 403);
      } else {
        next();
      }
    } catch (error) {
      util.setErrorResponse(res, error.message || error, 500);
    }
  }
}
export default Access;
