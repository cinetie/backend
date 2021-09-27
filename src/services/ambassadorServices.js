/* eslint-disable no-useless-catch */
import database from "../database/models";

class AmbassadorServices {
  static async getAmbassadorByMail(email) {
    try {
      const ambassador = await database.Ambassador.findOne({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        where: {
          email,
        },
      });
      if (ambassador) {
        return ambassador;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }



  static async createNewAmbassador(newAmbassador) {
    try {
      return await database.Ambassador.create(newAmbassador);
    } catch (error) {
      throw error;
    }
  }
}
export default AmbassadorServices;
