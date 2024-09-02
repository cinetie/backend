/* eslint-disable no-useless-catch */
import sequelize from "sequelize";
import database from "../database/models";

const op = sequelize.Op;
// services for implementing the billing service

class billingServices {
  static async registerSubscription(newSubscription) {
    // eslint-disable-next-line no-useless-catch 
    try {
      const added = await database.subscriptions.create(newSubscription);
      if (added) {
        return added;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getEndingSubscription(email) {
    try {
      const date = new Date();
      const currentSubs = await database.subscriptions.findOne({
        where: {
          [op.and]: [
            {
              email,
            },
            {
              state: "current",
            },
            {
              endDate: date.toDateString().toString(),
            },
          ],
        },
      });
      if (currentSubs) {
        return currentSubs;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getCurrentSubscription(email, state) {
    try {
      const currentSubs = await database.subscriptions.findOne({
        where: {
          [op.and]: [
            {
              email,
            },
            {
              state: state || "current",
            },
          ],
        },
      });
      if (currentSubs) {
        return currentSubs;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getPendingSubscription(email) {
    try {
      const currentSubs = await database.subscriptions.findOne({
        where: {
          [op.and]: [
            {
              email,
            },
            {
              state: "pending",
            },
          ],
        },
      });
      if (currentSubs) {
        return currentSubs;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getSubscription(email) {
    try {
      const currentSubs = await database.subscriptions.findOne({
        where: {
          [op.and]: [
            {
              email,
            },
          ],
        },
      });
      if (currentSubs) {
        return currentSubs;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getMonthlySubscribers(start, end) {
    // gte start and lte end in  milliseconds
    try {
      const data = await database.subscriptions.findAll({
        where: {
          [op.and]: [
            {
              start: {
                [op.gte]: start,
              },
            },
            {
              start: {
                [op.lte]: end,
              },
            },
          ],
        },
      });
      if (data) {
        return data;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async updateSubscription(email, updated) {
    try {
      const status = await database.subscriptions.update(updated, {
        returning: true,
        where: { email },
      });
      if (status) {
        return status;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async setSubscriptionToSettled(email, updated) {
    try {
      const status = await database.subscriptions.update(updated, {
        where: {
          [op.and]: [{ email }, { state: "current" }],
        },
      });
      if (status) {
        return status;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  // get subscription given an email
  static async getSubscriptionByEmail(email) {
    try {
      if (email) {
        const data = await database.subscriptions.findOne({
          where: { email },
        });

        if (data) {
          return data;
        }
        return null;
      }
      return {
        status: 400,
        message: "Parameter email is not provided",
      };
    } catch (error) {
      throw error;
    }
  }

  static async deleteSubscription(email) {
    try {
      return await database.subscriptions.destroy({
        returning: true,
        where: {
          email,
        },
      });
    } catch (error) {
      throw error;
    }
  }
  /**
   * Cancels a subscription in Flutterwave using the provided subscription ID.
   * 
   * @param {string} flutterwaveId - The ID of the Flutterwave subscription to be canceled.
   * 
   * @returns {Promise<Response>} - A promise that resolves to the response of the cancellation request.
   * 
   * @throws {Error} - Logs an error if the cancellation request fails.
   */
  static async cancelSubscription(flutterwaveId) {
    try {
      /**
       * Sends a PUT request to Flutterwave's API to cancel the subscription with the given ID.
       * 
       * @type {Response}
       */
      const cancelSubscription = await fetch(
        `https://api.flutterwave.com/v3/subscriptions/${flutterwaveId}/cancel`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Returns the response of the cancellation request.
      return cancelSubscription;
    } catch (error) {
      // Logs an error message if the cancellation request fails.
      console.log("error", error);
    }
  }

}
export default billingServices;
