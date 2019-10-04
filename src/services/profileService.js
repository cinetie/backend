import database from '../database/models';
import sequelize from 'sequelize';
const op = sequelize.Op;
class profileServices {
    static async addProfile(newProfile) {
        try {
            return await database.profiles.create(newProfile);
        } catch (error) {
            throw error;
        }
    }
    static async deleteProfile(id) {
        try {
            return await database.profiles.destroy({
                where: {
                    id
                }
            });
        } catch (error) {
            throw error;
        }
    }
    static async searchProfile(name, email) {
        try {
            return await database.profiles.findOne({
                where: {
                    [op.and]: [
                       { name},
                       { email}
                    ]
                }
            });
        } catch (error) {
            return error;
        }
    }
    static async updateProfile(id, profile) {
        try {
            return await database.profiles.update(profile, {
                returning: true,
                where: {
                    id
                }
            });
        } catch (error) {
            throw error;
        }
    }

    static async getParticalProfile(id) {
        try {
            return await database.profiles.findOne({
                where: {
                    id
                }
            });
        } catch (error) {
            throw error;
        }
    }
    static async getProfileCount(id) {
        try {
            return await database.profiles.findAndCountAll({
                where: {
                    id
                }
            });
        } catch (error) {
            throw error;
        }
    }
    static async getAllProfiles() {
        try {
            return await database.profiles.findAll();
        } catch (error) {
            throw error;
        }
    }
}
export default profileServices;