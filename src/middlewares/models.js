import userServices from '../services/userServices';
import userService from '../services/userServices';


class userModelMiddleware{
    static async getUserByEmail(email){
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