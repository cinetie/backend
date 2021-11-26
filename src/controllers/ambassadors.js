import bcrypt from "../helpers/bcrypt";
import Util from "../helpers/utilities";
import AmbassadorServices from "../services/ambassadorServices";
import jwt from "../helpers/jwt";
import cry from "../helpers/crypto";
import mailer from "../helpers/mailer";
import path from "path";

const util = new Util();
class AmbassadorsController {
  static async signup(req, res) {
    try {
      const { email, password } = req.body;
      let promoCode = email.split("@")[0];
      const ambassador = await AmbassadorServices.getAmbassadorByEmail(email);
      if (ambassador.length > 0) {
        return util.setErrorResponse(res, "Email already exists", 403);
      }
      const ambassadorIdDuplicates =
        await AmbassadorServices.getAmbassadorByPromoCode(promoCode);
      if (ambassadorIdDuplicates.length > 0) {
        promoCode = `${promoCode}${Math.floor(Math.random() * 10)}`;
      }
      const newAmbassador = {
        ...req.body,
        ambassadorId: promoCode,
        users: 0,
        password: bcrypt.encrypt(password),
        isVerified: false,
      };
      const createdAmbassador = await AmbassadorServices.createNewAmbassador(
        newAmbassador
      );
      if (!createdAmbassador) {
        return util.setSuccessResponse(res, "Could not signup", 400, null);
      }
      return util.setSuccessResponse(
        res,
        "Signed up successfully",
        201,
        createdAmbassador
      );
    } catch (error) {
      return util.setErrorResponse(
        res,
        `Something Went wrong, error: ${error}`,
        500
      );
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const ambassador = await AmbassadorServices.getAmbassadorByEmail(email);
      if (!ambassador)
        return util.setErrorResponse(res, "Invalid email or password!", 403);

      const status = await bcrypt.compare(password, ambassador.password);
      if (!status)
        return util.setErrorResponse(res, "Invalid email or password!", 403);

      if (!ambassador.isVerified)
        return util.setErrorResponse(res, "Ambassador not verified yet", 400);

      const token = jwt.jwtSign(
        { key: cry.crypto(), email: email },
        process.env.SECRET,
        "1d"
      );
      return util.setSuccessResponse(
        res,
        "Logged in successfully!",
        200,
        token
      );
    } catch (error) {
      return util.setErrorResponse(
        res,
        `Something Went wrong, error: ${error}`,
        500
      );
    }
  }

  static async verify(req, res) {
    try {
      const ambassador = await AmbassadorServices.getAmbassadorById(
        req.params.id
      );
      // if (ambassador[0].isVerified) {
      //   return util.setErrorResponse(res, "Ambassador already verified", 400);
      // }

      const verifiedAmbassador = await AmbassadorServices.verifyAmbassador(
        req.params.id
      );
      if (!verifiedAmbassador) {
        return util.setErrorResponse(res, "Ambassador not verified", 400);
      }
      const date = new Date();
      mailer([
        {
          name: ambassador[0].firstName,
          year: date.getFullYear(),
          body: `Your account has been verified! and your promo code is ${ambassador[0].ambassadorId}`,
        },
        {
          from: "CINETIE Support",
          to: ambassador[0].email,
          subject: "Account verification",
        },
        {
          path: `${path.resolve("src/public/templates/notification.ejs")}`,
        },
      ]);
      return util.setSuccessResponse(res, "Verified successfully!", 200);
    } catch (error) {
      return util.setErrorResponse(
        res,
        `Something Went wrong, error: ${error}`,
        500
      );
    }
  }

  static async getAmbassadors(req, res) {
    try {
      const ambassadors = await AmbassadorServices.getAllAmbassadors();
      if (ambassadors.length === 0) {
        return util.setErrorResponse(res, "No ambassadors found", 404);
      }
      return util.setSuccessResponse(
        res,
        "Ambassadors fetched successfully!",
        200,
        ambassadors
      );
    } catch (error) {
      return util.setErrorResponse(
        res,
        `Something Went wrong, error: ${error}`,
        500
      );
    }
  }
}

export default AmbassadorsController;
