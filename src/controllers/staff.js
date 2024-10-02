import generator from "generate-password";
import path from "path";
import mailer from "../helpers/mailer";
import staffService from "../services/staffServices";
import bcrypt from "../helpers/bcrypt";
import Util from "../helpers/utilities";
import jwt from "../helpers/jwt";

const util = new Util();
class StaffController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const staff = await staffService.getStaffByMail(email);
      if (!staff)
        return util.setErrorResponse(res, "Invalid email or password!", 400);
      const status = bcrypt.compare(password, staff.password);
      if (!status)
        return util.setErrorResponse(res, "Invalid email or password!", 400);
      const token = jwt.jwtSign(
        {
          user: req.body.email,
          role: staff.role,
        },
        process.env.SECRET,
        "1d"
      );
      return util.setSuccessResponse(res, "Logged in successfully!", 200, {
        token,
        role: staff.role,
      });
    } catch (error) {
      return util.setErrorResponse(
        res,
        `Something Went wrong logging in ${error}`,
        500
      );
    }
  }

  static async addNewStaff(req, res) {
    try {
      const { email, role } = req.body;
      const password = generator.generate({ length: 10, numbers: true });
      const staff = await staffService.getStaffByMail(email);
      const hiddenPassword = await bcrypt.encrypt(password);
      if (staff)
        return util.setErrorResponse(res, "the staff already exists", 403);
      const newStaff = await staffService.addNewStaff({
        email,
        role,
        password: hiddenPassword,
      });
      let EmailStatus = "an error occured while signing up";
      if (newStaff) {
        EmailStatus = await StaffController.sendEmail(email, password);
      }
      if (EmailStatus) return util.setErrorResponse(res, EmailStatus, 500);
      return util.setSuccessResponse(
        res,
        "Staff added successfully!",
        201,
        null
      );
    } catch (error) {
      return util.setErrorResponse(
        res,
        `Something Went wrong logging in ${error}`,
        500
      );
    }
  }

  static async changePassword(req, res) {
    try {
      const { newPassword } = req.body;
      const { user } = req;
      const staff = await staffService.getStaffByMail(user);
      const hiddenPassword = await bcrypt.encrypt(newPassword);
      if (!staff) return util.setErrorResponse(res, "Staff not found", 404);
      const updatedStaff = await staffService.updateStaff(user, {
        password: hiddenPassword,
      });
      if (!updatedStaff[1])
        return util.setErrorResponse(
          res,
          "An error occured while updating password",
          400
        );
      return util.setSuccessResponse(
        res,
        "password changed successfully!",
        200,
        null
      );
    } catch (error) {
      return util.setErrorResponse(
        res,
        `Something Went wrong logging in ${error}`,
        500
      );
    }
  }

  static async sendEmail(email, password) {
     
    return await mailer([
      {
        email,
        password,
      },
      {
        from: "CINETIE support",
        to: email,
        subject: "Staff credentials",
      },
      {
        path: `${path.resolve("src/public/templates/staffPassword.ejs")}`,
      },
    ]);
  }
}
export default StaffController;
