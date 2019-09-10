import database from '../database/models';

class userService {

    static async getUserByMail(email){
        try {
            const foundUser = await database.User.findOne({
                attributes:{
                    exclude:['id','createdAt','updatedAt','firstName','lastName']
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
    static async updateUser(email,oldUser){
        try {
            const newUser = await database.User.update(oldUser,{
                where: {
                    email :email
                }
            });
            if(Object.values(newUser).length >1){
                return added;
            }else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }
}
export default userService;
