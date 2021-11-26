import database from "../database/models";

class AmbassadorServices {
  async getAmbassadorBase(where) {
    console.log(where)
    return await database.Ambassador.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
      where: { ...where },
    });
  }
  static async getAmbassadorByEmail(email) {
    const ambassadorService = new AmbassadorServices();

    const ambassador = await ambassadorService.getAmbassadorBase({ email });
    if (ambassador.length >= 0) {
      return ambassador;
    }
    return null;
  }

  static async verifyAmbassador(id) {
    return await database.Ambassador.update(
      { isVerified: true },
      {
        returning: true,
        where: { id },
      }
    );
  }

  static async createNewAmbassador(newAmbassador) {
    return await database.Ambassador.create(newAmbassador);
  }

  static async getAllAmbassadors() {
    const ambassadorService = new AmbassadorServices();
    const ambassador = await ambassadorService.getAmbassadorBase(undefined);
    if (ambassador.length >= 0) {
      return ambassador;
    }
    return null;
  }

  static async getAmbassadorById(id) {
    const ambassadorService = new AmbassadorServices();
    const ambassador = await ambassadorService.getAmbassadorBase({id});
    if (ambassador.length >= 0) {
      return ambassador;
    }
    return null;
  }

  static async getAmbassadorByPromoCode(ambassadorId) {
    const ambassadorService = new AmbassadorServices();
    const ambassador = await ambassadorService.getAmbassadorBase({ambassadorId});
    if (ambassador.length >= 0) {
      return ambassador;
    }
    return null;
  }
}
export default AmbassadorServices;
