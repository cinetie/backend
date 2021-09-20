import bcrypt from "bcrypt";
import userService from "../services/userServices";
import Util from "../helpers/utilities";

const util = new Util();
const checkCredentials = async (req, res, next) => {
  try {
    const user = await userService.getUserByMail(req.body.email);
    if (!user) {
      return util.setErrorResponse(res, "Invalid email or password!", 400);
    }
    const status = await bcrypt.compare(req.body.password, user.password);
    if (!status) {
      return util.setErrorResponse(res, "Invalid email or password!", 400);
    }
    if (!user.isVerified) {
      return util.setErrorResponse(res, "Verify your account first!", 401);
    }
    req.user = user;
    return next();
  } catch (error) {
    return util.setErrorResponse(
      res,
      `Something Went wrong logging in ${error}`,
      500
    );
  }
};

export default checkCredentials;
