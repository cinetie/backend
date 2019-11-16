import database from '../database/models';


class earningsService {
    static async getEarningsByVideo(videoId) {
        try {
            const user = await database.earnings.findOne({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                where: { videoId }
            });
            if (user) {
                return user;
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    static async getEarningsById(id) {
        try {
            return await database.earnings.findOne({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                where: { id }
            });
        } catch (error) {
            throw error;
        }
    }

    static async createNewEarnings(newEarnings) {
        try {
          return  await database.earnings.create(newEarnings);
        } catch (error) {
            throw error;
        }
    }

    static async updateEarnings(id, newEarnings) {
        try {
            return await database.earnings.update(newEarnings, {
                where: { id }
            });
        } catch (error) {
            throw error;
        }
    }
    static async deleteEarnings(id) {
        try {
            return await database.earnings.destroy({
                returning: true,
                where: { id }
            });
        } catch (error) {
            throw error;
        }
    }
    static async getAllEarningss() {
        try {
            return await database.earnings.findAll();
        } catch (error) {
            throw error;
        }
    }
}
export default earningsService;