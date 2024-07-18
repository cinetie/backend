import sequelize from "sequelize";
import database from "../database/models";

const op = sequelize.Op;
class transactionService {
  static async createTransaction(data) {
    try {
      const newTrans = await database.transactions.create(data);
      return newTrans;
    } catch (error) {
      throw error;
    }
  }

  static async getTransactionById(id) {
    try {
      const data = await database.transactions.findOne({
        where: {
          transactionId: id,
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getByNumberId(number) {
    const data = await database.transactions.findOne({
      where: {
        transactionId: {
          [op.like]: `%${number}%`,
        },
      },
    });
    return data;
  }

  static async getTransactionsByEmail(email, statusDesc) {
    try {
      const data = await database.transactions.findAll({
        where: { [op.and]: [{ email }, { statusDesc }] },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getRecentTransactionsByEmail(email, statusDesc) {
    try {
      const data = await database.transactions.findOne({
        where: {
          [op.and]: [{ email }, { statusDesc }],
        },
        order: [["createdAt", "DESC"]],
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteTransaction(id) {
    try {
      const deleted = await database.transactions.destroy({
        where: {
          transactionId: id,
        },
      });
      return deleted;
    } catch (error) {
      throw error;
    }
  }

  static async updateTransaction(id, updates) {
    try {
      const data = await database.transactions.update(updates, {
        where: {
          transactionId: id,
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
}
export default transactionService;
