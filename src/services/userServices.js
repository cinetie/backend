import database from '../database/models';

class userService {
    static async getUserByMail(email){
        try {
            return await database.User.findOne({
                attributes:{
                    exclude:['createdAt','updatedAt']
                },
                where:{
                    email:email
                }
            });
        } catch (error) {
            throw error;
        }
    }

    static async getUserById(id){
        try {
            return await database.User.findOne({
                attributes:{
                    exclude:['createdAt','updatedAt','lastName']
                },
                where:{
                   id:id
                }
            });
        } catch(error) {
            throw error;
        }
    }
    
    static async createNewUser(newUser){
        try {
            return await database.User.create(newUser);
        } catch(error) {
            throw error;
        }
    }

    static async updateUser(id,oldUser){
        try {
            return await database.User.update(oldUser,{
                returning: true,
                where: {
                    id:id
                }
            });
        } catch(error) {
            throw error;
        }
    }
}
export default userService;
