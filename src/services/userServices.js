import database from '../database/models';

class userService {
    static async getUserByMail(email) {
        try {
            const user = await database.User.findOne({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                where: {
                    email: email
                }
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

    static async getUserById(id) {
        try {
            return await database.User.findOne({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                where: {
                    id: id
                }
            });
        } catch (error) {
            throw error;
        }
    }

    static async createNewUser(newUser) {
        try {
          return  await database.User.create(newUser);
        } catch (error) {
            throw error;
        }
    }

    static async updateUser(id, oldUser) {
        try {
            return await database.User.update(oldUser, {
                where: {
                    id: id
                }
            });
        } catch (error) {
            throw error;
        }
    }
    static async deleteUser(id) {
        try {
            return await database.User.destroy({
                returning: true,
                where: {
                    id: id
                }
            });
        } catch (error) {
            throw error;
        }
    }
    static async getAllUsers() {
        try {
            return await database.User.findAll();
        } catch (error) {
            throw error;
        }
    }
}
export default userService;