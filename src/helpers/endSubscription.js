import db from '../database/models';

const stopLoginSessions = async () => {
  const subscription = await db.subscriptions.findAll({
    where: {
      state: 'current'
    }
  });
  subscription.forEach(async (sub) => {
    if (new Date(sub.endDate).getTime() < new Date().getTime()) {
      await db.User.update({ permissionLevel: -1 }, { where: { email: sub.email } });
    }
  });
};

export default stopLoginSessions;
