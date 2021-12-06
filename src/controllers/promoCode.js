import Util from "../helpers/utilities";
import PromoCodeServices from "../services/promoCodeServices";

const util = new Util();
class PromoCodeController {
  static async getAllPromoCodeUtilizations(req, res) {
    try {
      const ambassadors = await PromoCodeServices.getAllPromoCodeUtizations();
      if (ambassadors.length === 0) {
        return util.setErrorResponse(res, "No promo code utilization found yet", 404);
      }
      return util.setSuccessResponse(
        res,
        "all promo code utilization  fetched successfully!",
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
  static async getAmbassadorPromoCodeUtilizations(req, res) {
    try {
      const { email } = req.ambassador[0];
      console.log(req.ambassador);
      const promoCodeUtilization = await PromoCodeServices.getAllPromoCodeUtizationsByAmbassador(email);
      if (promoCodeUtilization.length === 0) {
        return util.setErrorResponse(res, "No promo code utilization found yet", 404);
      }
      return util.setSuccessResponse(
        res,
        "all promo code utilization  fetched successfully!",
        200,
        promoCodeUtilization
      );
    } catch (error) {
      console.log(error);
      return util.setErrorResponse(
        res,
        `Something Went wrong, error: ${error}`,
        500
      );
    }
  }
}

export default PromoCodeController;
