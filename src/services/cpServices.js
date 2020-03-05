/* eslint-disable no-useless-catch */
import database from '../database/models';


class cpService {
  static async getCpByMail(email) {
    try {
      const user = await database.contentProviders.findOne({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        where: { email }
      });
      if (user) {
        return user;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getCpById(id) {
    try {
      const user = await database.contentProviders.findOne({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        where: { id }
      });
      if (user) {
        return user;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getCpByClientId(clientId) {
    try {
      const user = await database.contentProviders.findOne({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        where: { clientId }
      });
      if (user) {
        return user;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async createNewCp(newCp) {
    try {
      return await database.contentProviders.create(newCp);
    } catch (error) {
      throw error;
    }
  }

  static async updateCp(email, oldCp) {
    try {
      return await database.contentProviders.update(oldCp, {
        returning: true,
        where: { email }
      });
    } catch (error) {
      throw error;
    }
  }

  static async deleteCp(email) {
    try {
      return await database.contentProviders.destroy({
        returning: true,
        where: {
          email
        }
      });
    } catch (error) {
      throw error;
    }
  }

  static async getAllCps() {
    try {
      const cps = await database.contentProviders.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'password', 'id', 'isVerified', 'cityOfResidence']
        },
      });
      if (!cps) return null;
      return cps;
    } catch (error) {
      throw error;
    }
  }
}
export default cpService;
