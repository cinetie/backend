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
      console.log(`SUBSCRIPTION UPDATE : ${sub.email} ${new Date()}`)
      sub.state === 'pending' && await db.subscriptions.update({state: 'canceled' }, {
        returning: true,
        where: { id: sub.id }
      });
    }
  });
};

export default stopLoginSessions;
