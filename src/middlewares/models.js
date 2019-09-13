import userService from '../services/userServices';

class userModelMiddleware{
    static async getUserByEmail(){
        try {
            const foundUser = userService.getUserByMail(mail);
            if(foundUser){
                return foundUser;
            }
        } catch (error) {
            throw error;
        }
    }
}
export default userModelMiddleware;