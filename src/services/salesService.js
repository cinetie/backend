/* eslint-disable no-useless-catch */
import sequelize from "sequelize";
import database from "../database/models";

const op = sequelize.Op;

class saleService {
  static async getSalesByModeOfPayment(method) {
    try {
      const user = await database.sales.findOne({
        attributes: {
          exclude: ["createdAt", "updatedAt", "id"],
        },
        where: { method },
      });
      if (user) {
        return user;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getSalesInTimeRange(start, end) {
    try {
      const data = await database.sales.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt", "id"],
        },
        where: {
          [op.and]: [
            {
              creationTime: {
                [op.gte]: start,
              },
            },
            {
              creationTime: {
                [op.lte]: end,
              },
            },
          ],
        },
      });
      if (data) return data;
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getSalesById(id) {
    try {
      const user = await database.sales.findOne({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        where: { id },
      });
      if (user) {
        return user;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async createNewSales(newSales) {
    try {
      return await database.sales.create(newSales);
    } catch (error) {
      throw error;
    }
  }

  static async getAllSaless() {
    try {
      const sales = await database.sales.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
      });
      if (!sales) return null;
      return sales;
    } catch (error) {
      throw error;
    }
  }
}
export default saleService;
