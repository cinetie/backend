import database from '../database/models';


class cpService {
    static async getCpByMail(email) {
        try {
            const user = await database.contentProviders.findOne({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                where: {email}
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

    static async getCpById(clientId) {
        try {
            return await database.contentProviders.findOne({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                where: {
                    clientId: clientId
                }
            });
        } catch (error) {
            throw error;
        }
    }

    static async createNewCp(newCp) {
        try {
          return  await database.contentProviders.create(newCp);
        } catch (error) {
            throw error;
        }
    }

    static async updateCp(clientId, oldCp) {
        try {
            return await database.contentProviders.update(oldCp, {
                where: {
                    clientId: clientId
                }
            });
        } catch (error) {
            throw error;
        }
    }
    static async deleteCp(clientId) {
        try {
            return await database.contentProviders.destroy({
                returning: true,
                where: {
                    clientId: clientId
                }
            });
        } catch (error) {
            throw error;
        }
    }
    static async getAllCps() {
        try {
            return await database.contentProviders.findAll();
        } catch (error) {
            throw error;
        }
    }
}
export default cpService;