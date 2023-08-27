import { Op } from "sequelize";
import db from "../database/models";

const stopLoginSessions = async () => {
  const subscription = await db.subscriptions.findAll({
    where: {
      [Op.or]: [
        { state: "current" },
        { state: "pending" },
        { state: "cancelled" },
      ],
    },
  });
  subscription.forEach(async (sub) => {
    if (new Date(sub.endDate).getTime() < new Date().getTime()) {
      await db.User.update(
        { permissionLevel: -1 },
        { where: { email: sub.email } }
      );
      if (sub.state === "pending") {
        await db.subscriptions.update(
          { state: "canceled" },
          {
            returning: true,
            where: { id: sub.id },
          }
        );
      }
    }
  });
};

export default stopLoginSessions;
