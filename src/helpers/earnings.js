import earningController from '../controllers/earning';
import subscriptions from '../services/billingServices';
import userServices from '../services/userServices';
// helper for registering earnings/shares based
// on the amount of videos watched and subscription plan
const registerEarnings = async (email) => {
  try {
    const user = await userServices.getUserByMail(email);
    if (user) {
      const updates = await subscriptions.updateSubscription(email, {
        dueState: true
      });
      const results = await earningController.assignRateToEachVideo(email);
      if (updates[0] && results) {
        return 1;
      }
      return 0;
    }
    return 0;
  } catch (error) {
    return 0;
  }
};

export default registerEarnings;
