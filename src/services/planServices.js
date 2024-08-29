import Sequelize from "sequelize";
import database from "../database/models";
import { getCustomer, getProduct, getUserSubscriptions, updateSubscription } from "../helpers/stripe";

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
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  static async updatePlans(id, plan) {
    try {
      return await database.plans.update(plan, {
        returning: true,
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  static async getParticalPlan(type) {
    try {
      return await database.plans.findOne({
        where: { type },
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
            [op.not]: "Setup",
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async downgradePlan(user, newPlan) {
    try {
      const stripeUser = await getCustomer(user.stripeId);
      const subscriptions = await getUserSubscriptions(stripeUser.id);
      const getProd = await getProduct(newPlan.stripeId);
      const activeSubscription = subscriptions.data.find(sub => sub.status === 'active');
      await updateSubscription(activeSubscription.id, getProd.default_price);
      await user.update({
        plan: newPlan.type,
      });

      return {
        success: true,
        message: `Downgrade to ${newPlan.type} scheduled for the end of the current billing period.`
      };
    } catch (error) {
      console.log("err", error);
      return { success: false, error: error.message };
    }
  }
}

export default planServices;
