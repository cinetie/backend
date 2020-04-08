/* eslint-disable no-useless-catch */
import paypalHelper from 'paypal-rest-sdk';
import moment from 'moment';
import _ from 'lodash';
import fetch from 'node-fetch';
import base64 from 'Base64';
import tokenService from '../services/tokenService';
import paypapTransServices from '../services/paypalTransServices';
import billingServices from '../services/billingServices';
import paypalAggreementServices from '../services/paypalAggreementService';
import Util from './utilities';
import jwt from './jwt';
import date from './date';

const util = new Util();
paypalHelper.configure({
  mode: process.env.PAYPAL_MODE,
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_SECRET
});
class paypal {
  static async setPaymentJson(details) {
    const paymentJSON = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal'
      },
      redirect_urls: {
        return_url: details.urls.success,
        cancel_url: details.urls.failOrCancel
      },
      transactions: [{
        item_list: {
          items: [{
            name: details.name,
            sku: details.sku,
            price: details.price,
            currency: details.currency,
            quantity: details.quantity
          }]
        },
        amount: {
          currency: 'USD',
          total: details.total
        },
        description: details.paymentDesc
      }]
    };
    return paymentJSON;
  }

  static async createPayment(req, res, details) {
    try {
      const paymentJSON = await paypal.setPaymentJson(details);

      paypalHelper.payment.create(paymentJSON, async (error, payment) => {
        if (error) {
          throw error;
        } else {
          const tokenData = {
            token: payment.id,
            email: details.name,
            desc: 'PayPal-Active'
          };
          console.log(payment.links[1]);
          await tokenService.createNewToken(tokenData, '');
          res.redirect(payment.links[1].href);
        }
      });
    } catch (error) {
      throw error;
    }
  }

  static async executePayment(details) {
    paypalHelper.payment.execute(details.paymentId, details.data, async (error, payment) => {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        const data = {
          paymentId: payment.id,
          state: payment.state,
          intent: payment.intent,
          payerEmail: payment.transactions[0].description,
          payerId: payment.payer.payer_info.payer_id,
          transAmount: payment.transactions[0].amount.total,
          transCurrency: payment.transactions[0].amount.currency
        };
        await paypapTransServices.createTransaction(data);
        await billingServices.setSubscriptionToSettled(payment.transactions[0].description, {
          state: 'settled'
        });
      }
    });
  }

  static async subscription(req, res, details) {
    const billingPlanAttributes = {
      description: ` Cinetie ${details.plan}`,
      merchant_preferences: {
        auto_bill_amount: 'yes',
        cancel_url: details.urls.failOrCancel,
        initial_fail_amount_action: 'continue',
        max_fail_attempts: '3',
        return_url: details.urls.success,
        setup_fee: {
          currency: 'USD',
          value: '0'
        }
      },
      name: 'Paypal Agreement',
      payment_definitions: [{
        amount: {
          currency: details.currency,
          value: String(details.price)
        },
        charge_models: [],
        cycles: '0',
        frequency: details.frequency,
        frequency_interval: 1,
        name: 'Regular Payments',
        type: 'REGULAR'
      }],
      type: 'INFINITE'
    };
    const billingPlanUpdateAttributes = [{
      op: 'replace',
      path: '/',
      value: {
        state: 'ACTIVE'
      }
    }];
    const startDate = `${moment(new Date()).add(10, 'minute').format('gggg-MM-DDTHH:mm:ss')}Z`;
    const billingAgreementAttributes = {
      name: 'Name of Payment Agreement',
      description: 'Description of  your payment  agreement',
      start_date: startDate,
      plan: {
        id: ''
      },
      payer: {
        payment_method: 'paypal'
      }
    };
    paypalHelper.billingPlan.create(billingPlanAttributes, (error, billingPlan) => {
      if (error) {
        throw error;
      } else {
        // Step 7:
        paypalHelper.billingPlan.update(billingPlan.id, billingPlanUpdateAttributes, (error, response) => {
          if (error) {
            throw error;
          } else {
            // update the billing agreement attributes before creating it.
            billingAgreementAttributes.plan.id = billingPlan.id;

            // Step 8:
            paypalHelper.billingAgreement.create(billingAgreementAttributes, (error, billingAgreement) => {
              if (error) {
                throw error;
              } else {
                _.forEach(billingAgreement.links, (agreement) => {
                  if (agreement.rel === 'approval_url') {
                    // Redirecting to paypal portal with approvalUrl.
                    const approvalUrl = agreement.href;
                    const token = approvalUrl.split('token=')[1];
                    console.log(approvalUrl, JSON.stringify(agreement));
                    util.setSuccessResponse(res, 'Success ', 200, approvalUrl);
                  } else {
                    return 0;
                  }
                });
              }
            });
          }
        });
      }
    });
  }

  static async executeAggreement(req, res) {
    const { token } = req.query;
    const { user } = req.query;
    const decoded = jwt.jwtVerify(user, process.env.SECRET);
    console.log(decoded);
    paypalHelper.billingAgreement.execute(token, {}, async (error, billingAgreement) => {
      if (error) {
        throw error;
      } else {
        const data = {
          paymentId: billingAgreement.id,
          state: 'Approved-Pending',
          payerEmail: billingAgreement.payer.payer_info.email,
          payerId: billingAgreement.payer.payer_info.payer_id
        };
        const date = new Date();
        await paypalAggreementServices.createNewAggreement({
          date: date.getTime(),
          email: decoded,
          aggreementId: billingAgreement.id,
          state: 'alive'
        });
        await paypapTransServices.createTransaction(data);
        console.log(billingAgreement);
        // Billing agreement will have all the information about the agreement.
        res.redirect('https://www.cinetie.com', 200);
      }
    });
  }

  static async cancelAggreement(details) {
    const user = jwt.jwtVerify(details.token, process.env.SECRET);
    const aggreement = await paypalAggreementServices.getLiveAggreement(user.email);
    console.log(JSON.stringify(aggreement));
    if (aggreement) {
      const cancelNote = {
        note: 'Cancel subscription to cinetie'
      };
      console.log('start 1');
      paypalHelper.billingAgreement.cancel(aggreement.aggreementId, cancelNote, (error, response) => {
        if (error) {
          throw error;
        } else {
          console.log(JSON.stringify(response));
        }
        paypalHelper.billingAgreement.get(aggreement.aggreementId, async (error, billingAgreement) => {
          if (error) {
            throw error;
          } else if (billingAgreement.state) {
            // cancel subscription in the database
            const paypalUpdates = await paypalAggreementServices.updateAggreement(aggreement.aggreementId, { state: 'canceled' });
            const updates = await billingServices.updateSubscription(user.email, { state: 'canceled' });
            if (updates && paypalUpdates) return 1;
            return 0;
          }
        });
      });
    } else {
      return 0;
    }
  }

  static async getSubscriptionDetails(email) {
    const aggreement = await paypalAggreementServices.getLiveAggreement(email);
    const raw = new Date();
    const raw_start_date = date.removeDays(3);
    const raw_end_date = raw.getTime();
    console.log(aggreement.aggreementId);
    if (!aggreement || aggreement.state === 'canceled') return 0;
    paypalHelper.billingAgreement.searchTransactions(aggreement.aggreementId, date.convertToISO(raw_start_date), date.convertToISO(raw_end_date), async (error, data) => {
      if (error) {
        console.log(error);
      } else {
        return 1;
      }
    });
  }

  static async auth() {
    const data = {
      api_key: process.env.PAYPAL_CLIENT_ID,
      api_secret: process.env.PAYPAL_SECRET
    };
    await fetch(`${process.env.PAYPAL_HOST}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${base64.encode(`${data.api_key}:${data.api_secret}`)}`,
        'Content-Type': 'application/x-www-form-url-encoded',

      },
      body: `key=${data.api_key}&value=${data.api_secret}`
    })
      .then((response) => response.json)
      .then((response) => {
        console.log(JSON.stringify(response));
      });
  }
}


export default paypal;
