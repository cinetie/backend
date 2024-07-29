import response from "../helpers/response";
import profileServices from "../services/profileService";
import Util from "../helpers/utilities";

const util = new Util();

class profileController {
  static async addProfile(req, res) {
    try {
      const getProfile = await profileServices.searchProfile(
        req.body.name,
        req.body.email
      );
      if (getProfile) {
        util.setErrorResponse(
          res,
          "Profile with that name exists already",
          422
        );
      } else {
        const addedProfile = await profileServices.addProfile(req.body);
        util.setSuccessResponse(
          res,
          "Profile successfully added!",
          201,
          addedProfile
        );
      }
    } catch (error) {
      util.setErrorResponse(res, "Something went wrong", 500, error);
    }
  }

  static async getProfile(req, res) {
    try {
      const returned = await profileServices.getParticalProfile(req.params.id);
      if (!returned) util.setErrorResponse(res, "Profile not found", 404);
      util.setSuccessResponse(
        res,
        "Profile successfully retrieved!",
        200,
        returned
      );
    } catch (error) {
      util.setErrorResponse(res, `Something went wrong :   ${error}`, 500);
    }
  }

  static async deleteProfile(req, res) {
    try {
      const returned = await profileServices.getParticalProfile(req.params.id);
      if (!returned) response.errorResponse(res, 404, "Profile not found");
      const deletedProfile = await profileServices.deleteProfile(req.params.id);
      response.successResponse(
        res,
        200,
        "Profile successfully deleted!",
        deletedProfile
      );
    } catch (error) {
      response.errorResponse(res, 500, "Something went wrong", error);
    }
  }

  static async getAllProfiles(req, res) {
    try {
      const returned = await profileServices.getAllProfiles();
      response.successResponse(
        res,
        200,
        "Profiles successfully retrieved!",
        returned
      );
    } catch (error) {
      response.errorResponse(res, 500, "Something went wrong", error);
    }
  }

  static async updateProfile(req, res) {
    try {
      const toUpdate = req.body;
      const updated = await profileServices.updateProfile(
        req.params.id,
        toUpdate
      );
      if (updated)
        util.setSuccessResponse(
          res,
          "Profile updated successfully",
          200,
          updated[1][0]
        );
      util.setErrorResponse(res, "Profile successfully updated!", 200);
    } catch (error) {
      util.setErrorResponse(res, "things went south ", 500);
    }
  }
}

export default profileController;
