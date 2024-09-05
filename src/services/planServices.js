import Sequelize from "sequelize";
import database from "../database/models";
import { getCustomer, getProduct, getUserSubscriptions, updateSubscription } from "../helpers/stripe";
import billingServices from "./billingServices";
import transactionService from "./transactionService";
import { v4 as uuid } from "uuid";

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

  /**
   * Downgrades a user's subscription plan on Stripe.
   * 
   * @param {Object} user - The user object containing user information.
   * @param {Object} newPlan - The new plan to downgrade to.
   * @param {string} newPlan.stripeId - The Stripe ID of the new plan.
   * @param {string} newPlan.type - The type of the new plan.
   * 
   * @returns {Promise<Object>} - An object containing the success status and a message or error.
   */
  static async downgradeStripePlan(user, newPlan) {
    try {
      /** 
       * Retrieves the Stripe customer object using the user's Stripe ID.
       * 
       * @type {Object}
       */
      const stripeUser = await getCustomer(user.stripeId);

      /** 
       * Retrieves the user's active subscriptions on Stripe.
       * 
       * @type {Object}
       */
      const subscriptions = await getUserSubscriptions(stripeUser.id);

      /** 
       * Retrieves the product details for the new plan using its Stripe ID.
       * 
       * @type {Object}
       */
      const getProd = await getProduct(newPlan.stripeId);

      /** 
       * Finds the active subscription from the list of user's subscriptions.
       * 
       * @type {Object}
       */
      const activeSubscription = subscriptions.data.find(sub => sub.status === 'active');

      /** 
       * Updates the active subscription with the default price of the new plan.
       */
      await updateSubscription(activeSubscription.id, getProd.default_price);

      /** 
       * Updates the user's plan information in the database to reflect the new plan.
       */
      await user.update({
        plan: newPlan.type,
      });

      // Returns a success message indicating that the downgrade is scheduled.
      return {
        success: true,
        message: `Downgrade to ${newPlan.type} scheduled for the end of the current billing period.`
      };
    } catch (error) {
      // Logs any errors encountered and returns an error response.
      return { success: false, error: error.message };
    }
  }


  /** 
   * Downgrades a user's subscription plan on Flutterwave.
   * 
   * @param {Object} user - The user object containing user information.
   * @param {Object} newPlan - The new plan to downgrade to.
   * @param {string} newPlan.type - The type of the new plan.
   * @param {number} newPlan.price - The price of the new plan.
   * @param {string} [newPlan.currency="USD"] - The currency of the new plan.
   * 
   * @returns {Promise<Object>} - An object containing the success status and a message or error.
   */
  static async downgradeFlutterwavePlan(user, newPlan) {
    try {
      /** 
       * Retrieves the current active subscription for the user.
       * 
       * @type {Object} 
       */
      const currentSubscription = await billingServices.getCurrentSubscription(user.id);

      // Checks if there is no active subscription found for the user.
      if (!currentSubscription) {
        throw new Error("No active subscription found for this user.");
      }

      /** 
       * Cancels the current subscription using the transaction ID.
       * 
       * @type {Object} 
       */
      const cancelSubscription = await billingServices.cancelSubscription(currentSubscription.transactionId);

      // Throws an error if the subscription cancellation fails.
      if (cancelSubscription.status !== 200) {
        throw new Error("Failed to cancel subscription");
      }

      /** 
       * Records the cancellation transaction for the user.
       */
      await transactionService.createTransaction({
        email: user.email,
        statusDesc: 'canceled',
        paidAmount: currentSubscription.amount,
        transactionId: currentSubscription.transactionId,
        currency: currentSubscription.currency,
      });

      /** 
       * Generates a unique transaction reference ID.
       * 
       * @type {string} 
       */
      const txRef = uuid();

      /** 
       * Initiates a new subscription creation with the new plan on Flutterwave.
       * 
       * @type {Object} 
       */
      const createSubscriptionResponse = await fetch(
        `${process.env.PAY_HOST}/charge/rave-standard`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
          },
          body: JSON.stringify({
            plan: newPlan.type,
            email: user.email,
            txRef,
            paymentOptions: "card",
          }),
        }
      );

      /** 
       * Parses the response data from the subscription creation request.
       * 
       * @type {Object} 
       */
      const createSubscriptionData = await createSubscriptionResponse.json();

      // Throws an error if the new subscription creation fails.
      if (createSubscriptionData.status !== 'success') {
        throw new Error("Failed to create subscription");
      }

      /** 
       * Records the new pending transaction for the user.
       */
      await transactionService.createTransaction({
        email: user.email,
        statusDesc: 'pending',
        paidAmount: newPlan.price,
        transactionId: createSubscriptionData.data.id,
        currency: newPlan.currency || "USD",
      });

      /** 
       * Updates the current subscription status to 'canceled'.
       */
      await currentSubscription.update({
        status: 'canceled',
      });

      /** 
       * Registers the new active subscription for the user with the new plan.
       */
      await billingServices.registerSubscription({
        userId: user.id,
        plan: newPlan.type,
        transactionId: createSubscriptionData.data.id,
        status: 'active',
        amount: newPlan.price,
        currency: newPlan.currency || "USD",
      });

      /** 
       * Updates the user's plan information in the database.
       */
      await user.update({ plan: newPlan.type }, { transaction });

      // Returns a success message indicating that the downgrade is scheduled.
      return {
        success: true,
        message: `Downgrade to ${newPlan.type} scheduled for the end of the current billing period.`
      };
    } catch (error) {
      // Logs any errors encountered and returns an error response.
      return {
        success: false, error: error.message
      };
    }
  }
}

export default planServices;
