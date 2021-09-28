import bcrypt from "../helpers/bcrypt";
import Util from "../helpers/utilities";
import AmbassadorServices from "../services/ambassadorServices";
import jwt from "../helpers/jwt";
import cry from "../helpers/crypto";
import AmbassadorIdGenerator from "../helpers/AmbassadorId";

const util = new Util();
class AmbassadorsController {
  static async signup(req, res) {
    try {
      const { firstName, lastName, phoneNumber, region, email, password } =
        req.body;
      const ambassador = await AmbassadorServices.getAmbassadorByMail(email);
      if (ambassador)
        return util.setErrorResponse(res, "Email already exists", 403);

      const ambassadorId = AmbassadorIdGenerator(email);

      const newAmbassador = {
        firstName,
        lastName,
        phoneNumber,
        region,
        ambassadorId,
        email,
        users: 0,
        password: bcrypt.encrypt(password),
        isVerified: false,
      };
      const createdAmbassador = await AmbassadorServices.createNewAmbassador(
        newAmbassador
      );
      return util.setSuccessResponse(res, "Signed up successfully", 201, null);
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
      const ambassador = await AmbassadorServices.getAmbassadorByMail(email);
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
      await AmbassadorServices.verifyAmbassador(req.params.id);
      return util.setSuccessResponse(res, "Verified successfully!", 200);
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
