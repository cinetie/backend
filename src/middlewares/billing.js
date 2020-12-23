/* eslint-disable no-dupe-class-members */
/* eslint-disable no-return-await */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import path from 'path';
import Util from '../helpers/utilities';
import mailer from '../helpers/mailer';
import userService from '../services/userServices';
import date from '../helpers/date';
import jwt from '../helpers/jwt';
import Fetch from '../helpers/fetch';
import ViewingSessions from '../services/viewingSessionsServices';
import transactions from '../services/transactionService';
import webhooks from '../controllers/webhooks';
import payment from '../helpers/payment';
import billingService from '../services/billingServices';

const util = new Util();
// middlware to perfom actual payment and registering transactions
class billing {
  static async fetchCurrentSubscription(req, res, state) {
    try {
      const details = await billingService.getCurrentSubscription(req.body.email, state);
      return details;
    } catch (error) {
      util.setErrorResponse(res, error, 500);
    }
  }

  static async handleFailPaymentStatus(req, next) {
    const user = await userService.getUserByMail(req.body.email);
    // if (user.isOnExtension === true) {
    await userService.updateUser(req.body.email, { permissionLevel: -1 });
    await billing.sendBillingNotification(user, req, 'We would like you to know that your account has been put onhold . \n since your  payment didn\'t work out');
    next();
    // } else {
    // Temporarily disable extensions
    // const viewingSessions = await ViewingSessions.getActiveSessionsPerUser(req.body.email);
    // viewingSessions.forEach(async (data) => {
    //   const updates = {
    //     sessionState: 'suspended'
    //   };
    //   await ViewingSessions.updateViewingSessions(data.id, updates);
    // });
    // await billingService.updateSubscription(req.body.email, {
    //   endDate: date.addMoreDays(5).toDateString(),
    // });
    // await userService.updateUser(req.body.email, { isOnExtension: true });
    // await billing.sendBillingNotification(user, req,
    // 'Hello, Your cinetie subscription has ended and automatic billing has failed,
    // we extended your subscription for five days ');
    // next();~
    // }
  }

  static async sendBillingNotification(user, req, body) {
    await mailer([{
      body,
      name: `${user.firstName}`
    }, {
      from: 'Cinetie support',
      to: req.body.email,
      subject: 'Cinetie subscription',
    },
    {
      path: `${path.join(__dirname, '../public/templates/notification.ejs')}`
    }
    ]);
  }

  static async updateSubscription(req, res) {
    let today;
    const details = await userService.getUserByMail(req.body.email);
    if (details.isBilledAnnually === true) {
      today = date.addMoreDays(365).toDateString();
      
    } else {
      today = date.addMoreDays(31).toDateString();
    }
    const updates = await billingService.updateSubscription(req.body.email,
      { dueState: true, endDate: today });
    return { updates, today };
  }

  static async renewPayment(req, res, next) {
    
    try {
      const user = await userService.getUserByMail(req.body.email);
      const pendingSubscription = await billing.fetchCurrentSubscription(req, res, 'pending');
      const details = await billing.fetchCurrentSubscription(req, res);

      if (!user) {
        return util.setErrorResponse(res, "user doesn't exist", 400);
      } else if (pendingSubscription || user.plan === 'Setup' || details === null) {
        next();
      } else {
        const today = new Date();
        const endDate = new Date(details.endDate);

        const token = jwt.jwtSign({ role: 'main-api', user: user.email }, process.env.SECRET, 1000);
        if (endDate.getTime() <= today.getTime()) { // remember to change >= to <=
          
          if (Number(details.paymentMethod) === 1) {
            const momoStatus = await Fetch({
              currency: 'RWF',
              amount: details.price,
              email: user.email,
              phone_number: user.phoneNumber,
              fullname: `${user.firstName} ${user.lastName}`,

            }, { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            `${process.env.PAY_HOST}/charge/momo`, 'POST');
            if (momoStatus.status === 200) {
              util.setSuccessResponse(res,
                'Please follow this link to renew your subscription with Mobile money',
                200,
                momoStatus);
            } else {
              billing.handleFailPaymentStatus(req, next);
            }
            // service.get
          } else if (Number(details.paymentMethod) === 2) {
            // charge tokenised
            // await Fetch({ email: user.email }, {
            //   Authorization: `Bearer ${token}`,
            //   'Content-Type': 'application/json'
            // }, `${process.env.PAY_HOST}/charge/card-token`, 'POST');
            billing.handleFailPaymentStatus(req, next);
          } else if (Number(details.paymentMethod) === 3) {
            const recentTransactions = await transactions.getTransactionsByEmail(user.email, 'pending');
            
            if (recentTransactions.length > 0) {
              await billing.checkRecentPendingSpennTransaction(
                recentTransactions, token, user, details, req, res, next
              )
            } else {
              const pay = await payment.chargeSpenn(user, details, token);
              if (pay.status === 200) {
                // await payment.recordTransaction(user, details, pay);
                await payment.recordTransaction(user, details, pay.data.RequestId, 'pending');
                // await billingService.updateSubscription(user.email,
                //   { state: 'current' });
                util.setSuccessResponse(res, pay.message, 201, pay);
              } else {
                return billing.handleFailPaymentStatus(req, next);
              }
            }
          }
        } else {
          next();
        }
      }
    } catch (error) {
      util.setErrorResponse(res, error.message, 500);
    }
  }

  static async checkRecentPendingSpennTransaction(
    recentTransactions, token, user, details, req, res, next
  ) {
    const recentTransaction = await billing.checkSpenn(
      recentTransactions[recentTransactions.length - 1].transactionId,
      token
    );
    // eslint-disable-next-line no-console
    if (recentTransaction.data.Status === 'Approved'
      || recentTransaction.data.Status === 'TransactionVerified') {
      await billing.updateTransactionsAndRegisterSales(
        recentTransactions[0].transactionId, user, details, req, res, next
      );
      await billingService.updateSubscription(user.email, { state: 'current' });
    } else {
      billing.handleFailPaymentStatus(req, next);
    }
  }

  static async verifySpennTransactions(req, res, next) {
    try {
      const user = await userService.getUserByMail(req.body.email);
      if (!user) {
        return util.setErrorResponse(res, 'user doesn\'t exist', 400);
      } else {
        const details = await billing.fetchCurrentSubscription(req, res, 'pending');
        if (details === null) {
          next();
        } else if (Number(details.paymentMethod) === 3) {
          
          const recentTransactions = await transactions.getTransactionsByEmail(user.email, 'pending');
          console.log(recentTransactions, recentTransactions[recentTransactions.length - 1]);
          if (recentTransactions.length > 0) {
            const token = jwt.jwtSign({ role: 'main-api', user: user.email }, process.env.SECRET, 1000);
            await billing.checkRecentPendingSpennTransaction(
              recentTransactions, token, user, details, req, res, next
            );
          } else {
            next();
          }
        } else {
          next();
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      util.setErrorResponse(res, error.message, 500);
    }
  }

  static async updateTransactionsAndRegisterSales(recentTrans, user, details, req, res, next) {
    const updates = await userService.updateUser(user.email, { permissionLevel: 1 });
    const updatedSubscription = (user.isBilledAnnually === true)
      ? await billingService.updateSubscription(user.email,
        { endDate: date.addMoreDays(365).toDateString(), })
      : await billingService.updateSubscription(user.email,
        { endDate: date.addMoreDays(30).toDateString(), });
    if (updates[1] === 1 && updatedSubscription[1] === 1) {
      const status = await webhooks.registerSalesAndEarnings({
        payment_type: 'spenn',
        amount: details.price
      }, details, req, res);
      if (status === true) {
        await transactions.updateTransaction(recentTrans, { statusDesc: 'approved' });
        next();
      } else {
        return util.setErrorResponse(res, 'Contact support Error: SPENN transaction error', 500);
      }
    } else {
      return util.setErrorResponse(res, 'Contact support Error: Subscription renewal', 500);
    }
  }

  static async chargeSpenn(user, details, token) {
    return await Fetch({
      phone: user.phoneNumber,
      amount: details.price,
    }, {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }, `${process.env.PAY_HOST}/charge/spenn`, 'POST');
  }

  static async checkSpenn(requestId, token) {
    return await Fetch(undefined, {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }, `${process.env.PAY_HOST}/charge/spenn-check?requestId=${requestId}`, 'GET');
  }

  static async recordTransaction(user, details, pay) {
    await transactions.createTransaction(
      {
        email: user.email,
        statusDesc: 'pending',
        paidAmount: details.price,
        transactionId: pay.data.RequestId,
        currency: 'RWF',
      }
    );
  }

  static async verifyPermissionLevel(req, res, next) {
    try {
      
      const { email } = jwt.jwtVerify(req.headers.authorization.slice(7), process.env.SECRET);
      const data = await userService.getUserByMail(email);
      if (data.permissionLevel === -1) {
        return util.setErrorResponse(res, 'Please set up your billing', 402);
      } else {
        next();
      }
    } catch (error) {
      util.setErrorResponse(res, `an error occured  ${error}`, 500);
    }
  }

  static async trial(req, res, next) {
    try {
      
      const { email } = jwt.jwtVerify(
        req.headers.authorization.slice(7), process.env.SECRET
      );
      const data = await userService.getUserByMail(email);
      if (data.isOnTrial === false && data.isOnExtension === false) {
        next();
      } else {
        
        const today = new Date();
        const subscription = await billingService.getCurrentSubscription(email);
        const viewingSessions = await ViewingSessions.getActiveSessionsPerUser(email);
        if ((subscription.trialEnds > today.getTime()) && viewingSessions.length < 3) {
          next();
        } else {
         
          const updates = await userService.updateUser(email, { permissionLevel: -1 });
          if (updates[1] > 0) {
            await mailer([{
              body: 'We would like you to know that your account has been put onhold. \n since your  trial just ended'
            }, {
              from: 'Cinetie support',
              to: email,
              subject: 'Update payment details',
            },
            {
              path: `${path.join(__dirname, '../public/templates/notification.ejs')}`
            }
            ]);
            util.setErrorResponse(res, 'Please activate your account as your trial just ended', 402);
          } else {
            return util.setErrorResponse(res, 'Something went wrong ', 502);
          }
        }
      }
    } catch (error) {
      util.setErrorResponse(res, `Something went wrong${error.message}`, 500);
    }
  }
}

export default billing;
