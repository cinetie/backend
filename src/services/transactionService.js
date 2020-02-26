import database from '../database/models';

class transactionService {
  static async createTransaction(data) {
    try {
      const newTrans = await database.transactions.create(data);
      (newTrans) || null;
    } catch (error) {
      throw error;
    }
  }

  static async getTransactionById(id) {
    try {
      const data = await database.transactions.findOne({
        where: {
          transactionId: id
        }
      });
      (data) || null;
    } catch (error) {
      throw error;
    }
  }

  static async getTransactionsByEmail(email) {
    try {
      const data = await database.transactions.findAll({
        where: {
          email
        }
      });
      (data) || null;
    } catch (error) {
      throw error;
    }
  }

  static async deleteTransaction(id) {
    try {
      const deleted = await database.transactions.destroy({
        where: {
          transactionId: id
        }
      });
      (deleted) || null;
    } catch (error) {
      throw error;
    }
  }

  static async updateTransaction(id, updates) {
    try {
      const data = await database.transactions.update(updates, {
        where: {
          transactionId: id
        }
      });
      (data) || null;
    } catch (error) {
      throw error;
    }
  }
}
export default transactionService;
