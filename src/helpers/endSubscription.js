import db from '../database/models';
import { Op } from 'sequelize';

const stopLoginSessions = async () => {
  const subscription = await db.subscriptions.findAll({
    where: {
      [Op.or]: [{state: 'current'}, {state: 'pending'}]
    }
  });
  subscription.forEach(async (sub) => {
    if (new Date(sub.endDate).getTime() < new Date().getTime()) {
      console.log('UPDATED SUBSCRIPTION ' + new Date() +  ' ' +sub.email + '\n');
      await db.User.update({ permissionLevel: -1 }, { where: { email: sub.email } });
    }
  });
};

export default stopLoginSessions;
