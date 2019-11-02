import userService from '../services/userServices';
import tokenService from '../services/tokenService';
import sessionService from '../services/loginSessionServices';
import bcrypt from '../helpers/bcrypt';
import response from '../helpers/response';
import jwt from '../helpers/jwt';
import cry from '../helpers/crypto';
import mdw from '../helpers/mailer';
import Util from '../helpers/utilities';
const util = new Util();
class userController {
    static async signupUser(req, res) {
       // console.log("signup launched");
        try {
            const newUser = req.body;
            
            newUser.password = await bcrypt.encrypt(newUser.password);
            newUser.isVerified = false;
            const checkUser = await userService.getUserByMail(newUser.email);
            if (checkUser != null) {
                util.setErrorResponse(res,"User already exists",422);
            } else {
                const createdUser = await userService.createNewUser(newUser);
                const part1 = cry.crypto();
                const token = jwt.jwtSign(`${part1}${newUser.email}`, process.env.SECRET,"1d");
                const tokenToSave = {
                    email: newUser.email,
                    token: token
    
                };
               
                await tokenService.createNewToken(tokenToSave, token);
                const emailTosend = {
                    to: req.body.email,
                    from: process.env.EMAIL_USER,
                    subject: 'Please verify your email!',
                    text: 'Dear ' + newUser.firstName + ' please follow this link to verify your email http://localhost:5000/auth/verify/?id=' + createdUser.id + '&&token=' + token,
                };
                 await mdw.mailer(emailTosend);
                const userToken = jwt.jwtSign(createdUser.email, process.env.SECRET,"1d");
                createdUser.token = userToken;
                delete createdUser.password;
                util.setSuccessResponse(res,"Signed up successfully",201,createdUser);
                
            }
           //  checkUser !=null ?  util.setErrorResponse(res,"error occured",500): console.log(1);
        
        } catch (error) {
            console.error(error);
        }
    }
    static async verify(req, res) {
        try {
            const {
                id
            } = req.query;
            const {
                token
            } = req.query;
            const user = await userService.getUserById(id);
            if (!user) response.errorResponse(res, 404, 'User not found');
            jwt.jwtVerify(token, process.env.SECRET);
            const newUser = {
                isVerified: true
            };
            await tokenService.destroyToken(token);
            const updatedUser = await userService.updateUser(id, newUser);
            delete updatedUser.password;
            util.setSuccessResponse(res,'Verified successfully!', 200, updatedUser);
        } catch (error) {
            util.setErrorResponse(res, 'Something went wrong', 500, error);
        }
    }
    static async loginUser(req, res) {
        try {
            
            const user = await userService.getUserByMail(req.body.email);
            const status = bcrypt.compare(req.body.password, user.password);
            if (!status || !user) util.setErrorResponse(res, 'Invalid email or password!', 400);
            if (!user.isVerified) util.setErrorResponse(res, 'Verify your account first!', 401);
            const token = jwt.jwtSign({key:cry.crypto(),id:user.id}, process.env.SECRET,"1d");
            user.token = token;
            delete user.password;
            const date = new Date();
            const session = {
                email:user.email,
                date:date.toDateString(),
                timeIn:date.toTimeString(),
                timeOut:null,
                state:"in"
            };
            const addedSession = await sessionService.addSession(session);
            if(!addedSession)util.setErrorResponse(res,`Can't register session`,500);
            util.setSuccessResponse(res, 'Logged in successfully!', 200,token);
        } catch (error) {
            util.setErrorResponse(res,'Something Went wrong logging in '+error.message,500);
        }
    }
    static async forgotPassword(req, res) {
        try {
            const user = await userService.getUserByMail(req.body.email);
            if (!user) response.errorResponse(res, 404, 'User not found!');
            const token = jwt.jwtSign(`${cry.crypto()}${user.firstName}`, process.env.SECRET,"1d");
            const emailTosend = {
                to: req.body.email,
                from: process.env.EMAIL_USER,
                template: 'forgot-password',
                subject: 'Password help has arrived!',
                text: 'Dear ' + user.firstName + ' please follow this link to reset your password http://localhost:5000/auth/reset_password/?id=' + user.id + '&&token=' + token + '',
            };
            await mdw.mailer(emailTosend);
            response.successResponse(res, 200, 'Reset password link sent successfully!');
        } catch (error) {
            response.errorResponse(res, 500, 'Something went wrong!', error);
        }
    }
    static async resetPassword(req, res) {
        try {
            const token = req.query.token;
            const id = req.query.id;
            jwt.jwtVerify(token, process.env.SECRET);
            const user_ = userService.getUserById(id);
            if (!user_) response.errorResponse(res, 404, 'User not found!', error);
            const hash = bcrypt.encrypt(req.body.password);
            const newPass = {
                password: hash
            };
            await userService.updateUser(id, newPass);
            response.successResponse(res, 200, 'Password reset successfully!');
        } catch (error) {
            response.errorResponse(res, 500, 'Something went wrong!', error);
        }
    }
    static async socialLogin(req, res) {
        try {
            let user = await userService.getUserByMail(req.user.email);
            if (!user) user = await userService.createNewUser(req.user, req.user.email);
            let token =  jwt.jwtSign(user.email, process.env.SECRET,"1d");
            user.token = token;
            response.successResponse(res, 200, 'Logged in successfully', user);
        } catch (error) {
            response.errorResponse(res, 500, 'Something went wrong!', error.message);
        }
    }
    static async deleteAccount(req, res) {
        try {
            
            const { id } = req.query;
            const status = await userService.deleteUser(id);
            status !=0 ? util.setSuccessResponse(res,"deleted successfully",200,status) : util.setErrorResponse(res,"An error occured",422)
        } catch (error) {
            util.setErrorResponse(res,"An error occured : " + error,522);
        }
    }
    static async updateAccount(req,res){
        try {
            const  { id } = req.query;
            const  newInfo = req.body;
            const updated =  await userService.updateUser(id,newInfo);
            updated !=0  ? util.setSuccessResponse(res,"updated successfully",200,updated) : util.setErrorResponse(res,"An error occured",422);
        } catch (error) {
            util.setErrorResponse(res,error,522);
        }
    }
    static async getAllAccounts(req,res){
        
        try {
            const users = await userService.getAllUsers();
            response.successResponse(res,200,"List of users",users)
        } catch (error) {
          util.setErrorResponse(res,error,503);
        }
    }

}

export default userController;