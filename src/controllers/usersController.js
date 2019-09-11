import userService from '../services/userServices';
import validation from '../validators/validation';
import Util from '../helpers/utilities';
import jwt from  'jsonwebtoken';
// import {validation} from '../validators/validation';
const util = new Util();
class userController {
    static async signupUser(req, res) {

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
     
    static async loginUser(req,res){
       
        try {
            const user = await userService.getUserByMail(req.body.email);
            if(user){
                const status = util.compare(req.body.password,user.password);
                if(status == true){
                    let token = jwt.sign(user.email,process.env.SECRET);
                    util.setSuccess("Logged In",200,token);
                    return util.send(res);
                } else{
                    util.setError(403,"Email or password incorrect here " + status +"  "+ user.password);
                    return util.send(res);
                }
                
            }else{
                    util.setError(403,"Email or password incorrect");
                    return util.send(res);
            }
        } catch (error) {
            util.setError(500,`${error}` );
            return util.send(res);
        }
    }
}

export default userController;