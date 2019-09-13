import database from '../database/models';

class userService {

    static async getUserByMail(email){
        try {
            const foundUser = await database.User.findOne({
                attributes:{
                    exclude:['createdAt','updatedAt']
                },
                where:{
                    email:email
                }
            });
            if(foundUser){
                return foundUser;
            }else{
                return null;
            }
        } catch (error) {
            throw error;
        }
    }
    static async getUserById(id){
        try {
            const foundUser = await database.User.findOne({
                attributes:{
                    exclude:['createdAt','updatedAt','lastName']
                },
                where:{
                   id:id
                }
            });
            if(foundUser){
                return foundUser;
            }else{
                return null;
            }
        } catch (error) {
            throw error;
        }
    }
    static async createNewUser(newUser,email){
        try {
            const find = await database.User.findOne({
                where :{
                    email:email
                }
            });
            if(find){
                return {Error:"User already exists"};
            }else{
                const addedUser = await database.User.create(newUser);
                if(Object.values(addedUser).length >1){
                    return addedUser;
                }else {
                    return null;
                }
            }
            
        } catch (error) {
            throw error;
        }
    }
    static async updateUser(id,oldUser){
        try {
            const newUser = await database.User.update(oldUser,{
                where: {
                    id:id
                }
            });
            if(newUser){
                return newUser;
            }else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }
}
export default userService;
