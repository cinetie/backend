import database from '../database/models';
import sequelize from 'sequelize';
const op = sequelize.Op;
class profileServices {
    static async addProfile(newProfile) {

        const addedProfile = await database.profiles.create(newProfile);
        if (addedProfile) {
            return addedProfile;
        } else {
            return null;
        }

    }
    static async deleteProfile(id) {
        const deletedProfile = await database.profiles.destroy({
            where: {
                id:id
            }
        });
        if (deletedProfile) {
            return deletedProfile;
        } else {
            return null;
        }
    }
    static async updateProfile(id, profile) {
        const updatedProfile = await database.profiles.update(profile, {
            where: {
                id: id
            }
        });
        if (updatedProfile) {
            return updatedProfile;
        } else {
            return null;
        }
    }

    static async getParticalProfile(id) {
        const foundProfile = await database.profiles.findOne({
            where: {
                id: id
            }
        });
        if (foundProfile) {
            return foundProfile;
        } else {
            return null;
        }
    }
    static async getProfileCount(id) {
        const profiles = await database.profiles.findAndCountAll({
            where: {
                id: id
            }
        });
        if (profiles) {
            return profile;
        } else {
            return null;
        }
    }
    static async getAllProfiles() {
        const foundProfile = await database.profiles.findAll();
        if (foundProfile) {
            return foundProfile;
        } else {
            return null;
        }
    }
}
export default profileServices;