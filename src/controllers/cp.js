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
import date from '../helpers/date';
import { upload } from '../helpers/aws';

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
      const uploadedThumb = await upload('contentproviderids', image);
      newUser.idLink = uploadedThumb.data.Key;
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
        const { id } = createdUser;
        const EmailStatus = await mailer([{
          link: `${process.env.HOST}/cp/verify?id=${id}&&token=${jwt.jwtSign(req.body.email, process.env.SECRET)}`
        }, {
          from: 'CINETIE support',
          to: req.body.email,
          subject: 'Email verification',
        },
        {
          path: `${path.join(__dirname, '../public/templates/VerifyEmail.ejs')}`
        }
        ]);
        if (EmailStatus) {
          util.setErrorResponse(res, 'can\'t send email', 500);
        } else {
          const userToken = jwt.jwtSign(createdUser.email, process.env.SECRET, '1d');
          createdUser.token = userToken;
          createdUser.password = undefined;
          util.setSuccessResponse(res, 'Signed up successfully', 201, createdUser);
        }
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
      const updatedUser = await cp.updateCp(user.email, newUser);
      const EmailStatus = await mailer([{
        name: user.firstName
      },
      {
        to: user.email,
        from: 'CINETIE support',
        subject: 'Success email has been verified',
      },
      {
        path: `${path.join(__dirname, '../public/templates/EmailVerificationSuccess.ejs')}`
      }
      ]);
      if (EmailStatus) {
        util.setErrorResponse(res, 'can\'t send email', 500);
      } else {
        updatedUser.password = undefined;
        res.redirect(200, 'https://www.cinetie.com');
      }
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
      const exp = date.addMoreDays(2);
      const token = jwt.jwtSign({ exp: exp.getTime() }, process.env.SECRET, '1d');
      await mailer([{
        link: `${process.env.HOST}/cp/serve-verify?id=${user.id}&&token=${token}`
      }, {
        from: 'CINETIE support',
        to: req.body.email,
        subject: 'Password help',
      },
      {
        path: `${path.resolve('src/public/templates/ForgotPassword.ejs')}`
      }
      ]);
      util.setSuccessResponse(res, 'Password reset link sent successfully', 200, user);
    } catch (error) {
      util.setErrorResponse(res, 'Something went wrong', 500);
    }
  }

  static async resetPassword(req, res) {
    try {
      const { token, id } = req.query;
      const { exp } = jwt.jwtVerify(token, process.env.SECRET);
      const user_ = await cp.getCpById(id);
      const _todayDate = new Date();
      if (!user_ || exp <= _todayDate.getTime()) {
        util.setErrorResponse(res, 'Link has expired', 400);
      } else {
        const hash = bcrypt.encrypt(req.body.password);
        const newPass = { password: hash };
        const status = await cp.updateCp(user_.email, newPass);
        if (status[1] !== 1) {
          util.setErrorResponse(res, 'Something Went wrong updating  your password', 400);
        } else {
          await mailer([{
            name: user_.name,
            body: 'Your password has been reset successfully'
          }, {
            from: 'CINETIE support',
            to: user_.email,
            subject: 'Password help',
          },
          {
            path: `${path.resolve('src/public/templates/notification.ejs')}`
          }
          ]);
          res.redirect(200, 'https://www.cinetie.com/cp/signin');
        }
      }
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

  // eslint-disable-next-line consistent-return
  static async serveVerifyPassword(req, res) {
    try {
      return res.render('ResetPassword', { host: process.env.HOST, role: 'cp' });
    } catch (error) {
      util.setErrorResponse(res, error.message, 500);
    }
  }

  static async getS3Tokens(req, res) {
    try {
      const params = {
        AWS_REGION: process.env.AWS_REGION,
        AWS_ID: process.env.AWS_UPLOAD_ID,
        AWS_SECRET: process.env.AWS_UPLOAD_ACCESS_KEY
      };
      util.setSuccessResponse(res, 'results', 200, params);
    } catch (error) {
      util.setErrorResponse(res, `something went wrong ${error} || ${error.message}`, 500);
    }
  }
}

export default cpController;
