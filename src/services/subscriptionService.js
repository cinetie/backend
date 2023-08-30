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
