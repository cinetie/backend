/* eslint-disable no-plusplus */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-useless-catch */
import date from '../helpers/date';
import jwt from '../helpers/jwt';
import response from '../helpers/response';
import Util from '../helpers/utilities';
import { default as billingServices, default as subscriptionService } from '../services/billingServices';
import earningService from '../services/earningServices';
import userService from '../services/userServices';
import viewSessionService from '../services/viewingSessionsServices';
import webhooks from './webhooks';

const util = new Util();
// IMPORTANT  when pulling earnings make sure to map a new
// understandable date format not just milliseconds
class earningController {
  // obtains details about the current users subscription
  static async getCurrentSubscriptionDetails(email) {
    const details = await subscriptionService.getCurrentSubscription(email);
    if (details) {
      return details;
    }
    return null;
  }

  // obtains details about the current user viewing sessions
  static async getCurrentViewingSessions(email) {
    const details = await viewSessionService.getActiveAndSuspendedSessionsPerUser(email);
    if (details) {
      return details;
    }
    return null;
  }

  // obtain amount to attribute to each distinct view based on their subscription
  static async calculateRatePerVideo(email) {
    const sessionDetails = await this.getCurrentViewingSessions(email);
    const subscriptionDetails = await this.getCurrentSubscriptionDetails(email);
    const rate = (Number(subscriptionDetails.price) * 0.7) / Object.values(sessionDetails).length;
    if (rate) {
      return rate;
    }
    return null;
  }

  // assign the obtained rate to each video.
  // upon failure of this method maping the numerous elements of session's array and
  // then doing a bulk create
  // would solve the issue.
  static async assignRateToEachVideo(email) {
    try {
      let results = [];
      // eslint-disable-next-line no-unused-vars
      let updatedSessions = [];
      const sessions = await this.getCurrentViewingSessions(email);
      const rate = await this.calculateRatePerVideo(email);
      const date = new Date();
      sessions.forEach(async (data) => {
        const updates = {
          sessionState: 'inActive'
        };
        updatedSessions = await viewSessionService.updateViewingSessions(data.id, updates);
      });
      sessions.forEach(async (data) => {
        const earnings = {
          videoId: data.videoId,
          clientId: data.clientId,
          amount: rate.toPrecision(4),
          state: 'Active',
          monthYear: date.getTime()
        };
        results = await earningService.createNewEarnings(earnings);
      });
      // const updates = await subscriptionService.setSubscriptionToSettled(email, { state: 'settled' });
      if (results) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }

  static async getAllEarnings(req, res) {
    try {
      let sum = 0;
      const data = await earningService.getAllEarningss();
      if (Object.values(data).length > 0) {
        for (let i = 0; i < Object.values(data).length; i++) {
          const date = new Date(Number(data[i].monthYear));
          data[i].monthYear = `${date.toDateString().slice(4, 7)}/${date.getFullYear()}`;
          sum += Number(data[i].amount);
        }
        const formattedData = [];
        for (let i = 0; i < data.length; i++) {
          let count = 0;
          for (let j = 0; j < data.length; j++) {
            var { monthYear } = data[i];
            if (data[i].monthYear === data[j].monthYear) {
              count += Number(data[j].amount);
            }
          }
          const obj = {
            amount: Number(count.toFixed(2)),
            period: monthYear
          };
          formattedData.push(obj);
        }
        // remove duplicates
        const uniqueValues = util.getUnique(formattedData, 'monthYear');
        return response.successResponse(res, 200, 'Earnings found ', {
          sum: Number(sum.toFixed(2)),
          data: uniqueValues
        });
      }
      return response.successResponse(res, 404, 'Data Not found', 0);
    } catch (error) {
      return response.errorResponse(res, 500, 'Something happened', error.message);
    }
  }

  static async getAllActiveEarnings(req, res) {
    try {
      let sum = 0;
      const data = await earningService.getAllActiveEarnings();
      if (Object.values(data).length > 0) {
        for (let i = 0; i < Object.values(data).length; i++) {
          const date = new Date(Number(data[i].monthYear));
          data[i].monthYear = `${date.toDateString().slice(4, 7)}/${date.getFullYear()}`;
          sum += Number(data[i].amount);
        }
        const formattedData = [];
        for (let i = 0; i < data.length; i++) {
          let count = 0;
          for (let j = 0; j < data.length; j++) {
            var { monthYear } = data[i];
            if (data[i].monthYear === data[j].monthYear) {
              count += Number(data[j].amount);
            }
          }
          const obj = {
            amount: Number(count.toFixed(2)),
            period: monthYear
          };
          formattedData.push(obj);
        }
        // remove duplicates
        const uniqueValues = util.getUnique(formattedData, 'monthYear');
        return response.successResponse(res, 200, 'Earnings found ', {
          sum: Number(sum.toFixed(2)),
          data: uniqueValues
        });
      }
      return response.successResponse(res, 404, 'Data Not found', 0);
    } catch (error) {
      return response.errorResponse(res, 500, 'Something happened', error.message);
    }
  }

  // get earnings per video
  static async getAllEarningsPerVideo(req, res) {
    try {
      let sum = 0;
      const data = await earningService.getEarningsByVideo(req.query.videoId);
      if (Object.values(data).length > 0) {
        for (let i = 0; i < Object.values(data).length; i++) {
          const date = new Date(Number(data[i].monthYear));
          data[i].monthYear = `${date.toDateString().slice(4, 7)}/${date.getFullYear()}`;
          sum += Number(data[i].amount);
        }
        const formattedData = [];
        for (let i = 0; i < data.length; i++) {
          let count = 0;
          for (let j = 0; j < data.length; j++) {
            var { monthYear } = data[i];
            if (data[i].monthYear === data[j].monthYear) {
              count += Number(data[j].amount);
            }
          }
          const obj = {
            amount: Number(count.toFixed(2)),
            period: monthYear
          };
          formattedData.push(obj);
        }
        // remove duplicates
        const uniqueValues = util.getUnique(formattedData, 'monthYear');
        return response.successResponse(res, 200, 'Earnings found ', {
          sum: Number(sum.toFixed(2)),
          data: uniqueValues
        });
      }
      return response.successResponse(res, 404, 'Data Not found', 0);
    } catch (error) {
      return response.errorResponse(res, 500, 'Something happened', error.message);
    }
  }

  static async getActiveEarningsPerVideo(req, res) {
    try {
      let sum = 0;
      const data = await earningService.getActiveEarningsByVideo(req.query.videoId);
      if (Object.values(data).length > 0) {
        for (let i = 0; i < Object.values(data).length; i++) {
          sum += Number(data[i].amount);
        }
        return response.successResponse(res, 200, 'Earnings found ', sum);
      }
      return response.successResponse(res, 404, 'Data Not found', 0);
    } catch (error) {
      return response.errorResponse(res, 500, 'Something happened', error.message);
    }
  }

  static async getActiveEarningsPerClient(req, res) {
    try {
      let sum = 0;
      const {
        clientId
      } = jwt.jwtVerify(req.headers.authorization.slice(7), process.env.SECRET);
      const data = await earningService.getActiveEarningsByClientId(clientId);
      if (Object.values(data).length > 0) {
        for (let i = 0; i < Object.values(data).length; i++) {
          sum += Number(data[i].amount);
        }
        return response.successResponse(res, 200, 'Earnings found ', sum);
      }
      return response.successResponse(res, 404, 'Data Not found', 0);
    } catch (error) {
      return response.errorResponse(res, 500, 'Something happened', error.message);
    }
  }

  static async getEarningsPerClient(req, res) {
    try {
      let sum = 0;
      const {
        clientId
      } = jwt.jwtVerify(req.headers.authorization.slice(7), process.env.SECRET);
      const data = await earningService.getEarningsByClientId(clientId);
      if (Object.values(data).length > 0) {
        for (let i = 0; i < Object.values(data).length; i++) {
          const date = new Date(Number(data[i].monthYear));
          data[i].monthYear = `${date.toDateString().slice(4, 7)}/${date.getFullYear()}`;
          sum += Number(data[i].amount);
        }
        const formattedData = [];
        for (let i = 0; i < data.length; i++) {
          let count = 0;
          for (let j = 0; j < data.length; j++) {
            var { monthYear } = data[i];
            if (data[i].monthYear === data[j].monthYear) {
              count += Number(data[j].amount);
            }
          }
          const obj = {
            amount: Number(count.toFixed(2)),
            period: monthYear
          };
          formattedData.push(obj);
        }
        // remove duplicates
        const uniqueValues = util.getUnique(formattedData, 'monthYear');
        return response.successResponse(res, 200, 'Earnings found ', {
          sum: Number(sum.toFixed(2)),
          data: uniqueValues
        });
      }
      return response.successResponse(res, 404, 'Data Not found', 0);
    } catch (error) {
      return response.errorResponse(res, 500, 'Something happened', error.message);
    }
  }

  static async calculateEarningsPerUser(req, res) {
    try {
      const updates = await userService.updateUser(req.user, { permissionLevel: 1 });
      const currentSubscription = await billingServices.getCurrentSubscription(req.user);
      console.log(currentSubscription);
      console.log(req.user);
      if (updates[1] === 1) {
        const status = await webhooks.registerSalesAndEarnings({
          payment_type: req.body.paymentMethod,
          amount: currentSubscription.price
        }, currentSubscription, req, res);
        if (status === true) {
          const updateSubscription = (updates.isBilledAnnually === true)
            ? await billingServices.updateSubscription(req.user, { endDate: date.addMoreDays(365).toDateString(), state: "current",dueState: false })
            : await billingServices.updateSubscription(req.user, { endDate: date.addMoreDays(30).toDateString(), state: "current", dueState: false })
            console.log(updateSubscription);
            if (updateSubscription[1] !== 0) {
              return response.successResponse(res, 200, 'Success transaction finished', status);
            } else {
              return response.errorResponse(res, 400, 'something went wrong updating subscription', 'BAD_REQUEST')
            }
        } else {
          return response.errorResponse(res, 400, 'something went wrong registering earnings', 'BAD_REQUEST')
        }
      } else {
        return response.errorResponse(res, 400, 'user updates are not running', 'BAD_REQUEST')
      }
    } catch (error) {
      console.log(error)
      return response.errorResponse(res, 500, 'Something happened', 'SERVER_ERROR');
    }
  }
}
export default earningController;
