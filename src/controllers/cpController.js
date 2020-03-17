import path from 'path';
import tokenService from '../services/tokenService';
import sessionService from '../services/loginSessionServices';
import videoService from '../services/videoServices';
import cp from '../services/cpServices';
import bcrypt from '../helpers/bcrypt';
import jwt from '../helpers/jwt';
import cry from '../helpers/crypto';
import mailer from '../helpers/mailer';
import Util from '../helpers/utilities';
import uuid from '../helpers/uuid';
import cloudinary from '../helpers/cloudinary';

const util = new Util();
// add an isVerified column to cp
class cpController {
  static async signupCp(req, res) {
    try {
      const newUser = req.body;
      newUser.password = await bcrypt.encrypt(newUser.password);
      newUser.isVerified = false;
      newUser.clientId = uuid.generator();
      const { image } = req.files;
      const imageToUpload = await cloudinary.upload(image.tempFilePath, 'image');
      newUser.idLink = imageToUpload.url;
      const checkUser = await cp.getCpByMail(newUser.email);
      if (checkUser != null) {
        util.setErrorResponse(res, 'cp already exists', 422);
      } else {
        const createdUser = await cp.createNewCp(newUser);
        const part1 = cry.crypto();
        const token = jwt.jwtSign(`${part1}${newUser.email}`, process.env.SECRET, '1d');
        const tokenToSave = {
          email: newUser.email,
          token

        };

        await tokenService.createNewToken(tokenToSave, token);
        const EmailStatus = await mailer([{
          link: `${process.env.HOST}/auth/verify?token=${jwt.jwtSign(req.body.email, process.env.SECRET)}`
        }, {
          from: 'auth.cp@cinetie.com',
          to: req.body.email,
          subject: 'Email verification',
        },
        {
          path: `${path.join(__dirname, '../public/templates/VerifyEmail.ejs')}`
        }
        ]);
        if (EmailStatus) util.setErrorResponse(res, 'can\'t send email', 500);
        const userToken = jwt.jwtSign(createdUser.email, process.env.SECRET, '1d');
        createdUser.token = userToken;
        delete createdUser.password;
        util.setSuccessResponse(res, 'Signed up successfully', 201, createdUser);
      }
    } catch (error) {
      util.setErrorResponse(res, `Something went wrong ${error.message}`, 500);
    }
  }

  static async verify(req, res) {
    try {
      const { id } = req.query;
      const { token } = req.query;
      const user = await cp.getCpById(id);
      if (!user) util.setErrorResponse(res, 'can\'t find user', 404);
      jwt.jwtVerify(token, process.env.SECRET);
      const newUser = {
        isVerified: true
      };
      await tokenService.destroyToken(token);
      const updatedUser = await cp.updateCp(id, newUser);
      const EmailStatus = await mailer([{
        link: `${process.env.HOST}/auth/verify?token=${jwt.jwtSign(req.body.email, process.env.SECRET)}`
      }, {
        from: 'auth.cp@cinetie.com',
        to: req.body.email,
        subject: 'Email verification',
      },
      {
        path: `${path.join(__dirname, '../public/templates/VerifyEmail.ejs')}`
      }
      ]);
      if (EmailStatus) util.setErrorResponse(res, 'can\'t send email', 500);
      updatedUser.password = null;
      res.redirect('https://www.google.com');
    } catch (error) {
      util.setErrorResponse(res, `Something went wrong ${error.message}`, 500);
    }
  }

  static async loginUser(req, res) {
    try {
      const user = await cp.getCpByMail(req.body.email);
      if (!user) util.setErrorResponse(res, 'Invalid email or password!', 400);
      const status = bcrypt.compare(req.body.password, user.password);
      if (!status) util.setErrorResponse(res, 'Passwords don\'t match', 400);
      if (!user.isVerified) util.setErrorResponse(res, 'Verify your account first!', 401);
      const token = jwt.jwtSign({ key: cry.crypto(), email: user.email, clientId: user.clientId }, process.env.SECRET, '1d');
      user.token = token;
      delete user.password;
      const date = new Date();
      const session = {
        email: user.email,
        date: date.toDateString(),
        timeIn: date.toTimeString(),
        timeOut: null,
        state: 'in'
      };
      const addedSession = await sessionService.addSession(session);
      if (!addedSession)util.setErrorResponse(res, 'Can\'t register session', 500);
      util.setSuccessResponse(res, 'Logged in successfully!', 200, token);
    } catch (error) {
      util.setErrorResponse(res, `Something Went wrong logging in ${error.message}`, 500);
    }
  }

  static async getCpDetails(req, res) {
    try {
      const decoded = jwt.jwtVerify(req.headers.authorization.slice(7), process.env.SECRET);
      const user = await cp.getCpByMail(decoded.email);
      if (!user) {
        util.setErrorResponse(res, 'Data not found', 404);
      } else {
        util.setSuccessResponse(res, 'Data found', 200, user);
      }
    } catch (error) {
      util.setErrorResponse(res, 'Something went wrong', 500);
    }
  }

  static async forgotPassword(req, res) {
    try {
      const user = await cp.getCpByMail(req.body.email);
      if (!user) util.setErrorResponse(res, 'can\'t find user', 404);
      const token = jwt.jwtSign(`${cry.crypto()}${user.firstName}`, process.env.SECRET, '1d');
      const emailTosend = {
        to: req.body.email,
        from: process.env.EMAIL_USER,
        template: 'forgot-password',
        subject: 'Password help has arrived!',
        text: `Dear ${user.name} please follow this link to reset your password http://localhost:5000/auth/reset_password/?id=${user.id}&&token=${token}`,
      };
      await mdw.mailer(emailTosend);
      util.setSuccessResponse(res, 'Password reset link sent successfully', 200, user);
    } catch (error) {
      util.setErrorResponse(res, 'Something went wrong', 500);
    }
  }

  static async resetPassword(req, res) {
    try {
      const { token } = req.query;
      const { id } = req.query;
      jwt.jwtVerify(token, process.env.SECRET);
      const user_ = cp.getCpById(id);
      if (!user_) util.setErrorResponse(res, 'can\'t find user', 404);
      const hash = bcrypt.encrypt(req.body.password);
      const newPass = {
        password: hash
      };
      await cp.updateCp(id, newPass);
      util.setSuccessResponse(res, 'Password reset  successfully', 200, null);
    } catch (error) {
      util.setErrorResponse(res, 'Something went wrong', 500);
    }
  }

  static async socialLogin(req, res) {
    try {
      let user = await cp.getCpByMail(req.user.email);
      if (!user) user = await cp.createNewCp(req.user, req.user.email);
      const token = jwt.jwtSign(user.email, process.env.SECRET, '1d');
      user.token = token;
      util.setErrorResponse(res, 'Logged in successfully', 500);
    } catch (error) {
      util.setErrorResponse(res, 'Something went wrong', 500);
    }
  }

  static async deleteAccount(req, res) {
    try {
      const token = req.headers.authorization.slice(7);
      const { email } = jwt.jwtVerify(token, process.env.SECRET);
      const status = await cp.deleteCp(email);
      if (status !== false) {
        util.setSuccessResponse(res, 'deleted successfully', 200, status);
      } else {
        util.setErrorResponse(res, 'An error occured', 422);
      }
    } catch (error) {
      util.setErrorResponse(res, `An error occured : ${error}`, 522);
    }
  }

  static async updateAccount(req, res) {
    try {
      const token = req.headers.authorization.slice(7);
      const { email } = jwt.jwtVerify(token, process.env.SECRET);
      const newInfo = req.body;
      const updated = await cp.updateCp(email, newInfo);
      if (updated !== false) {
        util.setSuccessResponse(res, 'updated successfully', 200, updated);
      } else {
        util.setErrorResponse(res, 'An error occured', 422);
      }
    } catch (error) {
      util.setErrorResponse(res, error, 522);
    }
  }

  static async getAllAccounts(req, res) {
    try {
      const users = await cp.getAllCps();
      util.setSuccessResponse(res, 'success', 200, users);
    } catch (error) {
      util.setErrorResponse(res, error, 503);
    }
  }

  static async getAllVideosLocal(req, res) {
    const { type } = req.query;
    const decoded = jwt.jwtVerify(req.headers.authorization.slice(7), process.env.SECRET);
    const videos = await videoService.getAllVideos(decoded.clientId, type);
    if (videos) {
      util.setSuccessResponse(res, 'Data found', 200, videos);
    } else {
      util.setErrorResponse(res, 'Data not found', 400);
    }
  }
}

export default cpController;
