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
import dax from '../helpers/dax-payment-handler';
import paypal from '../helpers/paypal';
import square from '../helpers/square';


const util = new Util();
class userController {
  static async signupUser(req, res) {
    try {
      const newUser = req.body;
      newUser.password = bcrypt.encrypt(newUser.password);
      newUser.isVerified = false;
      newUser.plan = 'Setup';
      newUser.permissionLevel = 1;
      newUser.isOnTrial = true;
      const search = await userService.getUserByMail(newUser.email);
      if (search) {
        util.setErrorResponse(res, 'user already exists', 403);
      } else {
        // eslint-disable-next-line no-use-before-define
        const EmailStatus = await mailer([{
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
        const createdUser = await userService.createNewUser(newUser);
        const part1 = cry.crypto();
        const token = jwt.jwtSign({
          key: part1,
          email: newUser.email
        }, process.env.SECRET);
        const tokenToSave = {
          email: newUser.email,
          token,
          desc: 'Login-Active'

        };
        await tokenService.createNewToken(tokenToSave, token);
        if (EmailStatus) util.setErrorResponse(res, EmailStatus, 500);
        const userToken = jwt.jwtSign(createdUser.email, process.env.SECRET);
        createdUser.token = userToken;
        delete createdUser.password;
        util.setSuccessResponse(res, 'Signed up successfully', 201, createdUser);
      }
    } catch (error) {
      util.setErrorResponse(res, error.message, 500);
    }
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
        from: 'auth.user@cinetie.com',
        subject: 'Success email has been verified',
      },
      {
        path: `${path.join(__dirname, '../public/templates/EmailVerificationSuccess.ejs')}`
      }
      ]);
      res.redirect('https://www.cinetie.com');
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
      const {
        token
      } = req.query;
      const {
        id
      } = req.query;
      jwt.jwtVerify(token, process.env.SECRET);
      const user_ = await userService.getUserById(id);
      if (!user_) response.errorResponse(res, 404, 'User not found!', 'user undefined');
      const hash = bcrypt.encrypt(req.body.password);
      const newPass = {
        password: hash
      };
      const result = await userService.updateUser(user_.email, newPass);
      if (result[0] === 0) {
        console.log('something went wrong');
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
        res.redirect('http://www.cinetie.com/signin');
      }
    } catch (error) {
      util.setErrorResponse(res, `Something Went wrong logging in ${error}`, 500);
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
      res.redirect(`https://cinetie-frontend.herokuapp.com/social_auth?token=${token}`);
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
      const subscription = await billingServices.getCurrentSubscription(decoded.email);
      const cancelSubscription = await billingServices.updateSubscription(decoded.email, { state: 'canceled' });
      if (subscription.paymentMethod === 2 && cancelSubscription[0] > 0) {
        const cancelation = await paypal.cancelAggreement({ token });
        // if (cancelation === 1) {
        if (status !== 0) {
          util.setSuccessResponse(res, 'deleted successfully', 200, status);
        } else {
          util.setErrorResponse(res, 'An error occured deleting your account', 400);
        }
        // } else {
        //   util.setErrorResponse(res, 'An error occured can\'t cancel paypal subscription', 400);
        // }
      } else if (status !== 0) {
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
      if (!user) util.setErrorResponse(res, 'Can\'t find that user', 422);
      const newInfo = req.body;
      const updated = await userService.updateUser(decoded.email, newInfo);
      if (updated[0] !== 0) {
        util.setSuccessResponse(res, 'updated successfully', 200, updated);
      } else {
        util.setErrorResponse(res, 'An error occured', 400);
      }
    } catch (error) {
      util.setErrorResponse(res, error, 522);
    }
  }

  static async createSubcription(req, res) {
    try {
      const { email } = jwt.jwtVerify(req.headers.authorization.slice(7), process.env.SECRET);
      const user = await userService.getUserByMail(email);
      const { paymentMethod, nonce } = req.body;
      const subscriptionData = {
        paymentMethod,
        email,
        plan: user.plan,
        phoneNumber: user.phoneNumber,
        isBilledAnnually: user.isBilledAnnually,
      };
      if (Number(paymentMethod) === 3) {
        const { customer } = await square.createCustomer({ email });
        const cardId = await square.attachCard({ customerId: customer.id, nonce });
        const updates = await userService.updateUser(email,
          { card_nonce: cardId, customerId: customer.id });
          console.log(updates);
        if (updates[1] > 0) {
          const subscriptionDetails = await payment.registerNewSubscription(subscriptionData);
          if (subscriptionDetails) {
            util.setSuccessResponse(res, 'Completed signup process', 201, subscriptionDetails);
          } else {
            util.setErrorResponse(res, 'Something went sideways completing the signup', 400);
          }
        } else {
          util.setErrorResponse(res, 'something went side ways updating credit card details', 400);
        }
      } else {
        const subscriptionDetails = await payment.registerNewSubscription(subscriptionData);
        if (subscriptionDetails) {
          util.setSuccessResponse(res, 'Completed signup process', 201, subscriptionDetails);
        } else {
          util.setErrorResponse(res, 'Something went sideways completing the signup', 400);
        }
      }
    } catch (error) {
      util.setErrorResponse(res, 'Something went sideways totally sideways contact support', 500);
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
      if (user.isOnTrial === false) {
        util.setErrorResponse(res, 'account is already activated', 400);
      } else {
        let frequency = 0;
        if (user.isBilledAnnually === true) {
          frequency = 'YEAR';
        } else {
          frequency = 'MONTH';
        }
        const paymentData = {
          user: {
            email,
            paymentMethod: user.paymentMethod,
            isBilledAnnually: user.isBilledAnnually,
            plan: user.plan
          },
          momo: {
            amount: Math.round(price),
            phonenumber: user.phoneNumber,
            firstname: user.firstName,
            lastname: user.lastName,
            email,
          },
          paypal: {
            plan: user.plan,
            price,
            frequency,
            currency: 'USD',
            total: price,
            urls: {
              success: `${process.env.PAYPAL_SUCCESS}?user=${jwt.jwtSign(email, process.env.SECRET)}`,
              failOrCancel: `${process.env.PAYPAL_FAIL_CANCEL}`
            }
          }
        };


        switch (Number(currentSubsctption.paymentMethod)) {
          case 1: {
            const momoData = await dax.momo(paymentData.momo);
            if (momoData !== 0) {
              const updates = await userService.updateUser(user.email,
                { isOnTrial: false, permissionLevel: 1 });
              console.log(updates);
              if (updates[1] > 0) {
                util.setSuccessResponse(res, 'Success', 201, updates);
              } else {
                util.setErrorResponse(res, 'Something went sideways creating a subscription', 400);
              }
            } else {
              util.setErrorResponse(res, 'Sorry payment failed', 500);
            }
            break;
          }
          case 2: {
            await paypal.subscription(req, res, paymentData.paypal);
            break;
          }

          case 3: {
            if (user.card_nonce) {
              const reciept = await square.billCard({
                source_id: user.card_nonce,
                amount_money: {
                  amount: Number(price) * 100,
                  currency: 'USD'
                },
                customerId: user.customerId
              });
              if (reciept.status === 'COMPLETED') {
                const updates = await userService.updateUser(user.email,
                  { isOnTrial: false, card_brand: reciept.cardBrand, permissionLevel: 1 });
                if (updates[1] > 0) {
                  util.setSuccessResponse(res, 'Success', 201, undefined);
                } else {
                  util.setErrorResponse(res, 'Something went sideways creating a subscription', 400);
                }
              } else {
                util.setErrorResponse(res, 'Sorry payment failed', 500);
              }
            } else {
              util.setErrorResponse(res, 'Can not save card', 500);
            }

            break;
          }

          default:
            util.setErrorResponse(res, 'Sorry payment failed', 500);
        }
      }
      // const status = await userService.updateUser(email, user);
    } catch (error) {
      return response.errorResponse(res, 500, `Something wrong happened ${error.message}`, error);
    }
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
      const start = date.convertToTimestamp(req.body.start);
      const end = date.convertToTimestamp(req.body.end);
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
      (data) ? util.setSuccessResponse(res, 'Found ', 200, {
        size: Object.values(data).length,
        data
      }) : util.setErrorResponse(res, `Can't find Live users ${JSON.stringify(data)}`, 404);
    } catch (error) {
      util.setErrorResponse(res, error.message, 500);
    }
  }

  static async getUserByEmail(req, res) {
    try {
      const decoded = jwt.jwtVerify(req.headers.authorization.slice(7), process.env.SECRET);
      const user = await userService.getUserByMail(decoded.email);
      (user) ? util.setSuccessResponse(res, 'Found', 200, user) : util.setErrorResponse(res, 'Data not found', 404);
    } catch (error) {
      util.setErrorResponse(res, error.message, 500);
    }
  }

  static async getUserProfile(req, res) {
    try {
      const { email } = jwt.jwtVerify(req.headers.authorization.slice(7), process.env.SECRET);
      const _response = await userService.getUser(email);
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
      return res.render('ResetPassword', { host: process.env.HOST });
    } catch (error) {
      util.setErrorResponse(res, error.message, 500);
    }
  }
}

export default userController;
