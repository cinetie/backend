import userService from '../services/userServices';
import tokenService from '../services/tokenService';
import validation from '../validators/validation';
import bcrypt from '../helpers/bcrypt';
import response from '../helpers/response';
import jwt from '../helpers/jwt';
import cry from '../helpers/crypto';
import mdw from '../helpers/mailer';

class userController {
    static async signupUser(req, res) {
        try {
            const newUser = req.body;
            validation.userValidation(req, res);
            newUser.password = await bcrypt.encrypt(newUser.password);
            newUser.isVerified = false;
            const checkUser = await userService.getUserByMail(newUser.email);
            if (checkUser) {
                response.errorResponse(res, 409, 'User already exists');
            }
            const createdUser = await userService.createNewUser(newUser);
            const part1 = await cry.crypto();
            const token = await jwt.jwtSign(`${part1}${newUser.email}`, process.env.SECRET);
            const tokenToSave = {
                email: newUser.email,
                token: token,

            };
            await tokenService.createNewToken(tokenToSave, token);
            const emailTosend = {
                to: req.body.email,
                from: process.env.EMAIL_USER,
                subject: 'Please verify your email!',
                text: 'Dear ' + newUser.firstName + ' please follow this link to verify your email http://localhost:5000/auth/verify/?id=' + createdUser.id + '&&token=' + token,
            };
            await mdw.mailer(emailTosend);
            const userToken = await jwt.jwtSign(user.email, process.env.SECRET);
            createdUser.token = userToken;
            delete createdUser.password;
            response.successResponse(res, 201, 'Signed up successfully!', createdUser);
        } catch (error) {
            response.errorResponse(res, 500, 'Something went wrong!', error);
        }
    }
    static async verify(req, res) {
        try {
            const { id } = req.query;
            const { token } = req.query;
            const user = await userService.getUserById(id);
            if(!user) response.errorResponse(res, 404, 'User not found');
            await jwt.jwtVerify(token, process.env.SECRET);
            const newUser = { isVerified: true };
            await tokenService.destroyToken(token);
            const updatedUser = await userService.updateUser(id, newUser);
            delete updatedUser.password;
            response.successResponse(res, 200, 'Verified successfully!', updatedUser);
        } catch (error) {
            response.errorResponse(res, 500, 'Something went wrong', error);
        }
    }
    static async loginUser(req, res) {
        try {
            const user = await userService.getUserByMail(req.body.email);
            const status = await bcrypt.compare(req.body.password, user.password);
            if(!status || !user) response.errorResponse(res, 400, 'Invalid email or password!', error);
            if(!user.isVerified) response.errorResponse(res, 401, 'Verify your account first!', error);
            const token = await jwt.jwtSign(user.email, process.env.SECRET);
            user.token = token;
            delete user.password;
            response.successResponse(res, 200, 'Logged in successfully!', user);
        } catch (error) {
            response.errorResponse(res, 500, 'Something went wrong!', error);
        }
    }
    static async forgotPassword(req, res) {
        try {
            const user = await userService.getUserByMail(req.body.email);
            if (!user) response.errorResponse(res, 404, 'User not found!');
            const part1 = await ry.crypto();
            const token = await jwt.jwtSign(user.firstName + part1, process.env.SECRET);
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
            await jwt.jwtVerify(token, process.env.SECRET);
            const user_ = userService.getUserById(id);
            if(!user_) response.errorResponse(res, 404, 'User not found!', error); 
            const hash = bcrypt.encrypt(req.body.password);
            const newPass = { password: hash };
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
            let token = await jwt.jwtSign(user.email, process.env.SECRET);
            user.token = token;
            response.successResponse(res, 200, 'Logged in successfully', user)
        } catch (error) {
            response.errorResponse(res, 500, 'Something went wrong!', error);
        }
    }
}

export default userController;