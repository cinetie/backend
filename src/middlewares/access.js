import jwt from "../helpers/jwt";
import userService from "../services/userServices";
import staffService from "../services/staffServices";
import Util from "../helpers/utilities";
import cpService from "../services/cpServices";
import AmbassadorServices from "../services/ambassadorServices";

const util = new Util();
class Access {
  // 0 normal user ( view own account and profiles,watch movies)
  // 1 producer user ( view views of each of their videos,upload videos in test area)
  // 2 admin user ( manage all profiles,manage all accounts,metrics on each video,
  // approve n reject videos,view sales metrics,manage plans )

  // level 2 permission checkpoint
  static async isAdmin(req, res, next) {
    try {
      if (!req.headers.authorization) {
        return util.setErrorResponse(res, "Invalid access token", 400);
      }
      const token = req.headers.authorization.slice(7);
      const decoded = jwt.jwtVerify(token, process.env.SECRET);
      const { user } = decoded;
      if (!user) {
        return util.setErrorResponse(res, "Invalid access token", 400);
      }
      const admin = await staffService.getStaffByMail(user);
      if (!admin || admin.role !== "admin") {
        return util.setErrorResponse(res, "Access denied  ", 403);
      }
      return next();
    } catch (error) {
      return util.setErrorResponse(res, error.message, 500);
    }
  }

  // level 1 permission checkpoint
  static async isProducer(req, res, next) {
    try {
      if (!req.headers.authorization) {
        return util.setErrorResponse(res, "Invalid access token", 401);
      }
      const token = req.headers.authorization.slice(7);
      const decoded = jwt.jwtVerify(token, process.env.SECRET);
      const { email, clientId } = decoded;
      const user = await cpService.getCpByMail(email);
      if (!user) {
        util.setErrorResponse(res, "Access denied", 403);
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
      if (!req.headers.authorization) {
        return util.setErrorResponse(res, "Invalid access token", 401);
      }
      const token = req.headers.authorization.slice(7);
      const decoded = jwt.jwtVerify(token, process.env.SECRET);
      const { email } = decoded;
      const user = await userService.getUserByMail(email);
      if (!user) {
        return util.setErrorResponse(res, "Invalid Token", 400);
      }
      if (user.permissionLevel === 0) {
        util.setErrorResponse(res, "Access denied ", 403);
      } else {
        req.user = email;
        req.fullUser = user;
        next();
      }
    } catch (error) {
      util.setErrorResponse(res, error.message, 500);
    }
  }

  static async isLoggedIn(req, res, next) {
    try {
      if (!req.headers.authorization) { 
        return util.setErrorResponse(res, "Invalid access token", 401);
      }
      const token = req.headers.authorization.slice(7);
      const decoded = jwt.jwtVerify(token, process.env.SECRET);
      const { email } = decoded;
      if (email) {
        req.user = email;
        next();
      } else if (!email && decoded) {
        const { user } = decoded;
        const admin = await staffService.getStaffByMail(user);
        if (!admin || admin.role !== "admin") {
          return util.setErrorResponse(res, "Access denied", 403);
        }
        next();
      } else {
        return util.setErrorResponse(res, "Access denied", 403);
      }
    } catch (error) {
      return util.setErrorResponse(res, error.message, 500);
    }
  }

  static async isRave(req, res, next) {
    try {
      const hash =
        req.headers["verif-hash"] ||
        req.headers["verify-hash"] ||
        req.headers["Verif-Hash"];
      if (hash !== process.env.RAVE_SECRET) {
        util.setErrorResponse(res, "Access denied", 403);
      } else {
        next();
      }
    } catch (error) {
      util.setErrorResponse(res, error.message || error, 500);
    }
  }

  static async isPayment(req, res, next) {
    try {
      if (!req.headers.authorization) {
        return util.setErrorResponse(res, "Invalid access token", 401);
      }
      const token = req.headers.authorization.slice(7);
      const user = jwt.jwtVerify(token, process.env.SECRET);
      if (user.role === "payment-api") {
        next();
      } else {
        util.setErrorResponse(res, "Access denied", 403);
      }
    } catch (error) {
      util.setErrorResponse(res, error.message || error, 500);
    }
  }

  static async isAmbassador(req, res, next) {
    try {
      if (!req.headers.authorization) {
        return util.setErrorResponse(res, "Invalid access token", 401);
      }
      const token = req.headers.authorization.slice(7);
      const decoded = jwt.jwtVerify(token, process.env.SECRET);
      const { email } = decoded;
      const ambassador = await AmbassadorServices.getAmbassadorByEmail(email);
      if (!ambassador[0]) {
        return util.setErrorResponse(res, "Invalid Token", 400);
      }
      if (!ambassador[0].isVerified) {
        util.setErrorResponse(res, "Access denied ", 403);
      } else {
        req.ambassador = ambassador;
        next();
      }
    } catch (error) {
      util.setErrorResponse(res, error.message, 500);
    }
  }
}
export default Access;
