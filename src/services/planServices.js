import database from '../database/models';

class planServices {
  static async addPlan(newPlan) {
    try {
      return await database.plans.create(newPlan);
    } catch (error) {
      throw error;
    }
  }

  static async deletePlan(type) {
    try {
      return await database.plans.destroy({
        where: { type }
      });
    } catch (error) {
      throw error;
    }
  }

  static async updatePlans(type, plan) {
    try {
      return await database.plans.update(plan, {
        returning: true,
        where: { type }
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
      return await database.plans.findAll();
    } catch (error) {
      throw error;
    }
  }
}

export default planServices;
