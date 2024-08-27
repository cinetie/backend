import Sequelize from "sequelize";
import database from "../database/models";
import { getCustomer, getProduct, getUserSubscriptions,updateSubscription} from "../helpers/stripe";
import cron from "node-cron";

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
      const currentPeriodEnd = new Date(activeSubscription.current_period_end * 1000);
      const newEndDate = new Date(currentPeriodEnd.getTime() + 2 * 24 * 60 * 60 * 1000);
      await updateSubscription(activeSubscription.id, getProd.default_price);

      const cronTime = `${newEndDate.getMinutes()} ${newEndDate.getHours()} ${newEndDate.getDate()} ${newEndDate.getMonth() + 1} *`;
      
      const job = cron.schedule(cronTime, async () => {
        try {
          await user.update({
            plan: newPlan.type,
          });
          job.stop();
        } catch (error) {
          console.error("Error in cron job:", error);
        }
      }, {
        scheduled: false
      });

      job.start();

      return {
        success: true,
        message: `Downgrade scheduled. Current plan will end on ${newEndDate}`
      };
    } catch (error) {
      
      return { success: false, error: error.message };
    }
  }
}

export default planServices;
