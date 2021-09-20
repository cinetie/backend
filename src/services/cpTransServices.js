/* eslint-disable no-useless-catch */
import sequelize from "sequelize";
import database from "../database/models";
import checker from "../helpers/If";

const op = sequelize.Op;
// Services for  handling Content providers cash transactions like withdrawals and invoicing

class cpTransServices {
  static async createTrans(newTrans) {
    try {
      const returnedData = await database.cpTransactions.create(newTrans);
      checker.checker(returnedData, null);
    } catch (error) {
      throw error;
    }
  }

  static async getAllTrans() {
    try {
      const data = await database.cpTransactions.findAll();
      if (data) {
        return data;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getTransById(clientId) {
    try {
      const data = await database.cpTransactions.findAll({
        where: { clientId },
      });
      if (data) {
        return data;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async updateTrans(id, updates) {
    try {
      const data = await database.cpTransactions.update(updates, {
        where: {
          [op.and]: [{ id }, { state: "Not Approved" }],
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
}
export default cpTransServices;
