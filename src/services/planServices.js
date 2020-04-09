import Sequelize from 'sequelize';
import database from '../database/models';

const op = Sequelize.Op;
class planServices {
  static async addPlan(newPlan) {
    try {
      return await database.plans.create(newPlan);
    } catch (error) {
      throw error;
    }
  }

  static async deletePlan(id) {
    try {
      return await database.plans.destroy({
        where: { id }
      });
    } catch (error) {
      throw error;
    }
  }

  static async updatePlans(id, plan) {
    try {
      return await database.plans.update(plan, {
        returning: true,
        where: { id }
      });
    } catch (error) {
      throw error;
    }
  }

  static async getParticalPlan(type) {
    try {
      return await database.plans.findOne({
        where: { type }
      });
    } catch (error) {
      throw error;
    }
  }

  static async getAllPlan() {
    try {
      return await database.plans.findAll({
        where: {
          type: {
            [op.not]: 'Setup'
          }
        }
      });
    } catch (error) {
      throw error;
    }
  }
}

export default planServices;
