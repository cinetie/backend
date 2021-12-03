import database from "../database/models";

class PromoCodeServices {
  static async addNewPromoUsage(userEmail, ambassadorEmail, plan) {
    return await database.PromoCodeUtilization.create({
      userEmail, ambassadorEmail, plan, status: 'pending'
    });
  }
  static async getPromoCodeUtizationByEmail(userEmail, ambassadorEmail) {
    return await database.PromoCodeUtilization.findOne({
      where: {
        userEmail, ambassadorEmail
      }
    });
  }
}
export default PromoCodeServices;
