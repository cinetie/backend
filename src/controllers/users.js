/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
import path from 'path';
import userService from '../services/userServices';
import tokenService from '../services/tokenService';
import billingServices from '../services/billingServices';
import sessionService from '../services/loginSessionServices';
import payment from '../helpers/payment';
import bcrypt from '../helpers/bcrypt';
import response from '../helpers/response';
import jwt from '../helpers/jwt';
import cry from '../helpers/crypto';
import Util from '../helpers/utilities';
import date from '../helpers/date';
import mailer from '../helpers/mailer';
import Rave from '../helpers/rave';
import Fetch from '../helpers/fetch';

const util = new Util();
class userController {
  static async signupUser(req, res) {
    try {
      const newUser = userController.initializeVarsForSignup(req);
      const search = await userService.getUserByMail(newUser.email);
      if (search) {
        util.setErrorResponse(res, 'user already exists', 403);
      } else {
        // eslint-disable-next-line no-use-before-define
        const EmailStatus = await userController.sendEmail(req);
        const createdUser = await userService.createNewUser({ ...newUser, isOnExtension: false });
        const part1 = cry.crypto();
        const token = userController.signToken(part1, newUser);
        const tokenToSave = userController.generateTokenToSave(newUser, token);
        await tokenService.createNewToken(tokenToSave, token);
        console.log(EmailStatus);
        if (EmailStatus) util.setErrorResponse(res, EmailStatus, 500);
        const userToken = jwt.jwtSign(createdUser.email, process.env.SECRET);
        createdUser.token = userToken;
        delete createdUser.password;
        util.setSuccessResponse(res, 'Signed up successfully', 201, createdUser);
      }
    } catch (error) {
      console.log(error);
      util.setErrorResponse(res, error.message, 500);
    }
  }

  static generateTokenToSave(newUser, token) {
    return {
      email: newUser.email,
      token,
      desc: 'Login-Active'
    };
  }

  static signToken(part1, newUser) {
    return jwt.jwtSign({
      key: part1,
      email: newUser.email
    }, process.env.SECRET);
  }

  static async sendEmail(req) {
    // eslint-disable-next-line no-return-await
    return await mailer([{
      link: `${process.env.HOST}/auth/verify?token=${jwt.jwtSign(req.body.email, process.env.SECRET)}`
    }, {
      from: 'CINETIE support',
      to: req.body.email,
      subject: 'Email verification',
    },
    {
      path: `${path.resolve('src/public/templates/VerifyEmail.ejs')}`
    }
    ]);
  }

  static initializeVarsForSignup(req) {
    const newUser = req.body;
    newUser.password = bcrypt.encrypt(newUser.password);
    newUser.isVerified = false;
    newUser.plan = 'Setup';
    newUser.permissionLevel = 1;
    newUser.isOnTrial = false;
    return newUser;
  }

  static async verify(req, res) {
    try {
      const {
        token
      } = req.query;
      const decoded = jwt.jwtVerify(token, process.env.SECRET);
      const user = await userService.getUserByMail(decoded);
      if (!user) response.errorResponse(res, 404, 'User not found');
      jwt.jwtVerify(token, process.env.SECRET);
      const newUser = {
        isVerified: true
      };
      await tokenService.destroyToken(token);
      const updatedUser = await userService.updateUser(decoded, newUser);
      if (!updatedUser) util.setErrorResponse(res, `Can't verify user ${decoded}`, 400);
      await mailer([{
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
      res.redirect(200, 'https://www.cinetie.com');
    } catch (error) {
      util.setErrorResponse(res, `Something went wrong ${error.message}`, 500);
    }
  }

  static async loginUser(req, res) {
    try {
      const user = await userService.getUserByMail(req.body.email);
      const status = bcrypt.compare(req.body.password, user.password);
      if (!status || !user) {
        util.setErrorResponse(res, 'Invalid email or password!', 400);
      } else if (!user.isVerified) {
        util.setErrorResponse(res, 'Verify your account first!', 401);
      } else {
        const token = jwt.jwtSign({
          key: cry.crypto(),
          email: req.body.email
        }, process.env.SECRET, '1d');
        user.token = token;
        delete user.password;
        const dateSession = new Date();
        const session = {
          email: user.email,
          date: dateSession.toDateString(),
          timeIn: dateSession.toTimeString(),
          timeOut: null,
          state: 'in'
        };
        const addedSession = await sessionService.addSession(session);
        if (!addedSession) util.setErrorResponse(res, 'Can\'t register session', 500);
        util.setSuccessResponse(res, 'Logged in successfully!', 200, token);
      }
    } catch (error) {
      util.setErrorResponse(res, `Something Went wrong logging in ${error}`, 500);
    }
  }

  static async forgotPassword(req, res) {
    try {
      const user = await userService.getUserByMail(req.body.email);
      if (!user) return response.errorResponse(res, 404, 'User not found!');
      // const date = new Date();
      const newDate = date.addMoreDays(1);
      const token = jwt.jwtSign(newDate.getTime(), process.env.SECRET);
      await mailer([{
        link: `${process.env.HOST}/auth/serve-verify?id=${user.id}&&token=${token}`
      }, {
        from: 'CINETIE support',
        to: req.body.email,
        subject: 'Password help',
      },
      {
        path: `${path.resolve('src/public/templates/ForgotPassword.ejs')}`
      }
      ]);
      return response.successResponse(res, 200, 'Reset password link sent successfully!');
    } catch (error) {
      util.setErrorResponse(res, `Something Went wrong logging in ${error}`, 500);
    }
  }

  static async resetPassword(req, res) {
    try {
      const { token, id } = req.query;
      jwt.jwtVerify(token, process.env.SECRET);
      const user_ = await userService.getUserById(id);
      if (!user_) response.errorResponse(res, 404, 'User not found!', 'user undefined');
      const hash = bcrypt.encrypt(req.body.password);
      const newPass = {
        password: hash
      };
      const result = await userService.updateUser(user_.email, newPass);
      if (result[1] === 0) {
        util.setErrorResponse(res, 'Something Went wrong updating user password', 400);
      } else {
        await mailer([{
          name: user_.firstName,
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
        res.redirect(200, 'http://www.cinetie.com/signin');
      }
    } catch (error) {
      util.setErrorResponse(res, `Something Went wrong resetting password ${error}`, 500);
    }
  }

  static async socialLogin(req, res) {
    try {
      let user = await userService.getUserByMail(req.user.email);
      if (!user) {
        user = await userService.createNewUser(req.user, req.user.email);
      }
      const token = jwt.jwtSign({
        key: cry.crypto(),
        email: req.user.email
      }, process.env.SECRET, '1d');
      res.redirect(200, `https://cinetie-frontend.herokuapp.com/social_auth?token=${token}`);
    } catch (error) {
      response.errorResponse(res, 500, 'Something went wrong!', error.message);
    }
  }

  static async deleteAccount(req, res) {
    try {
      const token = req.headers.authorization.slice(7);
      const decoded = jwt.jwtVerify(token, process.env.SECRET);
      const user = await userService.getUserByMail(decoded.email);
      const status = await userService.deleteUser(user.id);
      const cancelSubscription = await billingServices.updateSubscription(decoded.email, { state: 'canceled' });
      if (status !== 0 && cancelSubscription[1] === 1) {
        util.setSuccessResponse(res, 'deleted successfully', 200, status);
      } else {
        util.setErrorResponse(res, 'An error occured', 400);
      }
    } catch (error) {
      util.setErrorResponse(res, `An error occured : ${error}`, 500);
    }
  }

  static async updateAccount(req, res) {
    try {
      const decoded = jwt.jwtVerify(req.headers.authorization.slice(7), process.env.SECRET);
      const user = await userService.getUserByMail(decoded.email);
      console.log(decoded.email);
      if (!user) util.setErrorResponse(res, 'Can\'t find that user', 422);
      const newInfo = req.body;
      console.log(newInfo);
      const updated = await userService.updateUser(decoded.email, newInfo);
      if (updated[0] !== 0) {
        util.setSuccessResponse(res, 'updated successfully', 200, updated);
      } else {
        console.log(updated);
        util.setErrorResponse(res, 'An error occured', 400);
      }
    } catch (error) {
      util.setErrorResponse(res, error, 522);
    }
  }

  static async createSubcription(req, res) {
    try {
      const { email } = jwt.jwtVerify(req.headers.authorization.slice(7), process.env.SECRET);
      const currentSubscription = await billingServices.getCurrentSubscription(email);
      if (!currentSubscription) {
        const user = await userService.getUserByMail(email);
        const { paymentMethod } = req.body;
        const subscriptionData = {
          paymentMethod,
          email,
          plan: user.plan,
          phoneNumber: user.phoneNumber,
          isBilledAnnually: user.isBilledAnnually,
        };
        const subscriptionDetails = await payment.registerNewSubscription(subscriptionData);
        if (subscriptionDetails) {
          util.setSuccessResponse(res, 'Completed signup process', 201, subscriptionDetails);
        } else {
          util.setErrorResponse(res, 'Something went sideways completing the signup', 400);
        }
      } else {
        util.setErrorResponse(res, 'user has an active subscription', 400);
      }
    } catch (error) {
      util.setErrorResponse(res, `Something went sideways totally sideways contact support ${error}`, 500);
    }
  }

  static async updateAccountAndSubscription(req, res) {
    try {
      const { email } = jwt.jwtVerify(req.headers.authorization.slice(7), process.env.SECRET);
      const user = await userService.getUserByMail(email);
      const subscriptionData = {
        email,
        plan: user.plan,
        isBilledAnnually: user.isBilledAnnually,
      };
      const price = await payment.getPlanPricing(subscriptionData);
      const currentSubsctption = await billingServices.getCurrentSubscription(email);
      console.log('298');
      // if (user.isOnTrial === false) {
      //   console.log('300');
      //   util.setErrorResponse(res, 'account is already activated', 400);
      // } else {
      console.log('303');
      const paymentData = userController.getAndSetPaymentData(req, price, user, email);
      const token = jwt.jwtSign({ role: 'main-api', user: email }, process.env.SECRET, 1000);
      switch (Number(currentSubsctption.paymentMethod)) {
        case 1: {
          console.log('308');
          const momoData = await Fetch(paymentData,
            { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            `${process.env.PAY_HOST}/charge/momo`, 'POST');
          console.log(momoData, 'happening');
          if (momoData.status === 200) {
            const updates = await userService.updateUser(email,
              { isOnTrial: false });
            if (updates[1] > 0) {
              util.setSuccessResponse(res, 'Pending subscription  activation with MoMo', 201, momoData);
            } else {
              util.setErrorResponse(res, 'Something went sideways creating a subscription', 400);
            }
          } else {
            util.setErrorResponse(res, 'Sorry payment failed', 500);
          }
          break;
        }

        case 2: {
          const pay = await Fetch(paymentData,
            { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            `${process.env.PAY_HOST}/charge/card`, 'POST');
          console.log(pay, 'card');
          if (pay.status !== 400) {
            if (pay.meta.authorization.mode === 'avs_noauth') {
              return util.setSuccessResponse(res, 'Please provide these details', 200, ['city', 'address', 'state', 'country', 'zipcode']);
            } if (pay.meta.authorization.mode === 'pin') {
              return util.setSuccessResponse(res, 'Please provide your pin', 200, undefined);
            } if (pay.meta.authorization.mode === 'otp') {
              return util.setSuccessResponse(
                res, pay.data.processor_response, 200, { flw_ref: pay.data.flw_ref }
              );
            }
            await userController.removeTrial(email, res, pay);
          } else {
            util.setErrorResponse(res, pay.message, 500);
          }
          break;
        }

        case 3: {
          const pay = await Fetch({
            phone: user.phoneNumber,
            amount: price
          }, {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }, `${process.env.PAY_HOST}/charge/spenn`, 'POST');
          if (pay.status === 200) {
            const updates = await userService.updateUser(email, { isOnTrial: false });
            if (updates[1] === 1) {
              util.setSuccessResponse(res, pay.message, 200, pay);
            } else {
              util.setErrorResponse(res, pay.message, 500);
            }
          } else {
            util.setErrorResponse(res, pay.message, 500);
          }
        }
          break;

        default:
          util.setErrorResponse(res, 'Sorry payment failed', 500);
      }
      // }
    } catch (error) {
      return response.errorResponse(res, 500, `Something wrong happened ${error.message}`, error);
    }
  }

  static async removeTrial(email, res, pay) {
    const updates = await userService.updateUser(email,
      { isOnTrial: false });
    if (updates[1] > 0) {
      util.setSuccessResponse(res, 'Success', 201, { user: updates, payment: { ...pay.meta, flw_ref: pay.data.flw_ref } });
    } else {
      util.setErrorResponse(res, 'Something went sideways creating a subscription', 400);
    }
  }

  static async verifyOTP(req, res) {
    try {
      const { email } = jwt.jwtVerify(req.headers.authorization.slice(7), process.env.SECRET);
      if (req.body.authorization.mode === 'otp-verify') {
        const otpStatus = await Rave.validateACharge(
          {
            otp: req.body.authorization.otp,
            flw_ref: req.body.flw_ref
          }
        );
        console.log(otpStatus);
        if (otpStatus.data.processor_response !== 'successful') {
          return util.setErrorResponse(res, otpStatus.message, 400, 'BAD_REQUEST');
        // eslint-disable-next-line no-else-return
        } else {
          await userController.removeTrial(email, res, otpStatus);
          return util.setSuccessResponse(res, 'OTP verified', 200, otpStatus, null);
        }
      }
    } catch (error) {
      return util.setErrorResponse(res, error.message || error, 500, 'SERVER_ERROR');
    }
  }

  static getAndSetPaymentData(req, price, user, email) {
    return {
      ...req.body,
      amount: price,
      currency: 'RWF',
      phone_number: user.phoneNumber,
      fullname: `${user.firstName} ${user.lastName}`,
      email
    };
  }

  static async getAllAccounts(res) {
    try {
      const users = await userService.getAllUsers();
      response.successResponse(res, 200, 'List of users', users);
    } catch (error) {
      util.setErrorResponse(res, error, 503);
    }
  }

  static async getSubscribersInRange(req, res) {
    try {
      // in Milliseconds since epoch.
      const start = date.convertToTimestamp(req.query.start);
      const end = date.convertToTimestamp(req.query.end);
      const data = await billingServices.getMonthlySubscribers(start, end);
      if (Object.values(data).length > 0) {
        util.setSuccessResponse(res, 'Data was found', 200, {
          size: Object.values(data).length,
          data
        });
      } else {
        util.setErrorResponse(res, 'Data was not found', 400);
      }
    } catch (error) {
      util.setErrorResponse(res, `Something Went wrong logging in ${error}`, 500);
    }
  }

  static async getLiveUsers(req, res) {
    try {
      const data = await sessionService.getLiveSessions();
      if (data) {
        util.setSuccessResponse(res, 'Found ', 200, {
          size: Object.values(data).length,
          data
        });
      } else {
        util.setErrorResponse(res, `Can't find Live users ${JSON.stringify(data)}`, 404);
      }
    } catch (error) {
      util.setErrorResponse(res, error.message, 500);
    }
  }

  static async getUserByEmail(req, res) {
    try {
      const { email } = jwt.jwtVerify(req.headers.authorization.slice(7), process.env.SECRET);
      const user = await userService.getUserByMail(email);
      console.log(user);
      const currentSubscription = await billingServices.getCurrentSubscription(email);
      if (user) {
        if (currentSubscription) {
          util.setSuccessResponse(res, 'Found', 200, {
            user,
            paymentMethod: currentSubscription.paymentMethod,
            price: currentSubscription.price
          });
        } else {
          util.setSuccessResponse(res, 'Found', 200, user);
        }
      } else {
        util.setErrorResponse(res, 'Data not found', 404);
      }
    } catch (error) {
      console.log(error);
      util.setErrorResponse(res, error.message, 500);
    }
  }

  static async getUserProfile(req, res) {
    try {
      const { email } = jwt.jwtVerify(req.headers.authorization.slice(7), process.env.SECRET);
      const currentSubscription = await billingServices.getCurrentSubscription(email);

      const _response = await userService.getUser(email);
      _response.paymentMethod = currentSubscription.paymentMethod;
      util.setSuccessResponse(res, 'Found', 200, _response);
    } catch (error) {
      util.setErrorResponse(res, error.message, 500);
    }
  }

  static async logout(req, res) {
    try {
      const date = new Date();
      const { email } = jwt.jwtVerify(req.headers.authorization.slice(7), process.env.SECRET);
      const sessions = await sessionService.getParticularSession(email);
      if (sessions.length === 0) util.setErrorResponse(res, 'Login to logout', 400);
      const logoutStatus = await sessionService.updateSession(sessions[0].id, { state: 'out', timeOut: date.toTimeString() },);
      if (logoutStatus) {
        util.setErrorResponse(res, 'Logout successfully', 200);
      } else {
        util.setErrorResponse(res, 'Something went wrong', 500);
      }
    } catch (error) {
      util.setErrorResponse(res, error.message, 500);
    }
  }

  static async serveVerifyPassword(req, res) {
    try {
      return res.render('ResetPassword', { host: process.env.HOST, role: 'auth' });
    } catch (error) {
      util.setErrorResponse(res, error.message, 500);
    }
  }
}

export default userController;
