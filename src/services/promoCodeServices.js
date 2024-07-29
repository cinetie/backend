import database from "../database/models";

class PromoCodeServices {
  static async addNewPromoUsage(userEmail, ambassadorEmail, plan) {
    const newPromoCodeUsage = await database.PromoCodeUtilization.create({
      userEmail,
      ambassadorEmail,
      plan,
      status: "pending",
    });
    return newPromoCodeUsage;
  }

  static async getPromoCodeUtizationByEmail(userEmail, ambassadorEmail) {
    const promoCodeUtilization = await database.PromoCodeUtilization.findOne({
      where: {
        userEmail,
        ambassadorEmail,
      },
    });
    return promoCodeUtilization;
  }

  static async getAllPromoCodeUtizations() {
    const promoCodeUtilizations = await database.PromoCodeUtilization.findAll();
    return promoCodeUtilizations;
  }

  static async getAllPromoCodeUtizationsByAmbassador(ambassadorEmail) {
    const promoCodeUtilizations = await database.PromoCodeUtilization.findAll({
      where: {
        ambassadorEmail,
      },
    });
    return promoCodeUtilizations;
  }

  static async updatePromoCodeUtizationByEmail(
    userEmail,
    ambassadorEmail,
    updates
  ) {
    const promoCodeUtilization = await database.PromoCodeUtilization.findOne({
      where: {
        userEmail,
        ambassadorEmail,
      },
    });
    if (promoCodeUtilization) {
      await promoCodeUtilization.update(updates);
    }
  }
}
export default PromoCodeServices;
