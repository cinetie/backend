/* eslint-disable import/prefer-default-export */
import { Sequelize } from "sequelize";
import database from "../database/models";

export async function getExpiredSubscriptions() {
  const today = new Date();
  const subs = database.subscriptions.findAll({
    where: Sequelize.literal(
      `STR_TO_DATE(endDate, '%a %b %d %Y') <= '${today.toISOString()}'`
    ),
  });
  return subs;
}


export async function updateSubscription(id, updates, t) {
  const data = await database.subscriptions.update(updates, {
    where: {
      id,
    },
    transaction: t,
  });
  return data;
}
