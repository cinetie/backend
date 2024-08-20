/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
import path from "path";
import { v4 as uuid } from "uuid";
import { config } from "dotenv";
import userService from "../services/userServices";
import tokenService from "../services/tokenService";
import billingServices from "../services/billingServices";
import sessionService from "../services/loginSessionServices";
import payment from "../helpers/payment";
import bcrypt from "../helpers/bcrypt";
import response from "../helpers/response";
import jwt from "../helpers/jwt";
import cry from "../helpers/crypto";
import Util from "../helpers/utilities";
import date from "../helpers/date";
import mailer from "../helpers/mailer";
import Rave from "../helpers/rave";
import Fetch from "../helpers/fetch";
import RavePaymentRequest from "../helpers/RavePaymentRequest";
import MailingServices from "../services/mailingServices";
import AmbassadorServices from "../services/ambassadorServices";
import PromoCodeServices from "../services/promoCodeServices";
import { createCustomer } from "../helpers/stripe";
import countryNumbers from "../helpers/countryNumbers";

config();
const util = new Util();
class userController {
  static async signupUser(req, res) {
    try {
      const { promoCode } = req.body;
      const isOnPromo = !!promoCode;
      const newUser = userController.initializeVarsForSignup(req);
      const search = await userService.getUserByMail(newUser.email);
      if (search) {
        util.setErrorResponse(res, "user already exists", 403);
      } else {
        // eslint-disable-next-line no-use-before-define

        const createdUser = await userService.createNewUser({
          ...newUser,
          isOnPromo,
          isOnExtension: false,
          permissionLevel: -1,
          isBilledAnnually: false,
          isVerified: true,
        });
        const part1 = cry.crypto();
        const token = userController.signToken(part1, newUser);
        const tokenToSave = userController.generateTokenToSave(newUser, token);
        await tokenService.createNewToken(tokenToSave, token);
        const userToken = jwt.jwtSign(
          {
            key: cry.crypto(),
            email: createdUser.email,
          },
          process.env.SECRET,
          "1d"
        );
        const stripeUser = await createCustomer(createdUser.email);
        if (stripeUser) {
          await userService.updateUser(createdUser.email, {
            stripeId: stripeUser.id,
          });
        } else {
          return util.setErrorResponse(
            res,
            "Something went wrong, please try again",
            500
          );
        }
        createdUser.token = userToken;
        delete createdUser.password;
        await MailingServices.addToMailingList(createdUser.email);
        util.setSuccessResponse(res, "Signed up successfully", 201, userToken);
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
      desc: "Login-Active",
    };
  }

  static signToken(part1, newUser) {
    return jwt.jwtSign(
      {
        key: part1,
        email: newUser.email,
      },
      process.env.SECRET
    );
  }

  static async sendEmail(req) {
    // eslint-disable-next-line no-return-await
    return await mailer([
      {
        link: `${process.env.HOST}/auth/verify?token=${jwt.jwtSign(
          req.body.email,
          process.env.SECRET
        )}`,
      },
      {
        from: "CINETIE support",
        to: req.body.email,
        subject: "Email verification",
      },
      {
        path: `${path.resolve("src/public/templates/VerifyEmail.ejs")}`,
      },
    ]);
  }

  static initializeVarsForSignup(req) {
    const newUser = req.body;
    newUser.password = bcrypt.encrypt(newUser.password);
    newUser.isVerified = false;
    newUser.plan = "Setup";
    newUser.permissionLevel = 1;
    newUser.isOnTrial = false;
    return newUser;
  }

  static async verify(req, res) {
    try {
      const { token } = req.query;
      const decoded = jwt.jwtVerify(token, process.env.SECRET);
      const user = await userService.getUserByMail(decoded);
      if (!user) return response.errorResponse(res, 404, "User not found");
      jwt.jwtVerify(token, process.env.SECRET);
      const newUser = {
        isVerified: true,
      };
      await tokenService.destroyToken(token);
      const updatedUser = await userService.updateUser(decoded, newUser);
      if (!updatedUser)
        util.setErrorResponse(res, `Can't verify user ${decoded}`, 400);
      await mailer([
        {
          name: user.firstName,
        },
        {
          to: user.email,
          from: "CINETIE support",
          subject: "Success email has been verified",
        },
        {
          path: `${path.join(
            __dirname,
            "../public/templates/EmailVerificationSuccess.ejs"
          )}`,
        },
      ]);
      return res.render("redirect", {
        url: "https://www.cinetie.com/u/signin",
      });
    } catch (error) {
      util.setErrorResponse(res, `Something went wrong ${error.message}`, 500);
    }
  }

  static async loginUser(req, res) {
    try {
      const { user } = req;
      const token = jwt.jwtSign(
        {
          key: cry.crypto(),
          email: req.body.email,
        },
        process.env.SECRET,
        "1d"
      );
      user.token = token;
      delete user.password;
      const dateSession = new Date();
      const session = {
        email: user.email,
        date: dateSession.toDateString(),
        timeIn: dateSession.toTimeString(),
        timeOut: null,
        state: "in",
      };
      const addedSession = await sessionService.addSession(session);
      if (!addedSession)
        return util.setErrorResponse(res, "Can't register session", 500);
      return util.setSuccessResponse(
        res,
        "Logged in successfully!",
        200,
        token
      );
    } catch (error) {
      util.setErrorResponse(
        res,
        `Something Went wrong logging in ${error}`,
        500
      );
    }
  }

  static async forgotPassword(req, res) {
    try {
      const user = await userService.getUserByMail(req.body.email);
      if (!user) return response.errorResponse(res, 404, "User not found!");
      const payload = { userId: user.id };
      const token = jwt.jwtSign(payload, process.env.SECRET, '2m')
      await mailer([
        {
          link: `${process.env.FRONT_END_USER}/u/new-password/${user.id}/${token}`,
        },
        {
          from: "CINETIE support",
          to: req.body.email,
          subject: "Password help",
        },
        {
          path: `${path.resolve("src/public/templates/ForgotPassword.ejs")}`,
        },
      ]);
      return response.successResponse(
        res,
        200,
        "Reset password link sent successfully!"
      );
    } catch (error) {
      util.setErrorResponse(
        res,
        `Something Went wrong logging in ${error}`,
        500
      );
    }
  }

  static async resetPassword(req, res) {
    try {
      const { token, id } = req.query;
      var decodedToken = jwt.jwtVerify(token, process.env.SECRET);
      const tokenIssuedAt = decodedToken.iat * 1000; 
      const currentTime = Date.now();
      const tokenExpirationTime = tokenIssuedAt + (2 * 60 * 1000); 
      if (currentTime > tokenExpirationTime) {
        return response.errorResponse(res, 400, "Reset password link has expired! Please try again");
      }
      // eslint-disable-next-line no-underscore-dangle
      const user_ = await userService.getUserById(id);
      if (!user_)
        response.errorResponse(res, 404, "User not found!", "user undefined");
      const hash = bcrypt.encrypt(req.body.password);
      const newPass = {
        password: hash,
      };
      const result = await userService.updateUser(user_.email, newPass);
      if (result[1] === 0) {
        util.setErrorResponse(
          res,
          "Something Went wrong updating user password",
          400
        );
      } else {
        await mailer([
          {
            name: user_.firstName,
            body: "Your password has been reset successfully",
          },
          {
            from: "CINETIE support",
            to: user_.email,
            subject: "Password help",
          },
          {
            path: `${path.resolve("src/public/templates/notification.ejs")}`,
          },
        ]);
        return res.render("redirect", { url: "https://cinetie.com/u/signin" });
      }
    } catch (error) {
      util.setErrorResponse(
        res,
        `Something Went wrong resetting password ${error}`,
        500
      );
    }
  }

  static async socialLogin(req, res) {
    try {
      let user = await userService.getUserByMail(req.user.email);
      if (!user) {
        user = await userService.createNewUser(req.user, req.user.email);
      }
      const token = jwt.jwtSign(
        {
          key: cry.crypto(),
          email: req.user.email,
        },
        process.env.SECRET,
        "1d"
      );
      res.redirect(
        200,
        `https://cinetie-frontend.herokuapp.com/social_auth?token=${token}`
      );
    } catch (error) {
      response.errorResponse(res, 500, "Something went wrong!", error.message);
    }
  }

  static async deleteAccount(req, res) {
    try {
      const token = req.headers.authorization.slice(7);
      const decoded = jwt.jwtVerify(token, process.env.SECRET);
      const user = await userService.getUserByMail(decoded.email);
      const status = await userService.deleteUser(user.id);
      const deleteSubscription = await billingServices.deleteSubscription(
        decoded.email
      );
      if (status !== 0 && deleteSubscription !== 0) {
        util.setSuccessResponse(res, "deleted successfully", 200, status);
      } else {
        util.setErrorResponse(res, "An error occured", 400);
      }
    } catch (error) {
      util.setErrorResponse(res, `An error occured : ${error}`, 500);
    }
  }

  static async updateAccount(req, res) {
    try {
      const decoded = jwt.jwtVerify(
        req.headers.authorization.slice(7),
        process.env.SECRET
      );
      const user = await userService.getUserByMail(decoded.email);
      const { paymentMethod } = req.body;
      if (!user) util.setErrorResponse(res, "Can't find that user", 422);
      const newInfo = req.body;
      const { type } = req.query;
      if (type === "change") newInfo.permissionLevel = -1;
      if (paymentMethod !== undefined || paymentMethod !== null) {
        await billingServices.updateSubscription(decoded.email, {
          paymentMethod,
        });
      }
      const updated = await userService.updateUser(decoded.email, newInfo);
      if (updated[0] !== 0) {
        util.setSuccessResponse(res, "updated successfully", 200, updated);
      } else {
        util.setErrorResponse(res, "An error occured", 400);
      }
    } catch (error) {
      util.setErrorResponse(res, error, 522);
    }
  }

  static async createSubcription(req, res) {
    try {
      const { email } = jwt.jwtVerify(
        req.headers.authorization.slice(7),
        process.env.SECRET
      );
      const { type } = req.query;
      const getSubscription = await billingServices.getSubscription(email);
      const today = new Date();
      const endDate = new Date(getSubscription ? getSubscription.endDate : "");

      if (!getSubscription) {
        const user = await userService.getUserByMail(email);
        const { paymentMethod } = req.body;
        const subscriptionData = {
          paymentMethod,
          email,
          plan: user.plan,
          phoneNumber: user.phoneNumber,
          isBilledAnnually: user.isBilledAnnually,
        };
        const subscriptionDetails = await payment.registerNewSubscription(
          subscriptionData
        );
        if (subscriptionDetails) {
          if (user.isOnPromo) {
            const ambassador =
              await AmbassadorServices.getAmbassadorByPromoCode(user.promoCode);
            await PromoCodeServices.addNewPromoUsage(
              user.email,
              ambassador[0].email,
              user.plan
            );
          }
          util.setSuccessResponse(
            res,
            "Completed signup process",
            201,
            subscriptionDetails
          );
        } else {
          util.setErrorResponse(
            res,
            "Something went sideways completing the signup",
            400
          );
        }
      } else if (
        getSubscription.state === "pending" ||
        endDate.getTime() <= today.getTime() ||
        type === "change"
      ) {
        const user = await userService.getUserByMail(email);
        const { paymentMethod } = req.body;
        const subscriptionData = {
          paymentMethod,
          email,
          plan: user.plan,
          phoneNumber: user.phoneNumber,
          isBilledAnnually: user.isBilledAnnually,
        };
        if (type === "change") subscriptionData.state = "pending";
        const subscriptionDetails = await payment.updatePendingSubscription(
          subscriptionData
        );
        if (subscriptionDetails) {
          if (user.isOnPromo && user.plan.includes("discount")) {
            const ambassador =
              await AmbassadorServices.getAmbassadorByPromoCode(user.promoCode);
            const promoCodeUsed =
              await PromoCodeServices.getPromoCodeUtizationByEmail(
                user.email,
                ambassador[0].email
              );
            if (!promoCodeUsed) {
              await PromoCodeServices.addNewPromoUsage(
                user.email,
                ambassador[0].email,
                user.plan
              );
            }
          }
          util.setSuccessResponse(
            res,
            "Completed signup process and update",
            200,
            subscriptionDetails
          );
        } else {
          util.setErrorResponse(
            res,
            "Something went sideways completing the signup",
            400
          );
        }
      } else {
        util.setErrorResponse(
          res,
          "You have an active current subscription",
          400
        );
      }
    } catch (error) {
      util.setErrorResponse(
        res,
        `Something went sideways totally sideways contact support ${error}`,
        500
      );
    }
  }

  static async updateAccountAndSubscription(req, res) {
    try {
      const { email } = jwt.jwtVerify(
        req.headers.authorization.slice(7),
        process.env.SECRET
      );
      const user = await userService.getUserByMail(email);
      const subscriptionData = {
        email,
        plan: user.plan,
        isBilledAnnually: user.isBilledAnnually,
      };
      const price = await payment.getPlanPricing(subscriptionData);
      const currentSubscription = await billingServices.getCurrentSubscription(
        email,
        "pending"
      );
      // if (user.isOnTrial === false) {
      //   util.setErrorResponse(res, 'account is already activated', 400);
      // } else {
      const paymentData = userController.getAndSetPaymentData(
        req,
        price,
        user,
        email
      );
      const token = jwt.jwtSign(
        { role: "main-api", user: email },
        process.env.SECRET,
        1000
      );
      switch (Number(currentSubscription.paymentMethod)) {
        case 1: {
          const momoData = await userController.sendPaymentRequest(
            paymentData,
            token,
            null,
            "charge/momo"
          );
          if (momoData.status === 200) {
            const updates = await userService.updateUser(email, {
              isOnTrial: false,
            });
            if (updates[1] > 0) {
              await payment.recordTransaction(
                user.email,
                currentSubscription.price,
                paymentData.txRef,
                "pending"
              );
              if (user.isOnPromo) {
                const ambassador =
                  await AmbassadorServices.getAmbassadorByPromoCode(
                    user.promoCode
                  );
                await PromoCodeServices.updatePromoCodeUtizationByEmail(
                  user.email,
                  ambassador[0].email,
                  { plan: user.plan }
                );
              }
              util.setSuccessResponse(
                res,
                "Pending subscription  activation with MoMo",
                201,
                momoData
              );
            } else {
              util.setErrorResponse(
                res,
                "Something went sideways creating a subscription",
                400
              );
            }
          } else {
            util.setErrorResponse(res, "Sorry payment failed", 500);
          }
          break;
        }

        case 2: {
          const txRef = uuid();
          const data = {
            plan: user.plan,
            isBilledAnnually: user.isBilledAnnually,
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            paymentOptions: "card",
            txRef,
          };
          const pay = await userController.sendPaymentRequest(
            data,
            token,
            null,
            "charge/rave-standard"
          );
          if (user.isOnPromo) {
            const ambassador =
              await AmbassadorServices.getAmbassadorByPromoCode(user.promoCode);
            await PromoCodeServices.updatePromoCodeUtizationByEmail(
              user.email,
              ambassador[0].email,
              { plan: user.plan }
            );
          }
          if (pay.status === 200) {
            await payment.recordTransaction(
              user.email,
              currentSubscription.price,
              txRef,
              "pending"
            );
            util.setSuccessResponse(res, "Link generated", 201, {
              link: pay.data.link,
            });
          } else {
            util.setErrorResponse(res, "Something went wrong", 400);
          }
          break;
        }

        case 3:
          {
            const pay = await payment.chargeSpenn(
              user,
              currentSubscription,
              token
            );
            if (pay.status === 200) {
              const updates = await userService.updateUser(email, {
                isOnTrial: false,
              });
              if (updates[1] === 1) {
                await payment.recordTransaction(
                  user.email,
                  currentSubscription.price,
                  pay.data.RequestId,
                  "pending"
                );
                if (user.isOnPromo) {
                  const ambassador =
                    await AmbassadorServices.getAmbassadorByPromoCode(
                      user.promoCode
                    );
                  await PromoCodeServices.updatePromoCodeUtizationByEmail(
                    user.email,
                    ambassador[0].email,
                    { plan: user.plan }
                  );
                }
                util.setSuccessResponse(res, pay.message, 200, pay);
              } else {
                util.setErrorResponse(res, pay.message, 400);
              }
            } else {
              util.setErrorResponse(res, pay.message, 400);
            }
          }
          break;
        case 4:
          {
            const txRef = uuid();
            const paymentType = `mpesa`;
            const requestData = {
              txRef,
              amount: price,
              email,
              phoneNumber: user.phoneNumber,
              currency: "KES",
            };

            await RavePaymentRequest(
              req,
              res,
              requestData,
              token,
              paymentType,
              email,
              currentSubscription,
              user
            );
          }
          break;
        case 5:
          {
            const txRef = uuid();
            const paymentType = `mobile_money_uganda`;
            const requestData = {
              txRef,
              amount: price,
              email,
              currency: "UGX",
            };

            await RavePaymentRequest(
              req,
              res,
              requestData,
              token,
              paymentType,
              email,
              currentSubscription,
              user
            );
          }
          break;
        case 6:
          {
            const txRef = uuid();
            const paymentType = `mobile_money_zambia`;
            const requestData = {
              txRef,
              amount: price,
              email,
              currency: "ZMW",
              network: "MTN",
            };

            await RavePaymentRequest(
              req,
              res,
              requestData,
              token,
              paymentType,
              email,
              currentSubscription,
              user
            );
          }
          break;
        case 7:
          {
            const txRef = uuid();
            const paymentType = `mobile_money_zambia`;
            const requestData = {
              txRef,
              amount: price,
              email,
              currency: "ZMW",
              network: "ZAMTEL",
            };
            await RavePaymentRequest(
              req,
              res,
              requestData,
              token,
              paymentType,
              email,
              currentSubscription,
              user
            );
          }
          break;
        case 8:
          {
            const txRef = uuid();
            const paymentType = `mobile_money_ghana`;
            const requestData = {
              txRef,
              amount: price,
              email,
              currency: "GHS",
              network: "MTN",
            };
            await RavePaymentRequest(
              req,
              res,
              requestData,
              token,
              paymentType,
              email,
              currentSubscription,
              user
            );
          }
          break;
        case 9:
          {
            const txRef = uuid();
            const paymentType = `mobile_money_ghana`;
            const requestData = {
              txRef,
              amount: price,
              email,
              currency: "GHS",
              network: "VODAFONE",
            };
            await RavePaymentRequest(
              req,
              res,
              requestData,
              token,
              paymentType,
              email,
              currentSubscription,
              user
            );
          }
          break;
        case 10:
          {
            const txRef = uuid();
            const paymentType = `mobile_money_ghana`;
            const requestData = {
              txRef,
              amount: price,
              email,
              currency: "GHS",
              network: "TIGO",
            };

            await RavePaymentRequest(
              req,
              res,
              requestData,
              token,
              paymentType,
              email,
              currentSubscription,
              user
            );
          }
          break;
        case 11:
        case 12:
        case 13:
        case 14:
          {
            const txRef = uuid();
            const paymentType = `mobile_money_franco`;
            const requestData = {
              txRef,
              amount: price,
              email,
              currency: countryNumbers[currentSubscription.paymentMethod],
            };

            await RavePaymentRequest(
              req,
              res,
              requestData,
              token,
              paymentType,
              email,
              currentSubscription,
              user
            );
          }
          break;

        case 15:
          {
            const txRef = uuid();
            const paymentType = `mobile_money_tanzania`;
            const requestData = {
              txRef,
              amount: price,
              email,
              currency: "TZS",
            };

            await RavePaymentRequest(
              req,
              res,
              requestData,
              token,
              paymentType,
              email,
              currentSubscription,
              user
            );
          }
          break;
        case 16:
          {
            const txRef = uuid();
            const paymentType = `mobile_money_malawi`;
            const requestData = {
              txRef,
              amount: price,
              email,
              currency: "MWK",
            };

            await RavePaymentRequest(
              req,
              res,
              requestData,
              token,
              paymentType,
              email,
              currentSubscription,
              user
            );
          }
          break;

        default:
          util.setErrorResponse(res, "Sorry payment failed", 500);
      }
    } catch (error) {
      console.log(error);
      return response.errorResponse(
        res,
        500,
        `Something wrong happened ${error.message}`,
        error
      );
    }
  }

  static async removeTrial(email, res, pay) {
    const updates = await userService.updateUser(email, { isOnTrial: false });
    if (updates[1] > 0) {
      util.setSuccessResponse(res, "Success", 201, {
        user: updates,
        payment: { ...pay.meta, flw_ref: pay.data.flw_ref },
      });
    } else {
      util.setErrorResponse(
        res,
        "Something went sideways creating a subscription",
        400
      );
    }
  }

  static async verifyOTP(req, res) {
    try {
      const { email } = jwt.jwtVerify(
        req.headers.authorization.slice(7),
        process.env.SECRET
      );
      if (req.body.authorization.mode === "otp-verify") {
        const otpStatus = await Rave.validateACharge({
          otp: req.body.authorization.otp,
          flw_ref: req.body.flw_ref,
        });
        if (otpStatus.data.processor_response !== "successful") {
          return util.setErrorResponse(
            res,
            otpStatus.message,
            400,
            "BAD_REQUEST"
          );
          // eslint-disable-next-line no-else-return
        } else {
          await userController.removeTrial(email, res, otpStatus);
          return util.setSuccessResponse(
            res,
            "OTP verified",
            200,
            otpStatus,
            null
          );
        }
      }
    } catch (error) {
      return util.setErrorResponse(
        res,
        error.message || error,
        500,
        "SERVER_ERROR"
      );
    }
  }

  static getAndSetPaymentData(req, price, user, email) {
    return {
      ...req.body,
      amount: price,
      currency: "RWF",
      phone_number: user.phoneNumber,
      fullname: `${user.firstName} ${user.lastName}`,
      email,
      txRef: uuid(),
    };
  }

  static async sendPaymentRequest(data, token, type, path) {
    const result = await Fetch(
      data,
      {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      `${process.env.PAY_HOST}/${path}?type=${type}`,
      "POST"
    );
    return result;
  }

  static async getAllAccounts(req, res) {
    try {
      const users = await userService.getAllUsers();
      return response.successResponse(res, 200, "List of users", users);
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
        util.setSuccessResponse(res, "Data was found", 200, {
          size: Object.values(data).length,
          data,
        });
      } else {
        util.setErrorResponse(res, "Data was not found", 400);
      }
    } catch (error) {
      util.setErrorResponse(
        res,
        `Something Went wrong logging in ${error}`,
        500
      );
    }
  }

  static async getLiveUsers(req, res) {
    try {
      const data = await sessionService.getLiveSessions();
      if (data) {
        util.setSuccessResponse(res, "Found ", 200, {
          size: Object.values(data).length,
          data,
        });
      } else {
        util.setErrorResponse(
          res,
          `Can't find Live users ${JSON.stringify(data)}`,
          404
        );
      }
    } catch (error) {
      util.setErrorResponse(res, error.message, 500);
    }
  }

  static async getUserByEmail(req, res) {
    try {
      const { email } = jwt.jwtVerify(
        req.headers.authorization.slice(7),
        process.env.SECRET
      );
      const user = await userService.getUserByMail(email);
      const subscription = await billingServices.getSubscriptionByEmail(email);
      if (user) {
        if (subscription) {
          util.setSuccessResponse(res, "Found", 200, {
            user,
            paymentMethod: subscription.paymentMethod || "null",
            price: subscription.price || "null",
            subscritption: subscription.state,
          });
        } else {
          util.setSuccessResponse(res, "Found", 200, { user });
        }
      } else {
        util.setErrorResponse(res, "Data not found", 404);
      }
    } catch (error) {
      util.setErrorResponse(res, error.message, 500);
    }
  }

  static async getUserProfile(req, res) {
    try {
      const { email } = jwt.jwtVerify(
        req.headers.authorization.slice(7),
        process.env.SECRET
      );
      const currentSubscription = await billingServices.getCurrentSubscription(
        email
      );

      // eslint-disable-next-line no-underscore-dangle
      const _response = await userService.getUser(email);
      _response.paymentMethod = currentSubscription.paymentMethod;
      util.setSuccessResponse(res, "Found", 200, _response);
    } catch (error) {
      util.setErrorResponse(res, error.message, 500);
    }
  }

  static async logout(req, res) {
    try {
      const date = new Date();
      const email = req.user;
      const sessions = await sessionService.getParticularSession(email);
      if (sessions.length === 0) {
        util.setErrorResponse(res, "Login to logout", 400);
      } else {
        const logoutStatus = await sessionService.updateSession(
          sessions[0].id,
          { state: "out", timeOut: date.toTimeString() }
        );
        if (logoutStatus) {
          util.setSuccessResponse(res, "Logout successfully", 200);
        } else {
          util.setErrorResponse(res, "Something went wrong", 400);
        }
      }
    } catch (error) {
      util.setErrorResponse(res, error.message, 500);
    }
  }

  static async serveVerifyPassword(req, res) {
    try {
      return res.render("ResetPassword", {
        host: process.env.HOST,
        role: "auth",
      });
    } catch (error) {
      util.setErrorResponse(res, error.message, 500);
    }
  }
}

export default userController;
