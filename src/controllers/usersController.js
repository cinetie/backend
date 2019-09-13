import userService from '../services/userServices';
import tokenService from '../services/tokenService';
import validation from '../validators/validation';
import Util from '../helpers/utilities';
import jwt from 'jsonwebtoken';
import mdw from '../helpers/mailer';
import crypto from 'crypto';
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
            const createdUser = await userService.createNewUser(newUser, newUser.email);

            if (Object.values(createdUser).length >= 8) {
                util.setError(501, "Something just wrong just happened");
                return util.send(res);
            } else {
                if (createdUser.Error) {
                    util.setError(402, "User already exists");
                    return util.send(res);
                } else {
                    let part1 = '';
                    crypto.randomBytes(20, function (err, buffer) {
                        part1 = buffer.toString('hex');
                    });
                    const token = jwt.sign(newUser.firstName + part1, process.env.SECRET);
                    const tokenToSave = {
                        email:newUser.email,
                        token: token,
                        
                    };
                    const savedToken = tokenService.createNewToken(tokenToSave, token);
                    if (!savedToken) {
                        util.setError(401, "Can't save token");
                        return util.send(res);
                    }
                    const emailTosend = {
                        to: req.body.email,
                        from: process.env.EMAIL_USER,
                        subject: 'Please verify your email!',
                        text: 'Dear ' + newUser.firstName + ' please follow this link to verify your email http://localhost:5000/users/auth/verify/?id=' + createdUser.id + '&&token=' + token + '',
                    };
                    mdw.mailer(emailTosend);
                    util.setSuccessPost("Successfully registered check your email for verification", 200);
                    return util.sendPost(res);
                }

            }

        } catch (error) {
            util.setError(500, `${error}`);
            return util.send(res);
        }
    }
    static async verify(req, res) {
        try {
            const id = req.query.id;
            const token = req.query.token;
            const user = userService.getUserById(id);
            const decoded = jwt.verify(token, process.env.SECRET);
            if (decoded) {
                if (user) {
                    const newUser = {
                        isVerified: true
                    };
                    const savedToken = tokenService.destroyToken(token);
                    if (!savedToken) {
                        util.setError(401, "Can't delete token");
                        return util.send(res);
                    }
                    const updatedUser = userService.updateUser(id, newUser);
                    
                    if (updatedUser) {
                        util.setSuccessPost("Verified successfully", 202);
                        return util.sendPost(res);
                    } else {
                        util.setError(502, "Can't verify you");
                        return util.send(res);
                    }
                } else {
                    util.setError(502, "Something went wrong");
                    return util.send(res);
                }
            } else {
                util.setError(502, err);
                return util.send(res);
            }
        } catch (error) {
            util.setError(503, error.message);
            return util.send(res);
        }
    }
    static async loginUser(req, res) {

        try {
            const user = await userService.getUserByMail(req.body.email);
            if (user) {
                const status = util.compare(req.body.password, user.password);
                if (status == true && user.isVerified==true) {
                    let token = jwt.sign(user.email, process.env.SECRET);
                    util.setSuccessPost("Logged In", 200);
                    return util.sendPost(res);
                } else {
                    util.setError(401, "Either email or password are incorrect or email is not verified ");
                    return util.send(res);
                }

            } else {
                util.setError(401, "Email or password incorrect");
                return util.send(res);
            }
        } catch (error) {
            util.setError(500, `${error}`);
            return util.send(res);
        }
    }
    static async forgotPassword(req, res) {
        try {
            const user = await userService.getUserByMail(req.body.email);
            if (user) {
                let part1 = '';
                crypto.randomBytes(20, function (err, buffer) {
                    part1 = buffer.toString('hex');
                });
                const token = jwt.sign(user.firstName + part1, process.env.SECRET);
                const emailTosend = {
                    to: req.body.email,
                    from: process.env.EMAIL_USER,
                    template: 'forgot-password',
                    subject: 'Password help has arrived!',
                    text: 'Dear ' + user.firstName + ' please follow this link to reset your password http://localhost:5000/users/auth/reset_password/?id=' + user.id + '&&token=' + token + '',
                };
                mdw.mailer(emailTosend);
                util.setSuccessPost("Check your Email ", 201);
                return util.sendPost(res);

            } else {
                util.setError(403, "Email not found");
                return util.send(res);
            }
        } catch (error) {
            util.setError(500, `${error}`);
            return util.send(res);
        }
    }
    static async resetPassword(req, res) {

        const token = req.query.token;
        const id = req.query.id;
        jwt.verify(token, process.env.SECRET, function (err, res) {
            if (err) {
                return res.status(422).send({
                    message: "Link expired or Invalid"
                });

            }
        });

            const user_ = userService.getUserById(id);
            const hash = util.encrypt(req.body.password);
            const newPass = {
                password: hash
            };
            const updatedPassword = userService.updateUser(id, newPass);
            if (updatedPassword) {
                util.setSuccessPost("Password set successfully", 200);
                return util.sendPost(res);
            } else {
                util.setError(500, "Can't update password contact support");
                return util.send(res);
            }
       


    }
    static async socialLogin(req, res) {
        try {
            let user = await userService.getUserByMail(req.user.email);
            if (! user) {
                user = await userService.createNewUser(req.user, req.user.email);
            }
            let token = jwt.sign(user.email, process.env.SECRET);
            util.setSuccessPost("Logged In", 200);
            return util.sendPost(res);
        } catch (error) {
            util.setError(500, `${error}`);
            return util.send(res);
        }
    }
}

export default userController;