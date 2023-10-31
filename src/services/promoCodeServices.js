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
    return await database.PromoCodeUtilization.findOne({
      where: {
        userEmail,
        ambassadorEmail,
      },
    });
  }

  static async getAllPromoCodeUtizations(userEmail, ambassadorEmail) {
    return await database.PromoCodeUtilization.findAll();
  }

  static async getAllPromoCodeUtizationsByAmbassador(ambassadorEmail) {
    return await database.PromoCodeUtilization.findAll({
      where: {
        ambassadorEmail,
      },
    });
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
    console.log(promoCodeUtilization, "==============");
    await promoCodeUtilization.update(updates);
  }
}
export default PromoCodeServices;
