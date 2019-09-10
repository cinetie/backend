import userService from '../services/userServices';
import validation from '../validators/validation';
import Util from '../helpers/utilities';
// import {validation} from '../validators/validation';
const util = new Util();
class signupController {
    static async createUser(req, res) {

        try {
            const newUser = req.body;
            // const validator = new validation();
            validation.userValidation(req, res);
            // validation.emailValidation(req, res);
            // validation.passwordValidation(res, res);
            newUser.password = util.encrypt(newUser.password);
            const createdUser = await userService.createNewUser(newUser,newUser.email);
            if (Object.values(createdUser).length >= 8) {
                util.setError(501, "Something just wrong just happened");
                return util.send(res);
            } else {
                if(createdUser.Error){
                    util.setError(402, "User already exists");
                    return util.send(res);
                }else{
                    util.setSuccessPost("Successfully registered", 200);
                    return util.sendPost(res);
                }
               
            }

        } catch (error) {
            util.setError(500, `${error}`);
            return util.send(res);
        }
    }
}

export default signupController;