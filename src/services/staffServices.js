import database from '../database/models';

class staffServices {
  static async getStaffByMail(email) {
    try {
      const staff = await database.Staffs.findOne({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        where: {
          email
        }
      });
      if (staff) {
        return staff;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async addNewStaff(data) {
    try {
      return await database.Staffs.create(data);
    } catch (error) {
      throw error;
    }
  }

  static async updateStaff(email, updates) {
    try {
      return await database.Staffs.update(updates, {
        returning: true,
        where: { email },
      });
    } catch (error) {
      throw error;
    }
  }
}

export default staffServices;
